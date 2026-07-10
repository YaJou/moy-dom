import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import type { House } from "@/types/house";
import { HouseTrustBlock } from "@/components/house/HouseTrustBlock";
import {
  Building2,
  Car,
  Droplets,
  Flame,
  Home,
  MapPin,
  Ruler,
  Trees,
  Zap,
} from "lucide-react";
import Link from "next/link";

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
    { icon: Zap, label: "Электричество", value: specs.electricity },
    { icon: Droplets, label: "Водоснабжение", value: specs.water },
    { icon: Flame, label: "Газ", value: specs.gas },
    { icon: Droplets, label: "Канализация", value: specs.sewage },
    { icon: Car, label: "Парковка", value: specs.parking },
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

interface HousePriceCardProps {
  house: House;
}

export function HousePriceCard({ house }: HousePriceCardProps) {
  return (
    <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6">
      <p className="text-3xl font-bold text-dark sm:text-4xl">
        {formatPrice(house.price)}
      </p>
      <p className="mt-1 text-sm text-gray">
        {house.area} м² · {house.land} сот. · {house.rooms} комн.
      </p>

      <ul className="mt-5 space-y-2">
        {house.highlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-dark before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-primary"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <a
          href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
          className="flex h-12 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          Позвонить
        </a>
        <Link
          href="/#consultation"
          className="flex h-12 items-center justify-center rounded-xl border border-border text-sm font-semibold text-dark transition-colors hover:border-primary hover:text-primary"
        >
          Заказать просмотр
        </Link>
      </div>

      <HouseTrustBlock />

      <p className="mt-4 text-center text-xs text-gray">
        Застройщик: {house.builder}
      </p>
    </div>
  );
}
