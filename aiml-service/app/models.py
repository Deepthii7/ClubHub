import datetime as dt

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    DateTime,
    ForeignKey,
    JSON,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    club_name = Column(String(200), nullable=True)
    event_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=dt.datetime.utcnow)

    feedback = relationship("Feedback", back_populates="event", cascade="all, delete-orphan")


class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False, index=True)

    # Student identity is optional so anonymous feedback is supported.
    student_name = Column(String(120), nullable=True)
    student_email = Column(String(200), nullable=True)

    rating = Column(Integer, nullable=True)  # optional 1-5 star rating
    comment = Column(Text, nullable=False)

    submitted_at = Column(DateTime, default=dt.datetime.utcnow, index=True)

    # --- Populated by the AI/ML sentiment pipeline at submission time ---
    sentiment_label = Column(String(20), nullable=True)   # positive | neutral | negative
    sentiment_score = Column(Float, nullable=True)         # VADER compound score, -1..1
    sentiment_breakdown = Column(JSON, nullable=True)      # {pos, neu, neg} raw VADER parts
    analyzed_at = Column(DateTime, nullable=True)

    event = relationship("Event", back_populates="feedback")


class EventInsightCache(Base):
    """
    Aggregate insights (sentiment summary + themes + AI summary) are
    expensive-ish to compute (clustering + optional LLM call), so we cache
    the result per event and invalidate it once enough new feedback arrives.
    """

    __tablename__ = "event_insight_cache"
    __table_args__ = (UniqueConstraint("event_id", name="uq_event_insight_event"),)

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    feedback_count_at_generation = Column(Integer, nullable=False)
    payload = Column(JSON, nullable=False)
    generated_at = Column(DateTime, default=dt.datetime.utcnow)
