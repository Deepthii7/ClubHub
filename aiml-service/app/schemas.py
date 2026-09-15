import datetime as dt
from typing import Optional, List, Literal

from pydantic import BaseModel, Field, EmailStr, field_validator


# ---------- Events ----------

class EventCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    club_name: Optional[str] = None
    event_date: Optional[dt.datetime] = None


class EventOut(BaseModel):
    id: int
    name: str
    club_name: Optional[str]
    event_date: Optional[dt.datetime]
    created_at: dt.datetime

    model_config = {"from_attributes": True}


# ---------- Feedback (student submission) ----------

class FeedbackCreate(BaseModel):
    event_id: int
    student_name: Optional[str] = Field(None, max_length=120)
    student_email: Optional[EmailStr] = None
    rating: Optional[int] = Field(None, ge=1, le=5)
    comment: str = Field(..., min_length=3, max_length=4000)

    @field_validator("comment")
    @classmethod
    def comment_not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("comment cannot be blank")
        return v.strip()


class SentimentOut(BaseModel):
    label: Literal["positive", "neutral", "negative"]
    score: float
    breakdown: dict


class FeedbackOut(BaseModel):
    id: int
    event_id: int
    student_name: Optional[str]
    rating: Optional[int]
    comment: str
    submitted_at: dt.datetime
    sentiment_label: Optional[str]
    sentiment_score: Optional[float]

    model_config = {"from_attributes": True}


class FeedbackSubmitResponse(BaseModel):
    feedback: FeedbackOut
    sentiment: SentimentOut


# ---------- Insights (admin view) ----------

class ThemeOut(BaseModel):
    label: str
    keywords: List[str]
    feedback_count: int
    avg_sentiment: float
    dominant_sentiment: Literal["positive", "neutral", "negative"]
    sample_quotes: List[str]


class SentimentSummary(BaseModel):
    total_analyzed: int
    average_score: float
    positive_count: int
    neutral_count: int
    negative_count: int
    positive_pct: float
    neutral_pct: float
    negative_pct: float
    average_rating: Optional[float] = None


class EventInsights(BaseModel):
    event_id: int
    event_name: str
    total_feedback: int
    sentiment_summary: SentimentSummary
    themes: List[ThemeOut]
    ai_summary: str
    recommended_actions: List[str]
    generated_at: dt.datetime
    from_cache: bool
    generated_by: Literal["llm", "algorithmic"]
