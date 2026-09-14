/** Единый порядок городов на сайте: Энгельс всегда первый. */
export const CITY_ORDER = ["Энгельс", "Саратов", "Балаково"] as const;

export type SiteCity = (typeof CITY_ORDER)[number];

export const CITY_FILTER_OPTIONS = ["Любой город", ...CITY_ORDER] as const;

export function citySortIndex(city: string): number {
  const i = CITY_ORDER.indexOf(city as SiteCity);
  return i === -1 ? CITY_ORDER.length : i;
}

export function sortByCityPriority<T extends { city: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const d = citySortIndex(a.city) - citySortIndex(b.city);
    return d !== 0 ? d : 0;
  });
}

export function formatCitiesList(
  pattern: "в" | "и" | "или" = "и"
): string {
  if (pattern === "в") {
    return "в Энгельсе, Саратове и Балаково";
  }
  if (pattern === "или") {
    return "Энгельсе, Саратове или Балаково";
  }
  return "Энгельсе, Саратове и Балаково";
}
