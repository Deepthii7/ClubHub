"""
Common theme extraction for a batch of feedback comments.

Approach (fully offline, no external model download required):

1. Vectorize all comments with TF-IDF over unigrams+bigrams, using
   scikit-learn's bundled English stop-word list.
2. Cluster the vectors with K-Means — each cluster becomes a "theme".
   K is chosen adaptively from the number of comments (more feedback ->
   more granular themes, capped by settings.MAX_THEMES).
3. For each cluster: pull the top TF-IDF terms as keywords, compute the
   average sentiment of comments in that cluster, and pick representative
   sample quotes (the comments closest to the cluster centroid).

This gives the admin a ranked list of "what people are actually talking
about" — e.g. "Venue & Seating", "Speaker Quality", "Registration Process"
— each tagged with how positively/negatively people feel about it, which
is far more actionable than an overall sentiment score alone.

An optional LLM pass (see app/llm/insights.py) can turn these keyword
clusters into cleaner, human-readable theme names — this module produces
the underlying, verifiable signal either way.
"""

from dataclasses import dataclass, field
from typing import List

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

from app.config import settings


@dataclass
class FeedbackItem:
    id: int
    text: str
    sentiment_score: float
    sentiment_label: str


@dataclass
class ThemeResult:
    keywords: List[str]
    feedback_ids: List[int] = field(default_factory=list)
    sample_quotes: List[str] = field(default_factory=list)
    avg_sentiment: float = 0.0
    dominant_sentiment: str = "neutral"
    feedback_count: int = 0


def _pick_k(n_docs: int) -> int:
    """Heuristic cluster count: roughly one theme per ~3-4 comments."""
    if n_docs < settings.MIN_FEEDBACK_FOR_CLUSTERING:
        return 1
    k = max(2, round(n_docs / 3.5))
    return min(k, settings.MAX_THEMES, n_docs)


def _dominant_label(labels: List[str]) -> str:
    counts = {"positive": 0, "neutral": 0, "negative": 0}
    for l in labels:
        counts[l] = counts.get(l, 0) + 1
    return max(counts, key=counts.get)


def _top_terms_for_cluster(
    vectorizer: TfidfVectorizer, X, cluster_indices: List[int], top_n: int
) -> List[str]:
    """Rank terms by their mean TF-IDF weight within the cluster's documents."""
    sub = X[cluster_indices]
    mean_weights = np.asarray(sub.mean(axis=0)).ravel()
    top_idx = mean_weights.argsort()[::-1][:top_n]
    terms = vectorizer.get_feature_names_out()
    return [terms[i] for i in top_idx if mean_weights[i] > 0]


def _representative_quotes(X, cluster_indices: List[int], texts: List[str], centroid, top_n: int = 3) -> List[str]:
    """Pick the comments closest to the cluster centroid as sample quotes."""
    sub = X[cluster_indices]
    sims = cosine_similarity(sub, centroid.reshape(1, -1)).ravel()
    order = np.argsort(sims)[::-1]
    picked, seen = [], set()
    for idx in order:
        original_idx = cluster_indices[idx]
        text = texts[original_idx].strip()
        if text not in seen:
            picked.append(text)
            seen.add(text)
        if len(picked) >= top_n:
            break
    return picked


def extract_themes(items: List[FeedbackItem]) -> List[ThemeResult]:
    """
    Cluster feedback comments into common themes.

    Falls back gracefully for very small feedback volumes, where clustering
    isn't meaningful — everything becomes a single "General Feedback" theme
    built from the overall top keywords.
    """
    if not items:
        return []

    texts = [i.text for i in items]
    n = len(items)
    k = _pick_k(n)

    vectorizer = TfidfVectorizer(
        stop_words="english",
        ngram_range=(1, 2),
        max_df=0.95,
        min_df=1,
        max_features=500,
    )
    X = vectorizer.fit_transform(texts)

    if k <= 1 or X.shape[1] == 0:
        keywords = _top_terms_for_cluster(vectorizer, X, list(range(n)), settings.TOP_KEYWORDS_PER_THEME)
        return [
            ThemeResult(
                keywords=keywords or ["general"],
                feedback_ids=[i.id for i in items],
                sample_quotes=texts[: min(3, n)],
                avg_sentiment=round(float(np.mean([i.sentiment_score for i in items])), 4),
                dominant_sentiment=_dominant_label([i.sentiment_label for i in items]),
                feedback_count=n,
            )
        ]

    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    cluster_ids = km.fit_predict(X)

    themes: List[ThemeResult] = []
    for cluster_id in range(k):
        indices = [idx for idx, c in enumerate(cluster_ids) if c == cluster_id]
        if not indices:
            continue

        cluster_items = [items[idx] for idx in indices]
        keywords = _top_terms_for_cluster(vectorizer, X, indices, settings.TOP_KEYWORDS_PER_THEME)
        quotes = _representative_quotes(X, indices, texts, km.cluster_centers_[cluster_id])

        themes.append(
            ThemeResult(
                keywords=keywords or ["general"],
                feedback_ids=[i.id for i in cluster_items],
                sample_quotes=quotes,
                avg_sentiment=round(float(np.mean([i.sentiment_score for i in cluster_items])), 4),
                dominant_sentiment=_dominant_label([i.sentiment_label for i in cluster_items]),
                feedback_count=len(cluster_items),
            )
        )

    themes.sort(key=lambda t: t.feedback_count, reverse=True)
    return themes
