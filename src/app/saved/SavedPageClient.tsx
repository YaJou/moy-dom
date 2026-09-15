"use client";

import { CatalogHouseCard } from "@/components/cards/CatalogHouseCard";
import {
  getFavoriteHouses,
  useFavorites,
} from "@/context/FavoritesContext";
import { realHouses } from "@/data/houses";
import { Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

export function SavedPageClient() {
  const { favorites, clearFavorites } = useFavorites();
  const searchParams = useSearchParams();
  const [shareHint, setShareHint] = useState(false);

  const sharedIds = useMemo(() => {
    const raw = searchParams.get("ids") ?? "";
    return raw
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n) && n > 0);
  }, [searchParams]);

  const ids = sharedIds.length > 0 ? sharedIds : favorites;
  const houses = getFavoriteHouses(realHouses, ids);
  const isSharedView = sharedIds.length > 0;

  const share = async () => {
    const list = favorites.length > 0 ? favorites : ids;
    if (list.length === 0) return;
    const url = `${window.location.origin}/saved/?ids=${list.join(",")}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareHint(true);
      window.setTimeout(() => setShareHint(false), 2000);
    } catch {
      window.prompt("Ссылка на подборку:", url);
    }
  };

  return (
    <section className="section-padding bg-white pt-4">
      <div className="container-main">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="section-title">
              {isSharedView ? "Подборка домов" : "Сохранённые"}
            </h1>
            <p className="mt-2 text-sm text-muted">
              {houses.length > 0
                ? `${houses.length} ${houses.length === 1 ? "дом" : houses.length < 5 ? "дома" : "домов"}`
                : "Пока ничего не сохранено — отметьте ♡ в каталоге"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {houses.length > 0 && (
              <button
                type="button"
                onClick={share}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border px-3 text-sm font-semibold hover:border-orange/40"
              >
                <Share2 className="h-4 w-4" />
                {shareHint ? "Ссылка скопирована" : "Поделиться подборкой"}
              </button>
            )}
            {!isSharedView && favorites.length > 0 && (
              <button
                type="button"
                onClick={clearFavorites}
                className="inline-flex h-10 items-center rounded-xl px-3 text-sm font-medium text-muted hover:text-orange"
              >
                Очистить
              </button>
            )}
          </div>
        </div>

        {houses.length === 0 ? (
          <div className="mt-12 flex flex-col items-center rounded-card border border-border bg-page py-16 text-center">
            <Heart className="mb-4 h-12 w-12 text-primary" />
            <h2 className="text-xl font-semibold text-dark">Список пуст</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              Сохраняйте дома без регистрации — выбор останется в этом браузере.
            </p>
            <Link
              href="/catalog/"
              className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Открыть каталог
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {houses.map((house, index) => (
              <CatalogHouseCard
                key={house.id}
                house={house}
                priority={index < 2}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
