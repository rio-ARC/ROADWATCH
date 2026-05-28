import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "min-h-28 w-full rounded border border-road-outline bg-asphalt-deep/70 px-3 py-2 text-sm text-road-cream outline-none transition placeholder:text-road-muted/55 focus:border-road-yellow focus:ring-2 focus:ring-road-yellow/15",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
