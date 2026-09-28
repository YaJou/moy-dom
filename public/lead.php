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
    log_lead_attempt(null, false, 'invalid_json');
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

$contact = trim((string)($data['contact'] ?? ''));
$city = trim((string)($data['city'] ?? ''));

if ($contact === '') {
    log_lead_attempt($data, false, 'contact_required');
    http_response_code(400);
    echo json_encode(['error' => 'Contact required']);
    exit;
}

if ($city === '') {
    log_lead_attempt($data, false, 'city_required');
    http_response_code(400);
    echo json_encode(['error' => 'City required']);
    exit;
}

$config = load_lead_config();
if ($config === null) {
    log_lead_attempt($data, false, 'not_configured');
    http_response_code(500);
    echo json_encode(['error' => 'Lead handler not configured']);
    exit;
}

$message = format_lead_message($data);
$photoUrl = extract_house_photo_url($data);
$delivery = telegram_deliver_all($config['token'], $config['chat_ids'], $message, $photoUrl);
$sent = !empty($delivery['ok']);
$partial = !empty($delivery['partial']);
$errorCode = '';
if (!$sent) {
    $errorCode = 'telegram_failed';
} elseif ($partial) {
    $errorCode = 'telegram_partial';
}
log_lead_attempt($data, $sent, $errorCode, $message, $delivery);

if (!$sent) {
    http_response_code(500);
    echo json_encode(['error' => 'Telegram send failed', 'telegram' => $delivery['chats'] ?? []]);
    exit;
}

echo json_encode([
    'ok' => true,
    'partial' => $partial,
    'telegram' => $delivery['chats'] ?? [],
]);

/**
 * Пишем все попытки заявок в ~/logs/leads.log —
 * и успешные (в Telegram), и ошибки валидации / отправки.
 *
 * @param array<string,mixed>|null $telegram
 */
function log_lead_attempt(
    ?array $data,
    bool $sent,
    string $error = '',
    string $message = '',
    ?array $telegram = null
): void {
    $home = getenv('HOME') ?: '';
    if ($home === '') {
        $home = dirname((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__), 2);
    }
    $dir = rtrim($home, '/\\') . '/logs';
    if (!is_dir($dir)) {
        @mkdir($dir, 0750, true);
    }

    $data = is_array($data) ? $data : [];
    $context = is_array($data['context'] ?? null) ? $data['context'] : [];

    $line = json_encode(
        [
            'ts' => date('c'),
            'ip' => (string)($_SERVER['REMOTE_ADDR'] ?? ''),
            'ok' => $sent && ($error === '' || $error === 'telegram_partial'),
            'sent' => $sent,
            'partial' => $error === 'telegram_partial',
            'error' => $error,
            'type' => (string)($data['type'] ?? ''),
            'city' => (string)($data['city'] ?? ''),
            'method' => (string)($data['method'] ?? ''),
            'contact' => (string)($data['contact'] ?? ''),
            'name' => (string)($data['name'] ?? ''),
            'comment' => (string)($data['comment'] ?? ''),
            'houseId' => $context['houseId'] ?? null,
            'houseTitle' => (string)($context['houseTitle'] ?? ''),
            'houseUrl' => (string)($context['houseUrl'] ?? ''),
            'topic' => (string)($context['topic'] ?? ''),
            'context' => $context === [] ? new stdClass() : $context,
            'telegram' => $telegram ?? new stdClass(),
            'message_preview' => $message !== ''
                ? mb_substr(strip_tags($message), 0, 400)
                : '',
        ],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    if ($line !== false) {
        @file_put_contents($dir . '/leads.log', $line . "\n", FILE_APPEND | LOCK_EX);
    }
}

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
    } elseif ($type === 'waitlist') {
        $title = 'Подписка: подходящий дом';
    } else {
        $title = 'Заявка с сайта';
    }
    $methodLabel = $method === 'telegram' ? 'Telegram' : 'Телефон';

    $lines = [
        '🏠 <b>' . esc($title) . '</b>',
        'Город: ' . esc($city),
        'Связь: ' . esc($methodLabel) . ' — <code>' . esc($contact) . '</code>',
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

function telegram_request(string $url, string $payload): array
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CONNECTTIMEOUT => 10,
            CURLOPT_TIMEOUT => 25,
        ]);
        $response = curl_exec($ch);
        $code = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlErr = curl_error($ch);
        curl_close($ch);
        $json = is_string($response) ? json_decode($response, true) : null;
        $ok = is_array($json) && !empty($json['ok']);
        return [
            'ok' => $ok,
            'http' => $code,
            'curl_error' => $curlErr,
            'description' => is_array($json) ? (string)($json['description'] ?? '') : '',
        ];
    }

    $ctx = stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 25,
            'ignore_errors' => true,
        ],
    ]);
    $response = @file_get_contents($url, false, $ctx);
    $json = is_string($response) ? json_decode($response, true) : null;
    $ok = is_array($json) && !empty($json['ok']);
    return [
        'ok' => $ok,
        'http' => 0,
        'curl_error' => $response === false ? 'file_get_contents_failed' : '',
        'description' => is_array($json) ? (string)($json['description'] ?? '') : '',
    ];
}

