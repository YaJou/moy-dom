"use client";

import { HouseCard } from "@/components/cards/HouseCard";
import { realHouses } from "@/data/houses";
import { popularHouseTabs } from "@/data/homepage";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function filterByTab(houses: House[], tabId: string): House[] {
  switch (tabId) {
    case "one-story":
      return houses.filter((h) => h.specs.floors === 1);
    case "two-story":
      return houses.filter((h) => h.specs.floors === 2);
    case "under8m":
      return houses.filter((h) => h.price < 8_000_000);
    case "under120":
      return houses.filter((h) => h.area <= 120);
    case "garage":
      return houses.filter((h) =>
        h.specs.parking.toLowerCase().includes("гараж")
      );
    default:
      return houses;
  }
}

export function PopularHouses() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = useMemo(
    () => filterByTab(realHouses, activeTab),
    [activeTab]
  );

  return (
    <section className="section-padding border-y border-border bg-background">
      <div className="container-main">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="section-title">Популярные дома</h2>
          <Link href="/catalog" className="section-link shrink-0">
            Все дома
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 sm:mb-8">
          {popularHouseTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "border border-border bg-white text-dark hover:border-primary"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {filtered.map((house) => (
              <HouseCard key={house.id} {...house} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-border bg-white p-8 text-center">
            <p className="text-gray">По этому фильтру домов пока нет в каталоге.</p>
            <Link
              href="/catalog"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Смотреть все дома
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
