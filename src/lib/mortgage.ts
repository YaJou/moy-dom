/** Аннуитетный расчёт при известной годовой ставке (%). */
export function calcMortgage(
  price: number,
  downPaymentPercent: number,
  years: number,
  rate: number
) {
  const safePrice = Number.isFinite(price) && price > 0 ? price : 0;
  const pct = Number.isFinite(downPaymentPercent)
    ? Math.min(100, Math.max(0, downPaymentPercent))
    : 0;
  const downPayment = safePrice * (pct / 100);
  const result = calcMortgageFromDown(safePrice, downPayment, years, rate);
  return {
    monthly: result.monthly ?? 0,
    downPayment: result.downPayment,
    loan: result.loan,
    total: result.total ?? result.downPayment,
  };
}

/** Ставка null — без ежемесячного платежа (нужно указать ставку). */
export function calcMortgageFromDown(
  price: number,
  downPaymentRaw: number,
  years: number,
  rate: number | null | undefined
) {
  const safePrice = Number.isFinite(price) && price > 0 ? price : 0;
  const downPayment = Math.min(
    safePrice,
    Math.max(0, Number.isFinite(downPaymentRaw) ? downPaymentRaw : 0)
  );
  const loan = Math.max(0, safePrice - downPayment);
  const months =
    Number.isFinite(years) && years > 0 ? Math.round(years * 12) : 0;

  if (loan <= 0 || months <= 0) {
    return {
      monthly: 0 as number | null,
      downPayment,
      loan: 0,
      total: downPayment as number | null,
      hasRate: rate != null && Number.isFinite(rate),
    };
  }

  if (rate == null || !Number.isFinite(rate) || rate < 0) {
    return {
      monthly: null as number | null,
      downPayment,
      loan,
      total: null as number | null,
      hasRate: false,
    };
  }

  const monthlyRate = rate / 1200;
  const monthly =
    monthlyRate === 0
      ? loan / months
      : (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  return {
    monthly: monthly as number | null,
    downPayment,
    loan,
    total: (downPayment + monthly * months) as number | null,
    hasRate: true,
  };
}

export function catalogHrefForBudget(price: number): string {
  if (price <= 5_000_000) {
    return `/catalog/?price=${encodeURIComponent("до 5 000 000 ₽")}`;
  }
  if (price <= 7_000_000) {
    return `/catalog/?price=${encodeURIComponent("5 000 000 – 7 000 000 ₽")}`;
  }
  if (price <= 10_000_000) {
    return `/catalog/?price=${encodeURIComponent("7 000 000 – 10 000 000 ₽")}`;
  }
  return `/catalog/?price=${encodeURIComponent("от 10 000 000 ₽")}`;
}
