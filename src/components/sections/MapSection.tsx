"use client";

import { housesData, mapData } from "@/data/site";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { House } from "@/types/house";

function buildYandexMapSrc(houses: House[], selected: House | null): string {
  if (selected) {
    const { lat, lng } = selected;
    return `https://yandex.ru/map-widget/v1/?ll=${lng}%2C${lat}&z=17&pt=${lng}%2C${lat}%2Cpm2rdm`;
  }

  if (houses.length === 0) {
    return `https://yandex.ru/map-widget/v1/?ll=${mapData.center.lng}%2C${mapData.center.lat}&z=12`;
  }

  const avgLat = houses.reduce((sum, h) => sum + h.lat, 0) / houses.length;
  const avgLng = houses.reduce((sum, h) => sum + h.lng, 0) / houses.length;
  const points = houses.map((h) => `${h.lng},${h.lat},pm2orgl`).join("~");

  return `https://yandex.ru/map-widget/v1/?ll=${avgLng}%2C${avgLat}&z=14&pt=${points}`;
}

export function MapSection() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [selected, setSelected] = useState<House | null>(null);

  const markers = housesData.filter((h) => h.lat && h.lng);
  const cities = ["Все", "Саратов", "Энгельс", "Балаково"];

  const filtered =
    activeCity && activeCity !== "Все"
      ? markers.filter((h) => h.city === activeCity)
      : markers;

  const mapSrc = useMemo(
    () => buildYandexMapSrc(filtered, selected),
    [filtered, selected]
  );

  const mapKey = selected ? `house-${selected.id}` : `city-${activeCity ?? "all"}`;

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="section-title">Карта объектов</h2>
            <p className="mt-2 text-sm text-gray">
              {filtered.length} домов на карте — кликните на объект, чтобы центрировать карту
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
          <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border lg:col-span-2 lg:aspect-auto lg:min-h-[400px]">
            <iframe
              key={mapKey}
              src={mapSrc}
              title="Карта объектов"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <div className="max-h-[400px] space-y-2 overflow-y-auto rounded-card border border-border bg-background p-3">
            {filtered.map((house) => (
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
                    <p className="text-xs text-gray">{house.district}</p>
                  </div>
                </button>
                <Button asChild size="sm" variant="outline" className="mt-2 w-full rounded-lg text-xs">
                  <Link href={`/catalog/${house.id}`}>
                    Перейти к объекту
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
