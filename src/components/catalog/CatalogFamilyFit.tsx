"use client";

import {
  hasLargeKitchenLiving,
  hasTwoBathrooms,
} from "@/lib/house-price-composition";
import { getFloorPlanImage } from "@/lib/floor-plan";
import { housesData } from "@/data/site";
import { HouseImage } from "@/components/ui/HouseImage";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type FamilyNeedId = "bed2" | "bed3" | "bath2" | "kitchen";

const NEEDS: {
  id: FamilyNeedId;
  title: string;
  description: string;
  match: (h: House) => boolean;
  href: string;
}[] = [
  {
    id: "bed2",
    title: "Две спальни",
    description: "Подходящие дома и расположение комнат",
    match: (h) => h.bedrooms === 2,
    href: "/catalog/?bedrooms=2#catalog-results",
  },
  {
    id: "bed3",
    title: "Три спальни",
    description: "Варианты с отдельными комнатами",
    match: (h) => h.bedrooms === 3,
    href: "/catalog/?bedrooms=3#catalog-results",
  },
  {
    id: "bath2",
    title: "Два санузла",
    description: "Дома, где это предусмотрено",
    match: hasTwoBathrooms,
    href: "/catalog/?need=bath2#catalog-results",
  },
  {
    id: "kitchen",
    title: "Большая кухня-гостиная",
    description: "Площадь и выход на террасу, если есть",
    match: hasLargeKitchenLiving,
    href: "/catalog/?need=kitchen#catalog-results",
  },
];

function pickPlanHouse(match: (h: House) => boolean): House | undefined {
  const matched = housesData.filter(match);
  return (
    matched.find((h) => getFloorPlanImage(h.id)) ??
    matched[0] ??
    housesData.find((h) => getFloorPlanImage(h.id)) ??
    housesData[0]
  );
}

export function CatalogFamilyFit() {
  const router = useRouter();
  const [active, setActive] = useState<FamilyNeedId>("bed3");

  const cards = useMemo(
    () =>
      NEEDS.map((need) => ({
        ...need,
        count: housesData.filter(need.match).length,
        sample: pickPlanHouse(need.match),
      })),
    []
  );

  const current = cards.find((c) => c.id === active) ?? cards[0];

  return (
    <section className="border-t border-border bg-page py-12 sm:py-14">
      <div className="container-main">
        <h2 className="h2-desktop font-extrabold text-text">
          Какой дом подойдёт вашей семье?
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          Выберите, что важно в повседневной жизни — покажем подходящие дома и
          планировки.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const plan = card.sample
              ? getFloorPlanImage(card.sample.id)
              : null;
            const photo =
              plan ??
              (card.sample
                ? card.sample.image
                : housesData[0]?.image);
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActive(card.id)}
                className={cn(
                  "overflow-hidden rounded-card border bg-surface text-left transition-shadow",
                  active === card.id
                    ? "border-orange shadow-card"
                    : "border-border hover:border-orange/40"
                )}
              >
                <div className="relative aspect-[4/3] bg-page">
                  {photo && (
                    <HouseImage
                      src={photo}
                      alt={card.title}
                      fill
                      objectFit={plan ? "contain" : "cover"}
                      sizes="280px"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-extrabold text-text">{card.title}</p>
                  <p className="mt-1 text-sm text-muted">{card.description}</p>
                  <p className="mt-2 text-xs font-semibold text-orange">
                    {card.count}{" "}
                    {card.count === 1
                      ? "дом"
                      : card.count < 5
                        ? "дома"
                        : "домов"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="btn-primary mt-8"
          onClick={() => {
            if (!current) return;
            router.push(current.href);
          }}
        >
          Посмотреть подходящие дома
        </button>
      </div>
    </section>
  );
}
