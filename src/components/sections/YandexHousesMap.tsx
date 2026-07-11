"use client";

import { buildYandexMapEmbedUrl } from "@/lib/yandex-map";
import type { House } from "@/types/house";
import { useMemo } from "react";

interface YandexHousesMapProps {
  houses: House[];
}

export function YandexHousesMap({ houses }: YandexHousesMapProps) {
  const src = useMemo(() => buildYandexMapEmbedUrl(houses), [houses]);

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
