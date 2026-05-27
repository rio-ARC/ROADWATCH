from fastapi import APIRouter

from backend.schemas.roadwatch import AuthorityRoute, RoutingRequest
from backend.services.routing_service import route_complaint

router = APIRouter(prefix="/routing", tags=["routing"])


@router.post("", response_model=AuthorityRoute)
def post_route(payload: RoutingRequest) -> AuthorityRoute:
    return route_complaint(payload)
