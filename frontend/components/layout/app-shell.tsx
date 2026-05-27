"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, Home, MapPinned, Send, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOfflineSync } from "@/hooks/use-offline-sync";

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
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4 md:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-950">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-teal-700 text-white">RW</span>
            <span>RoadWatch</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950",
                    active && "bg-teal-50 text-teal-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/offline"
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
          >
            <WifiOff className={cn("h-4 w-4", isOnline ? "text-teal-700" : "text-amber-600")} />
            <span>{queuedReports} queued</span>
          </Link>
        </div>
      </header>
      {children}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-slate-200 bg-white md:hidden">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn("grid gap-1 px-2 py-2 text-center text-[11px] text-slate-600", active && "text-teal-800")}>
              <item.icon className="mx-auto h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
