from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/firebase-config")
def firebase_config() -> dict[str, str]:
    return {
        "provider": "firebase",
        "mode": "client-token-verification",
        "note": "Production middleware verifies Firebase ID tokens before protected writes.",
    }
