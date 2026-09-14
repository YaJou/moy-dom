export function calcMortgage(
  price: number,
  downPaymentPercent: number,
  years: number,
  rate: number
) {
  const downPayment = price * (downPaymentPercent / 100);
  const loan = price - downPayment;
  const monthlyRate = rate / 1200;
  const months = years * 12;

  if (loan <= 0)
    return { monthly: 0, downPayment, loan: 0, total: downPayment };

  const monthly =
    monthlyRate === 0
      ? loan / months
      : (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  return {
    monthly,
    downPayment,
    loan,
    total: downPayment + monthly * months,
  };
}
