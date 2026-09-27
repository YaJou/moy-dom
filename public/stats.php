<?php
declare(strict_types=1);

/**
 * Закрытая статистика просмотров домов.
 * Пароль: в lead-telegram.php ключ stats_password, либо дефолт ниже.
 */

session_start();

header('X-Robots-Tag: noindex, nofollow');

const DEFAULT_STATS_PASSWORD = 'KrovViews64';

$password = load_stats_password();
$authed = !empty($_SESSION['stats_ok']);

if (isset($_GET['logout'])) {
    $_SESSION = [];
    session_destroy();
    header('Location: /stats.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = (string)($_POST['password'] ?? '');
    if (hash_equals($password, $input)) {
        $_SESSION['stats_ok'] = 1;
        header('Location: /stats.php');
        exit;
    }
    $error = 'Неверный пароль';
    $authed = false;
}

$houses = [];
$totals = ['all' => 0, 'today' => 0, 'yesterday' => 0, 'week' => 0];
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
            'updatedAt' => (string)($row['updatedAt'] ?? ''),
        ];

        $totals['all'] += $total;
        $totals['today'] += $todayCount;
        $totals['yesterday'] += $yesterdayCount;
        $totals['week'] += $weekCount;
    }

    usort($houses, static function (array $a, array $b): int {
        return $b['total'] <=> $a['total'];
    });
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

function load_views_store(): array
{
    $home = getenv('HOME') ?: '';
    if ($home === '') {
        $home = dirname((string)($_SERVER['DOCUMENT_ROOT'] ?? __DIR__), 2);
    }
    $file = rtrim($home, '/\\') . '/logs/house-views.json';
    if (!is_file($file)) {
        return ['houses' => []];
    }
    $raw = file_get_contents($file);
    $data = json_decode(is_string($raw) ? $raw : '', true);
    return is_array($data) ? $data : ['houses' => []];
}

function h(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Просмотры домов — Кров-Сервис</title>
  <style>
    :root {
      --page: #F7F8FA;
      --text: #202522;
      --muted: #68716B;
      --border: #E3E7E3;
      --orange: #F47B20;
      --forest: #203C32;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: Manrope, Arial, sans-serif;
      background: var(--page);
      color: var(--text);
      line-height: 1.45;
    }
    .wrap { width: min(960px, calc(100% - 32px)); margin: 32px auto 64px; }
    h1 { margin: 0 0 8px; font-size: 28px; letter-spacing: -0.5px; }
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
    .error { margin: 12px 0 0; color: #B42318; font-size: 14px; }
    .top {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: space-between;
      align-items: end;
      margin-bottom: 20px;
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
  </style>
</head>
<body>
  <div class="wrap">
<?php if (!$authed): ?>
    <h1>Просмотры домов</h1>
    <p class="lead">Служебная страница. Не для клиентов.</p>
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
        <h1>Просмотры домов</h1>
        <p class="lead">Обновляется при открытии карточки. Повтор с одного устройства за день не считается.</p>
      </div>
      <a class="btn" href="/stats.php?logout=1">Выйти</a>
    </div>

    <div class="kpis">
      <div class="kpi"><b><?= (int)$totals['today'] ?></b><span>Сегодня</span></div>
      <div class="kpi"><b><?= (int)$totals['yesterday'] ?></b><span>Вчера</span></div>
      <div class="kpi"><b><?= (int)$totals['week'] ?></b><span>7 дней</span></div>
      <div class="kpi"><b><?= (int)$totals['all'] ?></b><span>Всего</span></div>
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
  </div>
</body>
</html>
