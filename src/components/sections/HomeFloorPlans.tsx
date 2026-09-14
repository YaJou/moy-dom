"use client";

import { Button } from "@/components/ui/button";
import { HouseImage } from "@/components/ui/HouseImage";
import {
  getFloorPlanImage,
  getFloorPlanStats,
  getHousesWithFloorPlans,
} from "@/lib/floor-plan";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { ArrowRight, BedDouble, ChefHat, Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function HomeFloorPlans() {
  const houses = getHousesWithFloorPlans();
  const [selected, setSelected] = useState<House>(houses[0]);

  if (houses.length === 0) {
    return (
      <section className="bg-page py-12 md:py-16">
        <div className="container-main">
          <h2 className="section-title">
            Дом начинается с удобной планировки
          </h2>
          <p className="mt-3 text-muted">
            Посмотрите, как организовано пространство
          </p>
          <div className="mt-8 rounded-card border border-border bg-surface p-8 text-center">
            <p className="text-muted">
              Планировку можно запросить у менеджера
            </p>
            <Button asChild className="mt-4">
              <Link href="/#viewing">Запросить планировку</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const planImage = getFloorPlanImage(selected.id);
  const stats = getFloorPlanStats(selected);

  return (
    <section className="bg-page py-12 md:py-16">
      <div className="container-main">
        <h2 className="section-title">
          Дом начинается с удобной планировки
        </h2>
        <p className="mt-3 text-muted">
          Посмотрите, как организовано пространство
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {houses.map((house) => (
            <button
              key={house.id}
              type="button"
              onClick={() => {
                setSelected(house);
                analytics.planOpen(house.id);
              }}
              className={cn(
                "chip",
                selected.id === house.id && "chip-active"
              )}
            >
              Дом {house.area} м²
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[460px] rounded-card border border-border bg-surface p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[3fr_2fr]">
            <div>
              {planImage ? (
                <div className="relative h-[280px] w-full md:h-[360px]">
                  <HouseImage
                    src={planImage}
                    alt={`Планировка — ${selected.title}`}
                    fill
                    objectFit="contain"
                    sizes="(max-width: 1024px) 100vw, 664px"
                  />
                </div>
              ) : (
                <div className="flex h-[280px] items-center justify-center rounded-image bg-page md:h-[360px]">
                  <p className="text-muted">
                    Планировку можно запросить у менеджера
                  </p>
                </div>
              )}
              <p className="mt-4 text-sm font-semibold text-text">
                {selected.title}
              </p>
              <Link
                href={`/catalog/${selected.id}`}
                className="mt-1 inline-flex items-center gap-1 text-sm text-muted hover:text-text"
              >
                Открыть в полном размере
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </Link>
            </div>

            <div>
              <h3 className="text-[28px] font-bold leading-9 tracking-[-0.7px] text-text">
                Место для всей семьи
              </h3>
              <ul className="mt-6 space-y-4">
                {stats.bedrooms != null && (
                  <li className="flex items-center gap-3 text-base text-text">
                    <BedDouble className="h-5 w-5 text-orange" strokeWidth={1.75} />
                    {stats.bedrooms} спальни
                  </li>
                )}
                {stats.kitchen && (
                  <li className="flex items-center gap-3 text-base text-text">
                    <ChefHat className="h-5 w-5 text-orange" strokeWidth={1.75} />
                    {stats.kitchen}
                  </li>
                )}
                {stats.storage && (
                  <li className="flex items-center gap-3 text-base text-text">
                    <Package className="h-5 w-5 text-orange" strokeWidth={1.75} />
                    {stats.storage}
                  </li>
                )}
              </ul>
              <Button asChild className="mt-6">
                <Link href={`/catalog/${selected.id}`}>
                  Открыть дом
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
