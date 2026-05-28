export function SeverityRing({ value, label = "Severity" }: { value: number; label?: string }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, value)) / 100) * circumference;

  return (
    <div className="relative grid place-items-center">
      <svg className="h-36 w-36 -rotate-90">
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#2e2a1e" strokeWidth="8" />
        <circle cx="72" cy="72" r={radius} fill="none" stroke="#ffd700" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" strokeWidth="8" />
      </svg>
      <div className="absolute text-center">
        <strong className="block font-mono text-4xl text-road-cream">{value}</strong>
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-road-muted">{label}</span>
      </div>
    </div>
  );
}
