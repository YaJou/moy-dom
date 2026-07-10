import type { HouseDetailContent } from "@/data/house-detail";
import { Users } from "lucide-react";

interface HouseAudienceProps {
  detail: HouseDetailContent;
}

export function HouseAudience({ detail }: HouseAudienceProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Кому подойдёт этот дом
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {detail.targetAudience.map((card) => (
          <div
            key={card.title}
            className="rounded-card border border-border bg-white p-5 shadow-card"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-light">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-dark">{card.title}</h3>
            <p className="mt-2 text-sm text-gray">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
