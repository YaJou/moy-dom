<?php
declare(strict_types=1);

/**
 * Закрытая статистика: просмотры домов + заявки с форм.
 * Пароль: в lead-telegram.php ключ stats_password, либо дефолт ниже.
 */

session_start();

header('X-Robots-Tag: noindex, nofollow');

const DEFAULT_STATS_PASSWORD = 'KrovViews64';
const LEADS_LIMIT = 300;

$password = load_stats_password();
$authed = !empty($_SESSION['stats_ok']);

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: /stats.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['password'])) {
    $input = (string)($_POST['password'] ?? '');
    if (hash_equals($password, $input)) {
        $_SESSION['stats_ok'] = 1;
        header('Location: /stats.php');
        exit;
    }
    $error = 'Неверный пароль';
    $authed = false;
}

$tab = (string)($_GET['tab'] ?? 'home');
if (!in_array($tab, ['home', 'leads', 'views'], true)) {
    $tab = 'home';
}
$leadFilter = (string)($_GET['leads'] ?? 'all');
if (!in_array($leadFilter, ['all', 'ok', 'fail'], true)) {
    $leadFilter = 'all';
}

$houses = [];
$viewTotals = ['all' => 0, 'today' => 0, 'yesterday' => 0, 'week' => 0];
$leads = [];
$leadRows = [];
$recentLeads = [];
$leadTotals = [
    'all' => 0,
    'ok' => 0,
    'fail' => 0,
    'today' => 0,
    'today_ok' => 0,
    'today_fail' => 0,
    'week' => 0,
    'week_ok' => 0,
    'week_fail' => 0,
];

$today = date('Y-m-d');
$yesterday = date('Y-m-d', strtotime('-1 day'));
$weekStart = date('Y-m-d', strtotime('-6 days'));
$maxHouseViews = 1;

if ($authed) {
    $store = load_views_store();
    foreach (($store['houses'] ?? []) as $id => $row) {
        if (!is_array($row)) {
            continue;
        }
        $days = is_array($row['days'] ?? null) ? $row['days'] : [];
        $total = (int)($row['total'] ?? 0);
        $todayCount = (int)($days[$today] ?? 0);
        $yesterdayCount = (int)($days[$yesterday] ?? 0);
        $weekCount = 0;
        foreach ($days as $day => $count) {
            if (is_string($day) && $day >= $weekStart) {
                $weekCount += (int)$count;
            }
        }

        $houses[] = [
            'id' => (int)$id,
            'title' => (string)($row['title'] ?? ('Дом #' . $id)),
            'city' => (string)($row['city'] ?? ''),
            'district' => (string)($row['district'] ?? ''),
            'total' => $total,
            'today' => $todayCount,
            'yesterday' => $yesterdayCount,
            'week' => $weekCount,
        ];

        $viewTotals['all'] += $total;
        $viewTotals['today'] += $todayCount;
        $viewTotals['yesterday'] += $yesterdayCount;
        $viewTotals['week'] += $weekCount;
        if ($total > $maxHouseViews) {
            $maxHouseViews = $total;
        }
    }

    usort($houses, static function (array $a, array $b): int {
        if ($b['today'] !== $a['today']) {
            return $b['today'] <=> $a['today'];
        }
        return $b['total'] <=> $a['total'];
    });

    $leads = load_leads_log(LEADS_LIMIT);
    foreach ($leads as $lead) {
        $ok = !empty($lead['ok'])
            || (!empty($lead['sent']) && (empty($lead['error']) || ($lead['error'] ?? '') === 'telegram_partial'));
        $partial = !empty($lead['partial']) || (($lead['error'] ?? '') === 'telegram_partial');
        $day = substr((string)($lead['ts'] ?? ''), 0, 10);

        $leadTotals['all']++;
        if ($ok) {
            $leadTotals['ok']++;
        } else {
            $leadTotals['fail']++;
        }

        if ($day === $today) {
            $leadTotals['today']++;
            if ($ok) {
                $leadTotals['today_ok']++;
            } else {
                $leadTotals['today_fail']++;
            }
        }

        if ($day >= $weekStart) {
            $leadTotals['week']++;
            if ($ok) {
                $leadTotals['week_ok']++;
            } else {
                $leadTotals['week_fail']++;
            }
        }

        $enriched = $lead + ['_ok' => $ok, '_partial' => $partial];
        if (count($recentLeads) < 6) {
            $recentLeads[] = $enriched;
        }

        if ($leadFilter === 'ok' && !$ok) {
            continue;
        }
        if ($leadFilter === 'fail' && $ok) {
            continue;
        }

        $leadRows[] = $enriched;
    }
}

