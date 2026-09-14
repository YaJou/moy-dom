"use client";

import { realHouses, getMinHousePrice } from "@/data/houses";
import { getHouseCover } from "@/lib/house-images";
import { analytics } from "@/lib/analytics";
import { formatPrice, cn } from "@/lib/utils";
import type { House } from "@/types/house";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IconArrow, IconCamera, IconEye, IconLeaf } from "./icons";
import { useViewingModal } from "./ViewingModalProvider";

function pickHeroHouse(): House {
  const withPhotos = realHouses.filter((h) => h.images.length >= 1);
  return (
    withPhotos.find((h) => h.slug === "natalino-stepnaya-87") ??
    withPhotos[0]
  );
}

export function HomeHero() {
  const heroHouse = useMemo(() => pickHeroHouse(), []);
  const { openViewing } = useViewingModal();
  const minPrice = getMinHousePrice();
  const photos = heroHouse.images.slice(0, 4);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showInterior, setShowInterior] = useState(false);

  const exteriorPhotos = photos;
  const interiorPhotos = heroHouse.images.filter((img) =>
    /0[89]|1[0-6]/.test(img.split("/").pop() ?? "")
  );
  const hasInterior = interiorPhotos.length > 0;
  const displayPhotos = showInterior && hasInterior ? interiorPhotos : exteriorPhotos;
  const activePhoto = displayPhotos[activeIndex] ?? getHouseCover(heroHouse);

  const shortTitle = `Дом ${heroHouse.area} м²`;

  return (
    <section className="bg-page py-6 md:py-10">
      <div className="container-main">
        <div className="grid items-center gap-6 lg:grid-cols-[480px_1fr] lg:gap-6">
          <div className="min-w-0">
            <p className="section-eyebrow">Дома с участком</p>
            <h1 className="h1-desktop mt-4 text-balance text-text">
              Свой дом.
              <br />
              Свой участок.
              <br />
              <span className="text-forest">Новая жизнь.</span>
            </h1>
            <p className="mt-5 max-w-[450px] text-lg leading-7 text-muted">
              Готовые дома в Саратове, Энгельсе и Балаково
            </p>
            <p className="price-lg mt-5 text-text">
              от {formatPrice(minPrice)}
            </p>
            <p className="mt-2 text-sm text-muted">
              Комплектация — в карточке каждого дома
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link href="/#homes" className="btn-primary w-full sm:w-auto">
                Смотреть дома
                <IconArrow className="h-5 w-5" />
              </Link>
              <button
                type="button"
                className="btn-secondary w-full sm:w-auto"
                onClick={() => openViewing({ city: heroHouse.city })}
              >
                Записаться на просмотр
              </button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text">
              <li className="flex items-center gap-2">
                <IconLeaf className="text-forest" />
                С участком
              </li>
              <li className="flex items-center gap-2">
                <IconCamera className="text-forest" />
                Фото и описание
              </li>
              <li className="flex items-center gap-2">
                <IconEye className="text-forest" />
                Просмотр дома
              </li>
            </ul>
          </div>

          <div className="min-w-0">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-auto lg:h-[456px]">
              <Image
                src={activePhoto}
                alt={heroHouse.title}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 696px"
              />
              {hasInterior && (
                <div className="absolute left-3 top-3 flex gap-1.5 sm:left-5 sm:top-5">
                  <button
                    type="button"
                    onClick={() => {
                      setShowInterior(false);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "chip",
                      !showInterior ? "chip-active" : "chip-inactive bg-surface/95"
                    )}
                  >
                    Фасад
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowInterior(true);
                      setActiveIndex(0);
                    }}
                    className={cn(
                      "chip",
                      showInterior ? "chip-active" : "chip-inactive bg-surface/95"
                    )}
                  >
                    Внутри
                  </button>
                </div>
              )}
              <Link
                href={`/catalog/${heroHouse.id}`}
                className="absolute bottom-3 left-3 w-[min(310px,calc(100%-24px))] rounded-panel bg-white/95 p-[18px] shadow-float backdrop-blur-[12px] sm:bottom-5 sm:left-5"
                onClick={() =>
                  analytics.selectItem(heroHouse.id, heroHouse.title)
                }
              >
                <p className="font-bold text-text">{shortTitle}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                  {heroHouse.city}, {heroHouse.district}
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <p className="price-lg text-xl leading-8 text-text">
                    {formatPrice(heroHouse.price)}
                  </p>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-text">
                    <IconArrow className="h-5 w-5" />
                  </span>
                </div>
              </Link>
            </div>
            {displayPhotos.length > 1 && (
              <div className="mt-3 flex gap-2">
                {displayPhotos.slice(0, 3).map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "relative h-11 w-16 shrink-0 overflow-hidden rounded-sm sm:h-14 sm:w-[84px]",
                      activeIndex === i
                        ? "ring-2 ring-orange ring-offset-1"
                        : "opacity-80 hover:opacity-100"
                    )}
                    aria-label={`Фото ${i + 1}`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="84px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