/** До 3 попыток на сетевые сбои Telegram. */
function telegram_request_retry(string $url, string $payload, int $attempts = 3): array
{
    $last = ['ok' => false, 'http' => 0, 'curl_error' => '', 'description' => ''];
    for ($i = 1; $i <= $attempts; $i++) {
        $last = telegram_request($url, $payload);
        $last['attempt'] = $i;
        if (!empty($last['ok'])) {
            return $last;
        }
        // Повторяем только таймауты/сеть, не «chat not found»
        $desc = strtolower((string)($last['description'] ?? ''));
        $curlErr = strtolower((string)($last['curl_error'] ?? ''));
        $retryable =
            $last['http'] === 0
            || str_contains($curlErr, 'timed out')
            || str_contains($curlErr, 'timeout')
            || str_contains($curlErr, 'connection')
            || ($last['http'] >= 500);
        if (!$retryable) {
            return $last;
        }
        usleep(350000 * $i);
    }
    return $last;
}

function telegram_send(string $token, string $chatId, string $text): array
{
    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    return telegram_request_retry($url, (string)$payload);
}

function telegram_send_photo(string $token, string $chatId, string $photoUrl, string $caption): array
{
    // Подпись к фото в Telegram — максимум 1024 символа.
    if (mb_strlen($caption) > 1000) {
        $caption = mb_substr($caption, 0, 1000) . '…';
    }
    $url = 'https://api.telegram.org/bot' . $token . '/sendPhoto';
    $payload = json_encode([
        'chat_id' => $chatId,
        'photo' => $photoUrl,
        'caption' => $caption,
        'parse_mode' => 'HTML',
    ], JSON_UNESCAPED_UNICODE);

    return telegram_request_retry($url, (string)$payload, 2);
}

/**
 * Сначала текст во ВСЕ чаты (с ретраями), фото — дополнительно.
 * ok = текст дошёл хотя бы в один чат.
 * partial = дошёл не во все чаты.
 *
 * @return array{ok:bool,partial:bool,chats:list<array<string,mixed>>}
 */
function telegram_deliver_all(string $token, array $chatIds, string $text, ?string $photoUrl): array
{
    $results = [];
    $okCount = 0;
    $total = 0;

    foreach ($chatIds as $chatId) {
        $cid = trim((string)$chatId);
        if ($cid === '') {
            continue;
        }
        $total++;

        // Текст — основной канал доставки.
        $textResult = telegram_send($token, $cid, $text);
        $chatOk = !empty($textResult['ok']);

        $photoResult = null;
        if ($chatOk && $photoUrl) {
            $photoResult = telegram_send_photo($token, $cid, $photoUrl, $text);
        }

        if ($chatOk) {
            $okCount++;
        }

        $results[] = [
            'chat' => substr($cid, 0, 4) . '…' . substr($cid, -3),
            'text_ok' => $chatOk,
            'photo_ok' => is_array($photoResult) ? !empty($photoResult['ok']) : null,
            'http' => (int)($textResult['http'] ?? 0),
            'error' => (string)(($textResult['curl_error'] ?? '') ?: ($textResult['description'] ?? '')),
            'attempts' => (int)($textResult['attempt'] ?? 1),
        ];
    }

    return [
        'ok' => $okCount > 0,
        'partial' => $okCount > 0 && $okCount < $total,
        'chats' => $results,
    ];
}
