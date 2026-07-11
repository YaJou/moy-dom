"use client";

import { buildYandexMapEmbedUrl } from "@/lib/yandex-map";
import type { House } from "@/types/house";
import { useMemo } from "react";

interface YandexHousesMapProps {
  houses: House[];
  focusHouse?: House | null;
}

export function YandexHousesMap({ houses, focusHouse }: YandexHousesMapProps) {
  const src = useMemo(
    () => buildYandexMapEmbedUrl(houses, focusHouse),
    [houses, focusHouse]
  );

  if (!src) return null;

  return (
    <iframe
      src={src}
      title="Карта объектов на Яндекс Картах"
      className="h-full min-h-[360px] w-full border-0 sm:min-h-[440px]"
      loading="lazy"
      allowFullScreen
    />
  );
}
