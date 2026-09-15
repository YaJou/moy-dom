"use client";

import { useCompare, getCompareHouses } from "@/context/CompareContext";
import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { realHouses } from "@/data/houses";
import { formatPrice, cn } from "@/lib/utils";
import { getBestHouseIndices, type CompareRowKey } from "@/lib/compare-highlight";
import { HouseImage } from "@/components/ui/HouseImage";
import { getHouseCover, formatGasLabel, formatRepairLabel } from "@/lib/house-images";
import { getFloorPlanStats } from "@/lib/floor-plan";
import { CompareButton } from "@/components/house/CompareButton";
import { siteConfig } from "@/data/site";
import type { House } from "@/types/house";
import { GitCompareArrows } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const ROWS: {
  label: string;
  key?: CompareRowKey;
  group: "price" | "plan" | "land" | "finish" | "utils" | "location";
  get: (h: House) => string;
}[] = [
  {
    label: "Цена",
    key: "price",
    group: "price",
    get: (h) => formatPrice(h.price),
  },
  {
    label: "В составе",
    group: "price",
    get: (h) =>
      `Участок ${h.land} сот. · ${h.specs.water} · ${h.specs.sewage}`,
  },
  {
    label: "Площадь дома",
    key: "area",
    group: "plan",
    get: (h) => `${h.area} м²`,
  },
  {
    label: "Спальни",
    group: "plan",
    get: (h) => {
      const stats = getFloorPlanStats(h);
      return String(stats.bedrooms ?? h.bedrooms);
    },
  },
  {
    label: "Комнаты всего",
    key: "rooms",
    group: "plan",
    get: (h) => String(h.rooms),
  },
  {
    label: "Санузлы",
    group: "plan",
    get: (h) => h.specs.bathroom,
  },
  {
    label: "Участок",
    key: "land",
    group: "land",
    get: (h) => `${h.land} сот. (${h.specs.landCategory})`,
  },
  {
    label: "Отделка",
    key: "repair",
    group: "finish",
    get: (h) => formatRepairLabel(h.specs.repair),
  },
  {
    label: "Газ",
    key: "gas",
    group: "utils",
    get: (h) => formatGasLabel(h.specs.gas),
  },
  {
    label: "Вода",
    key: "water",
    group: "utils",
    get: (h) => h.specs.water,
  },
  {
    label: "Канализация",
    key: "sewage",
    group: "utils",
    get: (h) => h.specs.sewage,
  },
  {
    label: "Город / район",
    group: "location",
    get: (h) => `${h.city}, ${h.district}`,
  },
  {
    label: "До центра",
    key: "distance",
    group: "location",
    get: (h) => h.specs.distanceToCenter,
  },
];

