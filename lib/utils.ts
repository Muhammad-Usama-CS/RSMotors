import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPKR(amount: number): string {
  if (amount >= 10000000) {
    return `PKR ${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `PKR ${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-PK");
}

export function formatKm(n: number): string {
  return `${n.toLocaleString("en-PK")} km`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
