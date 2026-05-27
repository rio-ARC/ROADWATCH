"use client";

import dynamic from "next/dynamic";
import { Card } from "@/components/ui/card";

const MapDashboardInner = dynamic(() => import("./map-inner").then((mod) => mod.MapInner), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-sm text-slate-500">Loading civic map...</div>
});

export function DemoMapPreview() {
  return (
    <Card className="h-[560px] overflow-hidden bg-white/80 p-2 shadow-civic">
      <MapDashboardInner compact />
    </Card>
  );
}
