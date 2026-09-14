"use client";

import { FavoriteButton } from "@/components/home/FavoriteButton";
import { CompareButton } from "@/components/house/CompareButton";
import { HouseImage } from "@/components/ui/HouseImage";
import { Icon } from "@/components/ui/Icon";
import {
  getHouseGalleryCategories,
  type GalleryCategoryId,
} from "@/lib/house-page";
import { cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

interface HouseGalleryProps {
  house: House;
}

export function HouseGallery({ house }: HouseGalleryProps) {
  const categories = useMemo(() => getHouseGalleryCategories(house), [house]);
  const [categoryId, setCategoryId] = useState<GalleryCategoryId>("all");
  const activeCategory =
    categories.find((c) => c.id === categoryId) ?? categories[0];
  const images = activeCategory?.images ?? [];
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setActive(0);
  }, [categoryId]);

  const goTo = useCallback(
    (index: number) => {
      if (!images.length) return;
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

  if (!images.length) return null;
  const currentSrc = images[active];

  return (
    <>
      <div className="hp-gallery">
        <div className="hp-gallery-tabs" role="tablist" aria-label="Категории фото">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={cat.id === activeCategory?.id}
              className={cn(
                "hp-gallery-tab",
                cat.id === activeCategory?.id && "is-active"
              )}
              onClick={() => setCategoryId(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="hp-gallery-main"
          onClick={() => setLightbox(true)}
          aria-label="Увеличить фото"
        >
          <HouseImage
            src={currentSrc}
            alt={`${house.title} — фото ${active + 1}`}
            fill
            objectFit="contain"
            sizes="(max-width: 1024px) 100vw, 808px"
            priority
          />
          <span className="hp-gallery-zoom">
            <Icon name="maximize" className="h-4 w-4" />
            Увеличить
          </span>
          <span className="hp-gallery-counter">
            {active + 1} / {images.length}
          </span>
        </button>

        {images.length > 1 ? (
          <div className="hp-gallery-thumbs">
            {images.map((img, index) => (
              <button
                key={`${img}-${index}`}
                type="button"
                className={cn(
                  "hp-gallery-thumb",
                  active === index && "is-active"
                )}
                onClick={() => setActive(index)}
                aria-label={`Фото ${index + 1}`}
              >
                <HouseImage
                  src={img}
                  alt=""
                  fill
                  objectFit="contain"
                  sizes="88px"
                />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {mounted &&
        lightbox &&
        createPortal(
          <div
            className="hp-lightbox"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фото"
          >
            <button
              type="button"
              className="hp-lightbox-close"
              onClick={() => setLightbox(false)}
              aria-label="Закрыть"
            >
              <Icon name="close" className="h-5 w-5" />
              Закрыть
            </button>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  className="hp-lightbox-nav is-prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(active - 1);
                  }}
                  aria-label="Предыдущее"
                >
                  <Icon name="chevron-left" className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  className="hp-lightbox-nav is-next"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(active + 1);
                  }}
                  aria-label="Следующее"
                >
                  <Icon name="chevron-right" className="h-6 w-6" />
                </button>
              </>
            ) : null}
            <div
              className="hp-lightbox-frame"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentSrc}
                  className="absolute inset-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <HouseImage
                    src={currentSrc}
                    alt={`${house.title} — фото ${active + 1}`}
                    fill
                    objectFit="contain"
                    sizes="92vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export function HouseHeroActions({ houseId }: { houseId: number }) {
  return (
    <div className="hp-hero-actions">
      <FavoriteButton houseId={houseId} />
      <CompareButton houseId={houseId} variant="icon" className="hp-compare-icon" />
    </div>
  );
}
