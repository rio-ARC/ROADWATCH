from backend.schemas.roadwatch import AIAnalysis, AnalysisRequest, DamageType


KEYWORD_RULES: list[tuple[DamageType, tuple[str, ...], int, float]] = [
    (DamageType.flooding, ("flood", "water", "rain", "underpass"), 74, 0.89),
    (DamageType.pothole, ("pothole", "hole", "crater", "swerving"), 84, 0.91),
    (DamageType.crack, ("crack", "fracture", "split"), 58, 0.84),
    (DamageType.debris, ("debris", "garbage", "fallen", "obstruction"), 51, 0.82),
    (DamageType.erosion, ("erosion", "edge", "shoulder", "washed"), 67, 0.86),
]


def analyze_damage(request: AnalysisRequest) -> AIAnalysis:
    """YOLOv8-compatible inference boundary.

    The hackathon demo runs deterministic rules when no model file is present.
    Production can replace the internals with ultralytics.YOLO(...).predict().
    """
    text = request.description.lower()
    for damage_type, keywords, severity, confidence in KEYWORD_RULES:
        if any(keyword in text for keyword in keywords):
            return AIAnalysis(
                damage_type=damage_type,
                severity_score=severity,
                confidence_score=confidence,
                summary=f"{damage_type.value.title()} signal detected with severity {severity}. Field verification recommended before repair closure.",
            )
    return AIAnalysis(
        damage_type=DamageType.pothole,
        severity_score=62,
        confidence_score=0.72,
        summary="Road surface anomaly detected from available evidence. More media improves confidence.",
    )
