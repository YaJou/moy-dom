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
$sent = telegram_send_all($config['token'], $config['chat_ids'], $message);

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

function format_lead_message(array $data): string
{
    $type = trim((string)($data['type'] ?? 'viewing'));
    $city = trim((string)($data['city'] ?? ''));
    $method = trim((string)($data['method'] ?? 'phone'));
    $contact = trim((string)($data['contact'] ?? ''));
    $name = trim((string)($data['name'] ?? ''));
    $comment = trim((string)($data['comment'] ?? ''));
    $context = is_array($data['context'] ?? null) ? $data['context'] : [];

    $title = $type === 'viewing' ? 'Заявка на просмотр' : 'Заявка с сайта';
    $methodLabel = $method === 'telegram' ? 'Telegram' : 'Телефон';

    $lines = [
        '🏠 <b>' . esc($title) . '</b>',
        'Город: ' . esc($city),
        'Связь: ' . esc($methodLabel) . ' — ' . esc($contact),
    ];

    if ($name !== '') {
        $lines[] = 'Имя: ' . esc($name);
    }
    if ($comment !== '') {
        $lines[] = 'Комментарий: ' . esc($comment);
    }

    if (!empty($context['houseId'])) {
        $houseId = (string)$context['houseId'];
        $url = trim((string)($context['houseUrl'] ?? ''));
        if ($url === '') {
            $url = 'https://dom-krovservice64.ru/catalog/' . $houseId . '/';
        }
        $lines[] = 'Дом: #' . esc($houseId) . ' — ' . esc($url);
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

function telegram_send(string $token, string $chatId, string $text): bool
{
    $url = 'https://api.telegram.org/bot' . $token . '/sendMessage';
    $payload = json_encode([
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true,
    ], JSON_UNESCAPED_UNICODE);

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $payload,
            CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
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
            'timeout' => 10,
        ],
    ]);
    $response = @file_get_contents($url, false, $ctx);
    if ($response === false) {
        return false;
    }
    $json = json_decode($response, true);
    return is_array($json) && !empty($json['ok']);
}

/** Отправляет всем получателям; успех если хотя бы одному ушло. */
function telegram_send_all(string $token, array $chatIds, string $text): bool
{
    $ok = false;
    foreach ($chatIds as $chatId) {
        if (telegram_send($token, (string)$chatId, $text)) {
            $ok = true;
        }
    }
    return $ok;
}
