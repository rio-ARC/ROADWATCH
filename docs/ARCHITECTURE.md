# RoadWatch Architecture

RoadWatch is a practical modular monolith with a typed frontend, REST backend, PostGIS database, and replaceable AI/RAG adapters.

## Frontend

- Next.js + TypeScript app router.
- TailwindCSS and shadcn-style primitives.
- Leaflet/OpenStreetMap map surface with severity markers and heat-radius overlays.
- PWA manifest and localStorage-backed deferred sync queue for hackathon demo.
- Service layer falls back to demo data when the API is unavailable.

## Backend

- FastAPI with REST routes for complaints, analysis, routing, dashboard, chat, projects, and auth metadata.
- Pydantic schemas define stable contracts.
- Deterministic routing maps geolocation and damage type to municipality, ward, department, authority, and SLA.
- Duplicate detection combines geospatial proximity and text overlap; image embeddings can be added behind the same service.

## AI

- Computer vision is isolated behind `backend/ai/damage_detector.py`.
- The demo implementation is deterministic and YOLOv8-compatible.
- LLM usage is limited to explanation, summarization, multilingual support, and report generation.
- LLMs do not control routing, SLA, complaint status, or budget truth.

## Data

- PostgreSQL + PostGIS stores complaints, geographies, authorities, contractors, projects, budgets, and AI analyses.
- PGVector/ChromaDB can store civic documents for retrieval.

## Deployment

- Frontend: Vercel.
- Backend: Render, Railway, or Fly.io.
- Database: managed PostgreSQL with PostGIS and pgvector.
- Media: Supabase Storage or Firebase Storage.
