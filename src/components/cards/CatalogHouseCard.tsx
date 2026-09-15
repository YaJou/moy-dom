"use client";

import { FavoriteButton } from "@/components/home/FavoriteButton";
import { CompareButton } from "@/components/house/CompareButton";
import { HouseImage } from "@/components/ui/HouseImage";
import {
  formatGasLabel,
  formatRepairLabel,
  getCatalogCardSlides,
  type CatalogCardSlide,
} from "@/lib/house-images";
import { formatPrice, cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface CatalogHouseCardProps {
  house: House;
  priority?: boolean;
}

function landText(land: number): string {
  return Number.isInteger(land)
    ? `${land}`
    : String(land).replace(".", ",");
}

export function CatalogHouseCard({
  house,
  priority = false,
}: CatalogHouseCardProps) {
  const slides = getCatalogCardSlides(house);
  const [index, setIndex] = useState(0);
  const [planOpen, setPlanOpen] = useState(false);
  const touchX = useRef<number | null>(null);
  const slide = slides[index] ?? slides[0];

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    setIndex(0);
  }, [house.id]);

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

  const openPlan = (s: CatalogCardSlide) => {
    if (s.kind === "plan") setPlanOpen(true);
  };

  return (
    <article className="catalog-card flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-shadow duration-[160ms] hover:shadow-card-hover">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-page"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <HouseImage
          src={slide.src}
          alt={`${house.title} — ${slide.label}`}
          fill
          objectFit={slide.kind === "plan" ? "contain" : "cover"}
          priority={priority && index === 0}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 384px"
        />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              className="catalog-card-arrow left-2 hidden sm:flex"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="catalog-card-arrow right-2 hidden sm:flex"
              onClick={() => go(1)}
              aria-label="Следующее фото"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold text-white">
            {slide.label}
          </span>
          <div className="flex gap-1">
            {slides.map((s, i) => (
              <button
                key={s.kind}
                type="button"
                aria-label={s.label}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  i === index ? "bg-white" : "bg-white/45"
                )}
              />
            ))}
          </div>
        </div>

        {slide.kind === "plan" && (
          <button
            type="button"
            onClick={() => openPlan(slide)}
            className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-[11px] font-semibold text-text shadow-sm"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Увеличить
          </button>
        )}
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
          {house.bedrooms}{" "}
          {house.bedrooms === 1
            ? "спальня"
            : house.bedrooms < 5
              ? "спальни"
              : "спален"}
          {" · "}
          {formatRepairLabel(house.specs.repair)}
          {" · "}
          {formatGasLabel(house.specs.gas)}
        </p>

        {house.featureLine && (
          <p className="mt-2 text-sm font-medium text-text">
            {house.featureLine}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-sm">
          <button
            type="button"
            className="font-medium text-orange hover:underline"
            onClick={() => setIndex(0)}
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
                if (i >= 0) {
                  setIndex(i);
                  setPlanOpen(true);
                }
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

      {planOpen && slide.kind === "plan" && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal
          aria-label="Планировка"
          onClick={() => setPlanOpen(false)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-text"
            aria-label="Закрыть"
            onClick={() => setPlanOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative h-[min(80vh,720px)] w-full max-w-4xl overflow-hidden rounded-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <HouseImage
              src={slides.find((s) => s.kind === "plan")!.src}
              alt={`Планировка — ${house.title}`}
              fill
              objectFit="contain"
              sizes="900px"
            />
          </div>
        </div>
      )}
    </article>
  );
}
