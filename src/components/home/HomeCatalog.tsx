"use client";

import { realHouses } from "@/data/houses";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS } from "@/types/house";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrow } from "./icons";
import { HomeHouseCard } from "./HomeHouseCard";
import { useViewingModal } from "./ViewingModalProvider";

const tabs = [
  { id: "all", label: "Все дома" },
  { id: "new", label: "Новые" },
  { id: "garage", label: "С гаражом" },
] as const;

function getCatalogHouses(tab: (typeof tabs)[number]["id"]) {
  const base = [...realHouses].sort((a, b) => a.price - b.price);
  if (tab === "new") return base.filter((h) => h.badge === "new");
  if (tab === "garage") {
    return base.filter((h) => h.specs.parking.toLowerCase().includes("гараж"));
  }
  return base;
}

export function HomeCatalog() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const { openViewing } = useViewingModal();

  const houses = useMemo(() => getCatalogHouses(tab).slice(0, 3), [tab]);

  return (
    <section id="homes" className="bg-page pb-12 pt-6">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="h2-desktop text-text">
                Дома, которые можно посмотреть
              </h2>
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-success"
                title="в наличии"
                aria-hidden
              />
            </div>
            <p className="mt-3 text-base text-muted">
              Сравните расположение, планировку и комплектацию
            </p>
          </div>
          <Link
            href="/catalog/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-text hover:text-orange"
          >
            Весь каталог
            <IconArrow className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                tab === t.id ? "chip-active" : "chip-inactive"
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
              <Link href="/catalog/" className="font-semibold text-orange">
                весь каталог
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {houses.map((house, i) => (
              <HomeHouseCard key={house.id} house={house} priority={i === 0} />
            ))}
          </div>
        )}

        <div className="mt-6 flex min-h-[96px] flex-col items-start justify-between gap-5 rounded-panel bg-forest p-6 sm:flex-row sm:items-center">
          <div>
            <p className="card-title text-white">
              Не знаете, какой дом выбрать?
            </p>
            <p className="mt-1 text-sm text-muted-on-forest">
              Подберём варианты под ваш бюджет
            </p>
          </div>
          <button
            type="button"
            className="btn-primary w-full sm:w-auto"
            onClick={() =>
              openViewing({
                filters: JSON.stringify(DEFAULT_FILTERS),
              })
            }
          >
            Подобрать дом
            <IconArrow />
          </button>
        </div>
      </div>
    </section>
  );
}
