"use client";

import dynamic from "next/dynamic";
import { Filter, Flame, Layers, LocateFixed, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { complaints } from "@/lib/mock-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatusPill } from "@/components/ui/status-pill";
import { ProgressLine } from "@/components/ui/progress-line";

const MapInner = dynamic(() => import("./map-inner").then((mod) => mod.MapInner), {
  ssr: false,
  loading: () => <div className="grid h-full w-full place-items-center text-sm text-road-muted bg-asphalt-deep">Loading OpenStreetMap...</div>
});

export function MapDashboard() {
  return (
    <main className="relative h-[calc(100vh-92px)] w-full overflow-hidden bg-asphalt-deep">
      {/* Immersive Map Backdrop */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <MapInner />
      </div>

      {/* Futuristic Scan Vignette / Grid Layer over map */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-asphalt-deep/40 via-transparent to-asphalt-deep/60" />

      {/* Floating System Indicators Top-Left */}
      <div className="absolute left-6 top-6 z-20 flex flex-wrap gap-2 pointer-events-auto">
        <StatusPill tone="neutral">OpenStreetMap</StatusPill>
        <StatusPill tone="red" pulse>{complaints.length} active anomalies</StatusPill>
        <StatusPill tone="blue" pulse>Live telemetry</StatusPill>
      </div>

      {/* Left Control Panel: Floating Mission Control & Filters */}
      <aside className="absolute left-6 top-20 bottom-6 z-20 w-80 hidden md:flex flex-col gap-4 pointer-events-auto overflow-y-auto scrollbar-thin">
        <div className="glass-panel rounded-lg p-5 border border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <SectionHeading 
            eyebrow="Mission Control" 
            title="Road Analytics" 
            description="Live geospatial intelligence over ward-scale civic operations." 
          />
        </div>

        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-road-cream">
              <Filter className="h-4 w-4 text-road-yellow" /> Overlay filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Potholes", "Flooding", "Cracks", "High severity", "SLA at risk"].map((filter) => (
              <label key={filter} className="flex items-center justify-between rounded border border-road-outline/30 bg-asphalt-deep/60 px-3 py-2 font-mono text-xs uppercase tracking-[0.06em] text-road-muted cursor-pointer hover:border-road-yellow/30 hover:text-road-cream transition">
                {filter}
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-road-yellow cursor-pointer" />
              </label>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-road-cream">
              <RadioTower className="h-4 w-4 text-road-yellow" /> System performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Metric label="AI processing load" value={78} />
            <Metric label="Sensor connectivity" value={99} tone="green" />
            <Metric label="SLA risk monitor" value={42} tone="red" />
          </CardContent>
        </Card>
      </aside>

      {/* Right Control Panel: Nearby Issues Feed */}
      <aside className="absolute right-6 top-6 bottom-6 z-20 w-80 hidden lg:flex flex-col gap-4 pointer-events-auto overflow-y-auto scrollbar-thin">
        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl flex-1 flex flex-col min-h-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-road-cream">
              <Layers className="h-4 w-4 text-road-yellow" /> Active Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 flex-1 overflow-y-auto pr-1 scrollbar-thin">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="rounded border border-road-outline/30 bg-asphalt-deep/60 p-3 hover:border-road-yellow/40 transition duration-300">
                <div className="flex items-center justify-between gap-2">
                  <strong className="font-mono text-xs text-road-yellow">{complaint.id}</strong>
                  <span className="font-mono text-xs font-semibold text-alert-red">{complaint.analysis.severityScore} SEV</span>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-5 text-road-cream">{complaint.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-road-muted">{complaint.route.department}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </aside>

      {/* Floating Bottom Navigation Toolbar */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-road-outline/45 bg-asphalt/90 p-2 shadow-panel backdrop-blur-xl pointer-events-auto">
        <Button size="sm" variant="outline" className="border-road-outline/65 hover:bg-road-yellow/10">
          <Layers className="h-4 w-4 mr-1 text-road-yellow" /> Views
        </Button>
        <Button size="icon" variant="ghost" className="hover:bg-road-yellow/10" aria-label="Severity heatmap">
          <Flame className="h-4 w-4 text-road-yellow" />
        </Button>
        <Button size="sm" className="bg-road-yellow text-asphalt-deep hover:bg-road-yellow-dim shadow-glow">
          <LocateFixed className="h-4 w-4 mr-1" /> Report anomaly
        </Button>
      </div>
    </main>
  );
}

function Metric({ label, value, tone = "yellow" }: { label: string; value: number; tone?: "yellow" | "green" | "red" }) {
  return (
    <div>
      <div className="mb-1 flex justify-between font-mono text-xs uppercase tracking-[0.06em] text-road-muted">
        <span>{label}</span>
        <span className="text-road-cream">{value}%</span>
      </div>
      <ProgressLine value={value} tone={tone} />
    </div>
  );
}
