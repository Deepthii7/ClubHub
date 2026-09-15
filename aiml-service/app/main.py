from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routers import events, feedback, insights

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ClubHub AI/ML Insights Service",
    description=(
        "Event feedback intake + AI analysis: sentiment analysis, "
        "common-theme extraction, and admin-facing insights."
    ),
    version="1.0.0",
)

# Allow the Vite frontend (dev + common local ports) to call this API directly.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to the deployed frontend origin in production
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events.router)
app.include_router(feedback.router)
app.include_router(insights.router)


@app.get("/health", tags=["meta"])
def health():
    return {"status": "ok"}
