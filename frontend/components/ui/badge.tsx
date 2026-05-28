import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border border-road-yellow/30 bg-road-yellow/10 px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-[0.05em] text-road-yellow",
        className
      )}
      {...props}
    />
  );
}
