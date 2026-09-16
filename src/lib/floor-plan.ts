import { getHouseDetail } from "@/data/house-detail";
import { realHouses } from "@/data/houses";
import { sortByCityPriority } from "@/lib/cities";
import type { House } from "@/types/house";

/** Houses where 01.jpg is a real floor plan (see README in each folder). */
const FLOOR_PLAN_BY_ID: Record<number, string> = {
  2: "/images/houses/engels-snt-malinki-troitskaya-100/01.jpg",
  4: "/images/houses/engels-snt-novoe-veselaya-116/01.jpg",
  7: "/images/houses/engels-snt-malinki-pokrovskoye-87/01.jpg",
};

export function getFloorPlanImage(houseId: number): string | null {
  return FLOOR_PLAN_BY_ID[houseId] ?? null;
}

export function getHousesWithFloorPlans(): House[] {
  return sortByCityPriority(
    realHouses.filter((h) => FLOOR_PLAN_BY_ID[h.id])
  );
}

function parseFirstNumber(text: string | undefined | null): number | null {
  if (!text) return null;
  const match = text.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  const n = Number(match[1].replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function extractAreaLabel(text: string | undefined | null): string | null {
  if (!text) return null;
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*м²/i);
  return match ? `${match[1].replace(",", ".")} м²` : null;
}

export function getFloorPlanStats(house: House) {
  const detail = getHouseDetail(house);
  const rooms = detail.floorPlanRooms;
  const table = detail.technicalTable;

  const bedroomsFromRooms = rooms.filter((r) =>
    /спальн/i.test(r.name)
  ).length;
  const bedroomsFromTable = parseFirstNumber(
    table.find((row) => /спальн/i.test(row.label))?.value
  );
  const bedrooms =
    bedroomsFromRooms > 0
      ? bedroomsFromRooms
      : bedroomsFromTable && bedroomsFromTable > 0
        ? Math.round(bedroomsFromTable)
        : null;

  const kitchenRoom = rooms.find((r) => /кухн/i.test(r.name));
  const kitchenFromTable = table.find((row) => /кухн/i.test(row.label));
  const kitchenArea =
    extractAreaLabel(kitchenRoom?.description) ??
    extractAreaLabel(kitchenFromTable?.value) ??
    null;

  const bathRoom = rooms.find((r) => /санузел/i.test(r.name));
  const bathFromDesc =
    bathRoom?.description && /санузел/i.test(bathRoom.description)
      ? parseFirstNumber(bathRoom.description)
      : null;
  const bathFromCount = rooms.filter((r) => /санузел/i.test(r.name)).length;
  const bathFromTable = parseFirstNumber(
    table.find((row) => /санузел/i.test(row.label))?.value
  );
  const bathrooms =
    bathFromDesc && bathFromDesc >= 1
      ? Math.round(bathFromDesc)
      : bathFromTable && bathFromTable >= 1
        ? Math.round(bathFromTable)
        : bathFromCount > 0
          ? bathFromCount
          : null;

  return {
    bedrooms,
    kitchenArea,
    bathrooms,
  };
}
