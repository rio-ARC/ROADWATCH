"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, Bot, Home, MapPinned, Search, Send, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOfflineSync } from "@/hooks/use-offline-sync";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { BrandMark } from "@/components/layout/brand-mark";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/map", label: "Map", icon: MapPinned },
  { href: "/report", label: "Report", icon: Send },
  { href: "/dashboard", label: "Analytics", icon: BarChart3 },
  { href: "/chat", label: "Assistant", icon: Bot }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isOnline, queuedReports } = useOfflineSync();

  return (
    <div className="min-h-screen overflow-x-hidden text-road-cream">
      <AmbientBackground />
      <header className="sticky top-3 z-40 mx-3 rounded-full border border-road-outline/45 bg-asphalt/75 shadow-glow backdrop-blur-xl md:top-5 md:mx-8">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" aria-label="RoadWatch home">
            <BrandMark />
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.07em] text-road-muted transition hover:bg-road-yellow/10 hover:text-road-yellow",
                    active && "bg-road-yellow text-asphalt-deep shadow-glow"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Search" className="hidden h-10 w-10 place-items-center rounded-full text-road-muted transition hover:bg-road-yellow/10 hover:text-road-yellow md:grid">
              <Search className="h-4 w-4" />
            </button>
            <button aria-label="Notifications" className="relative hidden h-10 w-10 place-items-center rounded-full text-road-muted transition hover:bg-road-yellow/10 hover:text-road-yellow md:grid">
              <Bell className="h-4 w-4" />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-alert-red" />
            </button>
            <Link
              href="/offline"
              className="inline-flex items-center gap-2 rounded-full border border-road-outline bg-asphalt-deep/60 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.06em] text-road-muted"
            >
              <WifiOff className={cn("h-4 w-4", isOnline ? "text-road-yellow" : "text-alert-red")} />
              <span>{queuedReports} queued</span>
            </Link>
          </div>
        </div>
      </header>
      {children}
      <nav className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-5 rounded-full border border-road-outline bg-asphalt/90 shadow-panel backdrop-blur-xl lg:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("grid gap-1 rounded-full px-2 py-2 text-center font-mono text-[10px] uppercase text-road-muted", active && "bg-road-yellow text-asphalt-deep")}>
              <item.icon className="mx-auto h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
