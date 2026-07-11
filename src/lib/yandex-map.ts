import type { House } from "@/types/house";

export function buildYandexMapEmbedUrl(
  houses: House[],
  focus?: House | null
): string {
  if (houses.length === 0) return "";

  const pts = houses
    .map((h) => `pt=${h.lng}%2C${h.lat}%2Cpm2orgl`)
    .join("&");

  let centerLat: number;
  let centerLng: number;
  let z: number;

  if (focus) {
    centerLat = focus.lat;
    centerLng = focus.lng;
    z = 16;
  } else {
    centerLat = houses.reduce((sum, h) => sum + h.lat, 0) / houses.length;
    centerLng = houses.reduce((sum, h) => sum + h.lng, 0) / houses.length;
    z = 12;

    if (houses.length > 1) {
      const latSpread =
        Math.max(...houses.map((h) => h.lat)) -
        Math.min(...houses.map((h) => h.lat));
      const lngSpread =
        Math.max(...houses.map((h) => h.lng)) -
        Math.min(...houses.map((h) => h.lng));
      const spread = Math.max(latSpread, lngSpread);

      if (spread > 0.8) z = 7;
      else if (spread > 0.4) z = 8;
      else if (spread > 0.15) z = 9;
      else if (spread > 0.05) z = 11;
      else if (spread > 0.01) z = 13;
      else z = 14;
    }
  }

  return `https://yandex.ru/map-widget/v1/?ll=${centerLng}%2C${centerLat}&z=${z}&${pts}&lang=ru_RU`;
}
