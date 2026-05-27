from datetime import datetime
from enum import StrEnum
from uuid import UUID

from pydantic import BaseModel, Field, HttpUrl


class DamageType(StrEnum):
    pothole = "pothole"
    crack = "crack"
    erosion = "erosion"
    debris = "debris"
    flooding = "flooding"


class ComplaintStatus(StrEnum):
    submitted = "submitted"
    triaged = "triaged"
    assigned = "assigned"
    in_progress = "in_progress"
    resolved = "resolved"
    rejected = "rejected"


class LocationPoint(BaseModel):
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
    ward: str | None = None
    municipality: str | None = None
    road_name: str | None = None


class AIAnalysis(BaseModel):
    damage_type: DamageType
    severity_score: int = Field(ge=0, le=100)
    confidence_score: float = Field(ge=0, le=1)
    summary: str


class AuthorityRoute(BaseModel):
    municipality: str
    ward: str
    department: str
    authority_name: str
    escalation_email: str
    sla_hours: int


class ComplaintCreate(BaseModel):
    description: str = Field(min_length=3)
    location: LocationPoint
    media_url: HttpUrl | None = None
    language: str = "en"


class ComplaintRead(BaseModel):
    id: UUID | str
    title: str
    description: str
    status: ComplaintStatus
    created_at: datetime
    updated_at: datetime
    location: LocationPoint
    media_url: str | None = None
    analysis: AIAnalysis
    route: AuthorityRoute
    duplicate_cluster_id: str | None = None
    contractor: str
    project_id: str


class AnalysisRequest(BaseModel):
    description: str = ""
    media_url: str | None = None


class RoutingRequest(BaseModel):
    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
    damage_type: DamageType | None = None


class ChatRequest(BaseModel):
    message: str = Field(min_length=2, max_length=1000)
    locale: str = "en"
    lat: float | None = None
    lng: float | None = None


class ChatResponse(BaseModel):
    answer: str
    citations: list[str]
    confidence: float
