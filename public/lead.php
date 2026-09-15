<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

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

$contact = trim((string)($data['contact'] ?? ''));
$city = trim((string)($data['city'] ?? ''));

if ($contact === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Contact required']);
    exit;
}

if ($city === '') {
    http_response_code(400);
    echo json_encode(['error' => 'City required']);
    exit;
}

$config = load_lead_config();
if ($config === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Lead handler not configured']);
    exit;
}

$message = format_lead_message($data);
$photoUrl = extract_house_photo_url($data);
$sent = telegram_deliver_all($config['token'], $config['chat_ids'], $message, $photoUrl);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['error' => 'Telegram send failed']);
    exit;
}

echo json_encode(['ok' => true]);

function normalize_chat_ids(array $cfg): array
{
    $ids = [];
    if (!empty($cfg['chat_ids']) && is_array($cfg['chat_ids'])) {
        foreach ($cfg['chat_ids'] as $id) {
            $id = trim((string)$id);
            if ($id !== '') {
                $ids[] = $id;
            }
        }
    }
    if (!empty($cfg['chat_id'])) {
        $id = trim((string)$cfg['chat_id']);
        if ($id !== '') {
            $ids[] = $id;
        }
    }
    return array_values(array_unique($ids));
}

function load_lead_config(): ?array
{
    $docRoot = (string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__);
    $candidates = [
        dirname(__DIR__, 2) . '/lead-telegram.php',
        dirname($docRoot, 2) . '/lead-telegram.php',
        dirname($docRoot) . '/../lead-telegram.php',
        '/var/www/' . get_current_user() . '/data/lead-telegram.php',
        '/var/www/' . get_current_user() . '/lead-telegram.php',
    ];

    foreach ($candidates as $path) {
        if (is_file($path)) {
            $cfg = require $path;
            if (!is_array($cfg) || empty($cfg['token'])) {
                continue;
            }
            $chatIds = normalize_chat_ids($cfg);
            if ($chatIds === []) {
                continue;
            }
            return [
                'token' => (string)$cfg['token'],
                'chat_ids' => $chatIds,
            ];
        }
    }

    return null;
}

