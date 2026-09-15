import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Central runtime configuration, read from environment variables."""

    # Storage
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./feedback.db")

    # LLM (optional layer — service works fully without this)
    ANTHROPIC_API_KEY: str | None = os.getenv("ANTHROPIC_API_KEY")
    ANTHROPIC_MODEL: str = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6")
    ENABLE_LLM_INSIGHTS: bool = bool(ANTHROPIC_API_KEY)

    # Theme extraction tuning
    MIN_FEEDBACK_FOR_CLUSTERING: int = 4
    MAX_THEMES: int = 6
    TOP_KEYWORDS_PER_THEME: int = 6

    # Sentiment thresholds (VADER compound score, range -1..1)
    POSITIVE_THRESHOLD: float = 0.05
    NEGATIVE_THRESHOLD: float = -0.05


settings = Settings()
