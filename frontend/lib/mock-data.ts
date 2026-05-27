import type { Complaint, DashboardSummary } from "@/types/roadwatch";

export const dashboardSummary: DashboardSummary = {
  openComplaints: 384,
  resolvedComplaints: 1128,
  avgResponseHours: 31,
  duplicateMerges: 92,
  budgetUtilizedCrore: 18.4
};

export const complaints: Complaint[] = [
  {
    id: "RW-260527-001",
    title: "Severe pothole near Velachery MRTS",
    description: "Large pothole on bus lane causing two-wheeler swerves during evening traffic.",
    status: "assigned",
    createdAt: "2026-05-27T09:10:00+05:30",
    updatedAt: "2026-05-27T11:40:00+05:30",
    mediaUrl: "/sample-road.svg",
    location: { lat: 12.9792, lng: 80.2214, ward: "Ward 177", municipality: "Greater Chennai Corporation", roadName: "Velachery Main Road" },
    analysis: { damageType: "pothole", severityScore: 87, confidenceScore: 0.93, summary: "Deep pothole detected in left lane with high impact risk." },
    route: { municipality: "Greater Chennai Corporation", ward: "Ward 177", department: "Roads and Bridges", authorityName: "Assistant Engineer, Zone 13", escalationEmail: "zone13-roads@gcc.gov.in", slaHours: 48 },
    contractor: "Tamil Nadu Urban Roads JV",
    projectId: "GCC-Z13-2026-041"
  },
  {
    id: "RW-260527-014",
    title: "Flooded underpass after rain",
    description: "Standing water blocking one lane and pedestrians walking on carriageway.",
    status: "in_progress",
    createdAt: "2026-05-27T07:25:00+05:30",
    updatedAt: "2026-05-27T12:05:00+05:30",
    mediaUrl: "/sample-road.svg",
    location: { lat: 13.0067, lng: 80.2572, ward: "Ward 170", municipality: "Greater Chennai Corporation", roadName: "LB Road Underpass" },
    analysis: { damageType: "flooding", severityScore: 74, confidenceScore: 0.89, summary: "Water accumulation across carriageway with moderate-to-high blockage." },
    route: { municipality: "Greater Chennai Corporation", ward: "Ward 170", department: "Stormwater Drains", authorityName: "Zonal Officer, Zone 13", escalationEmail: "stormwater-zone13@gcc.gov.in", slaHours: 12 },
    contractor: "Marina Civic Infra",
    projectId: "SWD-Z13-2026-009"
  },
  {
    id: "RW-260526-088",
    title: "Longitudinal cracking on arterial road",
    description: "Cracks visible for nearly 80 meters near bus stop.",
    status: "triaged",
    createdAt: "2026-05-26T18:10:00+05:30",
    updatedAt: "2026-05-27T10:05:00+05:30",
    mediaUrl: "/sample-road.svg",
    location: { lat: 12.9918, lng: 80.2331, ward: "Ward 175", municipality: "Greater Chennai Corporation", roadName: "Taramani Link Road" },
    analysis: { damageType: "crack", severityScore: 58, confidenceScore: 0.84, summary: "Linear surface cracking likely to worsen under heavy traffic." },
    route: { municipality: "Greater Chennai Corporation", ward: "Ward 175", department: "Road Maintenance", authorityName: "Junior Engineer, Ward 175", escalationEmail: "ward175-roads@gcc.gov.in", slaHours: 72 },
    contractor: "Coromandel Roadworks",
    projectId: "GCC-Z13-2026-027"
  }
];

export const severityDistribution = [
  { name: "Low", value: 146 },
  { name: "Medium", value: 188 },
  { name: "High", value: 73 },
  { name: "Critical", value: 31 }
];

export const authorityPerformance = [
  { name: "Zone 13 Roads", response: 28, resolved: 81 },
  { name: "Stormwater", response: 11, resolved: 74 },
  { name: "Traffic Engg.", response: 35, resolved: 68 },
  { name: "Highways", response: 42, resolved: 61 }
];

export const contractorPerformance = [
  { name: "Urban Roads JV", score: 88, budget: 6.2 },
  { name: "Marina Civic", score: 79, budget: 3.8 },
  { name: "Coromandel", score: 71, budget: 2.7 },
  { name: "Metro Patchworks", score: 63, budget: 1.9 }
];
