<?php
declare(strict_types=1);

/**
 * Счётчик просмотров карточек домов.
 * POST JSON: { "houseId": 10, "title": "...", "city": "...", "district": "..." }
 */

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$houseId = (int)($data['houseId'] ?? 0);
if ($houseId < 1 || $houseId > 9999) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid houseId']);
    exit;
}

$title = trim((string)($data['title'] ?? ''));
$city = trim((string)($data['city'] ?? ''));
$district = trim((string)($data['district'] ?? ''));
if (mb_strlen($title) > 160) {
    $title = mb_substr($title, 0, 160);
}
if (mb_strlen($city) > 80) {
    $city = mb_substr($city, 0, 80);
}
if (mb_strlen($district) > 80) {
    $district = mb_substr($district, 0, 80);
}

$paths = views_paths();
ensure_dir($paths['dir']);

$fp = fopen($paths['data'], 'c+');
if ($fp === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Cannot open store']);
    exit;
}

if (!flock($fp, LOCK_EX)) {
    fclose($fp);
    http_response_code(500);
    echo json_encode(['error' => 'Lock failed']);
    exit;
}

$store = read_json_handle($fp);
if (!isset($store['houses']) || !is_array($store['houses'])) {
    $store = ['houses' => [], 'dedup' => []];
}
if (!isset($store['dedup']) || !is_array($store['dedup'])) {
    $store['dedup'] = [];
}

$today = date('Y-m-d');
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$ua = (string)($_SERVER['HTTP_USER_AGENT'] ?? '');
$dedupKey = hash('sha256', $ip . '|' . $ua . '|' . $houseId . '|' . $today);

// Чистим вчерашние и более старые ключи дедупа
foreach ($store['dedup'] as $key => $day) {
    if (!is_string($day) || $day < $today) {
        unset($store['dedup'][$key]);
    }
}

$counted = false;
$total = 0;
$idKey = (string)$houseId;

if (!isset($store['dedup'][$dedupKey])) {
    if (!isset($store['houses'][$idKey]) || !is_array($store['houses'][$idKey])) {
        $store['houses'][$idKey] = [
            'total' => 0,
            'days' => [],
            'title' => '',
            'city' => '',
            'district' => '',
            'updatedAt' => '',
        ];
    }

    $row = &$store['houses'][$idKey];
    if (!isset($row['days']) || !is_array($row['days'])) {
        $row['days'] = [];
    }

    $row['total'] = (int)($row['total'] ?? 0) + 1;
    $row['days'][$today] = (int)($row['days'][$today] ?? 0) + 1;
    $row['updatedAt'] = date('c');
    if ($title !== '') {
        $row['title'] = $title;
    }
    if ($city !== '') {
        $row['city'] = $city;
    }
    if ($district !== '') {
        $row['district'] = $district;
    }

    // Храним дни за последние 90 суток
    ksort($row['days']);
    if (count($row['days']) > 90) {
        $row['days'] = array_slice($row['days'], -90, null, true);
    }

    $store['dedup'][$dedupKey] = $today;
    $counted = true;
    $total = (int)$row['total'];
    unset($row);
} else {
    $total = (int)($store['houses'][$idKey]['total'] ?? 0);
}

rewind($fp);
ftruncate($fp, 0);
fwrite($fp, (string)json_encode($store, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode([
    'ok' => true,
    'counted' => $counted,
    'total' => $total,
]);

function views_paths(): array
{
    $home = getenv('HOME') ?: '';
    if ($home === '') {
        $home = dirname((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__), 2);
    }
    $dir = rtrim($home, '/\\') . '/logs';
    return [
        'dir' => $dir,
        'data' => $dir . '/house-views.json',
    ];
}

function ensure_dir(string $dir): void
{
    if (!is_dir($dir)) {
        @mkdir($dir, 0750, true);
    }
}

function read_json_handle($fp): array
{
    rewind($fp);
    $raw = stream_get_contents($fp);
    if (!is_string($raw) || trim($raw) === '') {
        return ['houses' => [], 'dedup' => []];
    }
    $data = json_decode($raw, true);
    return is_array($data) ? $data : ['houses' => [], 'dedup' => []];
}
