"use client";

import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/Select";
import { searchFilters } from "@/data/site";
import {
  buildSearchParams,
  estimateCatalogCount,
  pluralizeHouses,
} from "@/lib/filters";
import { cn } from "@/lib/utils";
import { DEFAULT_FILTERS, type SearchFiltersState } from "@/types/house";
import { X } from "lucide-react";
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
  return (
    <div className={cn("min-w-0", className)}>
      <label className="mb-1.5 block text-xs font-medium text-gray sm:text-sm">
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
    router.push(q ? `/catalog/?${q}` : "/catalog/");
  };

  const hasFilters = Object.keys(DEFAULT_FILTERS).some(
    (k) => filters[k as keyof SearchFiltersState] !== DEFAULT_FILTERS[k as keyof SearchFiltersState]
  );

  const wrapper =
    variant === "hero"
      ? "container-main relative z-10 mt-4 sm:-mt-12 md:-mt-14 lg:-mt-16"
      : "container-main";

  // Каталог использует CatalogFilters — этот SearchBar для hero/лендингов.
  return (
    <div className={wrapper}>
      <form onSubmit={handleSearch} className="min-w-0 rounded-card bg-white p-4 shadow-card sm:p-5 md:p-6 lg:p-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:gap-4">
          <FilterSelect label="Город" options={searchFilters.cities} value={filters.city} onChange={update("city")} />
          <FilterSelect label="Бюджет" options={searchFilters.priceRanges} value={filters.price} onChange={update("price")} />
          <FilterSelect label="Спальни" options={searchFilters.bedrooms} value={filters.bedrooms} onChange={update("bedrooms")} />
          <FilterSelect label="Площадь, м²" options={searchFilters.areaRanges} value={filters.area} onChange={update("area")} />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {variant === "catalog" && hasFilters && (
            <Button type="button" variant="outline" onClick={() => { setFilters(DEFAULT_FILTERS); router.push("/catalog/"); }} className="rounded-xl">
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
