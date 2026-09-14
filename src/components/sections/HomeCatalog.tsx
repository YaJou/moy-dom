"use client";

import { HomeCatalogCard } from "@/components/cards/HomeCatalogCard";
import { Button } from "@/components/ui/button";
import { realHouses } from "@/data/houses";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { ArrowUpRight, Leaf } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const tabs = [
  { id: "all", label: "Все дома" },
  { id: "new", label: "Новые" },
  { id: "garage", label: "С гаражом" },
] as const;

function filterTab(houses: House[], tab: string): House[] {
  switch (tab) {
    case "new":
      return houses.filter((h) => h.badge === "new");
    case "garage":
      return houses.filter((h) =>
        h.specs.parking.toLowerCase().includes("гараж")
      );
    default:
      return houses;
  }
}

export function HomeCatalog() {
  const [activeTab, setActiveTab] = useState("all");

  const displayed = useMemo(() => {
    const filtered = filterTab(realHouses, activeTab);
    return filtered.slice(0, 3);
  }, [activeTab]);

  return (
    <section id="homes" className="bg-page pb-12 pt-6">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="section-title">Дома, которые можно посмотреть</h2>
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
            </div>
            <p className="mt-3 text-base text-muted">
              Сравните расположение, планировку и комплектацию
            </p>
          </div>
          <Link href="/catalog/" className="section-link shrink-0 text-text">
            Весь каталог
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "chip",
                activeTab === tab.id && "chip-active"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {displayed.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {displayed.map((house, index) => (
              <HomeCatalogCard
                key={house.id}
                house={house}
                priority={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-card border border-border bg-surface p-8 text-center">
            <p className="text-muted">По этому фильтру домов пока нет.</p>
            <button
              type="button"
              className="mt-3 text-sm font-semibold text-orange"
              onClick={() => setActiveTab("all")}
            >
              Сбросить фильтр
            </button>
          </div>
        )}

        <div className="mt-6 flex min-h-24 flex-col items-start justify-between gap-5 rounded-panel bg-forest p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <Leaf className="mt-1 h-6 w-6 shrink-0 text-orange" strokeWidth={1.75} />
            <div>
              <p className="text-[22px] font-bold leading-[30px] text-white">
                Не знаете, какой дом выбрать?
              </p>
              <p className="mt-1 text-sm text-muted-on-forest">
                Подберём варианты под ваш бюджет
              </p>
            </div>
          </div>
          <Button asChild className="w-full shrink-0 sm:w-auto">
            <Link
              href="/#viewing"
              onClick={() => analytics.viewingFormOpen("catalog-banner")}
            >
              Подобрать дом
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
