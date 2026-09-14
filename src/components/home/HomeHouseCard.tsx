"use client";

import { CompareButton } from "@/components/house/CompareButton";
import { HouseImage } from "@/components/ui/HouseImage";
import { getHouseCover } from "@/lib/house-images";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { DoorOpen, Maximize2, TreePine } from "lucide-react";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";
import { IconMapPin } from "./icons";

interface HomeHouseCardProps {
  house: House;
  priority?: boolean;
}

export function HomeHouseCard({ house, priority = false }: HomeHouseCardProps) {
  const cover = getHouseCover(house);
  const statusLabel =
    house.readiness === "ready" ? "Готов" : "В продаже";

  return (
    <article className="overflow-hidden rounded-card border border-border bg-surface shadow-card transition-shadow duration-[160ms] hover:shadow-card-hover">
      <div className="relative aspect-[4/3] bg-page">
        <Link
          href={`/catalog/${house.id}`}
          onClick={() => analytics.selectItem(house.id, house.title)}
        >
          <HouseImage
            src={cover}
            alt={house.title}
            fill
            objectFit="cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </Link>
        <span className="absolute left-4 top-4 rounded-sm bg-success px-2.5 py-1 text-xs font-semibold text-white">
          {statusLabel}
        </span>
        <FavoriteButton
          houseId={house.id}
          className="absolute right-4 top-4"
        />
      </div>

      <div className="p-5">
        <Link href={`/catalog/${house.id}`}>
          <h3 className="card-title text-text">{house.title.replace(/^Дом /, "Дом ")}</h3>
        </Link>
        <Link
          href={`/catalog/${house.city.toLowerCase() === "саратов" ? "saratov" : house.city.toLowerCase() === "энгельс" ? "engels" : "balakovo"}/`}
          className="mt-1.5 flex items-center gap-1 text-sm text-muted hover:text-text"
        >
          <IconMapPin />
          {house.city}, {house.district}
        </Link>
        <p className="price-lg mt-3 text-text">{formatPrice(house.price)}</p>

        <div className="mt-3 grid grid-cols-3 divide-x divide-border text-sm text-text">
          <div className="flex flex-col items-center gap-1 px-1 text-center">
            <Maximize2 className="h-4 w-4 text-muted" />
            {house.area} м²
          </div>
          <div className="flex flex-col items-center gap-1 px-1 text-center">
            <TreePine className="h-4 w-4 text-muted" />
            {house.land} сот.
          </div>
          <div className="flex flex-col items-center gap-1 px-1 text-center">
            <DoorOpen className="h-4 w-4 text-muted" />
            {house.rooms} комн.
          </div>
        </div>

        <Link
          href={`/catalog/${house.id}#included`}
          className="mt-3 inline-block text-sm font-medium text-text hover:text-orange"
        >
          Что входит в цену →
        </Link>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/catalog/${house.id}`}
            className="btn-secondary h-11 flex-1 text-sm"
          >
            Фото и описание
          </Link>
          <CompareButton houseId={house.id} variant="icon" />
        </div>
      </div>
    </article>
  );
}
