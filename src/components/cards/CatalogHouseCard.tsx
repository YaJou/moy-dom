"use client";

import { FavoriteButton } from "@/components/home/FavoriteButton";
import { CompareButton } from "@/components/house/CompareButton";
import { HouseImage } from "@/components/ui/HouseImage";
import {
  formatGasLabel,
  formatRepairLabel,
  getCatalogCardSlides,
} from "@/lib/house-images";
import { formatPrice, cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CatalogHouseCardProps {
  house: House;
  priority?: boolean;
}

function landText(land: number): string {
  return Number.isInteger(land)
    ? `${land}`
    : String(land).replace(".", ",");
}

function bedroomsLabel(n: number): string {
  if (n === 1) return "1 спальня";
  if (n < 5) return `${n} спальни`;
  return `${n} спален`;
}

export function CatalogHouseCard({
  house,
  priority = false,
}: CatalogHouseCardProps) {
  const slides = getCatalogCardSlides(house);
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);
  const touchX = useRef<number | null>(null);
  const slide = slides[index] ?? slides[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIndex(0);
  }, [house.id]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 40) return;
    go(dx < 0 ? 1 : -1);
  };

  const openLightbox = (at?: number) => {
    if (typeof at === "number") setIndex(at);
    setLightbox(true);
  };

  return (
    <article className="catalog-card flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-shadow duration-[160ms] hover:shadow-card-hover">
      <div
        className="relative aspect-[4/3] cursor-zoom-in overflow-hidden bg-page"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onClick={() => openLightbox()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox();
          }
        }}
        aria-label={`Открыть фото: ${slide?.label ?? "галерея"}`}
      >
        {slide && (
          <HouseImage
            src={slide.src}
            alt={`${house.title} — ${slide.label}`}
            fill
            objectFit={slide.kind === "plan" ? "contain" : "cover"}
            priority={priority && index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
          />
        )}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="catalog-card-arrow left-2"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="catalog-card-arrow right-2"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold text-white">
            {slide?.label}
          </span>
          {slides.length > 1 && (
            <span className="rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold tabular-nums text-white">
              {index + 1}&nbsp;/&nbsp;{slides.length}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-extrabold leading-snug text-text">
          Дом {house.area} м² · участок {landText(house.land)} соток
        </h3>
        <p className="mt-1 text-sm text-muted">
          {house.city}, {house.district}
        </p>
        <p className="mt-3 text-xl font-extrabold tracking-tight text-text">
          {formatPrice(house.price)}
        </p>

        <p className="mt-3 text-sm text-muted">
          {bedroomsLabel(house.bedrooms)}
          {" · "}
          {formatRepairLabel(house.specs.repair)}
          {" · "}
          {formatGasLabel(house.specs.gas)}
        </p>

        {house.featureLine && (
          <p className="mt-2 text-sm font-semibold leading-snug text-[#2c332f]">
            {house.featureLine}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            className="font-medium text-orange hover:underline"
            onClick={() => openLightbox(0)}
          >
            Фото
          </button>
          <span className="text-border">·</span>
          {slides.some((s) => s.kind === "plan") ? (
            <button
              type="button"
              className="font-medium text-orange hover:underline"
              onClick={() => {
                const i = slides.findIndex((s) => s.kind === "plan");
                openLightbox(i >= 0 ? i : 0);
              }}
            >
              Планировка
            </button>
          ) : (
            <span className="text-muted">Планировка скоро</span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-5">
          <Link
            href={`/catalog/${house.id}/`}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Подробнее о доме
          </Link>
          <div className="flex items-center gap-2">
            <FavoriteButton
              houseId={house.id}
              labeled
              className="flex-1"
            />
            <CompareButton
              houseId={house.id}
              variant="labeled"
              className="flex-1"
            />
          </div>
        </div>
      </div>

      {mounted &&
        lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal
            aria-label={`Фото дома — ${house.title}`}
            onClick={() => setLightbox(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-text"
              aria-label="Закрыть"
              onClick={() => setLightbox(false)}
            >
              <X className="h-5 w-5" />
            </button>

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-text shadow sm:left-5"
                  aria-label="Предыдущее фото"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-text shadow sm:right-5"
                  aria-label="Следующее фото"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div
              className="relative flex w-full max-w-4xl flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[min(72vh,680px)] w-full overflow-hidden rounded-xl bg-white">
                <HouseImage
                  src={slide.src}
                  alt={`${house.title} — ${slide.label}`}
                  fill
                  objectFit="contain"
                  sizes="900px"
                />
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-white">
                <span className="rounded-md bg-black/45 px-2.5 py-1">
                  {slide.label}
                </span>
                <span className="tabular-nums text-white/90">
                  {index + 1} / {slides.length}
                </span>
              </div>
            </div>
          </div>,
          document.body
        )}
    </article>
  );
}
