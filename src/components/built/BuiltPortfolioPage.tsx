"use client";

import { PortfolioImageFrame } from "@/components/built/PortfolioImageFrame";
import { YandexHousesMap } from "@/components/sections/YandexHousesMap";
import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { HouseImage } from "@/components/ui/HouseImage";
import {
  builtPortfolioAssets,
  builtPortfolioStats,
  builtStoryHouseId,
} from "@/data/built-portfolio";
import { getHouseById, realHouses } from "@/data/houses";
import { getFloorPlanImage } from "@/lib/floor-plan";
import { getHouseCover, isFloorPlan } from "@/lib/house-images";
import { formatPrice, cn } from "@/lib/utils";
import type { House } from "@/types/house";
import Link from "next/link";
import { useMemo, useState } from "react";

function landText(land: number): string {
  return Number.isInteger(land) ? `${land}` : String(land).replace(".", ",");
}

function bedroomsLabel(n: number): string {
  if (n === 1) return "1 спальня";
  if (n < 5) return `${n} спальни`;
  return `${n} спален`;
}

function saleStatus(house: House): { label: string; showPrice: boolean } {
  if (house.badge === "sold") return { label: "Продан", showPrice: false };
  return { label: "В продаже", showPrice: true };
}

function PortfolioHouseCard({ house, priority }: { house: House; priority?: boolean }) {
  const status = saleStatus(house);
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[18px] border border-border bg-surface shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-page">
        <HouseImage
          src={getHouseCover(house)}
          alt={house.title}
          fill
          objectFit="cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-md bg-black/55 px-2 py-1 text-[11px] font-semibold text-white">
          {house.specs.buildYear}
        </span>
        <span
          className={cn(
            "absolute right-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold",
            status.showPrice
              ? "bg-orange text-white"
              : "bg-white/95 text-text"
          )}
        >
          {status.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-extrabold leading-snug text-text">
          Дом {house.area} м² · {house.district}
        </h3>
        <p className="mt-1 text-sm text-muted">
          {house.city} · {house.specs.buildYear}
        </p>
        <p className="mt-3 text-sm text-muted">
          {bedroomsLabel(house.bedrooms)}
          {" · "}
          {house.specs.bathroom}
          {" · "}
          участок {landText(house.land)} сот.
        </p>
        {house.featureLine && (
          <p className="mt-2 text-sm font-semibold text-[#2c332f]">
            {house.featureLine}
          </p>
        )}
        {status.showPrice && (
          <p className="mt-3 text-lg font-extrabold text-text">
            {formatPrice(house.price)}
          </p>
        )}
        <Link
          href={`/catalog/${house.id}/`}
          className="mt-auto inline-flex h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold text-text transition-colors hover:border-orange/50 pt-5"
        >
          Посмотреть объект
        </Link>
      </div>
    </article>
  );
}

