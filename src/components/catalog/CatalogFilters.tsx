"use client";

import { Select } from "@/components/ui/Select";
import { searchFilters } from "@/data/site";
import {
  availableQuickPicks,
  buildSearchParams,
  estimateCatalogCount,
  getFilterLabel,
  hasActiveFilters,
  pluralizeHouses,
} from "@/lib/filters";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS, type House, type SearchFiltersState } from "@/types/house";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

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
      <label className="mb-1.5 block text-xs font-medium text-muted">
        {label}
      </label>
      <Select
        variant="field"
        value={value}
        onChange={onChange}
        options={options}
        aria-label={label}
      />
    </div>
  );
}

interface CatalogFiltersProps {
  initialFilters: SearchFiltersState;
  houses: House[];
}

export function CatalogFilters({ initialFilters, houses }: CatalogFiltersProps) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => setFilters(initialFilters), [initialFilters]);

  const count = useMemo(() => estimateCatalogCount(filters), [filters]);
  const active = hasActiveFilters(filters);
  const quick = useMemo(() => availableQuickPicks(houses), [houses]);

  const update = (key: keyof SearchFiltersState) => (value: string) =>
    setFilters((p) => ({ ...p, [key]: value }));

  const apply = (next: SearchFiltersState) => {
    setFilters(next);
    const q = buildSearchParams(next);
    router.push(q ? `/catalog/?${q}` : "/catalog/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    apply(filters);
  };

  const clear = () => apply({ ...DEFAULT_FILTERS });

  const clearKey = (key: keyof SearchFiltersState) => {
    apply({ ...filters, [key]: DEFAULT_FILTERS[key] });
  };

  const activeChips = (
    Object.keys(DEFAULT_FILTERS) as (keyof SearchFiltersState)[]
  ).filter((key) => filters[key] !== DEFAULT_FILTERS[key]);

  return (
    <div className="container-main">
      <form
        onSubmit={handleSubmit}
        className="rounded-card border border-border bg-surface p-4 shadow-card sm:p-5"
      >
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <FilterSelect
            label="Город"
            options={searchFilters.cities}
            value={filters.city}
            onChange={update("city")}
          />
          <FilterSelect
            label="Бюджет"
            options={searchFilters.priceRanges}
            value={filters.price}
            onChange={update("price")}
          />
          <FilterSelect
            label="Спальни"
            options={searchFilters.bedrooms}
            value={filters.bedrooms}
            onChange={update("bedrooms")}
          />
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-border text-sm font-semibold text-text hover:border-orange/40"
            >
              {moreOpen ? "Скрыть фильтры" : "Все фильтры"}
            </button>
          </div>
        </div>

        {moreOpen && (
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4 lg:grid-cols-4">
            <FilterSelect
              label="Площадь"
              options={searchFilters.areaRanges}
              value={filters.area}
              onChange={update("area")}
            />
            <FilterSelect
              label="Комнаты"
              options={searchFilters.rooms}
              value={filters.rooms}
              onChange={update("rooms")}
            />
            <FilterSelect
              label="Участок"
              options={searchFilters.land}
              value={filters.land}
              onChange={update("land")}
            />
            <FilterSelect
              label="Этажность"
              options={searchFilters.floors}
              value={filters.floors}
              onChange={update("floors")}
            />
            <FilterSelect
              label="Газ"
              options={searchFilters.gas}
              value={filters.gas}
              onChange={update("gas")}
            />
            <FilterSelect
              label="Отделка"
              options={searchFilters.prefinish}
              value={filters.prefinish}
              onChange={update("prefinish")}
            />
            <FilterSelect
              label="Статус"
              options={searchFilters.readiness}
              value={filters.readiness}
              onChange={update("readiness")}
            />
          </div>
        )}

        {quick.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {quick.map((pick) => {
              const isOn = Object.entries(pick.patch).every(
                ([k, v]) => filters[k as keyof SearchFiltersState] === v
              );
              return (
                <button
                  key={pick.id}
                  type="button"
                  onClick={() =>
                    apply(
                      isOn
                        ? {
                            ...filters,
                            ...Object.fromEntries(
                              Object.keys(pick.patch).map((k) => [
                                k,
                                DEFAULT_FILTERS[k as keyof SearchFiltersState],
                              ])
                            ),
                          }
                        : { ...filters, ...pick.patch }
                    )
                  }
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                    isOn
                      ? "border-orange bg-orange/10 text-orange"
                      : "border-border text-text hover:border-orange/40"
                  )}
                >
                  {pick.label}
                </button>
              );
            })}
          </div>
        )}

        {activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeChips.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => clearKey(key)}
                className="inline-flex items-center gap-1 rounded-full bg-page px-2.5 py-1 text-xs font-medium text-text"
              >
                {getFilterLabel(key, filters[key])}
                <X className="h-3 w-3" />
              </button>
            ))}
            <button
              type="button"
              onClick={clear}
              className="text-xs font-semibold text-orange hover:underline"
            >
              Сбросить
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Показать {count} {pluralizeHouses(count)}
          </button>
        </div>
      </form>
    </div>
  );
}
