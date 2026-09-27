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

$tab = (string)($_GET['tab'] ?? 'leads');
if ($tab !== 'views' && $tab !== 'leads') {
    $tab = 'leads';
}
$leadFilter = (string)($_GET['leads'] ?? 'all');
if (!in_array($leadFilter, ['all', 'ok', 'fail'], true)) {
    $leadFilter = 'all';
}

$houses = [];
$viewTotals = ['all' => 0, 'today' => 0, 'yesterday' => 0, 'week' => 0];
$leads = [];
$leadRows = [];
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
    }

    usort($houses, static function (array $a, array $b): int {
        return $b['total'] <=> $a['total'];
    });

    $leads = load_leads_log(LEADS_LIMIT);
    foreach ($leads as $lead) {
        $ok = !empty($lead['ok']) || (!empty($lead['sent']) && empty($lead['error']));
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

        if ($leadFilter === 'ok' && !$ok) {
            continue;
        }
        if ($leadFilter === 'fail' && $ok) {
            continue;
        }

        $leadRows[] = $lead + ['_ok' => $ok];
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

/** Читаем хвост leads.log (новые сверху). */
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

?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Статистика сайта — Кров-Сервис</title>
  <style>
    :root {
      --page: #F7F8FA;
      --text: #202522;
      --muted: #68716B;
      --border: #E3E7E3;
      --orange: #F47B20;
      --forest: #203C32;
      --ok: #2D6A49;
      --fail: #B42318;
      --ok-bg: #E8F5EE;
      --fail-bg: #FCECEC;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Manrope, Arial, sans-serif;
      background: var(--page);
      color: var(--text);
      line-height: 1.45;
    }
    .wrap { width: min(1100px, calc(100% - 32px)); margin: 32px auto 64px; }
    h1 { margin: 0 0 8px; font-size: 28px; letter-spacing: -0.5px; }
    h2 { margin: 0 0 12px; font-size: 22px; letter-spacing: -0.3px; }
    .lead { margin: 0 0 24px; color: var(--muted); }
    .card {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px;
    }
    label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
    input[type="password"] {
      width: 100%;
      height: 48px;
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 0 14px;
      font: inherit;
    }
    button, .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 48px;
      padding: 0 20px;
      border: 0;
      border-radius: 12px;
      background: var(--orange);
      color: var(--text);
      font: inherit;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
    }
    .btn-ghost {
      background: #fff;
      border: 1px solid var(--border);
    }
    .error { margin: 12px 0 0; color: var(--fail); font-size: 14px; }
    .top {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 20px;
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }
    .tab {
      height: 40px;
      padding: 0 16px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--text);
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
    }
    .tab.is-active {
      background: var(--forest);
      border-color: var(--forest);
      color: #fff;
    }
    .filters {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 0 0 16px;
    }
    .chip {
      height: 36px;
      padding: 0 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: #fff;
      color: var(--text);
      text-decoration: none;
      font-size: 13px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
    }
    .chip.is-active {
      background: var(--orange);
      border-color: var(--orange);
    }
    .kpis {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin-bottom: 20px;
    }
    @media (min-width: 720px) {
      .kpis { grid-template-columns: repeat(4, 1fr); }
    }
    .kpi {
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
    }
    .kpi b { display: block; font-size: 28px; letter-spacing: -0.5px; }
    .kpi span { color: var(--muted); font-size: 13px; }
    .kpi.is-ok b { color: var(--ok); }
    .kpi.is-fail b { color: var(--fail); }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
    }
    th, td {
      padding: 12px 14px;
      text-align: left;
      border-bottom: 1px solid var(--border);
      font-size: 14px;
      vertical-align: top;
    }
    th {
      background: #f1f4f2;
      color: var(--muted);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    tr:last-child td { border-bottom: 0; }
    .num { font-variant-numeric: tabular-nums; font-weight: 700; }
    .muted { color: var(--muted); }
    a.link { color: var(--forest); font-weight: 600; text-decoration: none; }
    a.link:hover { text-decoration: underline; }
    .empty { padding: 28px; text-align: center; color: var(--muted); }
    .badge {
      display: inline-flex;
      align-items: center;
      height: 26px;
      padding: 0 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
    }
    .badge-ok { background: #E8F5EE; color: var(--ok); }
    .badge-fail { background: #FCECEC; color: var(--fail); }
    .contact { font-family: ui-monospace, Consolas, monospace; font-size: 13px; }
    .section-gap { margin-top: 28px; }
  </style>
</head>
<body>
  <div class="wrap">
<?php if (!$authed): ?>
    <h1>Статистика сайта</h1>
    <p class="lead">Заявки и просмотры домов. Служебная страница.</p>
    <div class="card">
      <form method="post" action="/stats.php">
        <label for="password">Пароль</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required>
        <div style="margin-top:16px">
          <button type="submit">Войти</button>
        </div>
        <?php if ($error !== ''): ?>
          <p class="error"><?= h($error) ?></p>
        <?php endif; ?>
      </form>
    </div>
<?php else: ?>
    <div class="top">
      <div>
        <h1>Статистика сайта</h1>
        <p class="lead">Заявки с форм и просмотры карточек домов.</p>
      </div>
      <a class="btn btn-ghost" href="/stats.php?logout=1">Выйти</a>
    </div>

    <nav class="tabs">
      <a class="tab <?= $tab === 'leads' ? 'is-active' : '' ?>" href="/stats.php?tab=leads">Заявки</a>
      <a class="tab <?= $tab === 'views' ? 'is-active' : '' ?>" href="/stats.php?tab=views">Просмотры домов</a>
    </nav>

<?php if ($tab === 'leads'): ?>
    <div class="kpis">
      <div class="kpi"><b><?= (int)$leadTotals['today'] ?></b><span>Сегодня всего</span></div>
      <div class="kpi is-ok"><b><?= (int)$leadTotals['today_ok'] ?></b><span>Сегодня успешные</span></div>
      <div class="kpi is-fail"><b><?= (int)$leadTotals['today_fail'] ?></b><span>Сегодня ошибки</span></div>
      <div class="kpi"><b><?= (int)$leadTotals['week'] ?></b><span>За 7 дней</span></div>
    </div>
    <div class="kpis">
      <div class="kpi is-ok"><b><?= (int)$leadTotals['week_ok'] ?></b><span>7 дней · успех</span></div>
      <div class="kpi is-fail"><b><?= (int)$leadTotals['week_fail'] ?></b><span>7 дней · ошибки</span></div>
      <div class="kpi is-ok"><b><?= (int)$leadTotals['ok'] ?></b><span>Всего успешных</span></div>
      <div class="kpi is-fail"><b><?= (int)$leadTotals['fail'] ?></b><span>Всего ошибок</span></div>
    </div>

    <div class="filters">
      <a class="chip <?= $leadFilter === 'all' ? 'is-active' : '' ?>" href="/stats.php?tab=leads&leads=all">Все</a>
      <a class="chip <?= $leadFilter === 'ok' ? 'is-active' : '' ?>" href="/stats.php?tab=leads&leads=ok">Успешные</a>
      <a class="chip <?= $leadFilter === 'fail' ? 'is-active' : '' ?>" href="/stats.php?tab=leads&leads=fail">Неуспешные</a>
    </div>

    <?php if ($leadRows === []): ?>
      <div class="card empty">Заявок пока нет<?= $leadFilter !== 'all' ? ' в этом фильтре' : '' ?>.</div>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Когда</th>
            <th>Статус</th>
            <th>Тип</th>
            <th>Контакт</th>
            <th>Город / дом</th>
            <th>Детали</th>
          </tr>
        </thead>
        <tbody>
        <?php foreach ($leadRows as $lead): ?>
          <?php
            $ok = !empty($lead['_ok']);
            $err = lead_error_label((string)($lead['error'] ?? ''));
            $method = (string)($lead['method'] ?? '');
            $methodLabel = $method === 'telegram' ? 'TG' : ($method === 'phone' ? 'Тел' : $method);
            $houseTitle = (string)($lead['houseTitle'] ?? '');
            if ($houseTitle === '' && is_array($lead['context'] ?? null)) {
                $houseTitle = (string)(($lead['context']['houseTitle'] ?? ''));
            }
            $houseUrl = (string)($lead['houseUrl'] ?? '');
            if ($houseUrl === '' && is_array($lead['context'] ?? null)) {
                $houseUrl = (string)(($lead['context']['houseUrl'] ?? ''));
            }
            $houseId = $lead['houseId'] ?? ($lead['context']['houseId'] ?? null);
            $topic = (string)($lead['topic'] ?? '');
            if ($topic === '' && is_array($lead['context'] ?? null)) {
                $topic = (string)(($lead['context']['topic'] ?? ''));
            }
            $name = trim((string)($lead['name'] ?? ''));
            $comment = trim((string)($lead['comment'] ?? ''));
          ?>
          <tr>
            <td>
              <div class="num"><?= h(format_ts((string)($lead['ts'] ?? ''))) ?></div>
              <?php if (!empty($lead['ip'])): ?>
                <div class="muted" style="font-size:12px"><?= h((string)$lead['ip']) ?></div>
              <?php endif; ?>
            </td>
            <td>
              <?php if ($ok): ?>
                <span class="badge badge-ok">Успех</span>
              <?php else: ?>
                <span class="badge badge-fail">Ошибка</span>
                <?php if ($err !== ''): ?>
                  <div class="muted" style="margin-top:6px;font-size:12px"><?= h($err) ?></div>
                <?php endif; ?>
              <?php endif; ?>
            </td>
            <td>
              <?= h(lead_type_label((string)($lead['type'] ?? ''))) ?>
              <?php if ($methodLabel !== ''): ?>
                <div class="muted" style="font-size:12px"><?= h($methodLabel) ?></div>
              <?php endif; ?>
            </td>
            <td>
              <div class="contact"><?= h((string)($lead['contact'] ?? '—')) ?></div>
              <?php if ($name !== ''): ?>
                <div class="muted" style="font-size:12px"><?= h($name) ?></div>
              <?php endif; ?>
            </td>
            <td>
              <div><?= h((string)($lead['city'] ?? '—')) ?></div>
              <?php if ($houseTitle !== '' || $houseId): ?>
                <div style="margin-top:4px">
                  <?php if ($houseUrl !== ''): ?>
                    <a class="link" href="<?= h($houseUrl) ?>" target="_blank" rel="noopener">
                      <?= h($houseTitle !== '' ? $houseTitle : ('Дом #' . $houseId)) ?>
                    </a>
                  <?php else: ?>
                    <span class="muted"><?= h($houseTitle !== '' ? $houseTitle : ('Дом #' . $houseId)) ?></span>
                  <?php endif; ?>
                </div>
              <?php endif; ?>
            </td>
            <td>
              <?php if ($topic !== ''): ?>
                <div><?= h($topic) ?></div>
              <?php endif; ?>
              <?php if ($comment !== ''): ?>
                <div class="muted" style="margin-top:4px"><?= h($comment) ?></div>
              <?php endif; ?>
              <?php if ($topic === '' && $comment === ''): ?>
                <span class="muted">—</span>
              <?php endif; ?>
            </td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
      <p class="muted section-gap" style="font-size:13px">
        Показаны последние <?= (int)LEADS_LIMIT ?> записей из лога. Успех = ушло в Telegram.
      </p>
    <?php endif; ?>

<?php else: ?>
    <div class="kpis">
      <div class="kpi"><b><?= (int)$viewTotals['today'] ?></b><span>Сегодня</span></div>
      <div class="kpi"><b><?= (int)$viewTotals['yesterday'] ?></b><span>Вчера</span></div>
      <div class="kpi"><b><?= (int)$viewTotals['week'] ?></b><span>7 дней</span></div>
      <div class="kpi"><b><?= (int)$viewTotals['all'] ?></b><span>Всего</span></div>
    </div>

    <?php if ($houses === []): ?>
      <div class="card empty">Пока нет просмотров. Откройте любую карточку дома на сайте.</div>
    <?php else: ?>
      <table>
        <thead>
          <tr>
            <th>Дом</th>
            <th>Сегодня</th>
            <th>Вчера</th>
            <th>7 дней</th>
            <th>Всего</th>
          </tr>
        </thead>
        <tbody>
        <?php foreach ($houses as $house): ?>
          <?php
            $place = trim($house['city'] . ($house['district'] !== '' ? ', ' . $house['district'] : ''));
            $url = '/catalog/' . $house['id'] . '/';
          ?>
          <tr>
            <td>
              <a class="link" href="<?= h($url) ?>" target="_blank" rel="noopener">
                #<?= (int)$house['id'] ?> · <?= h($house['title']) ?>
              </a>
              <?php if ($place !== ''): ?>
                <div class="muted"><?= h($place) ?></div>
              <?php endif; ?>
            </td>
            <td class="num"><?= (int)$house['today'] ?></td>
            <td class="num"><?= (int)$house['yesterday'] ?></td>
            <td class="num"><?= (int)$house['week'] ?></td>
            <td class="num"><?= (int)$house['total'] ?></td>
          </tr>
        <?php endforeach; ?>
        </tbody>
      </table>
    <?php endif; ?>
<?php endif; ?>
<?php endif; ?>
  </div>
</body>
</html>
