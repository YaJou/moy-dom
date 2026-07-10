"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { houseAmenityBadges } from "@/data/homepage";
import { Button } from "@/components/ui/button";
import { HouseImage } from "@/components/ui/HouseImage";
import { getHouseCover } from "@/lib/house-images";
import { formatPrice, cn } from "@/lib/utils";
import type { House, HouseBadge } from "@/types/house";
import { Heart, MapPin, Maximize2, TreePine, DoorOpen } from "lucide-react";
import Link from "next/link";

type HouseCardProps = Pick<
  House,
  | "id"
  | "title"
  | "city"
  | "district"
  | "price"
  | "area"
  | "land"
  | "rooms"
  | "badge"
  | "promoLabel"
  | "image"
  | "images"
>;

const badgeStyles: Record<HouseBadge, string> = {
  new: "bg-primary text-white",
  sold: "bg-dark/80 text-white",
  sale: "bg-primary text-white",
};

const badgeLabels: Record<HouseBadge, string> = {
  new: "Новый",
  sold: "Продан",
  sale: "Акция",
};

export function HouseCard(props: HouseCardProps) {
  const {
    id,
    title,
    city,
    district,
    price,
    area,
    land,
    rooms,
    badge,
    promoLabel,
  } = props;
  const house = props as House;
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(id);
  const cover = getHouseCover(house);

  return (
    <article className="card-base group transition-shadow duration-300 hover:shadow-cardHover">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f0f0f0]">
        <HouseImage
          src={cover}
          alt={title}
          fill
          objectFit="contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 flex gap-1.5 sm:left-4 sm:top-4">
          <span
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wide sm:px-3 sm:text-[13px]",
              badgeStyles[badge]
            )}
          >
            {badgeLabels[badge]}
          </span>
          {promoLabel && (
            <span className="rounded-lg bg-dark px-2.5 py-1 text-xs font-bold text-white sm:px-3">
              {promoLabel}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => toggleFavorite(id)}
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors sm:right-4 sm:top-4",
            favorite ? "text-primary" : "text-gray hover:text-primary"
          )}
          aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
        >
          <Heart className={cn("h-4 w-4", favorite && "fill-primary")} />
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-base font-semibold text-dark sm:text-lg">{title}</h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
          {city}
          {district && `, ${district}`}
        </div>
        <div className="mt-3 text-xl font-bold text-dark sm:text-2xl">
          {formatPrice(price)}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {houseAmenityBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-medium text-primary sm:text-xs"
            >
              {badge}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-gray">
          <div className="flex items-center gap-1.5">
            <Maximize2 className="h-4 w-4 text-primary" />
            <span>{area} м²</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TreePine className="h-4 w-4 text-primary" />
            <span>{land} сот.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DoorOpen className="h-4 w-4 text-primary" />
            <span>{rooms} комн.</span>
          </div>
        </div>

        <Button asChild variant="outline" className="mt-4 w-full rounded-xl">
          <Link href={`/catalog/${id}`}>Подробнее</Link>
        </Button>
      </div>
    </article>
  );
}
