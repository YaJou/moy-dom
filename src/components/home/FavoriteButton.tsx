"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";
import { IconHeart } from "./icons";

interface FavoriteButtonProps {
  houseId: number;
  className?: string;
}

export function FavoriteButton({ houseId, className }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(houseId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(houseId)}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-control border border-border bg-surface/95 text-text transition-colors hover:border-orange/40",
        active && "border-orange text-orange",
        className
      )}
      aria-label={active ? "Убрать из избранного" : "Добавить в избранное"}
      aria-pressed={active}
    >
      <IconHeart filled={active} />
    </button>
  );
}
