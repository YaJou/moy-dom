import type { HouseDetailContent } from "@/data/house-detail";
import { MapPin } from "lucide-react";

interface HouseInfrastructureProps {
  detail: HouseDetailContent;
}

export function HouseInfrastructure({ detail }: HouseInfrastructureProps) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">Инфраструктура</h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {detail.infrastructure.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-white p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
              <MapPin className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray">{item.label}</p>
              <p className="text-sm font-semibold text-dark">{item.distance}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
