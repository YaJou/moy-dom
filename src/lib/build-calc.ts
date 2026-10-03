/** Примерный расчёт строительства дома под заказ (сырые ставки). */

export type RoofType = "gch" | "mch";
export type WindowColor = "white" | "colored";
export type WallCore = "grass" | "kbb";
export type FacadeFinish = "brick" | "plaster";

export interface BuildCalcInput {
  lengthM: number;
  widthM: number;
  /** Высота потолка, м. База — 3.0 м. */
  heightM: number;
  roof: RoofType;
  windows: WindowColor;
  wallCore: WallCore;
  facade: FacadeFinish;
}

export interface BuildCalcBreakdownItem {
  label: string;
  value: number;
  note?: string;
}

export interface BuildCalcResult {
  area: number;
  ratePerM2: number;
  basePrice: number;
  heightSteps: number;
  heightSurcharge: number;
  total: number;
  breakdown: BuildCalcBreakdownItem[];
}

/** База: ГЧ + белые окна + грас + облицовка, высота 3 м. */
export const BUILD_BASE_RATE = 44_000;
export const BUILD_BASE_HEIGHT_M = 3;
/** Каждые +10 см выше 3 м. */
export const BUILD_HEIGHT_STEP_M = 0.1;
export const BUILD_HEIGHT_STEP_PRICE = 50_000;

export const BUILD_RATE_ADJ = {
  /** МЧ вместо ГЧ */
  mch: -1_500,
  /** Серые / коричневые окна */
  coloredWindows: 1_000,
  /** КББ вместо грас */
  kbb: -500,
  /** Штукатурка вместо облицовки */
  plaster: -1_000,
} as const;

export function calcBuildPrice(input: BuildCalcInput): BuildCalcResult {
  const lengthM = clamp(input.lengthM, 5, 25);
  const widthM = clamp(input.widthM, 5, 20);
  const heightM = clamp(round1(input.heightM), 2.5, 4.0);

  const area = round1(lengthM * widthM);

  let rate = BUILD_BASE_RATE;
  const breakdown: BuildCalcBreakdownItem[] = [
    {
      label: "База (ГЧ, белые окна, грас + облицовка)",
      value: BUILD_BASE_RATE,
      note: "₽/м² при высоте 3 м",
    },
  ];

  if (input.roof === "mch") {
    rate += BUILD_RATE_ADJ.mch;
    breakdown.push({
      label: "Кровля МЧ вместо ГЧ",
      value: BUILD_RATE_ADJ.mch,
      note: "₽/м²",
    });
  }
  if (input.windows === "colored") {
    rate += BUILD_RATE_ADJ.coloredWindows;
    breakdown.push({
      label: "Окна серые / коричневые",
      value: BUILD_RATE_ADJ.coloredWindows,
      note: "₽/м²",
    });
  }
  if (input.wallCore === "kbb") {
    rate += BUILD_RATE_ADJ.kbb;
    breakdown.push({
      label: "Стены КББ вместо грас",
      value: BUILD_RATE_ADJ.kbb,
      note: "₽/м²",
    });
  }
  if (input.facade === "plaster") {
    rate += BUILD_RATE_ADJ.plaster;
    breakdown.push({
      label: "Штукатурка вместо облицовки",
      value: BUILD_RATE_ADJ.plaster,
      note: "₽/м²",
    });
  }

  const basePrice = Math.round(area * rate);

  const heightSteps =
    heightM > BUILD_BASE_HEIGHT_M
      ? Math.round((heightM - BUILD_BASE_HEIGHT_M) / BUILD_HEIGHT_STEP_M)
      : 0;
  const heightSurcharge = heightSteps * BUILD_HEIGHT_STEP_PRICE;

  if (heightSurcharge > 0) {
    breakdown.push({
      label: `Высота +${(heightSteps * 10).toFixed(0)} см к 3 м`,
      value: heightSurcharge,
      note: `${heightSteps} × ${BUILD_HEIGHT_STEP_PRICE.toLocaleString("ru-RU")} ₽`,
    });
  }

  return {
    area,
    ratePerM2: rate,
    basePrice,
    heightSteps,
    heightSurcharge,
    total: basePrice + heightSurcharge,
    breakdown,
  };
}

function clamp(n: number, min: number, max: number): number {
  if (!Number.isFinite(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
