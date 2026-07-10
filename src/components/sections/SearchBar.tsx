"use client";

import { Button } from "@/components/ui/button";
import { searchFilters } from "@/data/site";
import {
  buildSearchParams,
  estimateCatalogCount,
  pluralizeHouses,
} from "@/lib/filters";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS, type SearchFiltersState } from "@/types/house";
import { ChevronDown, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function FilterSelect({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const isActive = value !== options[0];
  return (
    <div className={cn("relative min-w-0", className)}>
      <label className="mb-1.5 block text-xs font-medium text-gray sm:text-sm">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-xl border bg-white py-2.5 pl-3 pr-8 text-sm font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:py-3 sm:pl-4",
            isActive ? "border-primary text-primary" : "border-border text-dark"
          )}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray" />
      </div>
    </div>
  );
}

interface SearchBarProps {
  initialFilters?: SearchFiltersState;
  variant?: "hero" | "catalog";
}

export function SearchBar({
  initialFilters = DEFAULT_FILTERS,
  variant = "hero",
}: SearchBarProps) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => setFilters(initialFilters), [initialFilters]);

  const count = useMemo(() => estimateCatalogCount(filters), [filters]);

  const update = (key: keyof SearchFiltersState) => (value: string) =>
    setFilters((p) => ({ ...p, [key]: value }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = buildSearchParams(filters);
    router.push(q ? `/catalog?${q}` : "/catalog");
  };

  const hasFilters = Object.keys(DEFAULT_FILTERS).some(
    (k) => filters[k as keyof SearchFiltersState] !== DEFAULT_FILTERS[k as keyof SearchFiltersState]
  );

  const wrapper =
    variant === "hero"
      ? "container-main relative z-10 mt-4 sm:-mt-12 md:-mt-14 lg:-mt-16"
      : "container-main";

  return (
    <div className={wrapper}>
      <form onSubmit={handleSearch} className="min-w-0 rounded-card bg-white p-4 shadow-card sm:p-5 md:p-6 lg:p-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:gap-4">
          <FilterSelect label="Город" options={searchFilters.cities} value={filters.city} onChange={update("city")} />
          <FilterSelect label="Цена, ₽" options={searchFilters.priceRanges} value={filters.price} onChange={update("price")} />
          <FilterSelect label="Площадь, м²" options={searchFilters.areaRanges} value={filters.area} onChange={update("area")} />
          <FilterSelect label="Комнат" options={searchFilters.rooms} value={filters.rooms} onChange={update("rooms")} />
          <FilterSelect label="Этажность" options={searchFilters.floors} value={filters.floors} onChange={update("floors")} />
          <FilterSelect label="Статус" options={searchFilters.readiness} value={filters.readiness} onChange={update("readiness")} />
          <FilterSelect label="Газ" options={searchFilters.gas} value={filters.gas} onChange={update("gas")} />
          <FilterSelect label="Предчистовая" options={searchFilters.prefinish} value={filters.prefinish} onChange={update("prefinish")} />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {variant === "catalog" && hasFilters && (
            <Button type="button" variant="outline" onClick={() => { setFilters(DEFAULT_FILTERS); router.push("/catalog"); }} className="rounded-xl">
              <X className="h-4 w-4" /> Сбросить
            </Button>
          )}
          <Button type="submit" className="h-12 w-full rounded-xl px-8 sm:ml-auto sm:w-auto">
            Показать {count} {pluralizeHouses(count)}
          </Button>
        </div>
      </form>
    </div>
  );
}
