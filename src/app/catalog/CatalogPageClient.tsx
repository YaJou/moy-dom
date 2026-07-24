"use client";

import { HouseCard } from "@/components/cards/HouseCard";
import { SearchBar } from "@/components/sections/SearchBar";
import { housesData } from "@/data/site";
import {
  countActiveFilters,
  filterHouses,
  parseSearchParams,
} from "@/lib/filters";
import { DEFAULT_FILTERS, type SearchFiltersState } from "@/types/house";
import { SearchX } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

function pluralizeHouses(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return "домов";
  if (mod10 === 1) return "дом";
  if (mod10 >= 2 && mod10 <= 4) return "дома";
  return "домов";
}

export function CatalogPageClient() {
  const searchParams = useSearchParams();

  const filters = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return Object.keys(params).length
      ? parseSearchParams(params)
      : ({ ...DEFAULT_FILTERS } as SearchFiltersState);
  }, [searchParams]);

  const results = useMemo(
    () => filterHouses(housesData, filters),
    [filters]
  );
  const activeCount = countActiveFilters(filters);

  return (
    <>
      <section className="bg-white pb-6 pt-2 sm:pb-8">
        <div className="container-main mb-6 sm:mb-8">
          <h1 className="section-title">Каталог домов</h1>
          <p className="mt-2 text-sm text-gray sm:text-base">
            {activeCount > 0
              ? `Найдено ${results.length} ${pluralizeHouses(results.length)} по выбранным фильтрам`
              : `Всего ${housesData.length} ${pluralizeHouses(housesData.length)} в каталоге`}
          </p>
        </div>

        <SearchBar initialFilters={filters} variant="catalog" />
      </section>

      <section className="section-padding bg-white pt-6 sm:pt-8">
        <div className="container-main">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
              {results.map((house) => (
                <HouseCard key={house.id} {...house} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-card border border-border bg-background py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                <SearchX className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-dark">
                Дома не найдены
              </h2>
              <p className="mt-2 max-w-md text-sm text-gray sm:text-base">
                По выбранным параметрам ничего не найдено. Попробуйте изменить
                фильтры или сбросить их.
              </p>
              <Link
                href="/catalog"
                className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                Сбросить фильтры
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
