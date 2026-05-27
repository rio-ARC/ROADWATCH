from backend.schemas.roadwatch import AuthorityRoute, DamageType, RoutingRequest


def route_complaint(request: RoutingRequest) -> AuthorityRoute:
    ward = "Ward 177" if request.lat < 12.99 else "Ward 170"
    municipality = "Greater Chennai Corporation"

    if request.damage_type == DamageType.flooding or request.lat > 13.0:
        return AuthorityRoute(
            municipality=municipality,
            ward=ward,
            department="Stormwater Drains",
            authority_name="Zonal Officer, Zone 13",
            escalation_email="stormwater-zone13@gcc.gov.in",
            sla_hours=12,
        )

    return AuthorityRoute(
        municipality=municipality,
        ward=ward,
        department="Roads and Bridges",
        authority_name="Assistant Engineer, Zone 13",
        escalation_email="zone13-roads@gcc.gov.in",
        sla_hours=48,
    )
