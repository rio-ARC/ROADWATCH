from backend.db.seed_data import COMPLAINTS, PROJECTS


def retrieve_structured_context(query: str) -> dict:
    """Retrieval guardrail: return structured records with IDs for citation."""
    lower = query.lower()
    context = {"complaints": [], "projects": []}
    if any(term in lower for term in ["pothole", "responsible", "status", "nearby", "authority"]):
        context["complaints"] = COMPLAINTS
    if any(term in lower for term in ["contractor", "budget", "project"]):
        context["projects"] = PROJECTS
    return context
