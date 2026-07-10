import { citiesData } from "@/data/site";
import { CityCard } from "@/components/cards/CityCard";

export function Cities() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="section-title mb-8 sm:mb-10 lg:mb-12">
          Дома в наших городах
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {citiesData.map((city) => (
            <CityCard key={city.id} {...city} />
          ))}
        </div>
      </div>
    </section>
  );
}
