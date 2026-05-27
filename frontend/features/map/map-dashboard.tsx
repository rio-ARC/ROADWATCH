"use client";

import dynamic from "next/dynamic";
import { Filter, Layers, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { complaints } from "@/lib/mock-data";

const MapInner = dynamic(() => import("./map-inner").then((mod) => mod.MapInner), {
  ssr: false,
  loading: () => <div className="grid h-[70vh] place-items-center text-sm text-slate-500">Loading OpenStreetMap...</div>
});

export function MapDashboard() {
  return (
    <main className="grid gap-4 px-4 py-6 pb-24 md:grid-cols-[340px_1fr] md:px-8 lg:px-10">
      <aside className="space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Operations Map</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">Complaint heatmap</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Filter className="h-4 w-4 text-teal-700" /> Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Potholes", "Flooding", "Cracks", "High severity", "SLA at risk"].map((filter) => (
              <label key={filter} className="flex items-center justify-between rounded-md border border-slate-200 px-3 py-2 text-sm">
                {filter}
                <input type="checkbox" defaultChecked className="h-4 w-4 accent-teal-700" />
              </label>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Layers className="h-4 w-4 text-teal-700" /> Nearby issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {complaints.map((complaint) => (
              <article key={complaint.id} className="rounded-md border border-slate-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-sm text-slate-950">{complaint.id}</strong>
                  <span className="text-xs font-semibold text-amber-700">{complaint.analysis.severityScore}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{complaint.title}</p>
              </article>
            ))}
          </CardContent>
        </Card>
      </aside>
      <section className="h-[72vh] overflow-hidden rounded-lg border border-slate-200 bg-white p-2 shadow-civic">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <span className="px-2 text-sm font-medium text-slate-600">OpenStreetMap + severity markers</span>
          <Button size="sm" variant="outline"><LocateFixed className="h-4 w-4" /> Locate ward</Button>
        </div>
        <div className="h-[calc(100%-46px)] overflow-hidden rounded-md">
          <MapInner />
        </div>
      </section>
    </main>
  );
}
