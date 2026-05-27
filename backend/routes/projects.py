from fastapi import APIRouter

from backend.db.seed_data import PROJECTS

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("")
def get_projects() -> list[dict]:
    return PROJECTS
