"""
Sentiment analysis for student feedback.

Uses VADER (Valence Aware Dictionary and sEntiment Reasoner), a lexicon +
rule-based sentiment model tuned for short, informal text — a good fit for
event feedback comments, which are typically 1-3 sentences and often use
punctuation/caps for emphasis ("loved it!!", "was NOT worth it").

VADER ships its lexicon inside the package, so this runs fully offline with
no model download and near-zero latency, which matters here since sentiment
is computed synchronously on every feedback submission.
"""

from dataclasses import dataclass
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from app.config import settings

_analyzer = SentimentIntensityAnalyzer()


@dataclass
class SentimentResult:
    label: str          # "positive" | "neutral" | "negative"
    score: float         # compound score, -1..1
    breakdown: dict       # {"pos": float, "neu": float, "neg": float}


def analyze_sentiment(text: str) -> SentimentResult:
    """Score a single piece of feedback text."""
    scores = _analyzer.polarity_scores(text)
    compound = scores["compound"]

    if compound >= settings.POSITIVE_THRESHOLD:
        label = "positive"
    elif compound <= settings.NEGATIVE_THRESHOLD:
        label = "negative"
    else:
        label = "neutral"

    return SentimentResult(
        label=label,
        score=round(compound, 4),
        breakdown={
            "positive": scores["pos"],
            "neutral": scores["neu"],
            "negative": scores["neg"],
        },
    )
