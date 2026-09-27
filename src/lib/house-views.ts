/** Отправка просмотра карточки дома на серверный счётчик. */

const SESSION_KEY = "moy-dom-server-viewed";

function alreadyCounted(houseId: number): boolean {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) && parsed.includes(houseId);
  } catch {
    return false;
  }
}

function markCounted(houseId: number): void {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const prev = raw ? (JSON.parse(raw) as unknown) : [];
    const list = Array.isArray(prev) ? prev.filter((id) => id !== houseId) : [];
    list.push(houseId);
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(list.slice(-40)));
  } catch {
    /* private mode */
  }
}

export interface HouseViewPayload {
  houseId: number;
  title: string;
  city: string;
  district: string;
}

export function reportHouseView(payload: HouseViewPayload): void {
  if (typeof window === "undefined") return;
  if (!Number.isFinite(payload.houseId) || payload.houseId < 1) return;
  if (alreadyCounted(payload.houseId)) return;

  markCounted(payload.houseId);

  const body = JSON.stringify({
    houseId: payload.houseId,
    title: payload.title,
    city: payload.city,
    district: payload.district,
  });

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/view.php", blob);
      return;
    }
  } catch {
    /* fall through */
  }

  void fetch("/view.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => {
    /* ignore network errors */
  });
}
