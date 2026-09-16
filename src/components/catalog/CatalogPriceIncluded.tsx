"use client";

import { HouseImage } from "@/components/ui/HouseImage";
import { housesData } from "@/data/site";
import { getHousePriceComposition } from "@/lib/house-price-composition";
import { getHouseCover } from "@/lib/house-images";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useMemo, useState } from "react";

export function CatalogPriceIncluded() {
  const [houseId, setHouseId] = useState(housesData[0]?.id ?? 0);
  const house =
    housesData.find((h) => h.id === houseId) ?? housesData[0] ?? null;

  const composition = useMemo(
    () => (house ? getHousePriceComposition(house) : null),
    [house]
  );

  if (!house || !composition) return null;

  return (
    <section className="border-t border-border bg-white py-12 sm:py-14">
      <div className="container-main">
        <h2 className="h2-desktop font-extrabold text-text">
          Что входит в стоимость конкретного дома
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted">
          У объектов разная отделка и статус газа — смотрите состав выбранного
          дома, а не общую таблицу.
        </p>

        <div id="price-included" className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
            <label className="field-label" htmlFor="price-house-select">
              Дом
            </label>
            <select
              id="price-house-select"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-3 py-3 text-sm font-medium text-text"
              value={house.id}
              onChange={(e) => setHouseId(Number(e.target.value))}
            >
              {housesData.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.city} · {h.area} м² · {formatPrice(h.price)}
                </option>
              ))}
            </select>

            <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-card bg-page">
              <HouseImage
                src={getHouseCover(house)}
                alt={house.title}
                fill
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <p className="mt-3 text-sm text-muted">
              {house.city}, {house.district}
            </p>
            <Link
              href={`/catalog/${house.id}/`}
              className="mt-2 inline-block text-sm font-semibold text-orange hover:underline"
            >
              Открыть карточку дома →
            </Link>
          </div>

          <div>
            <dl className="divide-y divide-border rounded-card border border-border bg-surface">
              {composition.rows.map((row) => (
                <div
                  key={row.label}
                  className="grid gap-1 px-5 py-4 sm:grid-cols-[180px_1fr] sm:gap-4"
                >
                  <dt className="text-sm font-semibold text-text">
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 space-y-3 rounded-card bg-page px-5 py-5">
              <p className="text-sm leading-relaxed text-text">
                <span className="font-extrabold">Входит в указанную цену: </span>
                <span className="text-[#3a433e]">{composition.includedSummary}</span>
              </p>
              <p className="text-sm leading-relaxed text-text">
                <span className="font-extrabold">Потребуется отдельно: </span>
                <span className="text-[#3a433e]">
                  {composition.separateSummary}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
