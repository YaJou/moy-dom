import { HouseCard } from "@/components/cards/HouseCard";
import { SearchBar } from "@/components/sections/SearchBar";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { getHousesByCity } from "@/data/houses";
import { DEFAULT_FILTERS } from "@/types/house";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Дома в Балаково",
  description:
    "Готовые частные дома в Балаково и с. Натальино. Участок 10 соток, газ по границе, семейная ипотека. Кров-Сервис.",
  alternates: { canonical: "/catalog/balakovo" },
};

export default function BalakovoPage() {
  const houses = getHousesByCity("Балаково");

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Каталог", href: "/catalog" },
          { label: "Балаково" },
        ]}
      />

      <section className="bg-white pb-6 pt-2">
        <div className="container-main mb-6">
          <h1 className="section-title">Дома в Балаково</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray sm:text-base">
            Готовые одноэтажные дома в с. Натальино — активно развивающийся
            посёлок в 10 км от Балаково. Участки 10 соток, газ по границе,
            асфальтированный подъезд, школа и магазины рядом. Подходит под
            семейную ипотеку.
          </p>
          <p className="mt-2 text-sm font-medium text-primary">
            {houses.length} {houses.length === 1 ? "дом" : "дома"} в продаже
          </p>
        </div>

        <SearchBar
          initialFilters={{ ...DEFAULT_FILTERS, city: "Балаково" }}
          variant="catalog"
        />
      </section>

      <section className="section-padding bg-white pt-6">
        <div className="container-main">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 lg:gap-7">
            {houses.map((house) => (
              <HouseCard key={house.id} {...house} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
