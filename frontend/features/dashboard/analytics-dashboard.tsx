"use client";

import { useEffect, useState } from "react";
import { BarChart3, IndianRupee, Timer, Wrench } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authorityPerformance, contractorPerformance, dashboardSummary, severityDistribution } from "@/lib/mock-data";
import { MetricCard } from "@/features/dashboard/metric-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgressLine } from "@/components/ui/progress-line";

const colors = ["#74a8ff", "#ffd700", "#ff8b3d", "#ff5a4f"];

export function AnalyticsDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="space-y-6 px-4 py-6 pb-28 md:px-8 lg:px-10">
      <SectionHeading eyebrow="Transparency Center" title="Infrastructure diagnostics" description="Government-grade contractor, authority, budget, and severity telemetry." status="Chennai Zone 13" />

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Open complaints" value={dashboardSummary.openComplaints} trend="triage queue" />
        <MetricCard label="Resolved" value={dashboardSummary.resolvedComplaints} trend="public record" />
        <MetricCard label="Avg response" value={`${dashboardSummary.avgResponseHours}h`} trend="authority SLA" />
        <MetricCard label="Budget used" value={`₹${dashboardSummary.budgetUtilizedCrore}cr`} trend="project linked" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><BarChart3 className="h-5 w-5 text-road-yellow" /> Severity distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={severityDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={108} paddingAngle={3}>
                    {severityDistribution.map((entry, index) => <Cell key={entry.name} fill={colors[index]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#1f1b10", borderColor: "#4d4732", borderRadius: "8px", color: "#eae2cf" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg bg-asphalt-deep" />
            )}
          </CardContent>
        </Card>

        <Card className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-road-cream"><Timer className="h-5 w-5 text-road-yellow" /> Authority response performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80 min-w-0">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={authorityPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4d4732" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#d0c6ab" }} />
                  <YAxis tick={{ fill: "#d0c6ab" }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1f1b10", borderColor: "#4d4732", borderRadius: "8px", color: "#eae2cf" }} />
                  <Bar dataKey="response" name="Avg response hours" fill="#ffd700" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" name="Resolved %" fill="#74a8ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full rounded-lg bg-asphalt-deep" />
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {contractorPerformance.map((contractor) => (
          <Card key={contractor.name} className="glass-panel border-road-outline/45 bg-asphalt-panel/85 backdrop-blur-xl hover:border-road-yellow/40 transition duration-300">
            <CardHeader>
              <CardTitle className="text-base text-road-cream">{contractor.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-road-muted">
                <span className="inline-flex items-center gap-2"><Wrench className="h-4 w-4 text-road-yellow" /> quality score</span>
                <strong className="text-road-cream">{contractor.score}/100</strong>
              </div>
              <ProgressLine value={contractor.score} />
              <p className="flex items-center gap-1 text-sm font-medium text-road-muted"><IndianRupee className="h-4 w-4 text-road-yellow" /> {contractor.budget} crore allocated</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
