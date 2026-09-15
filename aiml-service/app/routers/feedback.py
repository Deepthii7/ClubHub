from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import models
from app.schemas import FeedbackCreate, FeedbackOut, FeedbackSubmitResponse, SentimentOut
from app.ml.pipeline import analyze_and_store_feedback

router = APIRouter(prefix="/feedback", tags=["feedback"])


@router.post("", response_model=FeedbackSubmitResponse, status_code=201)
def submit_feedback(payload: FeedbackCreate, db: Session = Depends(get_db)):
    """
    Student submits feedback for an event. Sentiment analysis runs
    synchronously (it's fast/local — no network call) so the response
    already includes the sentiment result; theme extraction happens in
    aggregate at insight-generation time, once there's a batch to cluster.
    """
    event = db.query(models.Event).get(payload.event_id)
    if not event:
        raise HTTPException(404, "Event not found")

    feedback = models.Feedback(
        event_id=payload.event_id,
        student_name=payload.student_name,
        student_email=payload.student_email,
        rating=payload.rating,
        comment=payload.comment,
    )
    analyze_and_store_feedback(feedback)

    db.add(feedback)
    db.commit()
    db.refresh(feedback)

    return FeedbackSubmitResponse(
        feedback=FeedbackOut.model_validate(feedback),
        sentiment=SentimentOut(
            label=feedback.sentiment_label,
            score=feedback.sentiment_score,
            breakdown=feedback.sentiment_breakdown,
        ),
    )


@router.get("", response_model=list[FeedbackOut])
def list_feedback(event_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Feedback)
    if event_id is not None:
        query = query.filter(models.Feedback.event_id == event_id)
    return query.order_by(models.Feedback.submitted_at.desc()).all()
