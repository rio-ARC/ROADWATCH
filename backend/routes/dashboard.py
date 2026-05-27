from fastapi import APIRouter

from backend.services.dashboard_service import dashboard_summary

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/summary")
def get_summary() -> dict:
    return dashboard_summary()
