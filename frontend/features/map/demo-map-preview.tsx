"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const MapDashboardInner = dynamic(() => import("./map-inner").then((mod) => mod.MapInner), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-road-muted">Loading civic map...</div>
});

export function DemoMapPreview() {
  return (
    <Card className="scan-vignette relative h-[560px] overflow-hidden p-2">
      <MapDashboardInner compact />
    </Card>
  );
}
