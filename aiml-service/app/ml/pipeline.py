import datetime as dt
from typing import List

import numpy as np
from sqlalchemy.orm import Session

from app import models
from app.ml.sentiment import analyze_sentiment
from app.ml.themes import extract_themes, FeedbackItem, ThemeResult
from app.llm.insights import generate_insights


def analyze_and_store_feedback(feedback: models.Feedback) -> None:
    """Run sentiment analysis on one feedback row and populate its ML fields.
    Called synchronously right after a student submits feedback."""
    result = analyze_sentiment(feedback.comment)
    feedback.sentiment_label = result.label
    feedback.sentiment_score = result.score
    feedback.sentiment_breakdown = result.breakdown
    feedback.analyzed_at = dt.datetime.utcnow()


def _build_sentiment_summary(feedback_rows: List[models.Feedback]) -> dict:
    n = len(feedback_rows)
    pos = sum(1 for f in feedback_rows if f.sentiment_label == "positive")
    neu = sum(1 for f in feedback_rows if f.sentiment_label == "neutral")
    neg = sum(1 for f in feedback_rows if f.sentiment_label == "negative")
    avg_score = float(np.mean([f.sentiment_score for f in feedback_rows])) if n else 0.0

    ratings = [f.rating for f in feedback_rows if f.rating is not None]
    avg_rating = round(float(np.mean(ratings)), 2) if ratings else None

    return {
        "total_analyzed": n,
        "average_score": round(avg_score, 4),
        "positive_count": pos,
        "neutral_count": neu,
        "negative_count": neg,
        "positive_pct": round(100 * pos / n, 1) if n else 0.0,
        "neutral_pct": round(100 * neu / n, 1) if n else 0.0,
        "negative_pct": round(100 * neg / n, 1) if n else 0.0,
        "average_rating": avg_rating,
    }


def compute_event_insights(db: Session, event: models.Event) -> dict:
    """
    Full pipeline for one event:
      1. Ensure every feedback row has sentiment (back-fills any that don't).
      2. Aggregate sentiment stats.
      3. Cluster comments into common themes (TF-IDF + KMeans).
      4. Ask the LLM layer to name the themes + write an executive summary
         and recommended actions (falls back to an algorithmic version).

    Returns a plain dict matching the EventInsights schema (minus the
    caching metadata, which the router fills in).
    """
    feedback_rows = event.feedback

    # Back-fill sentiment for any legacy/unanalyzed rows.
    dirty = False
    for f in feedback_rows:
        if f.sentiment_label is None:
            analyze_and_store_feedback(f)
            dirty = True
    if dirty:
        db.commit()

    sentiment_summary = _build_sentiment_summary(feedback_rows)

    items = [
        FeedbackItem(
            id=f.id,
            text=f.comment,
            sentiment_score=f.sentiment_score or 0.0,
            sentiment_label=f.sentiment_label or "neutral",
        )
        for f in feedback_rows
    ]
    themes: List[ThemeResult] = extract_themes(items)

    ai = generate_insights(event.name, sentiment_summary, themes)

    theme_outputs = []
    for theme, label in zip(themes, ai["theme_labels"]):
        theme_outputs.append(
            {
                "label": label,
                "keywords": theme.keywords,
                "feedback_count": theme.feedback_count,
                "avg_sentiment": theme.avg_sentiment,
                "dominant_sentiment": theme.dominant_sentiment,
                "sample_quotes": theme.sample_quotes,
            }
        )

    return {
        "event_id": event.id,
        "event_name": event.name,
        "total_feedback": len(feedback_rows),
        "sentiment_summary": sentiment_summary,
        "themes": theme_outputs,
        "ai_summary": ai["summary"],
        "recommended_actions": ai["recommended_actions"],
        "generated_by": ai["source"],
    }
