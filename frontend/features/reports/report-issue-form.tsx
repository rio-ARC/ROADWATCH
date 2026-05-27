"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, CloudUpload, Languages, LocateFixed, Route, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { roadwatchApi } from "@/services/api";
import type { AIAnalysis, AuthorityRoute } from "@/types/roadwatch";
import { useOfflineSync } from "@/hooks/use-offline-sync";

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
    <main className="grid gap-5 px-4 py-6 pb-24 md:grid-cols-[1.1fr_0.9fr] md:px-8 lg:px-10">
      <section className="space-y-5">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Report Flow</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 md:text-5xl">Submit road issue</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CloudUpload className="h-5 w-5 text-teal-700" /> Evidence upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid min-h-56 place-items-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-center">
              <div>
                <Image src="/sample-road.svg" alt="Road damage sample" width={420} height={270} className="mx-auto rounded-md border border-slate-200" />
                <p className="mt-3 text-sm text-slate-500">Demo image loaded. Production flow accepts photo or video uploads to Supabase/Firebase Storage.</p>
              </div>
            </div>
            <Input placeholder="Road name or landmark" defaultValue="Velachery Main Road near MRTS" />
            <Textarea value={description} onChange={(event) => setDescription(event.target.value)} />
            <div className="flex flex-wrap gap-3">
              <Button onClick={runAnalysis}><ScanLine className="h-4 w-4" /> Run AI triage</Button>
              <Button variant="outline"><LocateFixed className="h-4 w-4" /> Use current location</Button>
              <Button variant="outline"><Languages className="h-4 w-4" /> English</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <aside className="space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>AI analysis preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis ? (
              <>
                <div className="grid grid-cols-3 gap-3">
                  <Stat label="Damage" value={analysis.damageType} />
                  <Stat label="Severity" value={analysis.severityScore} />
                  <Stat label="Confidence" value={`${Math.round(analysis.confidenceScore * 100)}%`} />
                </div>
                <p className="rounded-md bg-teal-50 p-3 text-sm leading-6 text-teal-900">{analysis.summary}</p>
              </>
            ) : (
              <p className="text-sm leading-6 text-slate-600">Run AI triage to classify damage, estimate severity, and prepare a structured complaint summary.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Route className="h-5 w-5 text-teal-700" /> Authority routing</CardTitle>
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
              <p className="leading-6 text-slate-600">Routing resolves from geospatial ward boundaries and department rules. LLMs do not decide routing.</p>
            )}
            <Button className="w-full" onClick={submit} disabled={!analysis || !route}>
              <CheckCircle2 className="h-4 w-4" /> {isOnline ? "Submit complaint" : "Queue offline"}
            </Button>
            {submitted && <p className="rounded-md bg-emerald-50 p-3 text-sm font-medium text-emerald-800">Report queued with optimistic sync ID. Dashboard will reconcile after upload.</p>}
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-slate-200 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <strong className="mt-1 block text-lg capitalize text-slate-950">{value}</strong>
    </div>
  );
}

function RouteRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
      <span className="text-slate-500">{label}</span>
      <strong className="text-right text-slate-900">{value}</strong>
    </div>
  );
}
