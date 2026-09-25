import type { House } from "@/types/house";
import { getFloorPlanImage } from "@/lib/floor-plan";

const FALLBACK =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80";

/** Сколько фото после плана: фасад / внутри / участок (0 = нет вкладки). */
export type HouseGallerySplit = {
  facade: number;
  interior: number;
  plot: number;
};

const GALLERY_SPLIT_BY_ID: Record<number, HouseGallerySplit> = {
  // план + 7 фасад + 8 внутри, фоток участка нет
  7: { facade: 7, interior: 8, plot: 0 },
  // без плана: 5 фасад/терраса + 5 внутри
  8: { facade: 5, interior: 5, plot: 0 },
  // без плана: 4 фасад + 6 внутри
  9: { facade: 4, interior: 6, plot: 0 },
  // план + 9 фасад/участок + 12 внутри
  10: { facade: 9, interior: 12, plot: 0 },
};

export function getHouseGallerySplit(houseId: number): HouseGallerySplit | null {
  return GALLERY_SPLIT_BY_ID[houseId] ?? null;
}

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

export type CatalogCardSlideKind = "facade" | "interior" | "plan" | "plot";

export type CatalogCardSlide = {
  kind: CatalogCardSlideKind;
  label: string;
  src: string;
};

/** Слайды для карусели карточки каталога с подписями. */
export function getCatalogCardSlides(house: House): CatalogCardSlide[] {
  const plan = getFloorPlanImage(house.id);
  const split = getHouseGallerySplit(house.id);
  const withoutPlan = house.images.filter((src) => !isFloorPlan(src));
  const slides: CatalogCardSlide[] = [];

  const pushUnique = (
    kind: CatalogCardSlideKind,
    label: string,
    src: string | null | undefined
  ) => {
    if (!src) return;
    if (slides.some((s) => s.src === src)) return;
    slides.push({ kind, label, src });
  };

  if (split) {
    const facadeImgs = withoutPlan.slice(0, split.facade);
    const interiorImgs = withoutPlan.slice(
      split.facade,
      split.facade + split.interior
    );
    const plotImgs =
      split.plot > 0
        ? withoutPlan.slice(
            split.facade + split.interior,
            split.facade + split.interior + split.plot
          )
        : [];
    facadeImgs.forEach((src) => pushUnique("facade", "Фасад", src));
    interiorImgs.forEach((src) =>
      pushUnique("interior", "Кухня-гостиная", src)
    );
    if (plan) pushUnique("plan", "Планировка", plan);
    plotImgs.forEach((src) => pushUnique("plot", "Участок", src));
  } else {
    const cover = getHouseCover(house);
    const rest = withoutPlan.filter((src) => src !== cover);
    const mid = Math.max(1, Math.ceil(rest.length / 2));
    pushUnique("facade", "Фасад", cover);
    rest.slice(0, mid).forEach((src) => pushUnique("facade", "Фасад", src));
    rest
      .slice(mid)
      .forEach((src) => pushUnique("interior", "Кухня-гостиная", src));
    if (plan) pushUnique("plan", "Планировка", plan);
    if (withoutPlan.length >= 10) {
      const plot = withoutPlan[withoutPlan.length - 1];
      pushUnique("plot", "Участок", plot);
    }
  }

  if (slides.length === 0) {
    pushUnique("facade", "Фасад", house.image);
  }

  // Карточка: не больше 8 кадров, чтобы счётчик «1 / 8» был осмысленным
  return slides.slice(0, 8);
}

export function formatGasLabel(gas: string): string {
  if (/подключ/i.test(gas)) return "Газ подключён";
  if (/границ/i.test(gas)) return "Газ по границе";
  if (/планир/i.test(gas)) return "Газ планируется";
  return gas;
}

export function formatRepairLabel(repair: string): string {
  if (/под ваш|предчист/i.test(repair)) return "Под вашу отделку";
  return repair;
}

export { FALLBACK as HOUSE_IMAGE_FALLBACK };
