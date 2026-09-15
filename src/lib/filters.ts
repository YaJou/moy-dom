import { realHouses } from "@/data/houses";
import { citySortIndex } from "@/lib/cities";
import {
  DEFAULT_FILTERS,
  type House,
  type SearchFiltersState,
} from "@/types/house";

function matchesPrice(price: number, range: string): boolean {
  switch (range) {
    case "до 5 000 000 ₽":
      return price <= 5_000_000;
    case "до 7 000 000 ₽":
      return price <= 7_000_000;
    case "5 000 000 – 7 000 000 ₽":
      return price >= 5_000_000 && price <= 7_000_000;
    case "7 000 000 – 10 000 000 ₽":
      return price >= 7_000_000 && price <= 10_000_000;
    case "от 10 000 000 ₽":
      return price >= 10_000_000;
    default:
      return true;
  }
}

function matchesArea(area: number, range: string): boolean {
  switch (range) {
    case "до 100 м²":
      return area < 100;
    case "100 – 150 м²":
      return area >= 100 && area <= 150;
    case "150 – 200 м²":
      return area >= 150 && area <= 200;
    case "от 200 м²":
      return area >= 200;
    default:
      return true;
  }
}

function isAnyCity(value: string): boolean {
  return value === "Любой" || value === "Любой город";
}

function isAnyPrice(value: string): boolean {
  return value === "Любая" || value === "Любой бюджет";
}

function isAnyRooms(value: string): boolean {
  return value === "Любое" || value === "Любое количество";
}

function normalizeFilterValue(
  key: keyof SearchFiltersState,
  value: string
): string {
  switch (key) {
    case "city":
      return value === "Любой" ? "Любой город" : value;
    case "price":
      return value === "Любая" ? "Любой бюджет" : value;
    case "rooms":
    case "bedrooms":
      return value === "Любое" ? "Любое количество" : value;
    default:
      return value;
  }
}

function matchesCount(count: number, value: string): boolean {
  if (value === "5+") return count >= 5;
  if (isAnyRooms(value)) return true;
  return count === Number(value);
}

function matchesReadiness(readiness: House["readiness"], value: string): boolean {
  if (value === "Готов к заселению") return readiness === "ready";
  if (value === "На стадии строительства") return readiness === "building";
  return true;
}

function matchesFloors(floors: number, value: string): boolean {
  if (value === "1 этаж") return floors === 1;
  if (value === "2 этажа") return floors === 2;
  return true;
}

function matchesGas(gas: string, value: string): boolean {
  if (value === "Любой") return true;
  if (value === "Подключен") return /подключ/i.test(gas);
  if (value === "По границе участка") return /границ/i.test(gas);
  if (value === "Планируется") return /планир/i.test(gas);
  return true;
}

function matchesPrefinish(repair: string, value: string): boolean {
  if (value === "Любая") return true;
  const has =
    /отделк|предчист|под ваш/i.test(repair) && !/чистовая готовая|с отделкой/i.test(repair);
  if (value === "Есть") return has;
  if (value === "Нет") return !has;
  return true;
}

function matchesLand(land: number, value: string): boolean {
  if (value === "Любой") return true;
  if (value === "от 10 соток") return land >= 10;
  if (value === "от 8 соток") return land >= 8;
  return true;
}

export function filterHouses(
  houses: House[],
  filters: SearchFiltersState
): House[] {
  return houses
    .filter((house) => {
      if (!isAnyCity(filters.city) && house.city !== filters.city) return false;
      if (!isAnyPrice(filters.price) && !matchesPrice(house.price, filters.price))
        return false;
      if (!matchesArea(house.area, filters.area)) return false;
      if (!matchesCount(house.rooms, filters.rooms)) return false;
      if (!matchesCount(house.bedrooms, filters.bedrooms)) return false;
      if (!matchesLand(house.land, filters.land)) return false;
      if (!matchesReadiness(house.readiness, filters.readiness)) return false;
      if (!matchesFloors(house.specs.floors, filters.floors)) return false;
      if (!matchesGas(house.specs.gas, filters.gas)) return false;
      if (!matchesPrefinish(house.specs.repair, filters.prefinish)) return false;
      return true;
    })
    .sort((a, b) => {
      const d = citySortIndex(a.city) - citySortIndex(b.city);
      if (d !== 0) return d;
      return a.price - b.price;
    });
}

