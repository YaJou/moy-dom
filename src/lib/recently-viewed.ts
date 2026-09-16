const STORAGE_KEY = "moy-dom-recently-viewed";
const MAX_RECENT = 8;

let cachedIds: number[] = [];
let cachedRaw: string | null = null;

function readIds(): number[] {
  if (typeof window === "undefined") return cachedIds;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedIds;
    cachedRaw = raw;
    if (!raw) {
      cachedIds = [];
      return cachedIds;
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      cachedIds = [];
      return cachedIds;
    }
    cachedIds = parsed
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0);
    return cachedIds;
  } catch {
    cachedIds = [];
    cachedRaw = null;
    return cachedIds;
  }
}

/** Стабильная ссылка, пока localStorage не изменился — важно для useSyncExternalStore. */
export function getRecentlyViewedIds(): number[] {
  return readIds();
}

export function trackHouseView(houseId: number): void {
  if (typeof window === "undefined" || !Number.isFinite(houseId)) return;
  try {
    const prev = readIds().filter((id) => id !== houseId);
    const next = [houseId, ...prev].slice(0, MAX_RECENT);
    const raw = JSON.stringify(next);
    localStorage.setItem(STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedIds = next;
    window.dispatchEvent(new CustomEvent("moy-dom-recently-viewed"));
  } catch {
    /* ignore quota / private mode */
  }
}
