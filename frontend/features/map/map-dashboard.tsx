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
  loading: () => <div className="grid h-[70vh] place-items-center text-sm text-road-muted">Loading OpenStreetMap...</div>
});

export function MapDashboard() {
  return (
    <main className="grid gap-4 px-4 py-6 pb-28 md:px-8 lg:grid-cols-[320px_1fr_300px] lg:px-10">
      <aside className="space-y-4">
        <SectionHeading eyebrow="Mission Control" title="Complaint heatmap" description="Live road intelligence over ward-scale civic operations." status="Live feed" />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Filter className="h-4 w-4 text-road-yellow" /> Overlay filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Potholes", "Flooding", "Cracks", "High severity", "SLA at risk"].map((filter) => (
              <label key={filter} className="flex items-center justify-between rounded border border-road-outline bg-asphalt-deep/45 px-3 py-2 font-mono text-xs uppercase tracking-[0.06em] text-road-muted">
                {filter}
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-road-yellow" />
              </label>
            ))}
          </CardContent>
        </Card>
        <Card className="hidden lg:block">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><RadioTower className="h-4 w-4 text-road-yellow" /> System performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Metric label="AI processing load" value={78} />
            <Metric label="Sensor connectivity" value={99} tone="green" />
            <Metric label="SLA risk monitor" value={42} tone="red" />
          </CardContent>
        </Card>
      </aside>
      <section className="scan-vignette relative h-[76vh] min-h-[560px] overflow-hidden rounded-lg border border-road-outline bg-asphalt-deep p-2 shadow-panel lg:col-span-1">
        <div className="absolute left-4 top-4 z-[500] flex flex-wrap gap-2">
          <StatusPill>OpenStreetMap</StatusPill>
          <StatusPill tone="red" pulse>{complaints.length} active anomalies</StatusPill>
        </div>
        <div className="h-full overflow-hidden rounded">
          <MapInner />
        </div>
        <div className="absolute bottom-5 left-1/2 z-[500] flex -translate-x-1/2 items-center gap-3 rounded-full border border-road-outline bg-asphalt/85 p-2 shadow-panel backdrop-blur-xl">
          <Button size="sm" variant="outline"><Layers className="h-4 w-4" /> Views</Button>
          <Button size="icon" variant="ghost" aria-label="Severity heatmap"><Flame className="h-4 w-4 text-road-yellow" /></Button>
          <Button size="sm"><LocateFixed className="h-4 w-4" /> Report issue</Button>
        </div>
      </section>
      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Layers className="h-4 w-4 text-road-yellow" /> Nearby issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="rounded border border-road-outline bg-asphalt-deep/45 p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="font-mono text-xs text-road-yellow">{complaint.id}</strong>
                  <span className="font-mono text-xs font-semibold text-alert-red">{complaint.analysis.severityScore}</span>
                </div>
                <p className="mt-2 text-sm leading-5 text-road-cream">{complaint.title}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-road-muted">{complaint.route.department}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </aside>
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
