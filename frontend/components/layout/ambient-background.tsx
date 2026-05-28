export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="road-grid absolute inset-0 opacity-60" />
      <div className="absolute right-[-12rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-road-yellow/10 blur-[110px]" />
      <div className="absolute bottom-[-10rem] left-[-10rem] h-[28rem] w-[28rem] rounded-full bg-signal-blue/10 blur-[100px]" />
      <div className="absolute left-[18%] top-0 h-72 w-px animate-scan-line bg-gradient-to-b from-transparent via-road-yellow/70 to-transparent" />
      <div className="absolute left-[72%] top-12 h-96 w-px animate-scan-line bg-gradient-to-b from-transparent via-road-yellow/40 to-transparent [animation-delay:1.4s]" />
    </div>
  );
}
