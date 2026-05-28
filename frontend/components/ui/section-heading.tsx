import { StatusPill } from "@/components/ui/status-pill";

export function SectionHeading({
  eyebrow,
  title,
  description,
  status
}: {
  eyebrow: string;
  title: string;
  description?: string;
  status?: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-road-yellow">{eyebrow}</p>
        <h1 className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-normal text-road-cream md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-road-muted md:text-base">{description}</p>}
      </div>
      {status && <StatusPill pulse>{status}</StatusPill>}
    </div>
  );
}
