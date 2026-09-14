"use client";

import { CITY_ORDER } from "@/lib/cities";
import { housesData } from "@/data/site";
import { YandexHousesMap } from "@/components/sections/YandexHousesMap";
import { HouseImage } from "@/components/ui/HouseImage";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const cityTabs = CITY_ORDER;

type CityTab = (typeof cityTabs)[number];

interface MapSectionProps {
  initialCity?: string | null;
  showCityFilters?: boolean;
}

export function MapSection({
  initialCity = null,
  showCityFilters = true,
}: MapSectionProps = {}) {
  const defaultCity: CityTab =
    initialCity && (cityTabs as readonly string[]).includes(initialCity)
      ? (initialCity as CityTab)
      : "Энгельс";

  const [activeCity, setActiveCity] = useState<CityTab>(defaultCity);
  const [selected, setSelected] = useState<House | null>(null);

  const markers = housesData.filter((h) => h.lat && h.lng);

  const filtered = useMemo(
    () => markers.filter((h) => h.city === activeCity),
    [activeCity, markers]
  );

  const locationCards = useMemo(() => {
    const districts = new Map<string, House>();
    for (const house of filtered) {
      if (!districts.has(house.district)) {
        districts.set(house.district, house);
      }
    }
    return Array.from(districts.values()).slice(0, 2);
  }, [filtered]);

  return (
    <section id="locations" className="bg-page py-10 md:py-12">
      <div className="container-main">
        <h2 className="section-title">Выберите место для жизни</h2>

        {showCityFilters && (
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            {cityTabs.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => {
                  setActiveCity(city);
                  setSelected(null);
                }}
                className={`chip shrink-0 ${
                  activeCity === city ? "chip-active" : "chip-inactive"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.8fr_1fr] lg:gap-6">
          <div>
            <div className="h-[260px] overflow-hidden rounded-panel lg:h-[280px]">
              {filtered.length > 0 ? (
                <YandexHousesMap houses={filtered} focusHouse={selected} />
              ) : (
                <div className="flex h-full items-center justify-center bg-surface">
                  <p className="text-sm text-muted">
                    В этом городе пока нет объектов в каталоге.{" "}
                    <Link href="/catalog/" className="text-orange underline">
                      Смотреть все дома
                    </Link>
                  </p>
                </div>
              )}
            </div>
            <p className="mt-3 text-sm text-muted">
              Подъезд, магазины и инфраструктура — на странице локации
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {locationCards.length > 0 ? (
              locationCards.map((house) => (
                <div
                  key={house.id}
                  className={`flex h-32 gap-4 rounded-panel border bg-surface p-3 transition-shadow ${
                    selected?.id === house.id
                      ? "border-orange shadow-card"
                      : "border-border"
                  }`}
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-control">
                    <HouseImage
                      src={house.image}
                      alt={house.district}
                      fill
                      objectFit="cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="text-base font-bold leading-6 text-text">
                      {house.district}
                    </p>
                    <p className="text-sm text-muted">
                      {house.city} · от {formatPrice(house.price)}
                    </p>
                    <Link
                      href={`/catalog/${house.id}`}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-text hover:text-orange"
                    >
                      Смотреть дома
                      <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted">Нет локаций в выбранном городе</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
