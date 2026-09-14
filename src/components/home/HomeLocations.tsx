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
    <section id="locations" className="locations-section">
      <div className="container-main">
        <h2 className="h2-desktop font-extrabold text-text">
          Выберите место для жизни
        </h2>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
          {cities.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCity(c);
                setSelected(null);
              }}
              className={cn(
                "catalog-tab",
                city === c ? "catalog-tab-active" : "catalog-tab-inactive"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="locations-body mt-6">
          <div className="locations-map">
            {cityHouses.length > 0 ? (
              <div className="locations-map-inner overflow-hidden rounded-panel">
                <YandexHousesMap houses={cityHouses} focusHouse={selected} />
              </div>
            ) : (
              <div className="locations-map-inner flex items-center justify-center rounded-panel border border-border bg-surface">
                <div className="max-w-sm px-6 text-center">
                  <p className="text-muted">
                    В каталоге пока нет объектов в {city}. Смотрите{" "}
                    <Link
                      href={catalogHref}
                      className="font-semibold text-orange"
                    >
                      страницу локации
                    </Link>{" "}
                    или другие города.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="locations-side">
            <Link href={catalogHref} className="locations-infra-link">
              Подъезд, магазины и инфраструктура — на странице локации →
            </Link>

            <div className="locations-cards">
              {cards.length === 0 ? (
                <div className="rounded-panel border border-border bg-surface p-6 text-sm text-muted">
                  Нет карточек для этого города.{" "}
                  <Link
                    href={catalogHref}
                    className="font-semibold text-orange"
                  >
                    Смотреть каталог →
                  </Link>
                </div>
              ) : (
                cards.map(({ label, house }) => (
                  <div
                    key={label}
                    className={cn(
                      "locations-card",
                      selected?.id === house.id && "is-selected"
                    )}
                  >
                    <div className="locations-card-photo">
                      <Image
                        src={house.image}
                        alt={house.title}
                        fill
                        className="object-cover"
                        sizes="180px"
                      />
                    </div>
                    <div className="locations-card-body">
                      <p className="locations-card-title">{label}</p>
                      <p className="locations-card-meta">
                        Дома в {house.city} · от {formatPrice(house.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSelected(house)}
                        className="locations-card-cta"
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
      </div>
    </section>
  );
}
