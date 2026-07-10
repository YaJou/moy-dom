import { featuresData } from "@/data/site";
import { FeatureCard } from "@/components/cards/FeatureCard";

export function Features() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="section-title mb-3 text-center">Почему выбирают нас</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray sm:text-base">
          Полный цикл — от проекта до заселения. Всё включено, без скрытых доплат.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {featuresData.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
