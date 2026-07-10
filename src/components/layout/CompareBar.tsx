"use client";

import {
  MAX_COMPARE,
  useCompare,
  getCompareHouses,
} from "@/context/CompareContext";
import { realHouses } from "@/data/houses";
import { GitCompareArrows } from "lucide-react";
import Link from "next/link";

export function CompareBar() {
  const { compareIds, clearCompare } = useCompare();

  if (compareIds.length === 0) return null;

  const houses = getCompareHouses(realHouses, compareIds);

  return (
    <div className="fixed bottom-[4.5rem] left-0 right-0 z-40 px-4 lg:bottom-6 lg:left-auto lg:right-6 lg:max-w-sm lg:px-0">
      <div className="overflow-hidden rounded-card border border-primary/30 bg-white shadow-card">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-light">
              <GitCompareArrows className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-dark">
                Сравнение {compareIds.length}/{MAX_COMPARE}
              </p>
              <p className="truncate text-xs text-gray">
                {houses.map((h) => h.title.replace("Дом ", "")).join(" · ")}
              </p>
            </div>
          </div>
          <Link
            href={`/compare?ids=${compareIds.join(",")}`}
            className="shrink-0 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-hover sm:text-sm"
          >
            Сравнить
          </Link>
          <button
            type="button"
            onClick={clearCompare}
            className="shrink-0 text-xs text-gray hover:text-primary"
            aria-label="Очистить сравнение"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
