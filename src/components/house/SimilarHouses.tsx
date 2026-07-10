"use client";

import { HouseCard } from "@/components/cards/HouseCard";
import { realHouses } from "@/data/houses";
import { similarHouseTabs } from "@/data/house-detail";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface SimilarHousesProps {
  house: House;
}

function filterHouses(houses: House[], tabId: string, current: House): House[] {
  const others = houses.filter((h) => h.id !== current.id);

  switch (tabId) {
    case "district":
      return others.filter((h) => h.district === current.district);
    case "under8m":
      return others.filter((h) => h.price < 8_000_000);
    case "one-story":
      return others.filter((h) => h.specs.floors === 1);
    case "garage":
      return others.filter((h) =>
        h.specs.parking.toLowerCase().includes("гараж")
      );
    case "similar":
    default:
      return others.filter(
        (h) => Math.abs(h.area - current.area) <= 25 || h.city === current.city
      );
  }
}

export function SimilarHouses({ house }: SimilarHousesProps) {
  const [activeTab, setActiveTab] = useState("similar");

  const filtered = useMemo(
    () => filterHouses(realHouses, activeTab, house).slice(0, 3),
    [activeTab, house]
  );

  return (
    <section className="mt-12 border-t border-border pt-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-dark sm:text-2xl">Другие дома</h2>
        <Link
          href="/catalog"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
        >
          Все дома
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {similarHouseTabs.map((tab) => (
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <HouseCard key={h.id} {...h} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray">
          По этому фильтру других домов пока нет.{" "}
          <Link href="/catalog" className="text-primary hover:underline">
            Смотреть каталог
          </Link>
        </p>
      )}
    </section>
  );
}
