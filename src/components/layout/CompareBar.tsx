"use client";

import { useFavorites, getFavoriteHouses } from "@/context/FavoritesContext";
import { realHouses } from "@/data/houses";
import { formatPrice } from "@/lib/utils";
import { GitCompareArrows, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function CompareBar() {
  const { favorites, clearFavorites } = useFavorites();
  const [expanded, setExpanded] = useState(false);

  if (favorites.length === 0) return null;

  const houses = getFavoriteHouses(realHouses, favorites).slice(0, 3);

  return (
    <div className="fixed bottom-20 left-4 right-4 z-40 lg:bottom-6 lg:left-auto lg:right-6 lg:w-96">
      <div className="overflow-hidden rounded-card border border-border bg-white shadow-card">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex w-full items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <GitCompareArrows className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-dark">
              Сравнение ({favorites.length})
            </span>
          </div>
          <span className="text-xs text-gray">{expanded ? "Свернуть" : "Развернуть"}</span>
        </button>

        {expanded && (
          <div className="border-t border-border px-4 pb-4">
            <ul className="space-y-2 py-3">
              {houses.map((house) => (
                <li key={house.id} className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium text-dark">{house.title}</span>
                  <span className="ml-2 shrink-0 text-gray">{formatPrice(house.price)}</span>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <Link
                href={`/catalog?compare=${favorites.join(",")}`}
                className="flex-1 rounded-xl bg-primary py-2 text-center text-xs font-semibold text-white hover:bg-primary-hover"
              >
                Сравнить
              </Link>
              <button
                type="button"
                onClick={clearFavorites}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-border text-gray hover:text-primary"
                aria-label="Очистить"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
