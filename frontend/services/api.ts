import { complaints, dashboardSummary } from "@/lib/mock-data";
import type { AIAnalysis, AuthorityRoute, Complaint } from "@/types/roadwatch";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit, fallback?: T): Promise<T> {
  try {
    const response = await fetch(`${API_BASE}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as T;
  } catch {
    if (fallback !== undefined) return fallback;
    throw new Error("RoadWatch API is unavailable");
  }
}

export const roadwatchApi = {
  listComplaints: () => request<Complaint[]>("/complaints", undefined, complaints),
  dashboard: () => request("/dashboard/summary", undefined, dashboardSummary),
  analyze: (payload: { description: string }) =>
    request<AIAnalysis>(
      "/analysis",
      { method: "POST", body: JSON.stringify(payload) },
      { damageType: "pothole", severityScore: 82, confidenceScore: 0.91, summary: "Likely pothole detected with high two-wheeler risk." }
    ),
  route: (payload: { lat: number; lng: number }) =>
    request<AuthorityRoute>(
      "/routing",
      { method: "POST", body: JSON.stringify(payload) },
      complaints[0].route
    ),
  chat: (message: string) =>
    request<{ answer: string; citations: string[] }>(
      "/chat",
      { method: "POST", body: JSON.stringify({ message }) },
      {
        answer: "Based on structured RoadWatch records, the nearest high-severity complaint is assigned to Zone 13 Roads with a 48-hour SLA. I do not have evidence beyond the current dataset.",
        citations: ["RW-260527-001", "GCC-Z13-2026-041"]
      }
    )
};
