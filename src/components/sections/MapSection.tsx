"use client";

import { housesData } from "@/data/site";
import { YandexHousesMap } from "@/components/sections/YandexHousesMap";
import { useState } from "react";

export function MapSection() {
  const [activeCity, setActiveCity] = useState<string | null>(null);

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
              {filtered.length} домов на карте — метки всех объектов в продаже
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setActiveCity(city === "Все" ? null : city)}
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

        <div className="overflow-hidden rounded-card border border-border">
          {filtered.length > 0 ? (
            <YandexHousesMap houses={filtered} />
          ) : (
            <div className="flex min-h-[360px] items-center justify-center bg-background sm:min-h-[440px]">
              <p className="text-sm text-gray">Нет объектов в этом городе</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
