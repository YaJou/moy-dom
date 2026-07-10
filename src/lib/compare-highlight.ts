import type { House } from "@/types/house";

function getBestIndices(
  houses: House[],
  scoreFn: (house: House) => number | null
): Set<number> {
  const scores = houses.map(scoreFn);
  if (scores.some((s) => s === null)) return new Set();

  const valid = scores as number[];
  const best = Math.max(...valid);
  if (valid.every((s) => s === best)) return new Set();

  return new Set(
    valid.map((score, index) => (score === best ? index : -1)).filter((i) => i >= 0)
  );
}

function textScore(text: string, rules: [string, number][]): number {
  const lower = text.toLowerCase();
  let best = 0;
  for (const [keyword, score] of rules) {
    if (lower.includes(keyword)) best = Math.max(best, score);
  }
  return best;
}

function parseDistanceKm(text: string): number | null {
  const match = text.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  return Number.parseFloat(match[1].replace(",", "."));
}

export type CompareRowKey =
  | "price"
  | "area"
  | "land"
  | "rooms"
  | "buildYear"
  | "gas"
  | "water"
  | "sewage"
  | "repair"
  | "mortgage"
  | "distance";

export function getBestHouseIndices(
  houses: House[],
  rowKey: CompareRowKey
): Set<number> {
  if (houses.length < 2) return new Set();

  switch (rowKey) {
    case "price":
      return getBestIndices(houses, (h) => -h.price);
    case "area":
      return getBestIndices(houses, (h) => h.area);
    case "land":
      return getBestIndices(houses, (h) => h.land);
    case "rooms":
      return getBestIndices(houses, (h) => h.rooms);
    case "buildYear":
      return getBestIndices(houses, (h) => h.specs.buildYear);
    case "gas":
      return getBestIndices(houses, (h) =>
        textScore(h.specs.gas, [
          ["подключ", 3],
          ["провед", 3],
          ["по границе", 2],
          ["магистрал", 2],
        ])
      );
    case "water":
      return getBestIndices(houses, (h) =>
        textScore(h.specs.water, [
          ["центральн", 3],
          ["водопровод", 3],
          ["скважин", 2],
          ["колод", 1],
        ])
      );
    case "sewage":
      return getBestIndices(houses, (h) =>
        textScore(h.specs.sewage, [
          ["центральн", 3],
          ["станция", 2],
          ["септик", 2],
          ["выгреб", 1],
        ])
      );
    case "repair":
      return getBestIndices(houses, (h) =>
        textScore(h.specs.repair, [
          ["под ключ", 4],
          ["чистов", 3],
          ["предчист", 2],
          ["требует", 1],
        ])
      );
    case "mortgage":
      return getBestIndices(houses, (h) => {
        if (h.specs.familyMortgage) return 3;
        if (h.specs.mortgage) return 2;
        return 0;
      });
    case "distance":
      return getBestIndices(houses, (h) => {
        const km = parseDistanceKm(h.specs.distanceToCenter);
        return km === null ? null : -km;
      });
    default:
      return new Set();
  }
}
