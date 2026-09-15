"use client";

import { getHousesByCity, realHouses } from "@/data/houses";
import { citySortIndex } from "@/lib/cities";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS } from "@/types/house";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrow, IconLeafOutline } from "./icons";
import { HomeHouseCard } from "./HomeHouseCard";
import { useViewingModal } from "./ViewingModalProvider";

const tabs = [
  { id: "all", label: "Все дома" },
  { id: "new", label: "Новые" },
  { id: "garage", label: "С гаражом" },
] as const;

function getCatalogHouses(
  tab: (typeof tabs)[number]["id"],
  city?: string
) {
  const source = city ? getHousesByCity(city) : realHouses;
  const base = [...source].sort((a, b) => {
    const d = citySortIndex(a.city) - citySortIndex(b.city);
    if (d !== 0) return d;
    return a.price - b.price;
  });
  if (tab === "new") return base.filter((h) => h.badge === "new");
  if (tab === "garage") {
    return base.filter((h) => h.specs.parking.toLowerCase().includes("гараж"));
  }
  return base;
}

export type HomeCatalogProps = {
  city?: string;
  title?: string;
  subtitle?: string;
  catalogHref?: string;
  limit?: number;
};

export function HomeCatalog({
  city,
  title = "Дома, которые можно посмотреть",
  subtitle = "Сравните расположение, планировку и комплектацию",
  catalogHref = "/catalog/",
  limit = 3,
}: HomeCatalogProps = {}) {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const { openViewing } = useViewingModal();

  const houses = useMemo(
    () => getCatalogHouses(tab, city).slice(0, limit),
    [tab, city, limit]
  );

  return (
    <section id="homes" className="bg-page pb-12 pt-6">
      <div className="container-main">
        <div className="catalog-header">
          <div className="catalog-header-top">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2.5 gap-y-1">
              <h2 className="h2-desktop font-extrabold text-text">{title}</h2>
            </div>
            <Link href={catalogHref} className="catalog-all-link shrink-0">
              {city ? "Все в городе ↗" : "Весь каталог ↗"}
            </Link>
          </div>
          <p className="mt-3 text-base text-muted">{subtitle}</p>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "catalog-tab",
                tab === t.id ? "catalog-tab-active" : "catalog-tab-inactive"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {houses.length === 0 ? (
          <div className="mt-8 rounded-panel border border-border bg-surface p-8 text-center">
            <p className="text-muted">
              По выбранному фильтру домов нет. Попробуйте другую вкладку или{" "}
              <Link href={catalogHref} className="font-semibold text-orange">
                весь каталог
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {houses.map((house, i) => (
              <HomeHouseCard
                key={house.id}
                house={house}
                priority={i === 0}
              />
            ))}
          </div>
        )}

        <div className="catalog-cta-panel">
          <div className="catalog-cta-content">
            <IconLeafOutline className="catalog-cta-leaf shrink-0" />
            <div>
              <p className="catalog-cta-title">
                Не знаете, какой дом выбрать?
              </p>
              <p className="catalog-cta-subtitle">
                Подберём варианты под ваш бюджет
              </p>
            </div>
          </div>
          <button
            type="button"
            className="catalog-cta-btn"
            onClick={() =>
              openViewing({
                city,
                filters: JSON.stringify({
                  ...DEFAULT_FILTERS,
                  ...(city ? { city } : {}),
                }),
              })
            }
          >
            Подобрать дом
            <IconArrow className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
