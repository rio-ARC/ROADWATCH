"use client";

import { useEffect, useState } from "react";
import { BarChart3, IndianRupee, Timer, Wrench } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authorityPerformance, contractorPerformance, dashboardSummary, severityDistribution } from "@/lib/mock-data";
import { MetricCard } from "@/features/dashboard/metric-card";

const colors = ["#0f9f8d", "#f59e0b", "#ef4444", "#7f1d1d"];

export function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="space-y-6 px-4 py-6 pb-24 md:px-8 lg:px-10">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Transparency Center</p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950 md:text-5xl">Road accountability dashboard</h1>
        </div>
        <div className="rounded-lg border border-teal-200 bg-white/85 px-4 py-3 text-sm text-slate-600">
          Live demo dataset: Chennai Zone 13, May 27 2026
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Open complaints" value={dashboardSummary.openComplaints} trend="triage queue" />
        <MetricCard label="Resolved" value={dashboardSummary.resolvedComplaints} trend="public record" />
        <MetricCard label="Avg response" value={`${dashboardSummary.avgResponseHours}h`} trend="authority SLA" />
        <MetricCard label="Budget used" value={`₹${dashboardSummary.budgetUtilizedCrore}cr`} trend="project linked" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-teal-700" /> Severity distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={108} paddingAngle={3}>
                    {severityDistribution.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-md bg-slate-50" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Timer className="h-5 w-5 text-teal-700" /> Authority response performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authorityPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d9e4e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="response" name="Avg response hours" fill="#0f766e" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved %" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-md bg-slate-50" />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {contractorPerformance.map((contractor) => (
          <Card key={contractor.name}>
            <CardHeader>
              <CardTitle className="text-base">{contractor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-slate-600">
                <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4" /> quality score</span>
                <strong className="text-slate-950">{contractor.score}/100</strong>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 rounded-full bg-teal-700" style={{ width: `${contractor.score}%` }} />
              </div>
              <p className="flex items-center gap-1 text-sm font-medium text-slate-700"><IndianRupee className="h-4 w-4" /> {contractor.budget} crore allocated</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
