from backend.db.seed_data import COMPLAINTS, PROJECTS
from backend.schemas.roadwatch import ChatRequest, ChatResponse


def answer_chat(request: ChatRequest) -> ChatResponse:
    message = request.message.lower()
    complaint = COMPLAINTS[0]
    citations = [complaint["id"]]

    if "contractor" in message:
        project = next((row for row in PROJECTS if row["id"] == complaint["project_id"]), None)
        if project:
            citations.append(project["id"])
            return ChatResponse(
                answer=f"{project['contractor']} is linked to {project['road_name']} under project {project['id']}.",
                citations=citations,
                confidence=0.86,
            )

    if "budget" in message:
        project = next((row for row in PROJECTS if row["id"] == complaint["project_id"]), None)
        if project:
            citations.append(project["id"])
            return ChatResponse(
                answer=f"The linked project budget is ₹{project['budget_crore']} crore. I only report budgets present in RoadWatch project records.",
                citations=citations,
                confidence=0.83,
            )

    if "responsible" in message or "authority" in message or "who" in message:
        route = complaint["route"]
        return ChatResponse(
            answer=f"{route['authority_name']} in {route['department']} is responsible for the current routed complaint. SLA is {route['sla_hours']} hours.",
            citations=citations,
            confidence=0.9,
        )

    if "nearby" in message or "how many" in message:
        return ChatResponse(
            answer=f"There are {len(COMPLAINTS)} structured demo complaints in the current map area, including one high-severity pothole and one flooding issue.",
            citations=[row["id"] for row in COMPLAINTS],
            confidence=0.78,
        )

    return ChatResponse(
        answer="I found related RoadWatch records, but not enough structured evidence to answer beyond complaint status, routing, contractor, and budget fields.",
        citations=citations,
        confidence=0.62,
    )
