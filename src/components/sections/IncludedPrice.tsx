import { includedPriceData } from "@/data/homepage";
import {
  Home,
  Map,
  Flame,
  Zap,
  Droplets,
  Waves,
  Thermometer,
  Layers,
  Paintbrush,
  Square,
  DoorOpen,
} from "lucide-react";

const iconList = [
  Home,
  Map,
  Flame,
  Zap,
  Droplets,
  Waves,
  Thermometer,
  Layers,
  Paintbrush,
  Square,
  DoorOpen,
];

export function IncludedPrice() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <h2 className="section-title mb-3 text-center">{includedPriceData.title}</h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-gray sm:text-base">
          Всё перечисленное уже включено в стоимость — без скрытых доплат за коммуникации и участок.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {includedPriceData.items.map((item, i) => {
            const Icon = iconList[i] || Home;
            return (
              <div
                key={item}
                className="flex items-center gap-3 rounded-card border border-border bg-background p-4 sm:p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-dark sm:text-base">{item}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
