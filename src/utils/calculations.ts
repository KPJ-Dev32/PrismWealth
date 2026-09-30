export function calculateSIP(
  targetAmount: number,
  years: number,
  annualReturnPct: number,
  inflationPct: number
): { adjustedTarget: number; monthlySIP: number } {
  const inflatedTarget = targetAmount * Math.pow(1 + inflationPct / 100, years);
  const monthlyRate = annualReturnPct / 100 / 12;
  const n = years * 12;
  const monthlySIP =
    (inflatedTarget * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1);
  return {
    adjustedTarget: Math.round(inflatedTarget),
    monthlySIP: Math.round(monthlySIP),
  };
}

export function calculateFutureValue(
  monthlySIP: number,
  years: number,
  annualReturnPct: number
): number {
  const monthlyRate = annualReturnPct / 100 / 12;
  const n = years * 12;
  return Math.round(
    monthlySIP * ((Math.pow(1 + monthlyRate, n) - 1) / monthlyRate) * (1 + monthlyRate)
  );
}
