import math

from backend.db.seed_data import COMPLAINTS
from backend.schemas.roadwatch import LocationPoint


def haversine_meters(a: LocationPoint, b: dict) -> float:
    radius = 6_371_000
    lat1 = math.radians(a.lat)
    lat2 = math.radians(b["lat"])
    dlat = math.radians(b["lat"] - a.lat)
    dlng = math.radians(b["lng"] - a.lng)
    h = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlng / 2) ** 2
    return 2 * radius * math.asin(math.sqrt(h))


def find_duplicate_cluster(location: LocationPoint, description: str) -> str | None:
    words = set(description.lower().split())
    for complaint in COMPLAINTS:
        distance = haversine_meters(location, complaint["location"])
        overlap = words.intersection(complaint["description"].lower().split())
        if distance <= 120 and len(overlap) >= 2:
            return complaint.get("duplicate_cluster_id") or f"DUP-{complaint['id']}"
    return None
