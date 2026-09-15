export type HouseBadge = "new" | "sold" | "sale";
export type HouseReadiness = "ready" | "building";

export interface HouseSpecs {
  floors: number;
  landCategory: string;
  buildYear: number;
  wallMaterial: string;
  terrace: string;
  bathroom: string;
  repair: string;
  electricity: string;
  water: string;
  gas: string;
  sewage: string;
  parking: string;
  road: string;
  infrastructure: string[];
  mortgage: boolean;
  familyMortgage: boolean;
  distanceToCenter: string;
}

export interface House {
  id: number;
  slug: string;
  title: string;
  city: string;
  district: string;
  address: string;
  price: number;
  area: number;
  land: number;
  rooms: number;
  /** Отдельные спальни (не путать с rooms = все жилые комнаты). */
  bedrooms: number;
  /** Одна короткая особенность для карточки каталога. */
  featureLine?: string;
  image: string;
  images: string[];
  badge: HouseBadge;
  readiness: HouseReadiness;
  promoLabel?: string;
  lat: number;
  lng: number;
  mapUrl: string;
  /** Адрес на карте приблизительный. */
  mapApproximate?: boolean;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: HouseSpecs;
  featured: boolean;
  builder: string;
}

export interface SearchFiltersState {
  city: string;
  price: string;
  area: string;
  rooms: string;
  bedrooms: string;
  land: string;
  readiness: string;
  floors: string;
  gas: string;
  prefinish: string;
}

export const DEFAULT_FILTERS: SearchFiltersState = {
  city: "Любой город",
  price: "Любой бюджет",
  area: "Любая",
  rooms: "Любое количество",
  bedrooms: "Любое количество",
  land: "Любой",
  readiness: "Любая",
  floors: "Любая",
  gas: "Любой",
  prefinish: "Любая",
};