function load_stats_password(): string
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
        if (!is_file($path)) {
            continue;
        }
        $cfg = require $path;
        if (is_array($cfg) && !empty($cfg['stats_password'])) {
            return (string)$cfg['stats_password'];
        }
    }

    return DEFAULT_STATS_PASSWORD;
}

function logs_dir(): string
{
    $home = getenv('HOME') ?: '';
    if ($home === '') {
        $home = dirname((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__), 2);
    }
    return rtrim($home, '/\\') . '/logs';
}

function load_views_store(): array
{
    $file = logs_dir() . '/house-views.json';
    if (!is_file($file)) {
        return ['houses' => []];
    }
    $raw = file_get_contents($file);
    $data = json_decode(is_string($raw) ? $raw : '', true);
    return is_array($data) ? $data : ['houses' => []];
}

function load_leads_log(int $limit): array
{
    $file = logs_dir() . '/leads.log';
    if (!is_file($file)) {
        return [];
    }

    $lines = @file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines) || $lines === []) {
        return [];
    }

    $lines = array_slice($lines, -$limit);
    $rows = [];
    for ($i = count($lines) - 1; $i >= 0; $i--) {
        $row = json_decode($lines[$i], true);
        if (is_array($row)) {
            $rows[] = $row;
        }
    }
    return $rows;
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function lead_type_label(string $type): string
{
    return match ($type) {
        'viewing' => 'Просмотр',
        'callback' => 'Звонок',
        'waitlist' => 'Подписка',
        default => $type !== '' ? $type : 'Заявка',
    };
}

function lead_error_label(string $error): string
{
    return match ($error) {
        'invalid_json' => 'Битый JSON',
        'contact_required' => 'Нет контакта',
        'city_required' => 'Нет города',
        'not_configured' => 'Нет конфига TG',
        'telegram_failed' => 'Telegram не отправил',
        'telegram_partial' => 'Дошло не во все чаты Telegram',
        '' => '',
        default => $error,
    };
}

function format_ts(string $ts): string
{
    if ($ts === '') {
        return '—';
    }
    $t = strtotime($ts);
    if ($t === false) {
        return $ts;
    }
    return date('d.m.Y H:i', $t);
}

function format_rel(string $ts): string
{
    $t = strtotime($ts);
    if ($t === false) {
        return format_ts($ts);
    }
    $diff = time() - $t;
    if ($diff < 60) {
        return 'только что';
    }
    if ($diff < 3600) {
        $m = (int)floor($diff / 60);
        return $m . ' мин назад';
    }
    if ($diff < 86400) {
        $hh = (int)floor($diff / 3600);
        return $hh . ' ч назад';
    }
    if ($diff < 172800) {
        return 'вчера, ' . date('H:i', $t);
    }
    return date('d.m H:i', $t);
}

function lead_house_meta(array $lead): array
{
    $ctx = is_array($lead['context'] ?? null) ? $lead['context'] : [];
    $title = (string)($lead['houseTitle'] ?? ($ctx['houseTitle'] ?? ''));
    $url = (string)($lead['houseUrl'] ?? ($ctx['houseUrl'] ?? ''));
    $id = $lead['houseId'] ?? ($ctx['houseId'] ?? null);
    $topic = (string)($lead['topic'] ?? ($ctx['topic'] ?? ''));
    return [$title, $url, $id, $topic];
}

