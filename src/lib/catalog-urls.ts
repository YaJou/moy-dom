import type { House } from "@/types/house";

export function getCityCatalogHref(city: string): string {
  if (city === "Балаково") return "/catalog/balakovo";
  return `/catalog?city=${encodeURIComponent(city)}`;
}
