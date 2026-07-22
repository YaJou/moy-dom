import type { House } from "@/types/house";
import {
  Building2,
  Droplets,
  Flame,
  Home,
  MapPin,
  Ruler,
  Trees,
} from "lucide-react";

interface HouseSpecsGridProps {
  house: House;
}

export function HouseSpecsGrid({ house }: HouseSpecsGridProps) {
  const { specs } = house;

  const items = [
    { icon: Home, label: "Комнат", value: `${house.rooms}` },
    { icon: Ruler, label: "Площадь дома", value: `${house.area} м²` },
    { icon: Trees, label: "Участок", value: `${house.land} сот.` },
    { icon: Building2, label: "Этажей", value: `${specs.floors}` },
    { icon: Building2, label: "Год постройки", value: `${specs.buildYear}` },
    { icon: Building2, label: "Материал стен", value: specs.wallMaterial },
    { icon: Home, label: "Терраса", value: specs.terrace },
    { icon: Home, label: "Ремонт", value: specs.repair },
    { icon: Droplets, label: "Водоснабжение", value: specs.water },
    { icon: Flame, label: "Газ", value: specs.gas },
    { icon: Droplets, label: "Канализация", value: specs.sewage },
    { icon: MapPin, label: "Дорога", value: specs.road },
    { icon: MapPin, label: "До центра", value: specs.distanceToCenter },
    {
      icon: Building2,
      label: "Ипотека",
      value: specs.familyMortgage
        ? "Семейная ипотека"
        : specs.mortgage
          ? "Возможна"
          : "Нет",
    },
  ];

  return (
    <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6">
      <h2 className="mb-5 text-xl font-bold text-dark">Характеристики</h2>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.label} className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <dt className="text-xs text-gray">{item.label}</dt>
              <dd className="text-sm font-medium text-dark">{item.value}</dd>
            </div>
          </div>
        ))}
      </dl>
      <div className="mt-5 border-t border-border pt-5">
        <p className="text-xs text-gray">Инфраструктура</p>
        <p className="mt-1 text-sm text-dark">
          {specs.infrastructure.join(", ")}
        </p>
      </div>
    </div>
  );
}
