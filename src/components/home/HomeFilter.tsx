"use client";

import { searchFilters } from "@/data/site";
import { buildSearchParams, estimateCatalogCount } from "@/lib/filters";
import { analytics } from "@/lib/analytics";
import { DEFAULT_FILTERS, type SearchFiltersState } from "@/types/house";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { IconBed, IconMapPin, IconRuble } from "./icons";

const quickFilters = [
  { label: "До 8 млн", patch: { price: "7 000 000 – 10 000 000 ₽" as const } },
  { label: "Одноэтажные", patch: { floors: "1 этаж" as const } },
  { label: "С гаражом", patch: { floors: "1 этаж" as const } },
];

function FilterField({
  label,
  icon,
  options,
  value,
  onChange,
}: {
  label: string;
  icon?: ReactNode;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <div className="filter-select-wrap">
        {icon && <span className="filter-select-icon">{icon}</span>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={icon ? "filter-select" : "filter-select filter-select-no-icon"}
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <ChevronDown className="filter-select-chevron h-5 w-5" aria-hidden />
      </div>
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
      <form onSubmit={handleSearch} className="filter-panel">
        <div className="filter-grid">
          <FilterField
            label="Город"
            icon={<IconMapPin className="h-5 w-5" />}
            options={searchFilters.cities}
            value={filters.city}
            onChange={update("city")}
          />
          <FilterField
            label="Бюджет"
            icon={<IconRuble className="h-5 w-5" />}
            options={searchFilters.priceRanges}
            value={filters.price}
            onChange={update("price")}
          />
          <FilterField
            label="Спальни"
            icon={<IconBed className="h-5 w-5" />}
            options={searchFilters.rooms}
            value={filters.rooms}
            onChange={update("rooms")}
          />
          <div className="flex items-end">
            <button type="submit" className="btn-primary filter-submit">
              Показать дома
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

        <div className="filter-toolbar">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="filter-all-params"
          >
            <SlidersHorizontal className="h-5 w-5" />
            Все параметры
          </button>
          <span className="filter-divider" aria-hidden />
          <div className="filter-quick-chips">
            {quickFilters.map((qf) => (
              <button
                key={qf.label}
                type="button"
                className="filter-quick-chip"
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
