import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function severityColor(severity: number) {
  if (severity >= 80) return "#dc2626";
  if (severity >= 55) return "#f59e0b";
  return "#0f9f8d";
}

export function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}
