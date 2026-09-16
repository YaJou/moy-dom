"use client";

import {
  getRecentlyViewedIds,
  trackHouseView as track,
} from "@/lib/recently-viewed";
import { useCallback, useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const handler = () => onStoreChange();
  window.addEventListener("moy-dom-recently-viewed", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("moy-dom-recently-viewed", handler);
    window.removeEventListener("storage", handler);
  };
}

export function useRecentlyViewed() {
  const ids = useSyncExternalStore(
    subscribe,
    getRecentlyViewedIds,
    () => [] as number[]
  );

  const trackHouseView = useCallback((houseId: number) => {
    track(houseId);
  }, []);

  return { recentlyViewedIds: ids, trackHouseView };
}
