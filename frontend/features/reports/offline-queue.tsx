"use client";

import type React from "react";
import { DatabaseZap, RotateCw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOfflineSync } from "@/hooks/use-offline-sync";

export function OfflineQueue() {
  const { isOnline, queuedReports, clearQueue } = useOfflineSync();
  return (
    <main className="mx-auto max-w-4xl space-y-5 px-4 py-6 pb-24 md:px-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">Offline First</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Deferred sync queue</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DatabaseZap className="h-5 w-5 text-teal-700" /> Local report buffer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            <Status label="Network" value={isOnline ? "Online" : "Offline"} icon={<Wifi className="h-5 w-5" />} />
            <Status label="Queued reports" value={queuedReports} icon={<DatabaseZap className="h-5 w-5" />} />
            <Status label="Sync mode" value="Optimistic" icon={<RotateCw className="h-5 w-5" />} />
          </div>
          <p className="text-sm leading-6 text-slate-600">
            RoadWatch stores pending submissions locally, assigns optimistic IDs, and retries upload when connectivity returns. The backend reconciles media, complaint IDs, duplicate clusters, and dashboard aggregates.
          </p>
          <Button variant="outline" onClick={clearQueue}>Clear demo queue</Button>
        </CardContent>
      </Card>
    </main>
  );
}

function Status({ label, value, icon }: { label: string; value: string | number; icon: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-teal-700">{icon}<span className="text-sm font-medium text-slate-500">{label}</span></div>
      <strong className="mt-3 block text-2xl text-slate-950">{value}</strong>
    </div>
  );
}
