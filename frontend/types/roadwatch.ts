export type DamageType = "pothole" | "crack" | "erosion" | "debris" | "flooding";
export type ComplaintStatus = "submitted" | "triaged" | "assigned" | "in_progress" | "resolved" | "rejected";

export interface LocationPoint {
  lat: number;
  lng: number;
  ward: string;
  municipality: string;
  roadName: string;
}

export interface AIAnalysis {
  damageType: DamageType;
  severityScore: number;
  confidenceScore: number;
  summary: string;
}

export interface AuthorityRoute {
  municipality: string;
  ward: string;
  department: string;
  authorityName: string;
  escalationEmail: string;
  slaHours: number;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string;
  updatedAt: string;
  location: LocationPoint;
  mediaUrl: string;
  analysis: AIAnalysis;
  route: AuthorityRoute;
  contractor: string;
  projectId: string;
}

export interface DashboardSummary {
  openComplaints: number;
  resolvedComplaints: number;
  avgResponseHours: number;
  duplicateMerges: number;
  budgetUtilizedCrore: number;
}
