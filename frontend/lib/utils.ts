import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function severityColor(severity: number) {
  if (severity >= 80) return "#ff5a4f";
  if (severity >= 55) return "#ffd700";
  return "#74a8ff";
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
