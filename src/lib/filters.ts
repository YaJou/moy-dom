import { catalogStats } from "@/data/homepage";
import { realHouses } from "@/data/houses";
import {
  DEFAULT_FILTERS,
  type House,
  type SearchFiltersState,
} from "@/types/house";

function matchesPrice(price: number, range: string): boolean {
  switch (range) {
    case "до 5 000 000 ₽":
      return price <= 5_000_000;
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

function matchesRooms(rooms: number, value: string): boolean {
  if (value === "5+") return rooms >= 5;
  if (value === "Любое") return true;
  return rooms === Number(value);
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

export function filterHouses(
  houses: House[],
  filters: SearchFiltersState
): House[] {
  return houses.filter((house) => {
    if (filters.city !== "Любой" && house.city !== filters.city) return false;
    if (!matchesPrice(house.price, filters.price)) return false;
    if (!matchesArea(house.area, filters.area)) return false;
    if (!matchesRooms(house.rooms, filters.rooms)) return false;
    if (!matchesReadiness(house.readiness, filters.readiness)) return false;
    if (!matchesFloors(house.specs.floors, filters.floors)) return false;
    return true;
  });
}

export function estimateCatalogCount(filters: SearchFiltersState): number {
  if (!hasActiveFilters(filters)) return catalogStats.totalHouses;

  if (filters.city !== "Любой") {
    const cityCount = catalogStats.cityCounts[filters.city];
    if (cityCount) return Math.max(1, Math.round(cityCount * 0.6));
  }

  const filtered = filterHouses(realHouses, filters);
  if (filtered.length === 0) return 0;
  return Math.max(filtered.length, Math.min(catalogStats.totalHouses, filtered.length * 8));
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
    return typeof value === "string" ? value : DEFAULT_FILTERS[key];
  };

  return {
    city: get("city"),
    price: get("price"),
    area: get("area"),
    rooms: get("rooms"),
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
