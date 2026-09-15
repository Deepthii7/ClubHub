import datetime as dt

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import EventInsights
from app.ml.pipeline import compute_event_insights

router = APIRouter(prefix="/events", tags=["insights"])


@router.get("/{event_id}/insights", response_model=EventInsights)
def get_event_insights(
    event_id: int,
    force_refresh: bool = Query(False, description="Recompute even if a fresh cache exists"),
    db: Session = Depends(get_db),
):
    """
    Admin-facing AI insights for one event: sentiment breakdown, clustered
    common themes, an executive summary, and recommended actions.

    Results are cached per event and only recomputed when new feedback has
    arrived since the last computation (or force_refresh=true), since
    clustering + the optional LLM call are the most expensive steps here.
    """
    event = db.query(models.Event).get(event_id)
    if not event:
        raise HTTPException(404, "Event not found")

    feedback_count = len(event.feedback)
    if feedback_count == 0:
        raise HTTPException(400, "This event has no feedback yet — nothing to analyze.")

    cache = (
        db.query(models.EventInsightCache)
        .filter(models.EventInsightCache.event_id == event_id)
        .first()
    )

    if cache and not force_refresh and cache.feedback_count_at_generation == feedback_count:
        payload = dict(cache.payload)
        payload["generated_at"] = cache.generated_at
        payload["from_cache"] = True
        return payload

    payload = compute_event_insights(db, event)

    now = dt.datetime.utcnow()
    if cache:
        cache.payload = payload
        cache.feedback_count_at_generation = feedback_count
        cache.generated_at = now
    else:
        cache = models.EventInsightCache(
            event_id=event_id,
            payload=payload,
            feedback_count_at_generation=feedback_count,
            generated_at=now,
        )
        db.add(cache)
    db.commit()

    payload = dict(payload)
    payload["generated_at"] = now
    payload["from_cache"] = False
    return payload


@router.post("/{event_id}/insights/refresh", response_model=EventInsights)
def refresh_event_insights(event_id: int, db: Session = Depends(get_db)):
    """Explicit re-analyze trigger — same as GET with force_refresh=true."""
    return get_event_insights(event_id=event_id, force_refresh=True, db=db)
