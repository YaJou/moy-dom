"use client";

import { CompareButton } from "@/components/house/CompareButton";
import { siteConfig } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { Phone } from "lucide-react";

export function HouseMobilePrice({ house }: { house: House }) {
  return (
    <div className="sticky top-14 z-20 -mx-4 border-b border-border bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
      <p className="text-2xl font-bold text-dark sm:text-3xl">
        {formatPrice(house.price)}
      </p>
      <p className="mt-0.5 text-sm text-gray">
        {house.area} м² · {house.land} сот. · {house.rooms} комн.
      </p>
      <div className="mt-3 flex gap-2">
        <a
          href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4" />
          Позвонить
        </a>
        <CompareButton houseId={house.id} className="flex-1 [&_button]:h-[42px]" />
      </div>
    </div>
  );
}
