import { getFeaturedHouses, getHousesByCity } from "@/data/houses";
import { HouseCard } from "@/components/cards/HouseCard";
import { getCityCatalogHref } from "@/lib/catalog-urls";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface NewHousesProps {
  city?: string;
  title?: string;
  catalogHref?: string;
}

export function NewHouses({
  city,
  title = "Новые дома",
  catalogHref,
}: NewHousesProps = {}) {
  const houses = city
    ? getHousesByCity(city).filter((h) => h.featured)
    : getFeaturedHouses();
  const href = catalogHref ?? (city ? getCityCatalogHref(city) : "/catalog");
  const displayHouses = houses.length > 0 ? houses : city ? getHousesByCity(city) : houses;

  return (
    <section className="section-padding bg-white pt-8 sm:pt-20 md:pt-24">
      <div className="container-main">
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10 lg:mb-12">
          <h2 className="section-title">{title}</h2>
          <Link href={href} className="section-link shrink-0">
            Смотреть все дома
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {displayHouses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
            {displayHouses.map((house) => (
              <HouseCard key={house.id} {...house} />
            ))}
          </div>
        ) : (
          <div className="rounded-card border border-border bg-background p-8 text-center">
            <p className="text-gray">
              Сейчас подбираем объекты{city ? ` в городе ${city}` : ""}. Оставьте
              заявку — пришлём актуальные варианты.
            </p>
            <Link
              href="/#consultation"
              className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Получить консультацию
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