export function BuiltPortfolioPage() {
  const { openViewing } = useViewingModal();
  const [stageId, setStageId] = useState<string>(
    builtPortfolioAssets.stages[0].id
  );
  const [mapFocus, setMapFocus] = useState<House | null>(null);

  const forSale = useMemo(
    () => realHouses.filter((h) => h.badge !== "sold"),
    []
  );
  const building = useMemo(
    () => realHouses.filter((h) => h.readiness === "building"),
    []
  );
  const galleryHouses = forSale.slice(0, 6);
  const similar = forSale.slice(0, 3);

  const storyHouse = getHouseById(builtStoryHouseId) ?? realHouses[0];
  const storyPlan = storyHouse ? getFloorPlanImage(storyHouse.id) : null;
  const storyPhotos = storyHouse
    ? storyHouse.images.filter((src) => !isFloorPlan(src)).slice(0, 4)
    : [];

  const activeStage =
    builtPortfolioAssets.stages.find((s) => s.id === stageId) ??
    builtPortfolioAssets.stages[0];

  const detailsMain = builtPortfolioAssets.details.filter((d) =>
    ["foundation", "brickwork", "roof", "heating", "prefinish"].includes(d.id)
  );

  return (
    <div className="built-page">
      {/* 1. Hero */}
      <section className="bg-page py-8 sm:py-10">
        <div className="container-main">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10">
            <div>
              <p className="section-eyebrow">Портфолио строительства</p>
              <h1 className="h1-desktop mt-4 text-balance text-text">
                Дома, которые мы построили
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-7 text-muted">
                Посмотрите планировки, материалы и фотографии наших объектов в
                Энгельсе, Саратове и Балаково — от этапов строительства до
                готового дома.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#built-gallery" className="btn-primary">
                  Посмотреть объекты
                </a>
                <Link href="/catalog/" className="btn-secondary">
                  Дома в продаже
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
                {builtPortfolioStats.map((s) => (
                  <li key={s.label}>
                    <span className="font-extrabold text-text">{s.value}</span>
                    <span className="ml-1.5">{s.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <PortfolioImageFrame
              image={builtPortfolioAssets.hero}
              priority
              className="min-h-[280px] rounded-card sm:min-h-[400px] lg:min-h-[460px]"
              sizes="(max-width: 1024px) 100vw, 600px"
            />
          </div>
        </div>
      </section>

      {/* 2. Gallery */}
      <section id="built-gallery" className="bg-white py-12 sm:py-14">
        <div className="container-main">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="h2-desktop font-extrabold text-text">
                Объекты в работе и продаже
              </h2>
              <p className="mt-3 max-w-2xl text-base text-muted">
                Реальные дома из каталога: фото, планировки и актуальный статус.
                Цена — только у объектов в продаже.
              </p>
            </div>
            <Link
              href="/catalog/"
              className="text-sm font-semibold text-orange hover:underline"
            >
              Весь каталог →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galleryHouses.map((house, i) => (
              <PortfolioHouseCard
                key={house.id}
                house={house}
                priority={i < 1}
              />
            ))}
          </div>
        </div>
      </section>

      {building.length > 0 && (
        <section className="border-t border-border bg-page py-12 sm:py-14">
          <div className="container-main">
            <h2 className="h2-desktop font-extrabold text-text">
              Сейчас строим
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted">
              Объекты на стадии строительства — можно записаться на просмотр
              текущего состояния.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {building.map((house) => (
                <Link
                  key={house.id}
                  href={`/catalog/${house.id}/`}
                  className="flex gap-4 rounded-card border border-border bg-surface p-4 transition-shadow hover:shadow-card"
                >
                  <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-[12px] bg-page">
                    <HouseImage
                      src={getHouseCover(house)}
                      alt={house.title}
                      fill
                      objectFit="cover"
                      sizes="112px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-extrabold text-text">
                      Дом {house.area} м²
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {house.city}, {house.district}
                    </p>
                    <p className="mt-2 text-xs font-semibold text-orange">
                      Строится · {house.specs.buildYear}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Story */}
      {storyHouse && (
        <section className="bg-white py-12 sm:py-14">
          <div className="container-main">
            <p className="section-eyebrow">Подробный рассказ</p>
            <h2 className="h2-desktop mt-3 font-extrabold text-text">
              Один дом — от планировки до результата
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted">
              Разбор объекта из каталога: что уже сделано, какие материалы и чем
              интересна планировка. Фотографии — с этого дома.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-page">
                  <HouseImage
                    src={getHouseCover(storyHouse)}
                    alt={storyHouse.title}
                    fill
                    objectFit="cover"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {storyPhotos.slice(1, 4).map((src) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-page"
                    >
                      <HouseImage
                        src={src}
                        alt=""
                        fill
                        objectFit="cover"
                        sizes="160px"
                      />
                    </div>
                  ))}
                  {storyPlan && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[12px] bg-white">
                      <HouseImage
                        src={storyPlan}
                        alt="Планировка"
                        fill
                        objectFit="contain"
                        sizes="160px"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-text">
                  {storyHouse.title}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {storyHouse.city}, {storyHouse.district} ·{" "}
                  {storyHouse.specs.buildYear}
                </p>
                <ul className="mt-6 space-y-4 text-sm leading-relaxed text-[#3a433e]">
                  <li>
                    <span className="font-extrabold text-text">Что сделано. </span>
                    {storyHouse.specs.repair}. Фундамент:{" "}
                    {storyHouse.specs.foundation}. Кровля: {storyHouse.specs.roof}.
                  </li>
                  <li>
                    <span className="font-extrabold text-text">Материалы. </span>
                    {storyHouse.specs.wallMaterial}. Окна и вход — по комплектации
                    объекта.
                  </li>
                  <li>
                    <span className="font-extrabold text-text">Планировка. </span>
                    {bedroomsLabel(storyHouse.bedrooms)},{" "}
                    {storyHouse.specs.bathroom.toLowerCase()}.{" "}
                    {storyHouse.specs.terrace}.
                  </li>
                  <li>
                    <span className="font-extrabold text-text">Участок. </span>
                    {landText(storyHouse.land)} сот. · вода: {storyHouse.specs.water}{" "}
                    · газ: {storyHouse.specs.gas}.
                  </li>
                </ul>
                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {storyHouse.shortDescription}
                </p>
                <Link
                  href={`/catalog/${storyHouse.id}/`}
                  className="btn-primary mt-6 inline-flex"
                >
                  Открыть карточку дома
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Behind facade */}
      <section className="built-details-section py-12 sm:py-14">
        <div className="container-main">
          <h2 className="h2-desktop font-extrabold text-white">
            Что скрывается за фасадом
          </h2>
          <p className="mt-3 max-w-2xl text-base text-white/80">
            Детали строительства, которые обычно не видны в готовом доме.
            Ниже — временные иллюстрации типичных этапов; на просмотре покажем
            фактическое состояние выбранного объекта.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detailsMain.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-card">
                <PortfolioImageFrame
                  image={item.image}
                  className="aspect-[3/2]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="bg-white/5 px-4 py-4">
                  <h3 className="font-extrabold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stages */}
      <section className="bg-page py-12 sm:py-14">
        <div className="container-main">
          <h2 className="h2-desktop font-extrabold text-text">
            Этапы строительства
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Переключатель показывает типичные этапы. Это иллюстрации для макета,
            а не хронология одного адреса — реальные фото этапов добавим по мере
            готовности архива.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-10">
            <ul className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1" role="tablist">
              {builtPortfolioAssets.stages.map((stage) => (
                <li key={stage.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={stageId === stage.id}
                    onClick={() => setStageId(stage.id)}
                    className={cn(
                      "whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors lg:w-full",
                      stageId === stage.id
                        ? "bg-forest text-white"
                        : "bg-surface text-muted hover:text-text"
                    )}
                  >
                    {stage.tab}
                  </button>
                </li>
              ))}
            </ul>
            <div>
              <PortfolioImageFrame
                image={activeStage.image}
                className="aspect-[16/10] rounded-card"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
              <h3 className="mt-5 text-xl font-extrabold text-text">
                {activeStage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {activeStage.text}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Soft media / viewing note instead of fake reviews */}
      <section className="bg-white py-12 sm:py-14">
        <div className="container-main grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <PortfolioImageFrame
            image={builtPortfolioAssets.viewing}
            className="aspect-[4/3] rounded-card"
            sizes="(max-width: 1024px) 100vw, 560px"
          />
          <div>
            <h2 className="h2-desktop font-extrabold text-text">
              Как смотреть качество вживую
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Отзывы владельцев публикуем только с разрешением и привязкой к
              дому. Пока собираем материалы — удобнее приехать на объект в
              продаже: отделка, коммуникации и участок видны на месте. Экскурсии
              по уже заселённым домам не проводим.
            </p>
            <button
              type="button"
              className="btn-primary mt-6"
              onClick={() => openViewing()}
            >
              Записаться на просмотр
            </button>
          </div>
        </div>
      </section>

      {/* 7. Map */}
      <section className="border-t border-border bg-page py-12 sm:py-14">
        <div className="container-main">
          <h2 className="h2-desktop font-extrabold text-text">
            География объектов
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Населённые пункты, где мы строим и продаём дома. Точный адрес
            заселённых объектов не публикуем.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
            <div className="h-[360px] overflow-hidden rounded-card border border-border sm:h-[440px]">
              <YandexHousesMap houses={realHouses} focusHouse={mapFocus} />
            </div>
            <div className="flex max-h-[440px] flex-col gap-3 overflow-y-auto">
              {realHouses.map((house) => (
                <button
                  key={house.id}
                  type="button"
                  onClick={() => setMapFocus(house)}
                  className={cn(
                    "rounded-card border bg-surface p-4 text-left transition-shadow",
                    mapFocus?.id === house.id
                      ? "border-orange shadow-card"
                      : "border-border hover:border-orange/40"
                  )}
                >
                  <p className="font-extrabold text-text">
                    Дом {house.area} м² · {house.specs.buildYear}
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {house.city}, {house.district}
                  </p>
                  <Link
                    href={`/catalog/${house.id}/`}
                    className="mt-2 inline-block text-sm font-semibold text-orange hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    История объекта →
                  </Link>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="bg-white py-12 sm:py-14">
        <div className="container-main">
          <h2 className="h2-desktop font-extrabold text-text">
            Понравился один из домов? Посмотрите похожие в продаже
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((house) => (
              <PortfolioHouseCard key={house.id} house={house} />
            ))}
          </div>
        </div>
      </section>

      <section className="built-cta-section py-12 sm:py-14">
        <div className="container-main grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <PortfolioImageFrame
            image={builtPortfolioAssets.viewing}
            className="aspect-[4/3] rounded-card"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-text sm:text-3xl">
              Хотите посмотреть качество отделки вживую?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Выберите доступный дом в каталоге и согласуйте просмотр. Не
              обещаем экскурсии по уже проданным и заселённым домам.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/catalog/" className="btn-primary">
                Дома в продаже
              </Link>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => openViewing()}
              >
                Согласовать просмотр
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