/** Реальный счётчик по каталогу — без маркетинговых «40 домов». */
export function estimateCatalogCount(filters: SearchFiltersState): number {
  return filterHouses(realHouses, filters).length;
}

export function buildSearchParams(filters: SearchFiltersState): string {
  const params = new URLSearchParams();

  (Object.keys(DEFAULT_FILTERS) as (keyof SearchFiltersState)[]).forEach(
    (key) => {
      if (filters[key] !== DEFAULT_FILTERS[key]) {
        params.set(key, filters[key]);
      }
    }
  );

  return params.toString();
}

export function parseSearchParams(
  params: Record<string, string | string[] | undefined>
): SearchFiltersState {
  const get = (key: keyof SearchFiltersState) => {
    const value = params[key];
    if (typeof value !== "string") return DEFAULT_FILTERS[key];
    return normalizeFilterValue(key, value);
  };

  return {
    city: get("city"),
    price: get("price"),
    area: get("area"),
    rooms: get("rooms"),
    bedrooms: get("bedrooms"),
    land: get("land"),
    readiness: get("readiness"),
    floors: get("floors"),
    gas: get("gas"),
    prefinish: get("prefinish"),
  };
}

export function hasActiveFilters(filters: SearchFiltersState): boolean {
  return (Object.keys(DEFAULT_FILTERS) as (keyof SearchFiltersState)[]).some(
    (key) => filters[key] !== DEFAULT_FILTERS[key]
  );
}

export function countActiveFilters(filters: SearchFiltersState): number {
  return (Object.keys(DEFAULT_FILTERS) as (keyof SearchFiltersState)[]).filter(
    (key) => filters[key] !== DEFAULT_FILTERS[key]
  ).length;
}

export function pluralizeHouses(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod100 >= 11 && mod100 <= 19) return "домов";
  if (mod10 === 1) return "дом";
  if (mod10 >= 2 && mod10 <= 4) return "дома";
  return "домов";
}

export function getFilterLabel(
  key: keyof SearchFiltersState,
  value: string
): string {
  const labels: Record<keyof SearchFiltersState, string> = {
    city: "Город",
    price: "Бюджет",
    area: "Площадь",
    rooms: "Комнаты",
    bedrooms: "Спальни",
    land: "Участок",
    readiness: "Статус",
    floors: "Этажность",
    gas: "Газ",
    prefinish: "Отделка",
  };
  return `${labels[key]}: ${value}`;
}

export type CatalogQuickPick = {
  id: string;
  label: string;
  patch: Partial<SearchFiltersState>;
  match: (house: House) => boolean;
};

export const CATALOG_QUICK_PICKS: CatalogQuickPick[] = [
  {
    id: "under7",
    label: "До 7 млн ₽",
    patch: { price: "до 7 000 000 ₽" },
    match: (h) => h.price <= 7_000_000,
  },
  {
    id: "land10",
    label: "Участок от 10 соток",
    patch: { land: "от 10 соток" },
    match: (h) => h.land >= 10,
  },
  {
    id: "gas",
    label: "Газ подключён",
    patch: { gas: "Подключен" },
    match: (h) => /подключ/i.test(h.specs.gas),
  },
  {
    id: "prefinish",
    label: "С предчистовой отделкой",
    patch: { prefinish: "Есть" },
    match: (h) => /отделк|предчист|под ваш/i.test(h.specs.repair),
  },
];

export function availableQuickPicks(houses: House[]): CatalogQuickPick[] {
  return CATALOG_QUICK_PICKS.filter((pick) => houses.some(pick.match));
}
