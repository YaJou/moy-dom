"use client";

import { useFavorites } from "@/context/FavoritesContext";
import { cn } from "@/lib/utils";
import { IconHeart } from "./icons";

interface FavoriteButtonProps {
  houseId: number;
  className?: string;
  labeled?: boolean;
}

export function FavoriteButton({
  houseId,
  className,
  labeled = false,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(houseId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(houseId)}
      className={cn(
        "inline-flex items-center justify-center rounded-xl border border-border bg-surface/95 text-text transition-colors hover:border-orange/40",
        labeled ? "h-11 gap-2 px-3 text-sm font-semibold" : "h-11 w-11",
        active && "border-orange text-orange",
        className
      )}
      aria-label={active ? "Убрать из сохранённых" : "Сохранить"}
      aria-pressed={active}
    >
      <IconHeart filled={active} />
      {labeled ? <span>{active ? "Сохранено" : "Сохранить"}</span> : null}
    </button>
  );
}
