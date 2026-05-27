from fastapi import APIRouter

from backend.schemas.roadwatch import ChatRequest, ChatResponse
from backend.services.chat_service import answer_chat

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
def post_chat(payload: ChatRequest) -> ChatResponse:
    return answer_chat(payload)
