export function currencyINR(n) {
  if (n === null || n === undefined || n === "") return "";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(num);
}

export function percentOff(original, discount) {
  const o = Number(original);
  const d = Number(discount);
  if (!o || !d) return 0;
  return Math.max(0, Math.min(100, Math.round(((o - d) / o) * 100)));
}
