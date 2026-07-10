import type { House } from "@/types/house";

const FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

/** Главное фото для карточки — 02.jpg */
export function getHouseCover(house: House): string {
  return house.images[1] ?? house.images[0] ?? house.image ?? FALLBACK;
}

/** Галерея: 02.jpg первым, затем 01.jpg (проект), остальные по порядку */
export function getHouseGallery(house: House): string[] {
  if (house.images.length === 0) {
    return [house.image || FALLBACK];
  }
  if (house.images.length === 1) return house.images;

  const [first, second, ...rest] = house.images;
  return [second, first, ...rest];
}

export function isProjectVisualization(src: string): boolean {
  return /\/01\.(jpg|jpeg|webp|png)$/i.test(src);
}

export function isFloorPlan(src: string): boolean {
  return isProjectVisualization(src) || /plan/i.test(src);
}

export { FALLBACK as HOUSE_IMAGE_FALLBACK };
