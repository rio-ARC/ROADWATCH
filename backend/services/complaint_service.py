from datetime import datetime, timezone
from uuid import uuid4

from backend.ai.damage_detector import analyze_damage
from backend.db.seed_data import COMPLAINTS
from backend.schemas.roadwatch import AnalysisRequest, ComplaintCreate, ComplaintRead, ComplaintStatus, RoutingRequest
from backend.services.duplicate_service import find_duplicate_cluster
from backend.services.routing_service import route_complaint


def list_complaints(status: ComplaintStatus | None = None) -> list[ComplaintRead]:
    rows = COMPLAINTS
    if status:
        rows = [row for row in COMPLAINTS if row["status"] == status]
    return [ComplaintRead(**row) for row in rows]


def create_complaint(payload: ComplaintCreate) -> ComplaintRead:
    analysis = analyze_damage(AnalysisRequest(description=payload.description, media_url=str(payload.media_url) if payload.media_url else None))
    route = route_complaint(RoutingRequest(lat=payload.location.lat, lng=payload.location.lng, damage_type=analysis.damage_type))
    duplicate_cluster_id = find_duplicate_cluster(payload.location, payload.description)
    now = datetime.now(timezone.utc)
    complaint = {
        "id": f"RW-{uuid4().hex[:10].upper()}",
        "title": f"{analysis.damage_type.value.title()} reported",
        "description": payload.description,
        "status": "assigned" if duplicate_cluster_id is None else "triaged",
        "created_at": now,
        "updated_at": now,
        "location": {
            "lat": payload.location.lat,
            "lng": payload.location.lng,
            "ward": route.ward,
            "municipality": route.municipality,
            "road_name": payload.location.road_name or "Unverified road segment",
        },
        "media_url": str(payload.media_url) if payload.media_url else None,
        "analysis": analysis.model_dump(),
        "route": route.model_dump(),
        "duplicate_cluster_id": duplicate_cluster_id,
        "contractor": "Unassigned",
        "project_id": "PENDING-PROJECT-LINK",
    }
    COMPLAINTS.insert(0, complaint)
    return ComplaintRead(**complaint)
