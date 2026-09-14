"use client";

import { CompareButton } from "@/components/house/CompareButton";
import { HouseImage } from "@/components/ui/HouseImage";
import { getHouseCover } from "@/lib/house-images";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import Link from "next/link";
import { FavoriteButton } from "./FavoriteButton";
import { IconMapPin } from "./icons";

interface HomeHouseCardProps {
  house: House;
  priority?: boolean;
}

function roomsLabel(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return `${n} комнат`;
  if (mod10 === 1) return `${n} комната`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} комнаты`;
  return `${n} комнат`;
}

function citySlug(city: string): string {
  const c = city.toLowerCase();
  if (c === "саратов") return "saratov";
  if (c === "энгельс") return "engels";
  return "balakovo";
}

export function HomeHouseCard({ house, priority = false }: HomeHouseCardProps) {
  const cover = getHouseCover(house);
  const statusLabel = house.readiness === "ready" ? "Готов" : "В продаже";
  const shortTitle = `Дом ${house.area} м²`;
  const landText =
    Number.isInteger(house.land) ? `${house.land}` : String(house.land).replace(".", ",");

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
        <span className="status-badge absolute left-4 top-4">
          {statusLabel}
        </span>
        <FavoriteButton
          houseId={house.id}
          className="absolute right-4 top-4"
        />
      </div>

      <div className="p-5">
        <Link href={`/catalog/${house.id}`}>
          <h3 className="card-title font-extrabold text-text">{shortTitle}</h3>
        </Link>
        <Link
          href={`/catalog/${citySlug(house.city)}/`}
          className="mt-1.5 flex items-center gap-1 text-sm text-muted hover:text-text"
        >
          <IconMapPin className="h-4 w-4 text-forest" />
          {house.city}, {house.district}
        </Link>
        <p className="price-lg mt-3 font-extrabold text-text">
          {formatPrice(house.price)}
        </p>

        <p className="mt-2 text-sm text-muted">
          {house.area} м² · {landText} сот. · {roomsLabel(house.rooms)}
        </p>

        <div className="mt-5 flex gap-2">
          <Link
            href={`/catalog/${house.id}`}
            className="btn-secondary h-11 flex-1 text-sm"
          >
            Фото и планировка
          </Link>
          <CompareButton
            houseId={house.id}
            variant="icon"
            className="!h-11 !w-11 shrink-0 !rounded-control border border-border !bg-surface !shadow-none"
          />
        </div>

        <Link
          href={`/catalog/${house.id}#included`}
          className="catalog-price-link mt-4 inline-block"
        >
          Что входит в цену →
        </Link>
      </div>
    </article>
  );
}
