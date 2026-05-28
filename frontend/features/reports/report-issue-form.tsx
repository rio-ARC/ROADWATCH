"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, CloudUpload, Languages, LocateFixed, Mic, Route, ScanLine, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { roadwatchApi } from "@/services/api";
import type { AIAnalysis, AuthorityRoute } from "@/types/roadwatch";
import { useOfflineSync } from "@/hooks/use-offline-sync";
import { SectionHeading } from "@/components/ui/section-heading";
import { SeverityRing } from "@/components/ui/severity-ring";
import { StatusPill } from "@/components/ui/status-pill";

export function ReportIssueForm() {
  const [description, setDescription] = useState("Large pothole near bus lane; two wheelers are swerving around it.");
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [route, setRoute] = useState<AuthorityRoute | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { isOnline, enqueueReport } = useOfflineSync();

  async function runAnalysis() {
    const [nextAnalysis, nextRoute] = await Promise.all([
      roadwatchApi.analyze({ description }),
      roadwatchApi.route({ lat: 12.9792, lng: 80.2214 })
    ]);
    setAnalysis(nextAnalysis);
    setRoute(nextRoute);
  }

  function submit() {
    enqueueReport({ description, analysis, route, optimisticId: `RW-OFFLINE-${Date.now()}` });
    setSubmitted(true);
  }

  return (
    <main className="mx-auto grid max-w-6xl gap-5 px-4 py-6 pb-28 md:grid-cols-[1.15fr_0.85fr] md:px-8 lg:px-10">
      <section className="space-y-5">
        <SectionHeading eyebrow="Smart Reporting" title="Transmit road anomaly" description="AI-assisted intake with location, evidence, routing, and offline-safe submission." status={isOnline ? "Online sync" : "Offline queue"} />
        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><LocateFixed className="h-5 w-5 text-road-yellow animate-pulse" /> 1. Pinpoint location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative h-64 overflow-hidden rounded-lg border border-road-outline/45 bg-asphalt-deep">
              <Image src="/sample-road.svg" alt="Pinned road location preview" fill className="object-cover opacity-55 grayscale" />
              <div className="absolute inset-0 road-grid opacity-60" />
              <div className="absolute inset-0 grid place-items-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-dashed border-road-yellow text-road-yellow shadow-glow animate-pulse-glow">
                  <LocateFixed className="h-7 w-7" />
                </span>
              </div>
              <div className="absolute inset-x-4 bottom-4 flex items-center gap-2 rounded-lg border border-road-outline/45 bg-asphalt-deep/90 p-2 backdrop-blur-xl">
                <Input placeholder="Search address or coordinates" defaultValue="Velachery Main Road near MRTS" className="bg-asphalt-deep border-road-outline/35 text-road-cream focus:border-road-yellow" />
                <Button size="icon" variant="outline" className="border-road-outline/65 hover:bg-road-yellow/10" aria-label="Search location"><Search className="h-4 w-4 text-road-yellow" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><CloudUpload className="h-5 w-5 text-road-yellow" /> 2. Visual evidence</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid min-h-52 place-items-center rounded-lg border-2 border-dashed border-road-outline/45 bg-asphalt-deep/60 p-5 text-center transition hover:border-road-yellow/60 hover:bg-road-yellow/5">
              <div>
                <CloudUpload className="mx-auto h-12 w-12 text-road-yellow animate-bounce" />
                <p className="mt-4 font-mono text-sm font-semibold uppercase tracking-[0.07em] text-road-cream">Drag evidence here</p>
                <p className="mt-2 text-sm text-road-muted">Images and videos are routed to Firebase/Supabase storage in production.</p>
                <div className="mt-4 flex justify-center gap-2">
                  {[".JPG", ".PNG", ".MP4"].map((type) => <StatusPill key={type} tone="neutral">{type}</StatusPill>)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><Mic className="h-5 w-5 text-road-yellow" /> 3. Incident details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} className="bg-asphalt-deep border-road-outline/35 text-road-cream focus:border-road-yellow min-h-[100px] rounded-lg" />
            <div className="flex flex-wrap gap-3">
              <Button onClick={runAnalysis} className="bg-road-yellow text-asphalt-deep hover:bg-road-yellow-dim shadow-glow"><ScanLine className="h-4 w-4 mr-1" /> Run AI triage</Button>
              <Button variant="outline" className="border-road-outline/65 hover:bg-road-yellow/10"><LocateFixed className="h-4 w-4 mr-1 text-road-yellow" /> Use current location</Button>
              <Button variant="outline" className="border-road-outline/65 hover:bg-road-yellow/10"><Languages className="h-4 w-4 mr-1 text-road-yellow" /> English</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-5">
        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between gap-3 text-road-cream">
              <span>AI analysis</span>
              <StatusPill pulse>Live</StatusPill>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {analysis ? (
              <>
                <SeverityRing value={analysis.severityScore} />
                <div className="grid grid-cols-3 gap-3">
                  <Stat label="Damage" value={analysis.damageType} />
                  <Stat label="Severity" value={analysis.severityScore} />
                  <Stat label="Confidence" value={`${Math.round(analysis.confidenceScore * 100)}%`} />
                </div>
                <p className="rounded border border-road-yellow/30 bg-road-yellow/10 p-3 text-sm leading-6 text-road-cream">{analysis.summary}</p>
              </>
            ) : (
              <div className="py-8 text-center">
                <SeverityRing value={0} label="Awaiting" />
                <p className="mt-4 text-sm leading-6 text-road-muted">Run AI triage to classify damage, estimate severity, and prepare a structured complaint summary.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><Route className="h-5 w-5 text-road-yellow" /> Authority routing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {route ? (
              <>
                <RouteRow label="Municipality" value={route.municipality} />
                <RouteRow label="Ward" value={route.ward} />
                <RouteRow label="Department" value={route.department} />
                <RouteRow label="Officer" value={route.authorityName} />
                <RouteRow label="SLA" value={`${route.slaHours} hours`} />
              </>
            ) : (
              <p className="leading-6 text-road-muted">Routing resolves from geospatial ward boundaries and department rules. LLMs do not decide routing.</p>
            )}
            <Button className="w-full mt-4 bg-road-yellow text-asphalt-deep hover:bg-road-yellow-dim shadow-glow" onClick={submit} disabled={!analysis || !route}>
              <CheckCircle2 className="h-4 w-4 mr-1" /> {isOnline ? "Submit complaint" : "Queue offline"}
            </Button>
            {submitted && <p className="rounded border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm font-medium text-emerald-200 mt-2">Report queued with optimistic sync ID. Dashboard will reconcile after upload.</p>}
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded border border-road-outline bg-asphalt-deep/45 p-3">
      <p className="font-mono text-[10px] font-medium uppercase tracking-wide text-road-muted">{label}</p>
      <strong className="mt-1 block font-mono text-lg capitalize text-road-cream">{value}</strong>
    </div>
  );
}

function RouteRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-road-outline/40 pb-2">
      <span className="text-road-muted">{label}</span>
      <strong className="text-right text-road-cream">{value}</strong>
    </div>
  );
}
