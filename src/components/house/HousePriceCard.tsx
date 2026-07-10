import { CompareButton } from "@/components/house/CompareButton";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site";
import type { House } from "@/types/house";
import { HouseTrustBlock } from "@/components/house/HouseTrustBlock";
import Link from "next/link";

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
        <CompareButton houseId={house.id} />
      </div>

      <HouseTrustBlock />

      <p className="mt-4 text-center text-xs text-gray">
        Застройщик: {house.builder}
      </p>
    </div>
  );
}
