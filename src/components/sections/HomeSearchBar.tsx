"use client";

import { Button } from "@/components/ui/button";
import { searchFilters } from "@/data/site";
import {
  buildSearchParams,
  estimateCatalogCount,
  pluralizeHouses,
} from "@/lib/filters";
import { analytics } from "@/lib/analytics";
import { DEFAULT_FILTERS, type SearchFiltersState } from "@/types/house";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

function FilterSelect({
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
    <div className="min-w-0">
      <label className="field-label">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field-input appearance-none pr-10"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      </div>
    </div>
  );
}

export function HomeSearchBar() {
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

  const applyQuick = (partial: Partial<SearchFiltersState>) => {
    setFilters((p) => ({ ...p, ...partial }));
  };

  const budgetOptions = [
    "Любой бюджет",
    "до 5 000 000 ₽",
    "5 000 000 – 7 000 000 ₽",
    "7 000 000 – 10 000 000 ₽",
    "от 10 000 000 ₽",
  ];

  return (
    <div className="container-main mb-8">
      <form
        onSubmit={handleSearch}
        className="min-h-28 rounded-panel border border-border bg-surface p-5"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_208px]">
          <FilterSelect
            label="Город"
            options={searchFilters.cities}
            value={filters.city}
            onChange={update("city")}
          />
          <FilterSelect
            label="Бюджет"
            options={budgetOptions}
            value={filters.price}
            onChange={update("price")}
          />
          <FilterSelect
            label="Комнаты"
            options={searchFilters.rooms}
            value={filters.rooms}
            onChange={update("rooms")}
          />
          <div className="flex items-end">
            <Button type="submit" className="h-12 w-full">
              {count > 0
                ? `Показать ${count} ${pluralizeHouses(count)}`
                : "Показать дома"}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border pt-4 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="Площадь, м²"
              options={searchFilters.areaRanges}
              value={filters.area}
              onChange={update("area")}
            />
            <FilterSelect
              label="Этажность"
              options={searchFilters.floors}
              value={filters.floors}
              onChange={update("floors")}
            />
            <FilterSelect
              label="Статус"
              options={searchFilters.readiness}
              value={filters.readiness}
              onChange={update("readiness")}
            />
            <FilterSelect
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
            {expanded ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <SlidersHorizontal className="h-5 w-5" strokeWidth={1.75} />
            )}
            Все параметры
          </button>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            <button
              type="button"
              className="chip shrink-0"
              onClick={() =>
                applyQuick({ price: "5 000 000 – 7 000 000 ₽" })
              }
            >
              До 8 млн
            </button>
            <button
              type="button"
              className="chip shrink-0"
              onClick={() => applyQuick({ floors: "1 этаж" })}
            >
              Одноэтажные
            </button>
            <button
              type="button"
              className="chip shrink-0"
              onClick={() => router.push("/catalog?floors=1+%D1%8D%D1%82%D0%B0%D0%B6")}
            >
              С гаражом
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
