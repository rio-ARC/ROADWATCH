import { Badge } from "@/components/ui/badge";

export function MetricCard({ label, value, trend }: { label: string; value: number | string; trend: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white/85 p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-3xl font-semibold text-slate-950">{value}</strong>
        <Badge>{trend}</Badge>
      </div>
    </div>
  );
}
