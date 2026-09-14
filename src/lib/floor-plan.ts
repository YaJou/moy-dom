import { realHouses } from "@/data/houses";
import { getHouseDetail } from "@/data/house-detail";
import type { House } from "@/types/house";

/** Houses where 01.jpg is a real floor plan (see README in each folder). */
const FLOOR_PLAN_BY_ID: Record<number, string> = {
  2: "/images/houses/balakovo-novonatalino-100/01.jpg",
  4: "/images/houses/engels-snt-novoe-veselaya-116/01.jpg",
  7: "/images/houses/engels-snt-malinki-pokrovskoye-87/01.jpg",
};

export function getFloorPlanImage(houseId: number): string | null {
  return FLOOR_PLAN_BY_ID[houseId] ?? null;
}

export function getHousesWithFloorPlans(): House[] {
  return realHouses.filter((h) => FLOOR_PLAN_BY_ID[h.id]);
}

export function getFloorPlanStats(house: House) {
  const detail = getHouseDetail(house);
  const bedrooms = detail.floorPlanRooms.filter((r) =>
    r.name.toLowerCase().includes("спальн")
  ).length;
  const kitchen = detail.floorPlanRooms.find((r) =>
    r.name.toLowerCase().includes("кухн")
  );
  const storage = detail.floorPlanRooms.find(
    (r) =>
      r.name.toLowerCase().includes("хран") ||
      r.name.toLowerCase().includes("гардер") ||
      r.name.toLowerCase().includes("котель")
  );

  return {
    bedrooms: bedrooms || null,
    kitchen: kitchen?.description ?? kitchen?.name ?? null,
    storage: storage?.description ?? storage?.name ?? null,
  };
}
