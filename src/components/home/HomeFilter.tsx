"use client";

import { searchFilters } from "@/data/site";
import {
  buildSearchParams,
  estimateCatalogCount,
  pluralizeHouses,
} from "@/lib/filters";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS, type SearchFiltersState } from "@/types/house";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const quickFilters = [
  { label: "До 8 млн", patch: { price: "7 000 000 – 10 000 000 ₽" as const } },
  { label: "Одноэтажные", patch: { floors: "1 этаж" as const } },
  { label: "С гаражом", patch: { floors: "1 этаж" as const } },
];

function FilterField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function HomeFilter() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFiltersState>(DEFAULT_FILTERS);
  const [expanded, setExpanded] = useState(false);

  const count = useMemo(() => estimateCatalogCount(filters), [filters]);

  const update =
    (key: keyof SearchFiltersState) => (value: string) =>
      setFilters((p) => ({ ...p, [key]: value }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    analytics.filterApply(buildSearchParams(filters));
    const q = buildSearchParams(filters);
    router.push(q ? `/catalog?${q}` : "/catalog");
  };

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="container-main mb-8">
      <form
        onSubmit={handleSearch}
        className="rounded-panel border border-border bg-surface p-5"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_208px]">
          <FilterField
            label="Город"
            options={searchFilters.cities}
            value={filters.city}
            onChange={update("city")}
          />
          <FilterField
            label="Бюджет"
            options={searchFilters.priceRanges}
            value={filters.price}
            onChange={update("price")}
          />
          <FilterField
            label="Комнаты"
            options={searchFilters.rooms}
            value={filters.rooms}
            onChange={update("rooms")}
          />
          <div className="flex items-end">
            <button type="submit" className="btn-primary h-12 w-full">
              {count > 0
                ? `Показать ${count} ${pluralizeHouses(count)}`
                : "Показать дома"}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 grid gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterField
              label="Площадь"
              options={searchFilters.areaRanges}
              value={filters.area}
              onChange={update("area")}
            />
            <FilterField
              label="Этажность"
              options={searchFilters.floors}
              value={filters.floors}
              onChange={update("floors")}
            />
            <FilterField
              label="Статус"
              options={searchFilters.readiness}
              value={filters.readiness}
              onChange={update("readiness")}
            />
            <FilterField
              label="Газ"
              options={searchFilters.gas}
              value={filters.gas}
              onChange={update("gas")}
            />
          </div>
        )}

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-text"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Все параметры
          </button>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            {quickFilters.map((qf) => (
              <button
                key={qf.label}
                type="button"
                className="chip-inactive shrink-0"
                onClick={() =>
                  setFilters((p) => ({ ...p, ...qf.patch }))
                }
              >
                {qf.label}
              </button>
            ))}
          </div>
          {count === 0 && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-orange hover:underline"
            >
              Сбросить фильтры
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
