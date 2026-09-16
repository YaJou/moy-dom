"use client";

import { CatalogHouseCard } from "@/components/cards/CatalogHouseCard";
import { CatalogFilters } from "@/components/catalog/CatalogFilters";
import { CatalogFamilyFit } from "@/components/catalog/CatalogFamilyFit";
import { CatalogPriceIncluded } from "@/components/catalog/CatalogPriceIncluded";
import { CatalogChoiceFaq } from "@/components/catalog/CatalogChoiceFaq";
import { CatalogWaitlist } from "@/components/catalog/CatalogWaitlist";
import { useFavorites } from "@/context/FavoritesContext";
import { useCompare } from "@/context/CompareContext";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useViewingModal } from "@/components/home/ViewingModalProvider";
import { HouseImage } from "@/components/ui/HouseImage";
import { YandexHousesMap } from "@/components/sections/YandexHousesMap";
import { housesData } from "@/data/site";
import {
  countActiveFilters,
  filterHouses,
  getFilterLabel,
  parseSearchParams,
  pluralizeHouses,
  sortHouses,
  type CatalogSort,
} from "@/lib/filters";
import {
  hasLargeKitchenLiving,
  hasTwoBathrooms,
} from "@/lib/house-price-composition";
import { getHouseCover } from "@/lib/house-images";
import { formatPrice, cn } from "@/lib/utils";
import { DEFAULT_FILTERS, type House, type SearchFiltersState } from "@/types/house";
import { LayoutGrid, Map as MapIcon, SearchX, Share2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ViewMode = "cards" | "map";
type ListMode = "all" | "saved" | "recent";

const SORT_OPTIONS: { id: CatalogSort; label: string }[] = [
  { id: "price-asc", label: "Сначала дешевле" },
  { id: "area-desc", label: "Сначала просторнее" },
  { id: "new", label: "Новые поступления" },
];

function selectedHomesTitle(n: number): string {
  if (n === 1) return "Посмотреть этот дом?";
  if (n === 2) return "Посмотреть эти два дома?";
  return `Посмотреть эти ${n} ${pluralizeHouses(n)}?`;
}

export function CatalogPageClient() {
  const searchParams = useSearchParams();
  const { favorites } = useFavorites();
  const { compareIds } = useCompare();
  const { recentlyViewedIds } = useRecentlyViewed();
  const { openViewing } = useViewingModal();
  const [view, setView] = useState<ViewMode>("cards");
  const [listMode, setListMode] = useState<ListMode>("all");
  const [mapFocus, setMapFocus] = useState<House | null>(null);
  const [shareHint, setShareHint] = useState(false);
  const [sort, setSort] = useState<CatalogSort>("price-asc");

  const needParam = searchParams.get("need");

  const filters = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key === "need") return;
      params[key] = value;
    });
    return Object.keys(params).length
      ? parseSearchParams(params)
      : ({ ...DEFAULT_FILTERS } as SearchFiltersState);
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = filterHouses(housesData, filters);
    if (needParam === "bath2") list = list.filter(hasTwoBathrooms);
    if (needParam === "kitchen") list = list.filter(hasLargeKitchenLiving);
    return list;
  }, [filters, needParam]);

  const scoped = useMemo(() => {
    if (listMode === "saved") {
      const set = new Set(favorites);
      return filtered.filter((h) => set.has(h.id));
    }
    if (listMode === "recent") {
      const order = new Map(recentlyViewedIds.map((id, i) => [id, i]));
      return filtered
        .filter((h) => order.has(h.id))
        .sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
    }
    return filtered;
  }, [filtered, listMode, favorites, recentlyViewedIds]);

  const results = useMemo(
    () =>
      listMode === "recent" ? scoped : sortHouses(scoped, sort),
    [scoped, sort, listMode]
  );

  useEffect(() => {
    if (listMode === "recent" && recentlyViewedIds.length === 0) {
      setListMode("all");
    }
  }, [listMode, recentlyViewedIds.length]);

  const activeCount = countActiveFilters(filters) + (needParam ? 1 : 0);

  const selectedIds = useMemo(() => {
    const set = new Set<number>([...favorites, ...compareIds]);
    return [...set];
  }, [favorites, compareIds]);
  const hasSelection = selectedIds.length > 0;

  const activeKeys = (
    Object.keys(DEFAULT_FILTERS) as (keyof SearchFiltersState)[]
  ).filter((key) => filters[key] !== DEFAULT_FILTERS[key]);

  const shareSaved = async () => {
    if (favorites.length === 0) return;
    const url = `${window.location.origin}/saved/?ids=${favorites.join(",")}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareHint(true);
      window.setTimeout(() => setShareHint(false), 2000);
    } catch {
      window.prompt("Ссылка на подборку:", url);
    }
  };

  const openSelectedViewing = () => {
    if (hasSelection) {
      openViewing({
        houseId: selectedIds[0],
        houseIds: selectedIds,
        filters:
          activeCount > 0
            ? `${searchParams.toString()}&selected=${selectedIds.join(",")}`
            : `selected=${selectedIds.join(",")}`,
      });
      return;
    }
    openViewing({
      filters: activeCount > 0 ? searchParams.toString() : undefined,
    });
  };

  const listTabs: { id: ListMode; label: string; show: boolean }[] = [
    { id: "all", label: "Все дома", show: true },
    { id: "saved", label: "Сохранённые", show: true },
    {
      id: "recent",
      label: "Недавно смотрели",
      show: recentlyViewedIds.length > 0,
    },
  ];

  return (
    <>
      <section className="bg-white pb-4 pt-2">
        <div className="container-main mb-4 flex flex-wrap items-center justify-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/saved/"
              className="inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-semibold text-text hover:border-orange/40"
            >
              Сохранённые
              {favorites.length > 0 ? ` (${favorites.length})` : ""}
            </Link>
            {favorites.length > 0 && (
              <button
                type="button"
                onClick={shareSaved}
                className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-border px-3 text-sm font-semibold text-text hover:border-orange/40"
              >
                <Share2 className="h-4 w-4" />
                {shareHint ? "Ссылка скопирована" : "Поделиться подборкой"}
              </button>
            )}
            <div className="inline-flex rounded-xl border border-border p-0.5">
              <button
                type="button"
                onClick={() => setView("cards")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-sm font-semibold",
                  view === "cards"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-text"
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                Карточки
              </button>
              <button
                type="button"
                onClick={() => setView("map")}
                className={cn(
                  "inline-flex h-9 items-center gap-1.5 rounded-[10px] px-3 text-sm font-semibold",
                  view === "map"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-text"
                )}
              >
                <MapIcon className="h-4 w-4" />
                На карте
              </button>
            </div>
          </div>
        </div>

        <CatalogFilters initialFilters={filters} houses={housesData} />
      </section>

      <section id="catalog-results" className="section-padding bg-white pt-6 sm:pt-8">
        <div className="container-main">
          <div
            className="mb-5 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Подборка"
          >
            {listTabs
              .filter((t) => t.show)
              .map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={listMode === t.id}
                  onClick={() => setListMode(t.id)}
                  className={cn(
                    "catalog-tab",
                    listMode === t.id
                      ? "catalog-tab-active"
                      : "catalog-tab-inactive"
                  )}
                >
                  {t.label}
                  {t.id === "saved" && favorites.length > 0
                    ? ` (${favorites.length})`
                    : ""}
                  {t.id === "recent" && recentlyViewedIds.length > 0
                    ? ` (${recentlyViewedIds.length})`
                    : ""}
                </button>
              ))}
          </div>

          {results.length > 0 && (
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-medium text-text">
                Найдено {results.length} {pluralizeHouses(results.length)}
              </p>
              {listMode !== "recent" && (
                <div
                  className="flex flex-wrap gap-2"
                  role="group"
                  aria-label="Сортировка"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSort(opt.id)}
                      className={cn(
                        "inline-flex h-9 items-center rounded-full border px-3.5 text-sm font-semibold transition-colors",
                        sort === opt.id
                          ? "border-orange bg-orange/10 text-text"
                          : "border-border bg-surface text-muted hover:border-orange/40 hover:text-text"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-card border border-border bg-page py-16 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                <SearchX className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-dark">
                {listMode === "saved"
                  ? "Пока нет сохранённых домов"
                  : listMode === "recent"
                    ? "Вы ещё не смотрели карточки домов"
                    : "По этим условиям домов нет"}
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted">
                {listMode === "all"
                  ? "Снимите одно из ограничений — или сбросьте все фильтры."
                  : "Откройте вкладку «Все дома» или сохраните понравившиеся объекты."}
              </p>
              {listMode === "all" && activeKeys.length > 0 && (
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {activeKeys.map((key) => (
                    <Link
                      key={key}
                      href={(() => {
                        const next = { ...filters, [key]: DEFAULT_FILTERS[key] };
                        const params = new URLSearchParams();
                        (
                          Object.keys(DEFAULT_FILTERS) as (keyof SearchFiltersState)[]
                        ).forEach((k) => {
                          if (next[k] !== DEFAULT_FILTERS[k]) {
                            params.set(k, next[k]);
                          }
                        });
                        const q = params.toString();
                        return q ? `/catalog/?${q}` : "/catalog/";
                      })()}
                      className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text hover:border-orange/40"
                    >
                      Снять: {getFilterLabel(key, filters[key])}
                    </Link>
                  ))}
                </div>
              )}
              {listMode === "all" ? (
                <Link
                  href="/catalog/"
                  className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  Сбросить все фильтры
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setListMode("all")}
                  className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-white hover:bg-primary-hover"
                >
                  Все дома
                </button>
              )}
            </div>
          ) : view === "cards" ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {results.map((house, index) => (
                <CatalogHouseCard
                  key={house.id}
                  house={house}
                  priority={index < 1}
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
              <div className="h-[360px] overflow-hidden rounded-panel border border-border sm:h-[440px]">
                <YandexHousesMap houses={results} focusHouse={mapFocus} />
              </div>
              <div className="flex max-h-[440px] flex-col gap-3 overflow-y-auto">
                {results.map((house) => (
                  <button
                    key={house.id}
                    type="button"
                    onClick={() => setMapFocus(house)}
                    className={cn(
                      "flex gap-3 rounded-panel border bg-surface p-3 text-left transition-shadow",
                      mapFocus?.id === house.id
                        ? "border-orange shadow-card"
                        : "border-border hover:border-orange/40"
                    )}
                  >
                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-control bg-page">
                      <HouseImage
                        src={getHouseCover(house)}
                        alt={house.title}
                        fill
                        objectFit="cover"
                        sizes="96px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-text">
                        Дом {house.area} м² · {formatPrice(house.price)}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">
                        {house.city}, {house.district}
                      </p>
                      {house.mapApproximate && (
                        <p className="mt-1 text-xs text-orange">
                          Адрес указан приблизительно
                        </p>
                      )}
                      <Link
                        href={`/catalog/${house.id}/`}
                        className="mt-2 inline-block text-sm font-medium text-orange hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Открыть дом
                      </Link>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="pb-10 sm:pb-14">
        <div className="container-main grid gap-5 lg:grid-cols-2">
          <div className="rounded-card bg-[#1f4d3a] px-6 py-8 text-white sm:px-8">
            <h2 className="text-xl font-extrabold sm:text-2xl">
              {hasSelection
                ? selectedHomesTitle(selectedIds.length)
                : "Не можете выбрать между несколькими домами?"}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              {hasSelection
                ? "Согласуем просмотр выбранных объектов."
                : "Отметьте понравившиеся — обсудим различия и согласуем просмотр."}
            </p>
            <button
              type="button"
              onClick={openSelectedViewing}
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-white px-5 text-sm font-semibold text-[#1f4d3a] hover:bg-white/90"
            >
              {hasSelection ? "Договориться о просмотре" : "Помочь с выбором"}
            </button>
          </div>

          <div className="overflow-hidden rounded-card border border-border bg-surface sm:grid sm:grid-cols-[1fr_0.9fr]">
            <div className="relative min-h-[180px] sm:min-h-0">
              <HouseImage
                src={
                  results[0]
                    ? getHouseCover(results[0])
                    : getHouseCover(housesData[0])
                }
                alt="Просмотр дома"
                fill
                objectFit="cover"
                sizes="(max-width: 1024px) 100vw, 400px"
              />
            </div>
            <div className="flex flex-col justify-center px-6 py-7 sm:px-7">
              <h2 className="text-xl font-extrabold text-text">
                Что можно проверить на просмотре
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Планировку, отделку, участок и работу доступных коммуникаций.
              </p>
              <button
                type="button"
                onClick={() =>
                  hasSelection ? openSelectedViewing() : openViewing()
                }
                className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
              >
                Записаться на просмотр
              </button>
            </div>
          </div>
        </div>
      </section>

      <CatalogFamilyFit />
      <CatalogPriceIncluded />
      <CatalogChoiceFaq />
      <CatalogWaitlist />
    </>
  );
}