function esc(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/** Единый формат: +7 999 999 99 99 */
function format_contact(string $method, string $contact): string
{
    $digits = preg_replace('/\D+/', '', $contact) ?? '';
    if (str_starts_with($digits, '8') && strlen($digits) === 11) {
        $digits = '7' . substr($digits, 1);
    } elseif (strlen($digits) === 10) {
        $digits = '7' . $digits;
    }

    $looksPhone =
        $method !== 'telegram'
        || (strlen($digits) === 11 && str_starts_with($digits, '7') && !str_starts_with(ltrim($contact), '@'));

    if ($looksPhone && strlen($digits) === 11 && str_starts_with($digits, '7')) {
        return sprintf(
            '+7 %s %s %s %s',
            substr($digits, 1, 3),
            substr($digits, 4, 3),
            substr($digits, 7, 2),
            substr($digits, 9, 2)
        );
    }

    return trim($contact);
}

function format_lead_message(array $data): string
{
    $type = trim((string)($data['type'] ?? 'viewing'));
    $city = trim((string)($data['city'] ?? ''));
    $method = trim((string)($data['method'] ?? 'phone'));
    $contact = format_contact($method, trim((string)($data['contact'] ?? '')));
    $name = trim((string)($data['name'] ?? ''));
    $comment = trim((string)($data['comment'] ?? ''));
    $context = is_array($data['context'] ?? null) ? $data['context'] : [];

    if ($type === 'callback') {
        $title = 'Обратный звонок';
    } elseif ($type === 'viewing') {
        $title = 'Заявка на просмотр';
    } else {
        $title = 'Заявка с сайта';
    }
    $methodLabel = $method === 'telegram' ? 'Telegram' : 'Телефон';

    $lines = [
        '🏠 <b>' . esc($title) . '</b>',
        'Город: ' . esc($city),
        'Связь: ' . esc($methodLabel) . ' — ' . esc($contact),
    ];

    $topic = trim((string)($context['topic'] ?? ''));
    if ($topic !== '') {
        $lines[] = 'Вопрос: ' . esc($topic);
    }

    if ($name !== '') {
        $lines[] = 'Имя: ' . esc($name);
    }
    if ($comment !== '') {
        $lines[] = 'Комментарий: ' . esc($comment);
    }

    if (!empty($context['houseId'])) {
        $houseId = (string)$context['houseId'];
        $houseTitle = trim((string)($context['houseTitle'] ?? ''));
        $housePrice = trim((string)($context['housePrice'] ?? ''));
        $houseArea = trim((string)($context['houseArea'] ?? ''));
        $placeParts = [];
        if (!empty($context['houseCity'])) {
            $placeParts[] = (string)$context['houseCity'];
        }
        if (!empty($context['houseDistrict'])) {
            $placeParts[] = (string)$context['houseDistrict'];
        }
        $place = implode(', ', $placeParts);
        $url = trim((string)($context['houseUrl'] ?? ''));
        if ($url === '') {
            $url = 'https://dom-krovservice64.ru/catalog/' . $houseId . '/';
        }

        $bits = [];
        $bits[] = $houseTitle !== '' ? $houseTitle : ('Дом #' . $houseId);
        if ($houseArea !== '') {
            $bits[] = $houseArea . ' м²';
        }
        if ($place !== '') {
            $bits[] = $place;
        }
        if ($housePrice !== '') {
            $bits[] = $housePrice;
        }

        $lines[] = 'Дом: ' . esc(implode(' · ', $bits));
        $lines[] = 'Ссылка: ' . esc($url);
    }

    if (!empty($context['filters'])) {
        $lines[] = 'Фильтры: ' . esc((string)$context['filters']);
    }
    if (!empty($context['calculator'])) {
        $lines[] = 'Калькулятор: ' . esc((string)$context['calculator']);
    }

    $lines[] = 'Сайт: dom-krovservice64.ru';

    return implode("\n", $lines);
}

function extract_house_photo_url(array $data): ?string
{
    $context = is_array($data['context'] ?? null) ? $data['context'] : [];
    $photo = trim((string)($context['housePhotoUrl'] ?? ''));
    if ($photo !== '' && str_starts_with($photo, 'http')) {
        return $photo;
    }
    return null;
}

function telegram_request(string $url, string $payload): bool
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 15,
        ]);
        $response = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($response === false || $code < 200 || $code >= 300) {
            return false;
        }
        $json = json_decode((string)$response, true);
        return is_array($json) && !empty($json['ok']);
    }

    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 15,
        ],
    ]);
    $response = @file_get_contents($url, false, $ctx);
    if ($response === false) {
        return false;
    }
    $json = json_decode($response, true);
    return is_array($json) && !empty($json['ok']);
}

function telegram_send(string $token, string $chatId, string $text): bool
{
    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    return telegram_request($url, (string)$payload);
}

function telegram_send_photo(string $token, string $chatId, string $photoUrl, string $caption): bool
{
    $url = 'https://api.telegram.org/bot' . $token . '/sendPhoto';
    $payload = json_encode([
        'chat_id' => $chatId,
        'photo' => $photoUrl,
        'caption' => $caption,
        'parse_mode' => 'HTML',
    ], JSON_UNESCAPED_UNICODE);

    return telegram_request($url, (string)$payload);
}

/** Фото+подпись или текст; успех если хотя бы одному ушло. */
function telegram_deliver_all(string $token, array $chatIds, string $text, ?string $photoUrl): bool
{
    $ok = false;
    foreach ($chatIds as $chatId) {
        $cid = (string)$chatId;
        $sent = false;
        if ($photoUrl) {
            $sent = telegram_send_photo($token, $cid, $photoUrl, $text);
        }
        if (!$sent) {
            $sent = telegram_send($token, $cid, $text);
        }
        if ($sent) {
            $ok = true;
        }
    }
    return $ok;
}