export function ComparePageClient() {
  const searchParams = useSearchParams();
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const { openViewing } = useViewingModal();
  const [diffOnly, setDiffOnly] = useState(false);

  const urlIds = useMemo(() => {
    const raw = searchParams.get("ids") ?? "";
    return raw
      .split(",")
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n) && n > 0);
  }, [searchParams]);

  const ids = urlIds.length > 0 ? urlIds : compareIds;
  const houses = getCompareHouses(realHouses, ids);

  const visibleRows = useMemo(() => {
    if (!diffOnly || houses.length < 2) return ROWS;
    return ROWS.filter((row) => {
      const values = houses.map((h) => row.get(h));
      return values.some((v) => v !== values[0]);
    });
  }, [diffOnly, houses]);

  return (
    <>
      <section className="section-padding bg-white pt-6">
        <div className="container-main">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray">
              <GitCompareArrows className="h-5 w-5 text-primary" />
              <label className="inline-flex cursor-pointer items-center gap-2 font-medium text-text">
                <input
                  type="checkbox"
                  checked={diffOnly}
                  onChange={(e) => setDiffOnly(e.target.checked)}
                  className="h-4 w-4 accent-[var(--primary)]"
                />
                Только различия
              </label>
            </div>
            {houses.length > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="text-sm font-medium text-gray hover:text-primary"
              >
                Очистить всё
              </button>
            )}
          </div>

          {houses.length === 0 ? (
            <div className="mt-12 flex flex-col items-center rounded-card border border-border bg-background py-16 text-center">
              <GitCompareArrows className="mb-4 h-12 w-12 text-primary" />
              <h2 className="text-xl font-semibold text-dark">
                Нет домов для сравнения
              </h2>
              <p className="mt-2 max-w-md text-sm text-gray">
                Нажмите «Сравнить» на карточке дома в каталоге — добавьте от 2
                до 3 объектов.
              </p>
              <Link
                href="/catalog/"
                className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Перейти в каталог
              </Link>
            </div>
          ) : (
            <>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-sm">
                  <thead>
                    <tr>
                      <th className="sticky left-0 z-10 w-36 bg-white p-3 text-left font-medium text-gray sm:w-44" />
                      {houses.map((house) => (
                        <th
                          key={house.id}
                          className="min-w-[200px] border-b border-border p-3 align-top sm:min-w-[240px]"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#f0f0f0]">
                            <HouseImage
                              src={getHouseCover(house)}
                              alt={house.title}
                              fill
                              objectFit="cover"
                              sizes="240px"
                            />
                            <button
                              type="button"
                              onClick={() => removeFromCompare(house.id)}
                              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray shadow-sm hover:text-primary"
                              aria-label="Убрать"
                            >
                              ×
                            </button>
                          </div>
                          <Link
                            href={`/catalog/${house.id}/`}
                            className="mt-3 block text-left font-semibold text-dark hover:text-primary"
                          >
                            {house.title}
                          </Link>
                          <p className="mt-1 text-left text-lg font-bold text-primary">
                            {formatPrice(house.price)}
                          </p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {visibleRows.map((row) => {
                      const bestIndices = row.key
                        ? getBestHouseIndices(houses, row.key)
                        : new Set<number>();

                      return (
                        <tr key={row.label} className="border-b border-border">
                          <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray">
                            {row.label}
                          </td>
                          {houses.map((house, index) => (
                            <td
                              key={house.id}
                              className={cn(
                                "p-3 text-dark transition-colors",
                                bestIndices.has(index) &&
                                  "bg-primary-light/70 font-semibold text-primary"
                              )}
                            >
                              {row.get(house)}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="sticky left-0 z-10 bg-white p-3 font-medium text-gray">
                        Действия
                      </td>
                      {houses.map((house) => (
                        <td key={house.id} className="p-3">
                          <div className="flex flex-col gap-2">
                            <Link
                              href={`/catalog/${house.id}/`}
                              className="rounded-xl border border-border py-2 text-center text-xs font-semibold hover:border-primary hover:text-primary"
                            >
                              Подробнее
                            </Link>
                            <CompareButton houseId={house.id} />
                            <a
                              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
                              className="rounded-xl bg-primary py-2 text-center text-xs font-semibold text-white hover:bg-primary-hover"
                            >
                              Позвонить
                            </a>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              {houses.length >= 2 && (
                <div className="mt-8 rounded-card border border-border bg-page p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
                  <div>
                    <p className="font-semibold text-text">
                      Записаться на просмотр выбранных домов
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      Одна заявка — обсудим все отмеченные варианты.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openViewing({
                        filters: `compare=${houses.map((h) => h.id).join(",")}`,
                      })
                    }
                    className="mt-4 inline-flex h-11 shrink-0 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover sm:mt-0"
                  >
                    Записаться на просмотр
                  </button>
                </div>
              )}
            </>
          )}

          {houses.length > 0 && houses.length < 3 && (
            <p className="mt-6 text-center text-sm text-gray">
              <Link
                href="/catalog/"
                className="font-medium text-primary hover:underline"
              >
                Добавить ещё дом
              </Link>{" "}
              из каталога для сравнения
            </p>
          )}
        </div>
      </section>
    </>
  );
}
