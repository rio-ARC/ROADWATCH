import type React from "react";
import { cn } from "@/lib/utils";

const toneClass = {
  yellow: "border-road-yellow/35 bg-road-yellow/10 text-road-yellow",
  red: "border-alert-red/35 bg-alert-red/10 text-alert-red",
  blue: "border-signal-blue/35 bg-signal-blue/10 text-signal-blue",
  neutral: "border-road-outline bg-asphalt-panel/80 text-road-muted"
};

export function StatusPill({
  children,
  tone = "yellow",
  pulse = false,
  className
}: {
  children: React.ReactNode;
  tone?: keyof typeof toneClass;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-sm border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.08em]", toneClass[tone], className)}>
      <span className={cn("h-2 w-2 rounded-full", tone === "red" ? "bg-alert-red" : tone === "blue" ? "bg-signal-blue" : "bg-road-yellow", pulse && "animate-pulse-glow")} />
      {children}
    </span>
  );
}
