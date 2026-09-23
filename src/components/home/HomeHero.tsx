"use client";

import {
  getHouseById,
  getHousesByCity,
  getMinHousePrice,
  realHouses,
} from "@/data/houses";
import { getCityMinPrice } from "@/data/city-landings";
import { analytics } from "@/lib/analytics";
import { getFloorPlanImage } from "@/lib/floor-plan";
import { isFloorPlan } from "@/lib/house-images";
import { formatPrice, cn } from "@/lib/utils";
import type { House } from "@/types/house";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  IconArrow,
  IconChevronLeft,
  IconChevronRight,
  IconClose,
  IconLeaf,
  IconMapPin,
  IconMaximize,
  IconPhoto,
} from "./icons";
import { useViewingModal } from "./ViewingModalProvider";

/** Главная: 3 дома — у каждого фасад, 1 фото внутри и план. */
const HOME_HERO_SHOTS: {
  id: number;
  facade: string;
  interior: string;
}[] = [
  {
    id: 4,
    facade: "/images/houses/engels-snt-novoe-veselaya-116/02.jpg",
    // У этого объекта пока нет отдельного интерьера — кадр с входом/проёмом.
    interior: "/images/houses/engels-snt-novoe-veselaya-116/07.jpg",
  },
  {
    id: 8,
    facade: "/images/houses/engels-snt-malinki-pokrovskoye-105/03.jpg",
    interior: "/images/houses/engels-snt-malinki-pokrovskoye-105/07.jpg",
  },
  {
    id: 7,
    facade: "/images/houses/engels-snt-malinki-pokrovskoye-87/02.jpg",
    interior: "/images/houses/engels-snt-malinki-pokrovskoye-87/09.jpg",
  },
];

const CITY_HERO_SLUG: Record<string, string> = {
  Балаково: "natalino-stepnaya-87",
  Энгельс: "engels-snt-novoe-veselaya-116",
};

type PhotoMode = "facade" | "interior" | "plan";

type HeroSlide = {
  house: House;
  facade: string;
  interior: string;
  plan: string | null;
};

function pickCityHeroHouse(city: string): House {
  const pool = getHousesByCity(city);
  const withPhotos = pool.filter((h) => h.images.length >= 1);
  const preferred = CITY_HERO_SLUG[city];
  return (
    withPhotos.find((h) => h.slug === preferred) ??
    [...withPhotos].sort((a, b) => b.images.length - a.images.length)[0] ??
    realHouses[0]
  );
}

function photosForHouse(house: House): {
  facade: string[];
  interior: string[];
  plan: string | null;
} {
  const plan = getFloorPlanImage(house.id);
  const photos = house.images.filter((src) => !isFloorPlan(src));
  if (photos.length === 0) {
    return { facade: [house.image], interior: [], plan };
  }
  const mid = Math.max(1, Math.ceil(photos.length / 2));
  const facade = photos.slice(0, mid);
  const interior = photos.slice(mid);
  return {
    facade: facade.length > 0 ? facade : [house.image],
    interior: interior.length > 0 ? interior : facade.slice(0, 1),
    plan,
  };
}

function buildHomeSlides(): HeroSlide[] {
  return HOME_HERO_SHOTS.map((shot) => {
    const house = getHouseById(shot.id) ?? realHouses[0];
    return {
      house,
      facade: shot.facade,
      interior: shot.interior,
      plan: getFloorPlanImage(shot.id),
    };
  });
}

function buildCitySlides(city: string): HeroSlide[] {
  const house = pickCityHeroHouse(city);
  const split = photosForHouse(house);
  const facade = split.facade.slice(0, 3);
  const interiorPool = split.interior.slice(0, 3);
  const interiors =
    interiorPool.length > 0 ? interiorPool : facade.slice(0, 1);

  // На городской странице миниатюры — фото одного дома.
  return facade.map((src, i) => ({
    house,
    facade: src,
    interior: interiors[i % interiors.length],
    plan: split.plan,
  }));
}

export type HomeHeroProps = {
  city?: string;
  title?: string;
  titleAccent?: string;
  subtitle?: string;
  catalogHref?: string;
};

