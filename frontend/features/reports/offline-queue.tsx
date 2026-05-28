"use client";

import type React from "react";
import { DatabaseZap, RotateCw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOfflineSync } from "@/hooks/use-offline-sync";
import { SectionHeading } from "@/components/ui/section-heading";

export function OfflineQueue() {
  const { isOnline, queuedReports, clearQueue } = useOfflineSync();
  return (
    <main className="mx-auto max-w-4xl space-y-5 px-4 py-6 pb-28 md:px-8">
      <SectionHeading eyebrow="Offline First" title="Deferred sync queue" description="Low-network reporting with optimistic local IDs and reconciliation after connectivity returns." status={isOnline ? "Online" : "Offline"} />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><DatabaseZap className="h-5 w-5 text-road-yellow" /> Local report buffer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            <Status label="Network" value={isOnline ? "Online" : "Offline"} icon={<Wifi className="h-5 w-5" />} />
            <Status label="Queued reports" value={queuedReports} icon={<DatabaseZap className="h-5 w-5" />} />
            <Status label="Sync mode" value="Optimistic" icon={<RotateCw className="h-5 w-5" />} />
          </div>
          <p className="text-sm leading-6 text-road-muted">
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
    <div className="rounded border border-road-outline bg-asphalt-deep/50 p-4">
      <div className="flex items-center gap-2 text-road-yellow">{icon}<span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-road-muted">{label}</span></div>
      <strong className="mt-3 block font-mono text-2xl text-road-cream">{value}</strong>
    </div>
  );
}
