"use client";

import { HouseImage } from "@/components/ui/HouseImage";
import { cn } from "@/lib/utils";
import {
  getHouseGallery,
  isFloorPlan,
  isProjectVisualization,
} from "@/lib/house-images";
import type { House } from "@/types/house";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface HouseGalleryProps {
  house: House;
}

export function HouseGallery({ house }: HouseGalleryProps) {
  const images = getHouseGallery(house);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActive((index + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, active, goTo]);

  const currentSrc = images[active];

  return (
    <>
      <div>
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative flex aspect-[16/10] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-card bg-[#f0f0f0]"
          aria-label="Увеличить фото"
        >
          <HouseImage
            src={currentSrc}
            alt={`${house.title} — фото ${active + 1}`}
            fill
            objectFit="contain"
            sizes="(max-width: 1024px) 100vw, 66vw"
            priority
          />
          {isFloorPlan(currentSrc) ? (
            <span className="absolute left-4 top-4 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white">
              Планировка
            </span>
          ) : isProjectVisualization(currentSrc) ? (
            <span className="absolute left-4 top-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
              Визуализация проекта
            </span>
          ) : null}
          <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="h-3.5 w-3.5" />
            Увеличить
          </span>
          {images.length > 1 && (
            <span className="absolute bottom-4 left-4 rounded-lg bg-black/50 px-2.5 py-1 text-xs text-white">
              {active + 1} / {images.length}
            </span>
          )}
        </button>

        {images.length > 1 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((img, index) => (
              <button
                key={`${img}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                className={cn(
                  "relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 bg-[#f0f0f0] transition-colors sm:h-20 sm:w-28",
                  active === index ? "border-primary" : "border-transparent"
                )}
              >
                <HouseImage
                  src={img}
                  alt={`Миниатюра ${index + 1}`}
                  fill
                  objectFit="contain"
                  sizes="112px"
                />
                {isFloorPlan(img) && (
                  <span className="absolute bottom-0 left-0 right-0 bg-primary/90 py-0.5 text-center text-[10px] font-medium text-white">
                    План
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setLightbox(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр фото"
        >
          <button
            type="button"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(active - 1);
                }}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-4 sm:h-12 sm:w-12"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(active + 1);
                }}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-4 sm:h-12 sm:w-12"
                aria-label="Следующее фото"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <HouseImage
              src={currentSrc}
              alt={`${house.title} — фото ${active + 1}`}
              fill
              objectFit="contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/80">
            {active + 1} из {images.length}
          </p>
        </div>
      )}
    </>
  );
}
