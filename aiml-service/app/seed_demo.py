"""
Standalone demo: seeds one event with realistic student feedback, runs the
sentiment + theme extraction pipeline, and prints the admin insights output.

Run with:  python -m app.seed_demo
"""

import datetime as dt
import json

from app.database import Base, engine, SessionLocal
from app import models
from app.ml.pipeline import compute_event_insights

SAMPLE_FEEDBACK = [
    ("Amara O.", 5, "Loved this event! The speaker was engaging and the topics were super relevant to what we're studying."),
    ("Jon K.", 4, "Really solid turnout and great energy. Only downside was the room was way too small for how many people showed up."),
    ("Priya S.", 2, "The venue was way too cramped, we were standing in the hallway for half of it and could barely hear."),
    ("—", 5, "Best club event all semester. The speaker knew their stuff and took a ton of great questions."),
    ("Devon M.", 3, "It was fine. Started 20 minutes late which threw off my schedule for the rest of the night."),
    ("—", 1, "Startedlate, room was packed and hot, and the mic kept cutting out. Not a great experience honestly."),
    ("Kai T.", 5, "The hands-on workshop portion was amazing, I actually learned something I can use. More of this please!"),
    ("Lena R.", 4, "Great content and a genuinely engaging speaker. Wish the seating was better organized though."),
    ("—", 2, "Sound system was a mess the entire time, really hard to follow the speaker over the feedback and static."),
    ("Marcus W.", 5, "Honestly one of the better organized events this year. Loved the Q&A at the end."),
    ("Zoe P.", 3, "Content was good but it ran way over time and a lot of people started leaving early."),
    ("—", 4, "Enjoyed it a lot! The registration line took forever though, we missed the first ten minutes."),
    ("Ravi N.", 2, "Registration was chaos, no one seemed to know where to check people in, and we started late because of it."),
    ("Ines D.", 5, "Speaker was fantastic, super knowledgeable and funny too. Would definitely come to another one of these."),
    ("—", 3, "Pretty average. Nothing wrong exactly but nothing that stood out either."),
]


def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    event = models.Event(
        name="Fall Kickoff: Intro to Machine Learning",
        club_name="Code Collective",
        event_date=dt.datetime.utcnow(),
    )
    db.add(event)
    db.commit()
    db.refresh(event)

    from app.ml.pipeline import analyze_and_store_feedback

    for name, rating, comment in SAMPLE_FEEDBACK:
        fb = models.Feedback(
            event_id=event.id,
            student_name=None if name == "—" else name,
            rating=rating,
            comment=comment,
        )
        analyze_and_store_feedback(fb)
        db.add(fb)
    db.commit()
    db.refresh(event)

    print(f"Seeded {len(SAMPLE_FEEDBACK)} feedback rows for event #{event.id}: {event.name}\n")

    insights = compute_event_insights(db, event)
    print(json.dumps(insights, indent=2, default=str))

    db.close()


if __name__ == "__main__":
    main()
