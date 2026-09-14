"use client";

import { Button } from "@/components/ui/button";
import { HouseImage } from "@/components/ui/HouseImage";
import { getMinHousePrice, realHouses } from "@/data/houses";
import { analytics } from "@/lib/analytics";
import { formatPrice } from "@/lib/utils";
import type { House } from "@/types/house";
import { ArrowRight, Camera, MapPin, Trees } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const HERO_HOUSE =
  realHouses.find((h) => h.slug === "natalino-stepnaya-87") ?? realHouses[0];

function getHeroPhotos(house: House): string[] {
  const photos = house.images.filter((img) => !img.endsWith("/01.jpg"));
  return photos.length >= 2 ? photos.slice(0, 4) : [house.image];
}

interface HeroProps {
  title?: string;
  titleCities?: string;
  subtitle?: string;
  priceFrom?: number;
  primaryHref?: string;
  secondaryHref?: string;
  image?: string;
  imageAlt?: string;
}

export function Hero({
  title,
  titleCities,
  subtitle,
  priceFrom,
  primaryHref = "/#homes",
  secondaryHref = "/#viewing",
  image,
  imageAlt,
}: HeroProps = {}) {
  const isCityVariant = Boolean(title);
  const photos = useMemo(() => getHeroPhotos(HERO_HOUSE), []);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePhoto = image ?? photos[activeIndex] ?? HERO_HOUSE.image;
  const minPrice = priceFrom ?? getMinHousePrice();

  return (
    <section className="bg-page py-6 md:py-10">
      <div className="container-main">
        <div className="grid items-center gap-6 lg:grid-cols-[480px_1fr] lg:gap-6">
          <div>
            <p className="eyebrow">Дома с участком</p>
            <h1 className="mt-4 text-[38px] font-extrabold leading-[42px] tracking-[-1.2px] text-text md:text-[44px] md:leading-[49px] lg:text-[56px] lg:leading-[60px] lg:tracking-[-2px]">
              {isCityVariant ? (
                <>
                  {title}
                  {titleCities && (
                    <>
                      <br />
                      <span className="text-forest">{titleCities}</span>
                    </>
                  )}
                </>
              ) : (
                <>
                  Свой дом.
                  <br />
                  Свой участок.
                  <br />
                  <span className="text-forest">Новая жизнь.</span>
                </>
              )}
            </h1>
            <p className="mt-5 max-w-[450px] text-lg leading-7 text-muted">
              {subtitle ?? "Готовые дома в Саратове, Энгельсе и Балаково"}
            </p>
            <p className="mt-5 text-[28px] font-extrabold leading-9 tabular-nums text-text">
              от {formatPrice(minPrice)}
            </p>
            <p className="mt-2 text-sm leading-5 text-muted">
              Комплектация — в карточке каждого дома
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-3">
              <Button asChild size="lg">
                <Link href={primaryHref}>
                  Смотреть дома
                  <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href={secondaryHref}
                  onClick={() => analytics.viewingFormOpen("hero")}
                >
                  Записаться на просмотр
                </Link>
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Trees className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                С участком
              </li>
              <li className="flex items-center gap-2">
                <Camera className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                Фото и описание
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 shrink-0" strokeWidth={1.75} />
                Просмотр дома
              </li>
            </ul>
          </div>

          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-auto lg:h-[456px]">
              <HouseImage
                src={activePhoto}
                alt={imageAlt ?? HERO_HOUSE.title}
                fill
                priority
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 696px"
              />
              <div className="absolute left-3 top-3 flex gap-2 sm:left-5 sm:top-5">
                <span className="rounded-sm bg-surface/95 px-2.5 py-1 text-xs font-semibold text-text">
                  Фасад
                </span>
              </div>
              {!isCityVariant && (
                <Link
                  href={`/catalog/${HERO_HOUSE.id}`}
                  className="absolute bottom-3 left-3 max-w-[calc(100%-24px)] rounded-panel bg-white/94 p-4 shadow-float backdrop-blur-[12px] transition-transform duration-160 hover:-translate-y-0.5 sm:bottom-5 sm:left-5 sm:w-[310px]"
                  onClick={() =>
                    analytics.selectItem(HERO_HOUSE.id, HERO_HOUSE.title)
                  }
                >
                  <p className="text-base font-bold text-text">
                    Дом {HERO_HOUSE.area} м²
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {HERO_HOUSE.city}, {HERO_HOUSE.district}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <p className="text-xl font-extrabold tabular-nums text-text">
                      {formatPrice(HERO_HOUSE.price)}
                    </p>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange text-text">
                      <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                  </div>
                </Link>
              )}
            </div>
            {!image && photos.length > 1 && (
              <div className="mt-3 flex gap-2">
                {photos.slice(0, 3).map((photo, index) => (
                  <button
                    key={photo}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-11 w-16 overflow-hidden rounded-sm sm:h-14 sm:w-[84px] ${
                      activeIndex === index
                        ? "ring-2 ring-orange ring-offset-1"
                        : "opacity-80 hover:opacity-100"
                    }`}
                    aria-label={`Фото ${index + 1}`}
                  >
                    <HouseImage
                      src={photo}
                      alt=""
                      fill
                      objectFit="cover"
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
