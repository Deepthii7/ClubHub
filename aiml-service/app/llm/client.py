import json
from typing import Optional

from app.config import settings

_client = None


def _get_client():
    """Lazily construct the Anthropic client so the app still imports/runs
    fine when the anthropic package or API key isn't configured."""
    global _client
    if _client is None and settings.ANTHROPIC_API_KEY:
        import anthropic

        _client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    return _client


def call_claude_json(system_prompt: str, user_prompt: str, max_tokens: int = 1200) -> Optional[dict]:
    """
    Call Claude and parse a strict-JSON response. Returns None (never raises)
    on any failure — callers must treat this as a best-effort enhancement,
    with an algorithmic fallback always available.
    """
    client = _get_client()
    if client is None:
        return None

    try:
        response = client.messages.create(
            model=settings.ANTHROPIC_MODEL,
            max_tokens=max_tokens,
            system=system_prompt,
            messages=[{"role": "user", "content": user_prompt}],
        )
        text = "".join(block.text for block in response.content if block.type == "text")
        text = text.strip()
        if text.startswith("```"):
            text = text.strip("`")
            text = text.split("\n", 1)[1] if "\n" in text else text
            if text.lower().startswith("json"):
                text = text[4:]
        return json.loads(text)
    except Exception:
        # Network issues, rate limits, malformed JSON, etc. — degrade gracefully.
        return None
