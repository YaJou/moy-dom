"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

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
        "flex h-11 w-11 items-center justify-center rounded-full bg-surface/95 shadow-sm transition-colors",
        active ? "text-orange" : "text-muted hover:text-orange",
        className
      )}
      aria-label={active ? "Убрать из избранного" : "Добавить в избранное"}
    >
      <Heart
        className="h-5 w-5"
        strokeWidth={1.75}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  );
}
