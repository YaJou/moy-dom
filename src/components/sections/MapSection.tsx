"use client";

import { housesData } from "@/data/site";
import { YandexHousesMap } from "@/components/sections/YandexHousesMap";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MapSection() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [selected, setSelected] = useState<House | null>(null);

  const markers = housesData.filter((h) => h.lat && h.lng);
  const cities = ["Все", "Саратов", "Энгельс", "Балаково"];

  const filtered =
    activeCity && activeCity !== "Все"
      ? markers.filter((h) => h.city === activeCity)
      : markers;

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">Карта объектов</h2>
            <p className="mt-2 text-sm text-gray">
              {filtered.length} домов — выберите город или объект в списке
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setActiveCity(city === "Все" ? null : city);
                  setSelected(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  (city === "Все" && !activeCity) || activeCity === city
                    ? "bg-primary text-white"
                    : "border border-border bg-background text-dark hover:border-primary"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-7">
          <div className="overflow-hidden rounded-card border border-border lg:col-span-2">
            {filtered.length > 0 ? (
              <YandexHousesMap houses={filtered} focusHouse={selected} />
            ) : (
              <div className="flex min-h-[360px] items-center justify-center bg-background sm:min-h-[440px]">
                <p className="text-sm text-gray">Нет объектов в этом городе</p>
              </div>
            )}
          </div>

          <div className="max-h-[440px] space-y-2 overflow-y-auto rounded-card border border-border bg-background p-3">
            {filtered.length === 0 ? (
              <p className="p-4 text-center text-sm text-gray">
                Нет объектов в этом городе
              </p>
            ) : (
              filtered.map((house) => (
                <div
                  key={house.id}
                  className={`rounded-xl bg-white p-3 transition-colors ${
                    selected?.id === house.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(house)}
                    className="flex w-full items-start gap-3 text-left hover:opacity-80"
                  >
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-dark">
                        {house.title}
                      </p>
                      <p className="text-xs text-gray">
                        {house.city} · {house.district}
                      </p>
                      <p className="mt-1 text-sm font-bold text-dark">
                        {formatPrice(house.price)}
                      </p>
                    </div>
                  </button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="mt-2 w-full rounded-lg text-xs"
                  >
                    <Link href={`/catalog/${house.id}`}>
                      Перейти к объекту
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
