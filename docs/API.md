# RoadWatch API

Base URL: `http://localhost:8000`

## Complaints

- `GET /complaints?status=assigned`
- `POST /complaints`

```json
{
  "description": "Large pothole near bus lane",
  "location": { "lat": 12.9792, "lng": 80.2214, "road_name": "Velachery Main Road" },
  "media_url": "https://storage.example/road.jpg",
  "language": "en"
}
```

## Analysis

- `POST /analysis`

Returns `damage_type`, `severity_score`, `confidence_score`, and `summary`.

## Routing

- `POST /routing`

Returns municipality, ward, department, authority, escalation email, and SLA.

## Dashboard

- `GET /dashboard/summary`

Returns complaint counts, duplicate merges, severity distribution, and budget utilization.

## Chat

- `POST /chat`

Returns a grounded answer, citations, and confidence. The assistant refuses unsupported claims.
