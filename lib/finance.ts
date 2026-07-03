export interface EmiInput {
  vehiclePrice: number;
  downPayment: number;
  interestRate: number; // annual %
  tenureMonths: number;
}

export interface EmiResult {
  loanAmount: number;
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: { month: number; principal: number; interest: number; balance: number }[];
}

export function calculateEmi({
  vehiclePrice,
  downPayment,
  interestRate,
  tenureMonths,
}: EmiInput): EmiResult {
  const loanAmount = Math.max(vehiclePrice - downPayment, 0);
  const monthlyRate = interestRate / 12 / 100;

  let monthlyEmi = 0;
  if (loanAmount <= 0 || tenureMonths <= 0) {
    return { loanAmount: 0, monthlyEmi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
  }

  if (monthlyRate === 0) {
    monthlyEmi = loanAmount / tenureMonths;
  } else {
    const r = monthlyRate;
    const n = tenureMonths;
    monthlyEmi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }

  const schedule: EmiResult["schedule"] = [];
  let balance = loanAmount;
  for (let month = 1; month <= Math.min(tenureMonths, 360); month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyEmi - interest;
    balance = Math.max(balance - principal, 0);
    schedule.push({ month, principal, interest, balance });
  }

  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = totalPayment - loanAmount;

  return { loanAmount, monthlyEmi, totalInterest, totalPayment, schedule };
}
