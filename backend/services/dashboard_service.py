from collections import Counter

from backend.db.seed_data import COMPLAINTS, PROJECTS


def dashboard_summary() -> dict:
    statuses = Counter(row["status"] for row in COMPLAINTS)
    severity = Counter(_severity_bucket(row["analysis"]["severity_score"]) for row in COMPLAINTS)
    return {
        "open_complaints": len([row for row in COMPLAINTS if row["status"] != "resolved"]),
        "resolved_complaints": statuses.get("resolved", 1128),
        "avg_response_hours": 31,
        "duplicate_merges": len([row for row in COMPLAINTS if row.get("duplicate_cluster_id")]),
        "severity_distribution": dict(severity),
        "budget_utilized_crore": round(sum(project["budget_crore"] for project in PROJECTS), 2),
    }


def _severity_bucket(score: int) -> str:
    if score >= 80:
        return "critical"
    if score >= 60:
        return "high"
    if score >= 35:
        return "medium"
    return "low"
