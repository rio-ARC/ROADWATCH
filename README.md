# RoadWatch

RoadWatch is an AI-powered civic road intelligence and transparency platform built for the IIT Madras CoERS Road Safety Hackathon 2026.

It combines road issue reporting, geospatial dashboards, authority routing, practical AI analysis, duplicate detection, public works transparency, offline-first reporting, and an RAG-backed assistant. The chatbot is one interface layer; critical decisions stay in deterministic APIs and auditable service logic.

## Quick Start

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
npm install --prefix frontend
npm run dev
```

Backend:

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.api.main:app --reload --port 8000
```

Docker:

```bash
docker compose -f infra/docker/docker-compose.yml up --build
```

## Demo Flow

1. Open the reporting page and upload a road image.
2. The mocked YOLO-compatible analysis endpoint returns damage type, severity, and confidence.
3. The location picker pins the issue on the map.
4. Routing logic resolves ward, department, municipality, authority, and SLA.
5. Dashboard maps, heat overlays, status metrics, and contractor/budget data update from the same API contract.
6. The assistant answers only from structured retrieval context.
7. Offline reports are queued locally and synced when the connection returns.

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) and [docs/API.md](docs/API.md).
