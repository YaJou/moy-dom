"use client";

import { YandexHousesMap } from "@/components/sections/YandexHousesMap";
import { realHouses } from "@/data/houses";
import { formatPrice, cn } from "@/lib/utils";
import type { House } from "@/types/house";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrow } from "./icons";

const cities = ["Саратов", "Энгельс", "Балаково"] as const;

function getLocationCards(city: string): { house: House; label: string }[] {
  const inCity = realHouses.filter((h) => h.city === city);
  const districts = new Map<string, House>();
  for (const h of inCity) {
    const key = h.district;
    if (!districts.has(key)) districts.set(key, h);
  }
  return Array.from(districts.entries())
    .slice(0, 2)
    .map(([label, house]) => ({ label, house }));
}

export function HomeLocations() {
  const [city, setCity] = useState<(typeof cities)[number]>("Балаково");
  const [selected, setSelected] = useState<House | null>(null);

  const cityHouses = useMemo(
    () => realHouses.filter((h) => h.city === city && h.lat && h.lng),
    [city]
  );

  const cards = useMemo(() => getLocationCards(city), [city]);
  const catalogHref =
    city === "Саратов"
      ? "/catalog/saratov/"
      : city === "Энгельс"
        ? "/catalog/engels/"
        : "/catalog/balakovo/";

  return (
    <section id="locations" className="bg-page py-10">
      <div className="container-main">
        <h2 className="h2-desktop text-text">Выберите место для жизни</h2>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCity(c);
                setSelected(null);
              }}
              className={cn(city === c ? "chip-active" : "chip-inactive")}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[760px_1fr] lg:gap-6">
          <div className="min-w-0 overflow-hidden rounded-panel">
            {cityHouses.length > 0 ? (
              <div className="h-[260px] lg:h-[280px]">
                <YandexHousesMap houses={cityHouses} focusHouse={selected} />
              </div>
            ) : (
              <div className="flex h-[260px] items-center justify-center rounded-panel border border-border bg-surface lg:h-[280px]">
                <div className="max-w-sm px-6 text-center">
                  <p className="text-muted">
                    В каталоге пока нет объектов в {city}. Смотрите{" "}
                    <Link href={catalogHref} className="font-semibold text-orange">
                      страницу локации
                    </Link>{" "}
                    или другие города.
                  </p>
                </div>
              </div>
            )}
            <p className="mt-3 text-sm text-muted">
              Подъезд, магазины и инфраструктура —{" "}
              <Link href={catalogHref} className="font-medium text-text hover:text-orange">
                на странице локации →
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {cards.length === 0 ? (
              <div className="rounded-panel border border-border bg-surface p-6 text-sm text-muted">
                Нет карточек для этого города.{" "}
                <Link href={catalogHref} className="font-semibold text-orange">
                  Смотреть каталог →
                </Link>
              </div>
            ) : (
              cards.map(({ label, house }) => (
                <div
                  key={label}
                  className={cn(
                    "flex h-32 gap-4 rounded-panel border border-border bg-surface p-3 transition-shadow",
                    selected?.id === house.id && "ring-2 ring-orange"
                  )}
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-control">
                    <Image
                      src={house.image}
                      alt={house.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <p className="text-base font-bold text-text">{label}</p>
                    <p className="text-sm text-muted">
                      Дома в {house.city} · от {formatPrice(house.price)}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSelected(house)}
                      className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-orange"
                    >
                      Смотреть дома
                      <IconArrow className="h-4 w-4" />
                    </button>
                    <Link
                      href={`/catalog/${house.id}`}
                      className="sr-only"
                    >
                      {house.title}
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
