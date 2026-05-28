import { Badge } from "@/components/ui/badge";

export function MetricCard({ label, value, trend }: { label: string; value: number | string; trend: string }) {
  return (
    <div className="glass-panel rounded-lg p-4">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-road-muted">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="font-mono text-3xl font-bold text-road-cream">{value}</strong>
        <Badge>{trend}</Badge>
      </div>
    </div>
  );
}
