from sqlalchemy import DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy.sql import func
from uuid import uuid4


class Base(DeclarativeBase):
    pass


class Complaint(Base):
    __tablename__ = "complaints"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    user_id: Mapped[str] = mapped_column(String(128), index=True)
    description: Mapped[str] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(32), index=True)
    media_url: Mapped[str | None] = mapped_column(Text)
    lat: Mapped[float] = mapped_column(Float)
    lng: Mapped[float] = mapped_column(Float)
    ward_id: Mapped[str | None] = mapped_column(String(64), index=True)
    duplicate_cluster_id: Mapped[str | None] = mapped_column(String(96), index=True)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    analysis: Mapped["AIAnalysis"] = relationship(back_populates="complaint")


class AIAnalysis(Base):
    __tablename__ = "ai_analyses"

    id: Mapped[str] = mapped_column(UUID(as_uuid=False), primary_key=True, default=lambda: str(uuid4()))
    complaint_id: Mapped[str] = mapped_column(ForeignKey("complaints.id"))
    damage_type: Mapped[str] = mapped_column(String(32), index=True)
    severity_score: Mapped[int] = mapped_column(Integer)
    confidence_score: Mapped[float] = mapped_column(Float)
    model_version: Mapped[str] = mapped_column(String(64), default="demo-rules-v1")
    raw_output: Mapped[dict] = mapped_column(JSONB, default=dict)

    complaint: Mapped[Complaint] = relationship(back_populates="analysis")
