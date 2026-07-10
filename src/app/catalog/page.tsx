import { HouseCard } from "@/components/cards/HouseCard";
import { SearchBar } from "@/components/sections/SearchBar";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { housesData } from "@/data/site";
import {
  countActiveFilters,
  filterHouses,
  parseSearchParams,
} from "@/lib/filters";
import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Каталог домов",
  description:
    "Каталог готовых частных домов в Саратове, Энгельсе и Балаково. Фильтр по цене, площади, количеству комнат и готовности.",
  alternates: {
    canonical: "/catalog",
  },
};

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const filters = parseSearchParams(params);
  const results = filterHouses(housesData, filters);
  const activeCount = countActiveFilters(filters);

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог домов" },
        ]}
      />

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

function pluralizeHouses(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) return "домов";
  if (mod10 === 1) return "дом";
  if (mod10 >= 2 && mod10 <= 4) return "дома";
  return "домов";
}