function render_lead_card(array $lead): void
{
    $ok = !empty($lead['_ok']);
    $partial = !empty($lead['_partial']);
    $err = lead_error_label((string)($lead['error'] ?? ''));
    $method = (string)($lead['method'] ?? '');
    $methodLabel = $method === 'telegram' ? 'Telegram' : ($method === 'phone' ? 'Телефон' : $method);
    [$houseTitle, $houseUrl, $houseId, $topic] = lead_house_meta($lead);
    $name = trim((string)($lead['name'] ?? ''));
    $comment = trim((string)($lead['comment'] ?? ''));
    $contact = (string)($lead['contact'] ?? '');
    $city = (string)($lead['city'] ?? '');
    $ts = (string)($lead['ts'] ?? '');
    $tg = is_array($lead['telegram']['chats'] ?? null) ? $lead['telegram']['chats'] : [];
    $isTest = str_contains($contact, '999 999') || str_contains($contact, '999999');
    $cardClass = $ok ? ($partial ? 'is-partial' : 'is-ok') : 'is-fail';
    ?>
    <article class="lead-card <?= $cardClass ?>" data-search="<?= h(mb_strtolower($contact . ' ' . $name . ' ' . $city . ' ' . $houseTitle . ' ' . $comment . ' ' . $topic)) ?>">
      <div class="lead-card-top">
        <div class="lead-status">
          <?php if ($ok && $partial): ?>
            <span class="pill pill-warn">Частично</span>
          <?php elseif ($ok): ?>
            <span class="pill pill-ok">Успех</span>
          <?php else: ?>
            <span class="pill pill-fail">Ошибка</span>
          <?php endif; ?>
          <span class="pill pill-soft"><?= h(lead_type_label((string)($lead['type'] ?? ''))) ?></span>
          <?php if ($methodLabel !== ''): ?>
            <span class="pill pill-soft"><?= h($methodLabel) ?></span>
          <?php endif; ?>
          <?php if ($isTest): ?>
            <span class="pill pill-warn">Тест</span>
          <?php endif; ?>
        </div>
        <time class="lead-time" title="<?= h(format_ts($ts)) ?>"><?= h(format_rel($ts)) ?></time>
      </div>

      <div class="lead-main">
        <div class="lead-contact-row">
          <div>
            <div class="lead-contact"><?= h($contact !== '' ? $contact : '—') ?></div>
            <?php if ($name !== ''): ?>
              <div class="lead-name"><?= h($name) ?></div>
            <?php endif; ?>
          </div>
          <?php if ($contact !== ''): ?>
            <button type="button" class="copy-btn" data-copy="<?= h($contact) ?>">Копировать</button>
          <?php endif; ?>
        </div>

        <div class="lead-meta">
          <?php if ($city !== ''): ?>
            <span><?= h($city) ?></span>
          <?php endif; ?>
          <?php if ($houseTitle !== '' || $houseId): ?>
            <?php if ($houseUrl !== ''): ?>
              <a href="<?= h($houseUrl) ?>" target="_blank" rel="noopener"><?= h($houseTitle !== '' ? $houseTitle : ('Дом #' . $houseId)) ?></a>
            <?php else: ?>
              <span><?= h($houseTitle !== '' ? $houseTitle : ('Дом #' . $houseId)) ?></span>
            <?php endif; ?>
          <?php endif; ?>
        </div>

        <?php if ($topic !== '' || $comment !== '' || $err !== '' || $tg !== []): ?>
          <div class="lead-notes">
            <?php if ($err !== ''): ?>
              <div class="<?= $partial ? 'lead-warn' : 'lead-error' ?>"><?= h($err) ?></div>
            <?php endif; ?>
            <?php if ($topic !== ''): ?>
              <div><?= h($topic) ?></div>
            <?php endif; ?>
            <?php if ($comment !== ''): ?>
              <div class="muted"><?= h($comment) ?></div>
            <?php endif; ?>
            <?php if ($tg !== []): ?>
              <div class="muted">
                Telegram:
                <?php foreach ($tg as $chat): ?>
                  <?php
                    $chatOk = !empty($chat['text_ok']);
                    $label = (string)($chat['chat'] ?? '?');
                    $chatErr = (string)($chat['error'] ?? '');
                  ?>
                  <span class="<?= $chatOk ? 'tg-ok' : 'tg-fail' ?>">
                    <?= h($label) ?> <?= $chatOk ? '✓' : '✗' ?><?= !$chatOk && $chatErr !== '' ? ' (' . h(mb_substr($chatErr, 0, 40)) . ')' : '' ?>
                  </span>
                <?php endforeach; ?>
              </div>
            <?php endif; ?>
          </div>
        <?php endif; ?>
      </div>
    </article>
    <?php
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Статистика — Кров-Сервис</title>
  <style>
    :root {
      --page: #F3F5F3;
      --surface: #FFFFFF;
      --text: #202522;
      --muted: #68716B;
      --border: #E0E5E1;
      --orange: #F47B20;
      --orange-soft: #FFF1E5;
      --forest: #203C32;
      --forest-2: #2A4F42;
      --ok: #1F7A4D;
      --fail: #B42318;
      --ok-bg: #E7F6EE;
      --fail-bg: #FCEBEB;
      --shadow: 0 10px 30px rgba(32, 37, 34, 0.06);
      --r: 20px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Manrope, "Segoe UI", system-ui, Arial, sans-serif;
      color: var(--text);
      background:
        radial-gradient(1200px 500px at 10% -10%, rgba(244, 123, 32, 0.12), transparent 55%),
        radial-gradient(900px 420px at 100% 0%, rgba(32, 60, 50, 0.10), transparent 50%),
        var(--page);
      line-height: 1.45;
    }
    a { color: var(--forest); }
    .shell { width: min(1120px, calc(100% - 28px)); margin: 0 auto 56px; }
    .topbar {
      margin: 0 -14px 22px;
      padding: 18px 14px;
      background: linear-gradient(135deg, var(--forest), var(--forest-2));
      color: #fff;
      border-radius: 0 0 28px 28px;
      box-shadow: 0 16px 40px rgba(32, 60, 50, 0.22);
    }
    .topbar-inner {
      width: min(1120px, calc(100% - 28px));
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      justify-content: space-between;
      align-items: center;
    }
    .brand-kicker {
      margin: 0 0 4px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(255,255,255,.72);
    }
    .brand-title {
      margin: 0;
      font-size: 28px;
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.6px;
    }
    .brand-sub {
      margin: 6px 0 0;
      color: rgba(255,255,255,.78);
      font-size: 14px;
    }
    .top-actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      padding: 0 16px;
      border-radius: 12px;
      border: 0;
      font: inherit;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }
    .btn-orange { background: var(--orange); color: var(--text); }
    .btn-ghost {
      background: rgba(255,255,255,.12);
      color: #fff;
      border: 1px solid rgba(255,255,255,.22);
    }
    .tabs {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin: 18px 0 0;
    }
    .tab {
      height: 40px;
      padding: 0 16px;
      border-radius: 999px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 700;
      color: rgba(255,255,255,.86);
      background: rgba(255,255,255,.08);
      border: 1px solid rgba(255,255,255,.14);
    }
    .tab.is-active {
      background: #fff;
      color: var(--forest);
      border-color: #fff;
    }
    .tab-count {
      min-width: 22px;
      height: 22px;
      padding: 0 7px;
      border-radius: 999px;
      background: rgba(32,60,50,.1);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    .tab.is-active .tab-count { background: var(--orange-soft); color: var(--text); }
    .tab:not(.is-active) .tab-count { background: rgba(255,255,255,.16); color: #fff; }

    .login-wrap { max-width: 420px; margin: 48px auto; }
    .panel {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--r);
      box-shadow: var(--shadow);
      padding: 22px;
    }
    label { display: block; font-size: 13px; font-weight: 700; margin-bottom: 6px; }
    input[type="password"], input[type="search"] {
      width: 100%;
      height: 48px;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 0 14px;
      font: inherit;
      background: #fff;
    }
    input:focus {
      outline: 3px solid rgba(32, 60, 50, 0.18);
      border-color: var(--forest);
    }
    .error { margin: 12px 0 0; color: var(--fail); font-size: 14px; font-weight: 600; }

    .grid-2 {
      display: grid;
      gap: 16px;
      margin-bottom: 16px;
    }
    @media (min-width: 860px) {
      .grid-2 { grid-template-columns: 1.15fr 0.85fr; }
    }
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: end;
      gap: 12px;
      margin: 8px 0 14px;
    }
    .section-head h2 {
      margin: 0;
      font-size: 20px;
      letter-spacing: -0.3px;
    }
    .section-head p {
      margin: 4px 0 0;
      color: var(--muted);
      font-size: 13px;
    }
    .link-more {
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      color: var(--forest);
      white-space: nowrap;
    }

    .kpis {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    @media (min-width: 720px) {
      .kpis.kpis-4 { grid-template-columns: repeat(4, 1fr); }
    }
    .kpi {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 16px;
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
    }
    .kpi::after {
      content: "";
      position: absolute;
      right: -20px;
      top: -24px;
      width: 84px;
      height: 84px;
      border-radius: 50%;
      background: rgba(244,123,32,.08);
    }
    .kpi-label {
      display: block;
      color: var(--muted);
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .kpi-value {
      display: block;
      font-size: 32px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: -0.8px;
      font-variant-numeric: tabular-nums;
    }
    .kpi-hint {
      display: block;
      margin-top: 8px;
      font-size: 13px;
      color: var(--muted);
    }
    .kpi.is-ok .kpi-value { color: var(--ok); }
    .kpi.is-fail .kpi-value { color: var(--fail); }
    .kpi.is-accent::after { background: rgba(32,60,50,.08); }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: center;
      margin: 0 0 14px;
    }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip {
      height: 36px;
      padding: 0 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .chip.is-active {
      background: var(--forest);
      border-color: var(--forest);
      color: #fff;
    }
    .chip-n {
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      border-radius: 999px;
      background: rgba(255,255,255,.2);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
    }
    .chip:not(.is-active) .chip-n { background: #EEF1EF; }

    .search-wrap { flex: 1; min-width: 220px; }

    .lead-list { display: grid; gap: 12px; }
    .lead-card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 16px 16px 16px 18px;
      box-shadow: var(--shadow);
      border-left: 4px solid var(--border);
    }
    .lead-card.is-ok { border-left-color: var(--ok); }
    .lead-card.is-partial { border-left-color: #C47F17; background: linear-gradient(90deg, #FFF8E8, #fff 40%); }
    .lead-card.is-fail { border-left-color: var(--fail); background: linear-gradient(90deg, #FFF8F8, #fff 40%); }
    .lead-card-top {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: start;
      margin-bottom: 10px;
    }
    .lead-status { display: flex; flex-wrap: wrap; gap: 6px; }
    .pill {
      height: 26px;
      padding: 0 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
    }
    .pill-ok { background: var(--ok-bg); color: var(--ok); }
    .pill-fail { background: var(--fail-bg); color: var(--fail); }
    .pill-warn { background: #FFF1D6; color: #8A5A00; }
    .pill-soft { background: #EEF2EF; color: var(--muted); }
    .lead-time { color: var(--muted); font-size: 12px; font-weight: 600; white-space: nowrap; }
    .lead-contact-row {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: start;
    }
    .lead-contact {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.3px;
      font-variant-numeric: tabular-nums;
    }
    .lead-name { color: var(--muted); font-size: 13px; margin-top: 2px; }
    .copy-btn {
      height: 34px;
      padding: 0 12px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: #fff;
      font: inherit;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      color: var(--forest);
      white-space: nowrap;
    }
    .copy-btn.is-done { background: var(--ok-bg); border-color: #cfe8d8; color: var(--ok); }
    .lead-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 14px;
      margin-top: 10px;
      font-size: 13px;
      color: var(--muted);
    }
    .lead-meta a { font-weight: 700; text-decoration: none; }
    .lead-meta a:hover { text-decoration: underline; }
    .lead-notes {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px dashed var(--border);
      font-size: 13px;
      display: grid;
      gap: 4px;
    }
    .lead-error { color: var(--fail); font-weight: 700; }
    .lead-warn { color: #8A5A00; font-weight: 700; }
    .tg-ok { color: var(--ok); margin-right: 10px; }
    .tg-fail { color: var(--fail); margin-right: 10px; }
    .muted { color: var(--muted); }
    .notice {
      margin: 0 0 16px;
      padding: 14px 16px;
      border-radius: 14px;
      background: #FFF7EA;
      border: 1px solid #F0D7A8;
      color: #6B4E16;
      font-size: 13px;
      line-height: 1.45;
    }

    .house-list { display: grid; gap: 10px; }
    .house-row {
      display: grid;
      gap: 10px;
      padding: 14px;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: var(--shadow);
    }
    @media (min-width: 720px) {
      .house-row {
        grid-template-columns: minmax(0, 1.4fr) minmax(180px, 0.8fr) auto;
        align-items: center;
      }
    }
    .house-title {
      margin: 0;
      font-size: 15px;
      font-weight: 800;
    }
    .house-title a { color: inherit; text-decoration: none; }
    .house-title a:hover { color: var(--forest); text-decoration: underline; }
    .house-place { margin: 4px 0 0; color: var(--muted); font-size: 13px; }
    .bar {
      height: 8px;
      border-radius: 999px;
      background: #E8ECE9;
      overflow: hidden;
    }
    .bar > span {
      display: block;
      height: 100%;
      border-radius: inherit;
      background: linear-gradient(90deg, #F47B20, #ffb067);
    }
    .house-stats {
      display: grid;
      grid-template-columns: repeat(4, minmax(48px, 1fr));
      gap: 8px;
      text-align: center;
    }
    .house-stat b {
      display: block;
      font-size: 18px;
      font-variant-numeric: tabular-nums;
    }
    .house-stat span {
      font-size: 11px;
      color: var(--muted);
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .empty {
      padding: 36px 20px;
      text-align: center;
      color: var(--muted);
      background: #fff;
      border: 1px dashed var(--border);
      border-radius: 18px;
    }
    .footnote {
      margin-top: 16px;
      font-size: 12px;
      color: var(--muted);
    }
    .hide { display: none !important; }
  </style>
</head>
<body>
<?php if (!$authed): ?>
  <div class="topbar">
    <div class="topbar-inner">
      <div>
        <p class="brand-kicker">Кров-Сервис</p>
        <h1 class="brand-title">Статистика сайта</h1>
        <p class="brand-sub">Заявки и просмотры домов</p>
      </div>
    </div>
  </div>
  <div class="shell login-wrap">
    <div class="panel">
      <form method="post" action="/stats.php">
        <label for="password">Пароль</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required>
        <div style="margin-top:16px">
          <button class="btn btn-orange" type="submit" style="width:100%">Войти</button>
        </div>
        <?php if ($error !== ''): ?>
          <p class="error"><?= h($error) ?></p>
        <?php endif; ?>
      </form>
    </div>
  </div>
<?php else: ?>
  <div class="topbar">
    <div class="topbar-inner">
      <div>
        <p class="brand-kicker">Кров-Сервис · служебная панель</p>
        <h1 class="brand-title">Статистика</h1>
        <p class="brand-sub"><?= h(date('d.m.Y')) ?> · заявки и просмотры в одном месте</p>
      </div>
      <div class="top-actions">
        <a class="btn btn-ghost" href="/" target="_blank" rel="noopener">На сайт</a>
        <a class="btn btn-orange" href="/stats.php?logout=1">Выйти</a>
      </div>
    </div>
    <div class="topbar-inner" style="padding-top:0">
      <nav class="tabs" aria-label="Разделы">
        <a class="tab <?= $tab === 'home' ? 'is-active' : '' ?>" href="/stats.php?tab=home">Обзор</a>
        <a class="tab <?= $tab === 'leads' ? 'is-active' : '' ?>" href="/stats.php?tab=leads">
          Заявки <span class="tab-count"><?= (int)$leadTotals['today'] ?></span>
        </a>
        <a class="tab <?= $tab === 'views' ? 'is-active' : '' ?>" href="/stats.php?tab=views">
          Просмотры <span class="tab-count"><?= (int)$viewTotals['today'] ?></span>
        </a>
      </nav>
    </div>
  </div>

  <div class="shell">

<?php if ($tab === 'home'): ?>
    <div class="section-head">
      <div>
        <h2>Сегодня</h2>
        <p>Быстрый срез по заявкам и просмотрам</p>
      </div>
    </div>
    <div class="kpis kpis-4" style="margin-bottom:18px">
      <div class="kpi is-ok">
        <span class="kpi-label">Заявки сегодня</span>
        <span class="kpi-value"><?= (int)$leadTotals['today'] ?></span>
        <span class="kpi-hint">успех <?= (int)$leadTotals['today_ok'] ?> · ошибки <?= (int)$leadTotals['today_fail'] ?></span>
      </div>
      <div class="kpi is-fail">
        <span class="kpi-label">Ошибки сегодня</span>
        <span class="kpi-value"><?= (int)$leadTotals['today_fail'] ?></span>
        <span class="kpi-hint">за 7 дней: <?= (int)$leadTotals['week_fail'] ?></span>
      </div>
      <div class="kpi is-accent">
        <span class="kpi-label">Просмотры сегодня</span>
        <span class="kpi-value"><?= (int)$viewTotals['today'] ?></span>
        <span class="kpi-hint">вчера <?= (int)$viewTotals['yesterday'] ?></span>
      </div>
      <div class="kpi">
        <span class="kpi-label">За 7 дней</span>
        <span class="kpi-value"><?= (int)$leadTotals['week'] ?></span>
        <span class="kpi-hint">заявок · просмотров <?= (int)$viewTotals['week'] ?></span>
      </div>
    </div>

    <div class="grid-2">
      <section>
        <div class="section-head">
          <div>
            <h2>Последние заявки</h2>
            <p>Новые сверху</p>
          </div>
          <a class="link-more" href="/stats.php?tab=leads">Все заявки →</a>
        </div>
        <?php if ($recentLeads === []): ?>
          <div class="empty">Заявок пока нет</div>
        <?php else: ?>
          <div class="lead-list">
            <?php foreach ($recentLeads as $lead) {
                render_lead_card($lead);
            } ?>
          </div>
        <?php endif; ?>
      </section>

      <section>
        <div class="section-head">
          <div>
            <h2>Топ домов сегодня</h2>
            <p>По уникальным просмотрам</p>
          </div>
          <a class="link-more" href="/stats.php?tab=views">Все просмотры →</a>
        </div>
        <?php if ($houses === []): ?>
          <div class="empty">Просмотров пока нет</div>
        <?php else: ?>
          <div class="house-list">
            <?php foreach (array_slice($houses, 0, 5) as $house): ?>
              <?php
                $place = trim($house['city'] . ($house['district'] !== '' ? ', ' . $house['district'] : ''));
                $pct = max(6, (int)round(($house['total'] / $maxHouseViews) * 100));
              ?>
              <div class="house-row">
                <div>
                  <h3 class="house-title">
                    <a href="/catalog/<?= (int)$house['id'] ?>/" target="_blank" rel="noopener">
                      #<?= (int)$house['id'] ?> · <?= h($house['title']) ?>
                    </a>
                  </h3>
                  <?php if ($place !== ''): ?>
                    <p class="house-place"><?= h($place) ?></p>
                  <?php endif; ?>
                  <div class="bar" style="margin-top:10px"><span style="width:<?= $pct ?>%"></span></div>
                </div>
                <div class="house-stats">
                  <div class="house-stat"><b><?= (int)$house['today'] ?></b><span>Сегодня</span></div>
                  <div class="house-stat"><b><?= (int)$house['week'] ?></b><span>7 дней</span></div>
                  <div class="house-stat"><b><?= (int)$house['total'] ?></b><span>Всего</span></div>
                  <div class="house-stat"><b><?= (int)$house['yesterday'] ?></b><span>Вчера</span></div>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </section>
    </div>

<?php elseif ($tab === 'leads'): ?>
    <div class="section-head">
      <div>
        <h2>Заявки с форм</h2>
        <p>Успех = сервер принял и отправил в Telegram. Метрику «Отправка формы» не смотрите — там клики, не реальные заявки.</p>
      </div>
    </div>
    <div class="notice">
      Правда по заявкам — только эта страница и Telegram.
      В Яндекс.Метрике цель «Отправка формы» сейчас завышена (сотни), потому что считает не доставку в бот, а события на сайте.
      Для Метрики заведите JavaScript-цель <b>lead_success</b> — она срабатывает только после реального ответа сервера.
    </div>

    <div class="kpis kpis-4" style="margin-bottom:16px">
      <div class="kpi"><span class="kpi-label">Сегодня</span><span class="kpi-value"><?= (int)$leadTotals['today'] ?></span></div>
      <div class="kpi is-ok"><span class="kpi-label">Успех сегодня</span><span class="kpi-value"><?= (int)$leadTotals['today_ok'] ?></span></div>
      <div class="kpi is-fail"><span class="kpi-label">Ошибки сегодня</span><span class="kpi-value"><?= (int)$leadTotals['today_fail'] ?></span></div>
      <div class="kpi"><span class="kpi-label">За 7 дней</span><span class="kpi-value"><?= (int)$leadTotals['week'] ?></span><span class="kpi-hint">успех <?= (int)$leadTotals['week_ok'] ?> · ошибки <?= (int)$leadTotals['week_fail'] ?></span></div>
    </div>

    <div class="toolbar">
      <div class="chips">
        <a class="chip <?= $leadFilter === 'all' ? 'is-active' : '' ?>" href="/stats.php?tab=leads&leads=all">Все <span class="chip-n"><?= (int)$leadTotals['all'] ?></span></a>
        <a class="chip <?= $leadFilter === 'ok' ? 'is-active' : '' ?>" href="/stats.php?tab=leads&leads=ok">Успешные <span class="chip-n"><?= (int)$leadTotals['ok'] ?></span></a>
        <a class="chip <?= $leadFilter === 'fail' ? 'is-active' : '' ?>" href="/stats.php?tab=leads&leads=fail">Ошибки <span class="chip-n"><?= (int)$leadTotals['fail'] ?></span></a>
      </div>
      <div class="search-wrap">
        <input id="lead-search" type="search" placeholder="Поиск: телефон, имя, город, дом…" autocomplete="off">
      </div>
    </div>

    <?php if ($leadRows === []): ?>
      <div class="empty">Заявок пока нет<?= $leadFilter !== 'all' ? ' в этом фильтре' : '' ?>.</div>
    <?php else: ?>
      <div class="lead-list" id="lead-list">
        <?php foreach ($leadRows as $lead) {
            render_lead_card($lead);
        } ?>
      </div>
      <p class="footnote" id="lead-empty" hidden>Ничего не найдено по запросу.</p>
      <p class="footnote">Показаны последние <?= (int)LEADS_LIMIT ?> записей.</p>
    <?php endif; ?>

<?php else: ?>
    <div class="section-head">
      <div>
        <h2>Просмотры домов</h2>
        <p>Уникально с устройства за день · обновляется при открытии карточки</p>
      </div>
    </div>

    <div class="kpis kpis-4" style="margin-bottom:16px">
      <div class="kpi is-accent"><span class="kpi-label">Сегодня</span><span class="kpi-value"><?= (int)$viewTotals['today'] ?></span></div>
      <div class="kpi"><span class="kpi-label">Вчера</span><span class="kpi-value"><?= (int)$viewTotals['yesterday'] ?></span></div>
      <div class="kpi"><span class="kpi-label">7 дней</span><span class="kpi-value"><?= (int)$viewTotals['week'] ?></span></div>
      <div class="kpi"><span class="kpi-label">Всего</span><span class="kpi-value"><?= (int)$viewTotals['all'] ?></span></div>
    </div>

    <?php if ($houses === []): ?>
      <div class="empty">Пока нет просмотров.</div>
    <?php else: ?>
      <div class="house-list">
        <?php foreach ($houses as $house): ?>
          <?php
            $place = trim($house['city'] . ($house['district'] !== '' ? ', ' . $house['district'] : ''));
            $pct = max(6, (int)round(($house['total'] / $maxHouseViews) * 100));
          ?>
          <div class="house-row">
            <div>
              <h3 class="house-title">
                <a href="/catalog/<?= (int)$house['id'] ?>/" target="_blank" rel="noopener">
                  #<?= (int)$house['id'] ?> · <?= h($house['title']) ?>
                </a>
              </h3>
              <?php if ($place !== ''): ?>
                <p class="house-place"><?= h($place) ?></p>
              <?php endif; ?>
              <div class="bar" style="margin-top:10px"><span style="width:<?= $pct ?>%"></span></div>
            </div>
            <div class="house-stats">
              <div class="house-stat"><b><?= (int)$house['today'] ?></b><span>Сегодня</span></div>
              <div class="house-stat"><b><?= (int)$house['yesterday'] ?></b><span>Вчера</span></div>
              <div class="house-stat"><b><?= (int)$house['week'] ?></b><span>7 дней</span></div>
              <div class="house-stat"><b><?= (int)$house['total'] ?></b><span>Всего</span></div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
<?php endif; ?>

  </div>

  <script>
    (function () {
      var search = document.getElementById('lead-search');
      var list = document.getElementById('lead-list');
      var empty = document.getElementById('lead-empty');
      if (search && list) {
        search.addEventListener('input', function () {
          var q = (search.value || '').trim().toLowerCase();
          var cards = list.querySelectorAll('.lead-card');
          var visible = 0;
          cards.forEach(function (card) {
            var hay = card.getAttribute('data-search') || '';
            var show = !q || hay.indexOf(q) !== -1;
            card.classList.toggle('hide', !show);
            if (show) visible += 1;
          });
          if (empty) empty.hidden = visible > 0;
        });
      }

      document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          var value = btn.getAttribute('data-copy') || '';
          if (!value) return;
          var done = function () {
            btn.textContent = 'Скопировано';
            btn.classList.add('is-done');
            setTimeout(function () {
              btn.textContent = 'Копировать';
              btn.classList.remove('is-done');
            }, 1200);
          };
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value).then(done).catch(function () {
              window.prompt('Скопируйте контакт', value);
            });
          } else {
            window.prompt('Скопируйте контакт', value);
          }
        });
      });
    })();
  </script>
<?php endif; ?>
</body>
</html>
