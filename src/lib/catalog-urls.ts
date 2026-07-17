import type { House } from "@/types/house";

const CITY_SLUGS: Record<string, string> = {
  Саратов: "/catalog/saratov",
  Энгельс: "/catalog/engels",
  Балаково: "/catalog/balakovo",
};

export function getCityCatalogHref(city: string): string {
  return CITY_SLUGS[city] ?? `/catalog?city=${encodeURIComponent(city)}`;
}

export function getCitySlugFromName(city: string): string | null {
  const href = CITY_SLUGS[city];
  if (!href) return null;
  return href.replace("/catalog/", "");
}
