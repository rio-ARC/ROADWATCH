import Link from "next/link";
import { ArrowRight, BarChart3, MapPinned, Radar, ShieldCheck, WifiOff } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/features/dashboard/metric-card";
import { DemoMapPreview } from "@/features/map/demo-map-preview";
import { dashboardSummary } from "@/lib/mock-data";
import { StatusPill } from "@/components/ui/status-pill";

export default function HomePage() {
  return (
    <main className="space-y-10 pb-24">
      <section className="grid min-h-[calc(100vh-92px)] items-center gap-8 px-4 pt-8 md:grid-cols-[0.95fr_1.05fr] md:px-8 lg:px-10">
        <div className="max-w-3xl space-y-7">
          <StatusPill pulse>System online // civic network</StatusPill>
          <div className="space-y-4">
            <h1 className="font-display text-5xl font-bold uppercase leading-[1.02] tracking-normal text-road-cream md:text-7xl">
              AI Road <span className="text-road-yellow">Mission Control</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-road-muted">
              Detect damage, route civic complaints, audit repairs, and expose public works performance through a black-box-resistant, map-first infrastructure intelligence platform.
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
            <article key={title} className="glass-panel rounded-lg p-5 transition duration-300 glow-yellow-hover hover:border-road-yellow/50">
              <Icon className="mb-4 h-6 w-6 text-road-yellow" />
              <h2 className="font-display text-base font-semibold text-road-cream">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-road-muted">{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="px-4 md:px-8 lg:px-10">
        <div className="glass-panel grid gap-4 rounded-lg p-5 md:grid-cols-3 border border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <Radar className="h-6 w-6 text-road-yellow" />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-road-muted">AI confidence</p>
              <strong className="font-mono text-2xl text-road-cream">98.7%</strong>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm leading-6 text-road-muted">
              Built as a civic operating layer, not a chatbot wrapper: vision handles evidence, deterministic services handle routing, and the assistant cites structured records.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
