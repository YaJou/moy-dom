import type { HouseDetailContent } from "@/data/house-detail";
import { getFloorPlanImage } from "@/lib/floor-plan";
import { getFloorPlanStats } from "@/lib/floor-plan";
import {
  getHouseCover,
  getHouseGallery,
  getHouseGallerySplit,
} from "@/lib/house-images";
import type { House } from "@/types/house";

export type GalleryCategoryId =
  | "all"
  | "facade"
  | "interior"
  | "plot"
  | "plan";

export interface GalleryCategory {
  id: GalleryCategoryId;
  label: string;
  images: string[];
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface CompletenessTab {
  id: string;
  label: string;
  image: string | null;
  rows: { label: string; value: string }[];
}

export interface HouseDocumentItem {
  title: string;
  note: string;
}

const READINESS_LABEL: Record<House["readiness"], string> = {
  ready: "Готов к заселению",
  building: "В продаже",
};

export function getReadinessLabel(house: House): string {
  return READINESS_LABEL[house.readiness] ?? house.readiness;
}

/** Галерея без планировки — для обложки и бытовых фото */
export function getHousePhotoGallery(house: House): string[] {
  const plan = getFloorPlanImage(house.id);
  const gallery = getHouseGallery(house);
  if (!plan) return gallery;
  return gallery.filter((src) => src !== plan);
}

export function getHouseGalleryCategories(house: House): GalleryCategory[] {
  const photos = getHousePhotoGallery(house);
  const plan = getFloorPlanImage(house.id);
  const split = getHouseGallerySplit(house.id);
  const categories: GalleryCategory[] = [
    {
      id: "all",
      label: "Все фото",
      images: plan ? [...photos, plan] : photos,
    },
  ];

  if (split) {
    let offset = 0;
    const facade = photos.slice(offset, offset + split.facade);
    offset += split.facade;
    const interior = photos.slice(offset, offset + split.interior);
    offset += split.interior;
    const plot =
      split.plot > 0 ? photos.slice(offset, offset + split.plot) : [];

    if (facade.length) {
      categories.push({ id: "facade", label: "Фасад", images: facade });
    }
    if (interior.length) {
      categories.push({ id: "interior", label: "Внутри", images: interior });
    }
    if (plot.length) {
      categories.push({ id: "plot", label: "Участок", images: plot });
    }
  } else {
    if (photos.length > 0) {
      categories.push({
        id: "facade",
        label: "Фасад",
        images: photos.slice(0, Math.min(3, photos.length)),
      });
    }

    if (photos.length >= 4) {
      categories.push({
        id: "interior",
        label: "Внутри",
        images: photos.slice(2, Math.min(photos.length, 6)),
      });
    }

    if (photos.length >= 3) {
      const plot = photos.slice(-2);
      if (plot.length) {
        categories.push({ id: "plot", label: "Участок", images: plot });
      }
    }
  }

  if (plan) {
    categories.push({ id: "plan", label: "Планировка", images: [plan] });
  }

  return categories.filter((c) => c.images.length > 0);
}

export function getHouseCoverSafe(house: House): string {
  return getHouseCover(house);
}

export function buildKeyFeatures(
  house: House,
  detail: HouseDetailContent
): KeyFeature[] {
  if (detail.keyFeatures?.length) return detail.keyFeatures;

  const stats = getFloorPlanStats(house);
  const features: KeyFeature[] = [];
  const rooms = detail.floorPlanRooms;

  if (stats.bedrooms) {
    features.push({
      title:
        stats.bedrooms === 1
          ? "Отдельная спальня"
          : `${stats.bedrooms} отдельные спальни`,
      description:
        stats.bedrooms >= 3
          ? "Каждому члену семьи — своя комната, без проходных зон."
          : "Личное пространство без проходных комнат.",
    });
  }

  if (stats.kitchenArea) {
    features.push({
      title: `Кухня-гостиная ${stats.kitchenArea}`,
      description: "Общая зона для семьи и гостей в одном объёме.",
    });
  } else if (rooms.some((r) => /кухн/i.test(r.name))) {
    const kitchen = rooms.find((r) => /кухн/i.test(r.name));
    features.push({
      title: "Кухня-гостиная",
      description: kitchen?.description || "Объединённая общая зона.",
    });
  }

  if (house.specs.terrace) {
    features.push({
      title: "Выход на террасу",
      description: house.specs.terrace,
    });
  }

  if (/подключ/i.test(house.specs.electricity) || house.specs.gas) {
    features.push({
      title: "Инженерия на участке",
      description: [
        house.specs.electricity,
        house.specs.water,
        house.specs.sewage,
      ]
        .filter(Boolean)
        .join(" · "),
    });
  }

  if (house.specs.parking) {
    features.push({
      title: "Место для авто",
      description: house.specs.parking,
    });
  }

  if (house.land) {
    features.push({
      title: `Участок ${house.land} сот.`,
      description: `${house.district} · ${house.specs.distanceToCenter} до центра`,
    });
  }

  // Audience insights through layout — only if rooms support it
  const hasExtraRoom =
    (stats.bedrooms ?? 0) >= 3 ||
    rooms.some((r) => /кабинет|гостев|кладов/i.test(r.name));
  if (hasExtraRoom && features.length < 6) {
    features.push({
      title: "Место под кабинет или гостевую",
      description:
        "Отдельная комната позволяет организовать рабочее место или гостевую.",
    });
  }

  return features.slice(0, 6);
}

export function buildCompletenessTabs(
  house: House,
  detail: HouseDetailContent
): CompletenessTab[] {
  if (detail.completenessTabs?.length) return detail.completenessTabs;

  const photos = getHousePhotoGallery(house);
  const table = detail.technicalTable;
  const find = (...keys: string[]) =>
    table.find((row) => keys.some((k) => row.label.toLowerCase().includes(k)))
      ?.value;

  return [
    {
      id: "structure",
      label: "Конструктив",
      image: photos[0] ?? null,
      rows: [
        { label: "Стены", value: house.specs.wallMaterial },
        {
          label: "Фундамент",
          value: house.specs.foundation,
        },
        { label: "Кровля", value: house.specs.roof },
        {
          label: "Год постройки",
          value: String(house.specs.buildYear),
        },
      ].filter((r) => r.value),
    },
    {
      id: "finish",
      label: "Отделка",
      image: photos[1] ?? photos[0] ?? null,
      rows: [
        { label: "Состояние", value: house.specs.repair },
        { label: "Окна", value: find("окн") ?? "Пластиковые окна" },
        { label: "Дверь", value: find("двер") ?? "Входная дверь в цене" },
        { label: "Этажность", value: `${house.specs.floors} этаж` },
      ].filter((r) => r.value),
    },
    {
      id: "utilities",
      label: "Коммуникации",
      image: photos[2] ?? photos[0] ?? null,
      rows: [
        { label: "Электричество", value: house.specs.electricity },
        { label: "Вода", value: house.specs.water },
        { label: "Канализация", value: house.specs.sewage },
        { label: "Газ", value: house.specs.gas },
      ].filter((r) => r.value),
    },
    {
      id: "plot",
      label: "Участок",
      image: photos[photos.length - 1] ?? photos[0] ?? null,
      rows: [
        { label: "Площадь", value: `${house.land} соток` },
        { label: "Категория", value: house.specs.landCategory },
        { label: "Подъезд", value: house.specs.road },
        { label: "Парковка", value: house.specs.parking },
      ].filter((r) => r.value),
    },
  ];
}

export function buildRemainingWork(house: House, detail: HouseDetailContent): string[] {
  if (detail.remainingWork?.length) return detail.remainingWork;

  const items: string[] = [];
  if (/отделк|предчист|под ваш/i.test(house.specs.repair)) {
    items.push("Чистовой ремонт стен, пола и потолков");
    items.push("Установка сантехники, розеток и освещения на финише");
  }
  if (/план|границ/i.test(house.specs.gas) || /не подключ/i.test(house.specs.gas)) {
    items.push("Подключение газа по стандартной процедуре");
  }
  items.push("Мебель и техника по вашему вкусу");
  return items;
}

export function buildDocuments(detail: HouseDetailContent): HouseDocumentItem[] {
  if (detail.documents?.length) return detail.documents;
  return [
    {
      title: "Выписка ЕГРН на дом и участок",
      note: "Покажем на просмотре",
    },
    {
      title: "Техническая документация",
      note: "По запросу у менеджера",
    },
    {
      title: "Условия гарантии",
      note: "В договоре: конструктив 5 лет, инженерия 2 года",
    },
  ];
}

export function getSimilarDiff(current: House, other: House): string | null {
  if (other.land !== current.land) {
    if (other.land < current.land) return "Меньше участок";
    if (other.land > current.land) return "Больше участок";
  }
  if (Math.abs(other.area - current.area) >= 10) {
    if (other.area > current.area) return "Больше площадь";
    return "Меньше площадь";
  }
  if (other.city !== current.city || other.district !== current.district) {
    return "Другая локация";
  }
  if (
    /гараж/i.test(other.specs.parking) &&
    !/гараж/i.test(current.specs.parking)
  ) {
    return "Есть гараж";
  }
  return null;
}

export function priceIncludesSummary(house: House): string {
  return `В цене: дом ${house.area} м², участок ${house.land} сот., базовые коммуникации и юридическое сопровождение сделки.`;
}
