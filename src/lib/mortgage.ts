export function calcMortgage(
  price: number,
  downPaymentPercent: number,
  years: number,
  rate: number
) {
  const downPayment = price * (downPaymentPercent / 100);
  const loan = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const months = years * 12;

  if (loan <= 0)
    return { monthly: 0, downPayment, loan: 0, total: downPayment };

  const monthly =
    (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return {
    monthly,
    downPayment,
    loan,
    total: downPayment + monthly * months,
  };
}
