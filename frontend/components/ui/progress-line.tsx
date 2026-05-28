import { cn } from "@/lib/utils";

export function ProgressLine({ value, tone = "yellow" }: { value: number; tone?: "yellow" | "green" | "red" | "blue" }) {
  const color = tone === "green" ? "bg-emerald-400" : tone === "red" ? "bg-alert-red" : tone === "blue" ? "bg-signal-blue" : "bg-road-yellow";
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-asphalt-deep">
      <div className={cn("h-full rounded-full shadow-glow", color)} style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  );
}
