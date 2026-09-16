const STORAGE_KEY = "moy-dom-recently-viewed";
const MAX_RECENT = 8;

export function getRecentlyViewedIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id) && id > 0);
  } catch {
    return [];
  }
}

export function trackHouseView(houseId: number): void {
  if (typeof window === "undefined" || !Number.isFinite(houseId)) return;
  try {
    const prev = getRecentlyViewedIds().filter((id) => id !== houseId);
    const next = [houseId, ...prev].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("moy-dom-recently-viewed"));
  } catch {
    /* ignore quota / private mode */
  }
}

export function useRecentlyViewedIds(): number[] {
  // Imported only from client components — call useSyncExternalStore there
  return getRecentlyViewedIds();
}
