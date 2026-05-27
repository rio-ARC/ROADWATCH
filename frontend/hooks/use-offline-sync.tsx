"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const QUEUE_KEY = "roadwatch.offlineReports";

interface OfflineSyncContextValue {
  isOnline: boolean;
  queuedReports: number;
  enqueueReport: (report: unknown) => void;
  clearQueue: () => void;
}

const OfflineSyncContext = createContext<OfflineSyncContextValue | null>(null);

function readQueue(): unknown[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(QUEUE_KEY) ?? "[]") as unknown[];
  } catch {
    return [];
  }
}

export function OfflineSyncProvider({ children }: { children: React.ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [queue, setQueue] = useState<unknown[]>([]);

  useEffect(() => {
    setIsOnline(window.navigator.onLine);
    setQueue(readQueue());
    const update = () => setIsOnline(window.navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  }, [queue]);

  const value = useMemo<OfflineSyncContextValue>(
    () => ({
      isOnline,
      queuedReports: queue.length,
      enqueueReport: (report) => setQueue((current) => [...current, { report, queuedAt: new Date().toISOString() }]),
      clearQueue: () => setQueue([])
    }),
    [isOnline, queue.length]
  );

  return <OfflineSyncContext.Provider value={value}>{children}</OfflineSyncContext.Provider>;
}

export function useOfflineSync() {
  const context = useContext(OfflineSyncContext);
  if (!context) throw new Error("useOfflineSync must be used inside OfflineSyncProvider");
  return context;
}