export function HomeHero({
  city,
  title,
  titleAccent,
  subtitle,
  catalogHref = "/#homes",
}: HomeHeroProps = {}) {
  const slides = useMemo(
    () => (city ? buildCitySlides(city) : buildHomeSlides()),
    [city]
  );
  const multiHouse = !city;

  const { openViewing } = useViewingModal();
  const minPrice = city ? getCityMinPrice(city) : getMinHousePrice();
  const [mode, setMode] = useState<PhotoMode>("facade");
  const [slideIndex, setSlideIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMode("facade");
    setSlideIndex(0);
  }, [city]);

  const activeSlide = slides[slideIndex] ?? slides[0];
  const heroHouse = activeSlide?.house ?? realHouses[0];

  const hasPlan = multiHouse
    ? slides.every((s) => Boolean(s.plan))
    : Boolean(activeSlide?.plan);
  const hasInterior = slides.every((s) => Boolean(s.interior));

  const displayPhotos = useMemo(() => {
    if (mode === "plan") {
      // Снизу всегда фасады домов; план — только в основном кадре.
      if (multiHouse) return slides.map((s) => s.facade);
      return activeSlide?.plan ? [activeSlide.plan] : [];
    }
    if (mode === "interior") {
      return slides.map((s) => s.interior);
    }
    return slides.map((s) => s.facade);
  }, [activeSlide, mode, multiHouse, slides]);

  const activePhoto =
    mode === "plan" && multiHouse
      ? (activeSlide?.plan ?? activeSlide?.facade ?? displayPhotos[0])
      : (displayPhotos[slideIndex] ?? displayPhotos[0]);

  const shortTitle = `Дом ${heroHouse.area} м² · ${heroHouse.land} соток`;
  const modeIndex = mode === "facade" ? 0 : mode === "interior" ? 1 : 2;
  const tabCount = 1 + (hasInterior ? 1 : 0) + (hasPlan ? 1 : 0);

  const goTo = useCallback(
    (index: number) => {
      if (!multiHouse && mode === "plan") return;
      if (displayPhotos.length === 0) return;
      setSlideIndex((index + displayPhotos.length) % displayPhotos.length);
    },
    [displayPhotos.length, mode, multiHouse]
  );

  const openLightbox = useCallback(
    (index?: number) => {
      if (typeof index === "number") {
        if (!multiHouse && mode === "plan") return;
        setSlideIndex(index);
      }
      setLightbox(true);
    },
    [mode, multiHouse]
  );

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") goTo(slideIndex - 1);
      if (e.key === "ArrowRight") goTo(slideIndex + 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, slideIndex, goTo]);

  const heading = city ? (
    <>
      {title ?? "Готовые частные дома"}
      <br />
      <span className="text-forest">{titleAccent ?? `в ${city}`}</span>
    </>
  ) : (
    <>
      Свой дом.
      <br />
      Свой участок.
      <br />
      <span className="text-forest">Новая жизнь.</span>
    </>
  );

  const lead =
    subtitle ??
    (city
      ? `Готовые дома в ${city}`
      : "Готовые дома в Энгельсе, Саратове и Балаково");

  const thumbPhotos = displayPhotos;

  return (
    <>
      <section className="bg-page py-6 md:py-10">
        <div className="container-main">
          <div className="grid items-start gap-6 lg:grid-cols-[480px_1fr] lg:gap-6">
            <div className="min-w-0">
              <p className="section-eyebrow">Дома с участком</p>
              <h1 className="h1-desktop mt-4 text-balance text-text">
                {heading}
              </h1>
              <p className="mt-5 max-w-[450px] text-lg leading-7 text-muted">
                {lead}
              </p>
              <p className="hero-price mt-5 text-text">
                от {formatPrice(minPrice)}
              </p>
              <p className="mt-2 text-sm text-muted">
                Комплектация — в карточке каждого дома
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link href={catalogHref} className="btn-primary w-full sm:w-auto">
                  Смотреть дома
                  <IconArrow className="h-5 w-5" />
                </Link>
                <button
                  type="button"
                  className="btn-secondary w-full sm:w-auto"
                  onClick={() => openViewing({ city: city ?? heroHouse.city })}
                >
                  Записаться на просмотр
                </button>
              </div>
              <ul className="hero-facts mt-6 flex flex-wrap gap-x-7 gap-y-3">
                <li className="flex items-center gap-2">
                  <IconLeaf className="h-[18px] w-[18px] shrink-0" />
                  С участком
                </li>
                <li className="flex items-center gap-2">
                  <IconPhoto className="h-[18px] w-[18px] shrink-0" />
                  Фото и планировки
                </li>
                <li className="flex items-center gap-2">
                  <IconMapPin className="h-[18px] w-[18px] shrink-0" />
                  Просмотр дома
                </li>
              </ul>
            </div>

            <div className="hero-gallery min-w-0">
              <div className="hero-gallery-main relative overflow-hidden rounded-card">
                <button
                  type="button"
                  className="absolute inset-0 z-0 cursor-zoom-in"
                  onClick={() => openLightbox()}
                  aria-label="Развернуть фото"
                >
                  <AnimatePresence initial={false}>
                    <motion.span
                      key={`${heroHouse.id}-${activePhoto}`}
                      className="hero-gallery-fade"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={activePhoto}
                        alt={heroHouse.title}
                        fill
                        priority={mode === "facade" && slideIndex === 0}
                        fetchPriority={
                          mode === "facade" && slideIndex === 0 ? "high" : "auto"
                        }
                        className={cn(
                          "object-center",
                          mode === "plan"
                            ? "object-contain bg-white"
                            : "object-cover"
                        )}
                        sizes="(max-width: 768px) 100vw, 696px"
                      />
                    </motion.span>
                  </AnimatePresence>
                </button>

                <div className="pointer-events-none absolute inset-0 z-10">
                  <div className="pointer-events-auto absolute left-3 top-3 sm:left-5 sm:top-5">
                    <div
                      className={cn(
                        "hero-photo-toggle",
                        tabCount === 3 && "has-3",
                        `is-mode-${modeIndex}`
                      )}
                      role="tablist"
                      aria-label="Вид дома"
                    >
                      <span className="hero-photo-toggle-thumb" aria-hidden />
                      <button
                        type="button"
                        role="tab"
                        aria-selected={mode === "facade"}
                        onClick={() => setMode("facade")}
                        className={cn(
                          "hero-photo-toggle-btn",
                          mode === "facade" && "is-active"
                        )}
                      >
                        Фасад
                      </button>
                      {hasInterior && (
                        <button
                          type="button"
                          role="tab"
                          aria-selected={mode === "interior"}
                          onClick={() => setMode("interior")}
                          className={cn(
                            "hero-photo-toggle-btn",
                            mode === "interior" && "is-active"
                          )}
                        >
                          Внутри
                        </button>
                      )}
                      {hasPlan && (
                        <button
                          type="button"
                          role="tab"
                          aria-selected={mode === "plan"}
                          onClick={() => setMode("plan")}
                          className={cn(
                            "hero-photo-toggle-btn",
                            mode === "plan" && "is-active"
                          )}
                        >
                          План
                        </button>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="pointer-events-auto absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white shadow-sm backdrop-blur-sm transition-colors hover:bg-black/70 sm:right-5 sm:top-5 sm:h-11 sm:w-11"
                    onClick={() => openLightbox()}
                    aria-label="Развернуть на весь экран"
                  >
                    <IconMaximize
                      className="h-[18px] w-[18px] text-white sm:h-5 sm:w-5"
                    />
                  </button>

                  <Link
                    href={`/catalog/${heroHouse.id}`}
                    className="hero-float-card pointer-events-auto"
                    onClick={() =>
                      analytics.selectItem(heroHouse.id, heroHouse.title)
                    }
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={heroHouse.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <p className="hero-float-title">{shortTitle}</p>
                        <p className="hero-float-place">
                          {heroHouse.city}, {heroHouse.district}
                        </p>
                        <div className="hero-float-row">
                          <p className="hero-float-price">
                            {formatPrice(heroHouse.price)}
                          </p>
                          <span className="hero-float-arrow">
                            <IconArrow className="h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </Link>
                </div>
              </div>

              {thumbPhotos.length > 1 && (
                <div className="hero-gallery-thumbs">
                  {thumbPhotos.map((src, i) => {
                    const thumbHouse = slides[i]?.house ?? heroHouse;
                    return (
                      <button
                        key={`${mode}-${thumbHouse.id}-${src}`}
                        type="button"
                        onClick={() => {
                          if (slideIndex === i) openLightbox(i);
                          else setSlideIndex(i);
                        }}
                        onDoubleClick={() => openLightbox(i)}
                        className={cn(
                          "hero-gallery-thumb",
                          mode === "plan" && "is-plan",
                          slideIndex === i && "is-active"
                        )}
                        aria-label={
                          multiHouse
                            ? `${thumbHouse.title}, ${formatPrice(thumbHouse.price)}`
                            : `Фото ${i + 1}`
                        }
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className={
                            mode === "plan" ? "object-contain bg-white" : "object-cover"
                          }
                          sizes="(max-width: 768px) 33vw, 230px"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {mounted &&
        lightbox &&
        createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md"
            onClick={() => setLightbox(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр фото"
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full bg-black/45 px-3.5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-5 sm:top-5 sm:px-4"
              aria-label="Закрыть"
            >
              <IconClose className="h-5 w-5 text-white" />
              <span>Закрыть</span>
            </button>

            {thumbPhotos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(slideIndex - 1);
                  }}
                  className="absolute left-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:left-5 sm:h-14 sm:w-14"
                  aria-label="Предыдущее фото"
                >
                  <IconChevronLeft className="h-7 w-7 text-white" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(slideIndex + 1);
                  }}
                  className="absolute right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm transition-colors hover:bg-black/60 sm:right-5 sm:h-14 sm:w-14"
                  aria-label="Следующее фото"
                >
                  <IconChevronRight className="h-7 w-7 text-white" />
                </button>
              </>
            )}

            <div
              className="flex w-[70vw] max-w-[1100px] flex-col items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
                <Image
                  key={`lightbox-${heroHouse.id}-${activePhoto}`}
                  src={activePhoto}
                  alt={`${heroHouse.title} — фото ${slideIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="70vw"
                  priority
                />
              </div>

              {thumbPhotos.length > 1 && (
                <div className="flex items-center gap-2">
                  {thumbPhotos.map((src, i) => (
                    <button
                      key={`lb-thumb-${slides[i]?.house.id ?? i}-${src}`}
                      type="button"
                      onClick={() => setSlideIndex(i)}
                      className={cn(
                        "relative h-11 w-14 overflow-hidden rounded-md border-2 shadow-md transition-opacity sm:h-12 sm:w-16",
                        slideIndex === i
                          ? "border-white opacity-100"
                          : "border-white/30 opacity-70 hover:opacity-100"
                      )}
                      aria-label={`Показать фото ${i + 1}`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
