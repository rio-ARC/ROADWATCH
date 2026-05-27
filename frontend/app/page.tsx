import Link from "next/link";
import { ArrowRight, BarChart3, MapPinned, ShieldCheck, WifiOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/features/dashboard/metric-card";
import { DemoMapPreview } from "@/features/map/demo-map-preview";
import { dashboardSummary } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="space-y-10 pb-12">
      <section className="grid min-h-[calc(100vh-92px)] items-center gap-8 px-4 pt-4 md:grid-cols-[0.95fr_1.05fr] md:px-8 lg:px-10">
        <div className="max-w-3xl space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3 py-1 text-sm font-medium text-teal-800 shadow-sm">
            <ShieldCheck className="h-4 w-4" />
            Government-grade civic road intelligence
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-normal text-slate-950 md:text-7xl">
              RoadWatch
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Report damage, route complaints, audit repairs, and expose public works performance through a map-first AI platform built for low-network civic operations.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/report">
                Report issue <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/dashboard">
                Open dashboard <MapPinned className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MetricCard label="Open complaints" value={dashboardSummary.openComplaints} trend="-12% SLA breach risk" />
            <MetricCard label="Avg response" value={`${dashboardSummary.avgResponseHours}h`} trend="Ward-level tracking" />
            <MetricCard label="Duplicate merges" value={dashboardSummary.duplicateMerges} trend="Geo + vision signals" />
          </div>
        </div>
        <DemoMapPreview />
      </section>

      <section className="px-4 md:px-8 lg:px-10">
        <div className="grid gap-4 md:grid-cols-4">
          {([
            ["Map-centric operations", "Heatmaps, severity overlays, ward filters, and live complaint markers.", MapPinned],
            ["AI-assisted triage", "YOLO-ready inference for potholes, cracks, erosion, debris, and flooding.", BarChart3],
            ["Offline-first reporting", "Reports queue locally and sync with optimistic IDs when networks return.", WifiOff],
            ["Accountability layer", "Contractor response time, budget allocation, and project repair timelines.", ShieldCheck]
          ] as Array<[string, string, LucideIcon]>).map(([title, text, Icon]) => (
            <article key={title} className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-sm">
              <Icon className="mb-4 h-6 w-6 text-teal-700" />
              <h2 className="text-base font-semibold text-slate-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
