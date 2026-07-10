"use client";

import type { House } from "@/types/house";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "moy-dom-compare";
export const MAX_COMPARE = 3;

interface CompareContextValue {
  compareIds: number[];
  toggleCompare: (id: number) => boolean;
  isInCompare: (id: number) => boolean;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompareIds(JSON.parse(stored));
      } else {
        const legacy = localStorage.getItem("moy-dom-favorites");
        if (legacy) {
          const ids = JSON.parse(legacy) as number[];
          setCompareIds(ids.slice(0, MAX_COMPARE));
          localStorage.removeItem("moy-dom-favorites");
        }
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
  }, [compareIds, hydrated]);

  const toggleCompare = useCallback((id: number) => {
    let added = false;
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev;
      }
      added = true;
      return [...prev, id];
    });
    return added;
  }, []);

  const isInCompare = useCallback(
    (id: number) => compareIds.includes(id),
    [compareIds]
  );

  const removeFromCompare = useCallback((id: number) => {
    setCompareIds((prev) => prev.filter((item) => item !== id));
  }, []);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  const value = useMemo(
    () => ({
      compareIds,
      toggleCompare,
      isInCompare,
      removeFromCompare,
      clearCompare,
    }),
    [compareIds, toggleCompare, isInCompare, removeFromCompare, clearCompare]
  );

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}

export function getCompareHouses(houses: House[], ids: number[]): House[] {
  return ids
    .map((id) => houses.find((h) => h.id === id))
    .filter((h): h is House => Boolean(h));
}
