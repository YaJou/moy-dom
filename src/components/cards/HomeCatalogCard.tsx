"use client";

import { CompareButton } from "@/components/house/CompareButton";
import { FavoriteButton } from "@/components/house/FavoriteButton";
import { Button } from "@/components/ui/button";
import { HouseImage } from "@/components/ui/HouseImage";
import { getHouseCover } from "@/lib/house-images";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import {
  ArrowRight,
  DoorOpen,
  MapPin,
  Maximize2,
  TreePine,
} from "lucide-react";
import Link from "next/link";

interface HomeCatalogCardProps {
  house: House;
  priority?: boolean;
}

export function HomeCatalogCard({ house, priority = false }: HomeCatalogCardProps) {
  const cover = getHouseCover(house);
  const hasPlan = house.images.some((img) => img.endsWith("/01.jpg"));
  const statusLabel =
    house.readiness === "ready" ? "Готов" : "В продаже";

  return (
    <article className="card-base group transition-shadow duration-160 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden bg-page">
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
          />
        </Link>
        <span className="absolute left-4 top-4 rounded-sm bg-success px-2.5 py-1 text-xs font-semibold text-white">
          {statusLabel}
        </span>
        <FavoriteButton houseId={house.id} className="absolute right-4 top-4" />
      </div>

      <div className="p-5">
        <Link href={`/catalog/${house.id}`}>
          <h3 className="text-[22px] font-bold leading-[30px] tracking-[-0.35px] text-text">
            Дом {house.area} м²
          </h3>
        </Link>
        <Link
          href={`/catalog/${house.city.toLowerCase() === "саратов" ? "saratov" : house.city.toLowerCase() === "энгельс" ? "engels" : "balakovo"}/`}
          className="mt-1.5 flex items-center gap-1.5 text-sm text-muted hover:text-text"
        >
          <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          {house.city}, {house.district}
        </Link>
        <p className="mt-3 text-[28px] font-extrabold leading-9 tabular-nums text-text">
          {formatPrice(house.price)}
        </p>

        <div className="mt-3 grid grid-cols-3 divide-x divide-border text-sm text-text">
          <div className="flex flex-col items-center gap-1 pr-2 text-center">
            <Maximize2 className="h-4 w-4 text-muted" strokeWidth={1.75} />
            <span>{house.area} м²</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-2 text-center">
            <TreePine className="h-4 w-4 text-muted" strokeWidth={1.75} />
            <span>{house.land} сот.</span>
          </div>
          <div className="flex flex-col items-center gap-1 pl-2 text-center">
            <DoorOpen className="h-4 w-4 text-muted" strokeWidth={1.75} />
            <span>{house.rooms} комн.</span>
          </div>
        </div>

        <Link
          href={`/catalog/${house.id}#included`}
          className="mt-3 inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-text"
        >
          Что входит в цену
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </Link>

        <div className="mt-5 flex gap-2">
          <Button asChild variant="outline" className="h-11 flex-1 text-sm">
            <Link href={`/catalog/${house.id}`}>
              {hasPlan ? "Фото и планировка" : "Фото и описание"}
            </Link>
          </Button>
          <CompareButton houseId={house.id} variant="icon" className="h-11 w-11 shrink-0" />
        </div>
      </div>
    </article>
  );
}
