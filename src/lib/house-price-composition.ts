import type { House } from "@/types/house";

export type PriceCompositionRow = {
  label: string;
  value: string;
};

export type HousePriceComposition = {
  rows: PriceCompositionRow[];
  includedSummary: string;
  separateSummary: string;
};

function landLabel(land: number): string {
  const n = Number.isInteger(land) ? `${land}` : String(land).replace(".", ",");
  return `${n} соток`;
}

function heatingLabel(house: House): string {
  const gas = house.specs.gas;
  if (/подключ/i.test(gas)) {
    return "Газовое отопление (газ подключён)";
  }
  if (/границ/i.test(gas)) {
    return "Котельная / разводка — газ по границе участка";
  }
  if (/планир/i.test(gas)) {
    return "Котельная подготовлена; газ планируется";
  }
  return "Уточняется на просмотре";
}

function remainingForBuyer(house: House): string {
  const repair = house.specs.repair;
  if (/чернов|под ваш|предчист/i.test(repair)) {
    return "Чистовая отделка, сантехника финиш, мебель, благоустройство участка";
  }
  if (/чист/i.test(repair)) {
    return "Мебель и личные пожелания по благоустройству";
  }
  return "Состав уточняется — скажем на просмотре";
}

/** Состав цены конкретного дома — не общая таблица. */
export function getHousePriceComposition(house: House): HousePriceComposition {
  const rows: PriceCompositionRow[] = [
    { label: "Участок", value: landLabel(house.land) },
    { label: "Отделка", value: house.specs.repair || "Уточняется" },
    { label: "Отопление", value: heatingLabel(house) },
    {
      label: "Вода и канализация",
      value: `${house.specs.water} · ${house.specs.sewage}`,
    },
    {
      label: "Электричество",
      value: house.specs.electricity || "Уточняется",
    },
    { label: "Газ", value: house.specs.gas || "Уточняется" },
    {
      label: "Работы, которые остаются покупателю",
      value: remainingForBuyer(house),
    },
  ];

  const includedSummary = [
    `дом ${house.area} м²`,
    `участок ${landLabel(house.land)}`,
    house.specs.repair,
    `вода: ${house.specs.water}`,
    `канализация: ${house.specs.sewage}`,
    `электричество: ${house.specs.electricity}`,
    `газ: ${house.specs.gas}`,
  ].join(" · ");

  return {
    rows,
    includedSummary,
    separateSummary: remainingForBuyer(house),
  };
}

export function hasTwoBathrooms(house: House): boolean {
  return /2\s*санузел|два санузла/i.test(house.specs.bathroom);
}

export function hasLargeKitchenLiving(house: House): boolean {
  if (/кухн|террас/i.test(house.featureLine ?? "")) return true;
  if (/террас|33/i.test(house.specs.terrace ?? "")) return true;
  return /кухн.*террас|террас/i.test(house.shortDescription);
}
