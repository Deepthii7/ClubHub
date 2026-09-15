# ClubHub — AI/ML Module (Feedback Insights)

Sentiment analysis + common-theme extraction + admin-facing AI insights for
event feedback.

```
Student attends event → submits feedback → stored →
AI analyzes sentiment + common themes → Admin views insights
```

## Tech stack

- **API:** FastAPI (Python)
- **Storage:** SQLAlchemy ORM, SQLite by default (swap via `DATABASE_URL`)
- **Sentiment analysis:** VADER (lexicon/rule-based, ships fully offline —
  no model download, runs synchronously on every submission)
- **Theme extraction:** scikit-learn TF-IDF + K-Means clustering (offline,
  bundled stop-word list, no model download)
- **AI output layer:** optional Claude (Anthropic API) pass that turns the
  keyword clusters into readable theme names, an executive summary, and
  recommended actions — with a fully-functional algorithmic fallback when
  no API key is configured, so the feature never blocks the admin view.

## Why this split (ML pipeline + optional LLM layer)

Sentiment and themes are computed by a deterministic, fast, local pipeline
(VADER + TF-IDF/K-Means) — this is what actually reads and scores every
comment, so it's cheap enough to run on every submission and its numbers
are directly explainable/auditable. The LLM is used only as a *narration*
layer on top of those already-computed numbers (naming clusters, writing a
summary, suggesting actions) — it's explicitly instructed not to invent or
override the underlying sentiment/theme data. If the LLM call fails or no
API key is set, `app/llm/insights.py` falls back to an algorithmic summary
built from the same stats, so insights are always available.

## Flow

1. **`POST /events`** — create an event (name, club, date).
2. **`POST /feedback`** — a student submits feedback (`event_id`, optional
   name/email/rating, required comment). Sentiment analysis runs
   synchronously and the response includes the sentiment result
   immediately.
3. **`GET /events/{id}/insights`** — admin view. Aggregates sentiment
   stats, clusters comments into common themes, and returns an AI-written
   summary + recommended actions. Cached per event and only recomputed
   once new feedback has arrived (or `?force_refresh=true`).

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env                # optionally set ANTHROPIC_API_KEY

uvicorn app.main:app --reload --port 8000
```

Interactive API docs: `http://localhost:8000/docs`

### Try it without writing any client code

```bash
python -m app.seed_demo
```

Seeds one event with 15 realistic feedback comments and prints the full
insights payload (sentiment breakdown, themes, summary, actions) straight
to the console — useful for sanity-checking the pipeline in isolation.

## API reference

| Method | Path | Purpose |
|---|---|---|
| POST | `/events` | Create an event |
| GET | `/events` | List events |
| GET | `/events/{id}` | Get one event |
| POST | `/feedback` | Submit feedback (runs sentiment analysis inline) |
| GET | `/feedback?event_id=` | List feedback, optionally by event |
| GET | `/events/{id}/insights` | Admin insights (sentiment + themes + AI summary) |
| POST | `/events/{id}/insights/refresh` | Force-recompute insights |
| GET | `/health` | Liveness check |

### Sample: `GET /events/{id}/insights` response shape

```json
{
  "event_id": 1,
  "event_name": "Spring Hackathon",
  "total_feedback": 15,
  "sentiment_summary": {
    "total_analyzed": 15,
    "average_score": 0.38,
    "positive_count": 11, "neutral_count": 1, "negative_count": 3,
    "positive_pct": 73.3, "neutral_pct": 6.7, "negative_pct": 20.0,
    "average_rating": 3.53
  },
  "themes": [
    {
      "label": "Speaker Quality",
      "keywords": ["speaker", "engaging", "knowledgeable"],
      "feedback_count": 3,
      "avg_sentiment": 0.89,
      "dominant_sentiment": "positive",
      "sample_quotes": ["Speaker was fantastic, super knowledgeable..."]
    }
  ],
  "ai_summary": "The event was very well received overall...",
  "recommended_actions": ["Review and address concerns about..."],
  "generated_by": "llm",
  "from_cache": false,
  "generated_at": "2026-08-19T18:04:09Z"
}
```

## Project structure

```
app/
  main.py              FastAPI app, CORS, router registration
  config.py            Settings (env-driven: DB URL, API key, thresholds)
  database.py           SQLAlchemy engine/session
  models.py             Event, Feedback, EventInsightCache
  schemas.py             Pydantic request/response models
  routers/
    events.py            Event CRUD
    feedback.py           Feedback submission + listing
    insights.py            Admin insights endpoint (with caching)
  ml/
    sentiment.py           VADER sentiment scoring
    themes.py               TF-IDF + K-Means theme clustering
    pipeline.py             Orchestrates sentiment + themes + AI summary
  llm/
    client.py                Anthropic API wrapper (JSON-mode, fails soft)
    insights.py               Prompt + algorithmic fallback for theme naming/summary
  seed_demo.py                Standalone demo script
requirements.txt
.env.example
```

## Integrating with the Module 1 frontend

This service is a separate deployable (Python/FastAPI) from the React
frontend. Point the frontend at it with a base URL like
`http://localhost:8000`, e.g. a student feedback form posting to
`/feedback`, and an admin dashboard page fetching
`/events/{id}/insights` and rendering the sentiment split + theme cards.
CORS is open (`allow_origins=["*"]`) for local development — restrict this
to the deployed frontend origin before shipping to production.
