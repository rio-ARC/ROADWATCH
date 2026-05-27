from fastapi import APIRouter, Query

from backend.schemas.roadwatch import ComplaintCreate, ComplaintRead, ComplaintStatus
from backend.services.complaint_service import create_complaint, list_complaints

router = APIRouter(prefix="/complaints", tags=["complaints"])


@router.get("", response_model=list[ComplaintRead])
def get_complaints(status: ComplaintStatus | None = Query(default=None)) -> list[ComplaintRead]:
    return list_complaints(status=status)


@router.post("", response_model=ComplaintRead, status_code=201)
def post_complaint(payload: ComplaintCreate) -> ComplaintRead:
    return create_complaint(payload)
