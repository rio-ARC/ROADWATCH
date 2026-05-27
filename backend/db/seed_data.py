from datetime import datetime, timezone

COMPLAINTS = [
    {
        "id": "RW-260527-001",
        "title": "Severe pothole near Velachery MRTS",
        "description": "Large pothole on bus lane causing two-wheeler swerves during evening traffic.",
        "status": "assigned",
        "created_at": datetime(2026, 5, 27, 9, 10, tzinfo=timezone.utc),
        "updated_at": datetime(2026, 5, 27, 11, 40, tzinfo=timezone.utc),
        "location": {"lat": 12.9792, "lng": 80.2214, "ward": "Ward 177", "municipality": "Greater Chennai Corporation", "road_name": "Velachery Main Road"},
        "media_url": "/sample-road.svg",
        "analysis": {"damage_type": "pothole", "severity_score": 87, "confidence_score": 0.93, "summary": "Deep pothole detected in left lane with high impact risk."},
        "route": {"municipality": "Greater Chennai Corporation", "ward": "Ward 177", "department": "Roads and Bridges", "authority_name": "Assistant Engineer, Zone 13", "escalation_email": "zone13-roads@gcc.gov.in", "sla_hours": 48},
        "duplicate_cluster_id": "DUP-Z13-PO-044",
        "contractor": "Tamil Nadu Urban Roads JV",
        "project_id": "GCC-Z13-2026-041",
    },
    {
        "id": "RW-260527-014",
        "title": "Flooded underpass after rain",
        "description": "Standing water blocking one lane and pedestrians walking on carriageway.",
        "status": "in_progress",
        "created_at": datetime(2026, 5, 27, 7, 25, tzinfo=timezone.utc),
        "updated_at": datetime(2026, 5, 27, 12, 5, tzinfo=timezone.utc),
        "location": {"lat": 13.0067, "lng": 80.2572, "ward": "Ward 170", "municipality": "Greater Chennai Corporation", "road_name": "LB Road Underpass"},
        "media_url": "/sample-road.svg",
        "analysis": {"damage_type": "flooding", "severity_score": 74, "confidence_score": 0.89, "summary": "Water accumulation across carriageway with moderate-to-high blockage."},
        "route": {"municipality": "Greater Chennai Corporation", "ward": "Ward 170", "department": "Stormwater Drains", "authority_name": "Zonal Officer, Zone 13", "escalation_email": "stormwater-zone13@gcc.gov.in", "sla_hours": 12},
        "duplicate_cluster_id": None,
        "contractor": "Marina Civic Infra",
        "project_id": "SWD-Z13-2026-009",
    },
]

PROJECTS = [
    {"id": "GCC-Z13-2026-041", "road_name": "Velachery Main Road", "contractor": "Tamil Nadu Urban Roads JV", "budget_crore": 6.2, "status": "active"},
    {"id": "SWD-Z13-2026-009", "road_name": "LB Road Underpass", "contractor": "Marina Civic Infra", "budget_crore": 3.8, "status": "active"},
]
