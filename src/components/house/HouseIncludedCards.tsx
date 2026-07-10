import { includedPriceItems } from "@/data/house-detail";
import {
  Home,
  Map,
  Flame,
  Zap,
  Droplets,
  Waves,
  Thermometer,
  Paintbrush,
  Layers,
  Cable,
  FileCheck,
} from "lucide-react";

const icons = [
  Home,
  Map,
  Flame,
  Zap,
  Droplets,
  Waves,
  Thermometer,
  Paintbrush,
  Layers,
  Cable,
  FileCheck,
];

export function HouseIncludedCards() {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-dark sm:text-2xl">
        Что входит в стоимость
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {includedPriceItems.map((item, i) => {
          const Icon = icons[i] ?? Home;
          return (
            <div
              key={item}
              className="flex items-center gap-2.5 rounded-xl border border-border bg-background p-3 sm:p-4"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-dark">{item}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
