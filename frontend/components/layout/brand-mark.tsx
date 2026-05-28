import { Route } from "lucide-react";
import { cn } from "@/lib/utils";

export function BrandMark({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="grid h-9 w-9 place-items-center rounded-full border border-road-yellow/50 bg-road-yellow text-asphalt-deep shadow-glow">
        <Route className="h-5 w-5" />
      </span>
      {!compact && <span className="font-display text-lg font-bold uppercase tracking-[0.04em] text-road-yellow">RoadWatch</span>}
    </div>
  );
}
