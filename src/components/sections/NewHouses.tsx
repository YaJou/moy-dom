import { getFeaturedHouses } from "@/data/houses";
import { HouseCard } from "@/components/cards/HouseCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function NewHouses() {
  const houses = getFeaturedHouses();

  return (
    <section className="section-padding bg-white pt-8 sm:pt-20 md:pt-24">
      <div className="container-main">
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10 lg:mb-12">
          <h2 className="section-title">Новые дома</h2>
          <Link href="/catalog" className="section-link shrink-0">
            Смотреть все дома
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-7">
          {houses.map((house) => (
            <HouseCard key={house.id} {...house} />
          ))}
        </div>
      </div>
    </section>
  );
}
