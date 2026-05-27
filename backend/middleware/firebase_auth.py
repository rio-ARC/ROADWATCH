from fastapi import HTTPException, Request


async def require_firebase_user(request: Request) -> dict:
    authorization = request.headers.get("authorization", "")
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing Firebase bearer token")
    token = authorization.removeprefix("Bearer ").strip()
    # Production: verify with firebase_admin.auth.verify_id_token(token).
    return {"uid": "demo-user", "token_preview": token[:8]}
