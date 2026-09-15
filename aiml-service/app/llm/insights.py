"""
Turns the algorithmic signal (sentiment stats + TF-IDF/KMeans theme
clusters) into the polished output an admin actually reads: readable theme
names, a short executive summary, and concrete recommended actions.

Claude (via app/llm/client.py) is used when ANTHROPIC_API_KEY is configured,
grounded strictly in the numbers and sample quotes we already computed —
it is not asked to invent sentiment or themes, only to *name and narrate*
what the ML pipeline already found. If the LLM is unavailable or the call
fails for any reason, an algorithmic fallback produces an equivalent
(if less fluent) result, so this feature never blocks the admin view.
"""

from typing import List

from app.ml.themes import ThemeResult
from app.llm.client import call_claude_json

SYSTEM_PROMPT = """You are an analyst summarizing student feedback for a college club event, \
for a club-officer audience. You are given ALREADY-COMPUTED sentiment statistics and \
keyword theme clusters (produced by a separate ML pipeline) — do not contradict or \
re-derive these numbers, only interpret and narrate them.

Respond with ONLY a JSON object, no prose before or after, no markdown fences, matching \
exactly this shape:
{
  "theme_labels": ["short 2-4 word theme name", ...],
  "summary": "2-4 sentence executive summary of how the event landed overall",
  "recommended_actions": ["short actionable recommendation", ...]
}

Rules:
- "theme_labels" must have exactly as many entries as the themes you were given, in the same order.
- Theme labels should read naturally (e.g. "Venue & Seating", "Speaker Quality") — not a raw keyword dump.
- recommended_actions: 2-4 concrete, specific suggestions tied to the actual negative/neutral themes given. \
If everything is strongly positive, suggest ways to build on what worked instead of inventing problems.
- Keep the tone factual and constructive, never generic filler.
"""


def _build_user_prompt(event_name: str, sentiment_summary: dict, themes: List[ThemeResult]) -> str:
    lines = [
        f"Event: {event_name}",
        f"Total feedback analyzed: {sentiment_summary['total_analyzed']}",
        f"Average sentiment (compound, -1 to 1): {sentiment_summary['average_score']}",
        f"Positive: {sentiment_summary['positive_pct']}%  "
        f"Neutral: {sentiment_summary['neutral_pct']}%  "
        f"Negative: {sentiment_summary['negative_pct']}%",
    ]
    if sentiment_summary.get("average_rating") is not None:
        lines.append(f"Average star rating: {sentiment_summary['average_rating']}/5")

    lines.append("\nThemes found by clustering (index, keywords, size, avg sentiment, sample quotes):")
    for i, t in enumerate(themes):
        quotes = " | ".join(f'"{q}"' for q in t.sample_quotes[:2])
        lines.append(
            f"[{i}] keywords: {', '.join(t.keywords)} | "
            f"{t.feedback_count} comments | avg sentiment {t.avg_sentiment} ({t.dominant_sentiment}) | "
            f"quotes: {quotes}"
        )
    return "\n".join(lines)


def _algorithmic_fallback(sentiment_summary: dict, themes: List[ThemeResult]) -> dict:
    theme_labels = []
    for t in themes:
        top = [kw.title() for kw in t.keywords[:2]] or ["General Feedback"]
        theme_labels.append(" & ".join(top))

    pos, neu, neg = (
        sentiment_summary["positive_pct"],
        sentiment_summary["neutral_pct"],
        sentiment_summary["negative_pct"],
    )
    if pos >= 60:
        tone = "The event was very well received overall"
    elif neg >= 40:
        tone = "The event drew significant criticism"
    elif pos > neg:
        tone = "The event was generally well received, with some mixed feedback"
    else:
        tone = "Feedback on the event was mixed"

    summary = (
        f"{tone}: {pos}% of feedback was positive, {neu}% neutral, and {neg}% negative "
        f"across {sentiment_summary['total_analyzed']} responses. "
    )
    if themes:
        top_theme = max(themes, key=lambda t: t.feedback_count)
        summary += (
            f"The most-discussed topic was around \"{', '.join(top_theme.keywords[:3])}\" "
            f"({top_theme.feedback_count} mentions, {top_theme.dominant_sentiment} overall)."
        )

    actions = []
    negative_themes = sorted(
        [t for t in themes if t.dominant_sentiment == "negative"],
        key=lambda t: t.feedback_count,
        reverse=True,
    )
    for t in negative_themes[:3]:
        actions.append(
            f"Review and address concerns about {', '.join(t.keywords[:2])} "
            f"— raised in {t.feedback_count} comment(s)."
        )
    if not actions:
        positive_themes = sorted(themes, key=lambda t: t.feedback_count, reverse=True)
        if positive_themes:
            actions.append(
                f"Keep doing what worked: {', '.join(positive_themes[0].keywords[:2])} "
                "was the most praised aspect."
            )
        actions.append("Consider a short post-event survey next time to capture more specific suggestions.")

    return {"theme_labels": theme_labels, "summary": summary.strip(), "recommended_actions": actions}


def generate_insights(event_name: str, sentiment_summary: dict, themes: List[ThemeResult]) -> dict:
    """
    Returns:
        {
          "theme_labels": [str, ...]   # aligned with `themes`, same order/length
          "summary": str,
          "recommended_actions": [str, ...],
          "source": "llm" | "algorithmic",
        }
    """
    if themes:
        llm_result = call_claude_json(
            SYSTEM_PROMPT,
            _build_user_prompt(event_name, sentiment_summary, themes),
        )
        if (
            llm_result
            and isinstance(llm_result.get("theme_labels"), list)
            and len(llm_result["theme_labels"]) == len(themes)
            and llm_result.get("summary")
            and isinstance(llm_result.get("recommended_actions"), list)
        ):
            llm_result["source"] = "llm"
            return llm_result

    fallback = _algorithmic_fallback(sentiment_summary, themes)
    fallback["source"] = "algorithmic"
    return fallback
