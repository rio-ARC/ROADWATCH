from fastapi import APIRouter

from backend.ai.damage_detector import analyze_damage
from backend.schemas.roadwatch import AIAnalysis, AnalysisRequest

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("", response_model=AIAnalysis)
def post_analysis(payload: AnalysisRequest) -> AIAnalysis:
    return analyze_damage(payload)
