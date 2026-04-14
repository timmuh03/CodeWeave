from db import SessionLocal, engine
from models import Concept, Base

Base.metadata.create_all(bind=engine)

seed_data = [
    {
        "term": (
          "addEventListener"),
        "description": (
          "Attaches a function to run "
          "when a specific event happens "  
          "on an element."),
        "example": (
          'button.addEventListener'
          '("click", () => {\n  '
          'console.log("clicked");\n});'),
    },
    {
        "term": (
          "touchstart"),
        "description": (
          "Fires when a finger first "
          "touches the screen."),
        "example": (
          'card.addEventListener'
          '("touchstart", (event) => '
          '{\n  startX = event.touches[0]'
          '.clientX;\n});'),
    },
    {
        "term": (
          "touchmove"),
        "description": (
          "Fires as a finger moves across "
          "the screen after touching "
          "it."),
        "example": (
          'card.addEventListener'
          '("touchmove", (event) => {'
          '\n  currentX = '
          'event.touches[0].clientX;\n});'),
    },
    {
        "term": (
            "preventDefault"),
        "description": (
            "Stops the browser’s default "
            "behavior for an event."),
        "example": (
            'form.addEventListener'
            '("submit", (event) => {\n '
            'event.preventDefault();\n});'),
    },
    {
        "term": (
            "fetch"),
        "description": (
            "Sends an HTTP request and "
            "returns a Promise for the "
            "response."),
        "example": (
            'const response = await '
            'fetch("/concepts");'),
    },
]

def seed_concepts():
    db = SessionLocal()
    try:
        for item in seed_data:
            existing = db.query(Concept).filter_by(term=item["term"]).first()
            if existing:
                continue

            concept= Concept(
                term=item["term"],
                description=item["description"],
                example=item["example"],
            )
            db.add(concept)

        db.commit()
        print("Seeding complete.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_concepts()