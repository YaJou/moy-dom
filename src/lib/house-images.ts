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

/** Слайды для карусели карточки каталога: фасад → внутри → план → участок. */
export function getCatalogCardSlides(house: House): CatalogCardSlide[] {
  const cover = getHouseCover(house);
  const plan = getFloorPlanImage(house.id);
  const split = getHouseGallerySplit(house.id);
  const photos = house.images.filter((src) => !isFloorPlan(src));

  let facadeSrc = cover;
  let interiorSrc: string | null = null;
  let plotSrc: string | null = null;

  if (split) {
    const withoutPlan = house.images.filter((src) => !isFloorPlan(src));
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
    facadeSrc = facadeImgs[0] ?? cover;
    interiorSrc = interiorImgs[0] ?? null;
    plotSrc = plotImgs[0] ?? null;
  } else {
    const afterCover = photos.filter((src) => src !== cover);
    interiorSrc =
      afterCover[Math.min(3, Math.max(0, afterCover.length - 1))] ??
      afterCover[0] ??
      null;
    if (photos.length >= 10) {
      plotSrc = photos[photos.length - 1] ?? null;
      if (plotSrc === interiorSrc || plotSrc === facadeSrc) plotSrc = null;
    }
  }

  const slides: CatalogCardSlide[] = [
    { kind: "facade", label: "Фасад", src: facadeSrc },
  ];
  if (interiorSrc) {
    slides.push({ kind: "interior", label: "Внутри", src: interiorSrc });
  }
  if (plan) {
    slides.push({ kind: "plan", label: "Планировка", src: plan });
  }
  if (plotSrc) {
    slides.push({ kind: "plot", label: "Участок", src: plotSrc });
  }
  return slides;
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
