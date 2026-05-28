import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function TelemetryCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "yellow",
  className
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon?: LucideIcon;
  tone?: "yellow" | "red" | "blue" | "neutral";
  className?: string;
}) {
  const color = tone === "red" ? "text-alert-red" : tone === "blue" ? "text-signal-blue" : tone === "neutral" ? "text-road-cream" : "text-road-yellow";
  return (
    <article className={cn("glass-panel rounded-lg p-4 transition hover:border-road-yellow/55", className)}>
      <div className="mb-3 flex items-center justify-between gap-3 text-road-muted">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em]">{label}</span>
        {Icon && <Icon className={cn("h-4 w-4", color)} />}
      </div>
      <strong className={cn("block font-mono text-2xl font-bold", color)}>{value}</strong>
      {detail && <p className="mt-2 text-xs leading-5 text-road-muted">{detail}</p>}
    </article>
  );
}
