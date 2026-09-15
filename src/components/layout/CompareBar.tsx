"use client";

import {
  useCompare,
  getCompareHouses,
} from "@/context/CompareContext";
import { realHouses } from "@/data/houses";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";

export function CompareBar() {
  const { compareIds, clearCompare } = useCompare();

  if (compareIds.length === 0) return null;

  const houses = getCompareHouses(realHouses, compareIds);
  const ready = compareIds.length >= 2;

  return (
    <div className="fixed bottom-[4.5rem] left-0 right-0 z-40 px-4 lg:bottom-6 lg:left-1/2 lg:right-auto lg:w-full lg:max-w-xl lg:-translate-x-1/2 lg:px-0">
      <div className="overflow-hidden rounded-card border border-orange/30 bg-surface shadow-card">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-soft">
              <Icon name="compare" className="h-4 w-4 text-orange" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-text">
                Выбрано {compareIds.length}{" "}
                {compareIds.length === 1
                  ? "дом"
                  : compareIds.length < 5
                    ? "дома"
                    : "домов"}
              </p>
              <p className="truncate text-xs text-muted">
                {houses.map((h) => `Дом ${h.area} м²`).join(" · ")}
              </p>
            </div>
          </div>
          {ready ? (
            <Link
              href={`/compare/?ids=${compareIds.join(",")}`}
              className="btn-primary btn-compact shrink-0"
            >
              Сравнить
            </Link>
          ) : (
            <span className="shrink-0 text-xs font-medium text-muted">
              Выберите ещё дом
            </span>
          )}
          <button
            type="button"
            onClick={clearCompare}
            className="shrink-0 text-xs text-muted hover:text-orange"
            aria-label="Очистить сравнение"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
