from db import SessionLocal, engine
from models.base import Base
from models.concept import Concept
from models.example import Example
from models.example_slot import ExampleSlot
from models.slot_option import SlotOption


seed_data = [
  {
    "term": "addEventListener",
    "language": "javascript",
    "description": (
      "Attaches a function to run when "
      "a specific event happens on an "
      "element."
    ),
    "examples": [
      {
        "title": "Basic Event Listener",
        "text": (
          'document.querySelector("##Target##")'
          '.addEventListener("##Event Type##", '
          '() => {\n'
          '  console.log("##Message##");\n'
          '});'
        ),
        "display_order": 0,
        "slots": [
          {
            "slot_label": "Target",
            "slot_type": "selector_target",
            "slot_options": [
              {
                "option_text": "#submit-btn",
                "display_order": 0,
              },
              {
                "option_text": ".card",
                "display_order": 1,
              },
              {
                "option_text": "button",
                "display_order": 2,
              },
              {
                "option_text": "form",
                "display_order": 3,
              },
            ],
          },
          {
            "slot_label": "Event Type",
            "slot_type": "event_type",
            "slot_options": [
              {
                "option_text": "click",
                "display_order": 0,
              },
              {
                "option_text": "dblclick",
                "display_order": 1,
              },
              {
                "option_text": "mouseover",
                "display_order": 2,
              },
              {
                "option_text": "touchstart",
                "display_order": 3,
              },
              {
                "option_text": "keydown",
                "display_order": 4,
              },
              {
                "option_text": "submit",
                "display_order": 5,
              },
            ],
          },
          {
            "slot_label": "Message",
            "slot_type": "log_message",
            "slot_options": [
              {
                "option_text": "clicked",
                "display_order": 0,
              },
              {
                "option_text": "submitted",
                "display_order": 1,
              },
              {
                "option_text": "hovered",
                "display_order": 2,
              },
            ],
          },
        ],
      },
      {
        "title": "Named Handler",
        "text": (
          'const handler = () => {\n'
          '  console.log("##Message##");\n'
          '};\n\n'
          'window.addEventListener('
          '"##Event Type##", handler);'
        ),
        "display_order": 1,
        "slots": [
          {
            "slot_label": "Event Type",
            "slot_type": "event_type",
            "slot_options": [
              {
                "option_text": "resize",
                "display_order": 0,
              },
              {
                "option_text": "scroll",
                "display_order": 1,
              },
              {
                "option_text": "load",
                "display_order": 2,
              },
            ],
          },
          {
            "slot_label": "Message",
            "slot_type": "log_message",
            "slot_options": [
              {
                "option_text": "window changed",
                "display_order": 0,
              },
              {
                "option_text": "page loaded",
                "display_order": 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    "term": "querySelector",
    "language": "javascript",
    "description": (
      "Returns the first element that "
      "matches a CSS selector."
    ),
    "examples": [
      {
        "title": "Select One Element",
        "text": (
          'const el = document.querySelector('
          '"##Selector##");'
        ),
        "display_order": 0,
        "slots": [
          {
            "slot_label": "Selector",
            "slot_type": "css_selector",
            "slot_options": [
              {
                "option_text": "#main-nav",
                "display_order": 0,
              },
              {
                "option_text": ".card",
                "display_order": 1,
              },
              {
                "option_text": "button",
                "display_order": 2,
              },
              {
                "option_text": "input[type=\"email\"]",
                "display_order": 3,
              },
            ],
          },
        ],
      },
      {
        "title": "Update Text Content",
        "text": (
          'document.querySelector("##Selector##")'
          '.textContent = "##Text##";'
        ),
        "display_order": 1,
        "slots": [
          {
            "slot_label": "Selector",
            "slot_type": "css_selector",
            "slot_options": [
              {
                "option_text": "#status",
                "display_order": 0,
              },
              {
                "option_text": ".message",
                "display_order": 1,
              },
              {
                "option_text": "h1",
                "display_order": 2,
              },
            ],
          },
          {
            "slot_label": "Text",
            "slot_type": "text_value",
            "slot_options": [
              {
                "option_text": "Loaded",
                "display_order": 0,
              },
              {
                "option_text": "Success",
                "display_order": 1,
              },
              {
                "option_text": "Try again",
                "display_order": 2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    "term": "fetch",
    "language": "javascript",
    "description": (
      "Makes an HTTP request and returns "
      "a promise for the response."
    ),
    "examples": [
      {
        "title": "Basic Fetch",
        "text": (
          'fetch("##URL##")\n'
          '  .then((response) => response.json())\n'
          '  .then((data) => {\n'
          '    console.log(data);\n'
          '  });'
        ),
        "display_order": 0,
        "slots": [
          {
            "slot_label": "URL",
            "slot_type": "api_url",
            "slot_options": [
              {
                "option_text": "/api/users",
                "display_order": 0,
              },
              {
                "option_text": "/api/posts",
                "display_order": 1,
              },
              {
                "option_text": "https://api.example.com/data",
                "display_order": 2,
              },
            ],
          },
        ],
      },
      {
        "title": "Fetch With Method",
        "text": (
          'fetch("##URL##", {\n'
          '  method: "##Method##",\n'
          '})\n'
          '  .then((response) => response.json())\n'
          '  .then((data) => {\n'
          '    console.log(data);\n'
          '  });'
        ),
        "display_order": 1,
        "slots": [
          {
            "slot_label": "URL",
            "slot_type": "api_url",
            "slot_options": [
              {
                "option_text": "/api/tasks",
                "display_order": 0,
              },
              {
                "option_text": "/api/orders",
                "display_order": 1,
              },
            ],
          },
          {
            "slot_label": "Method",
            "slot_type": "http_method",
            "slot_options": [
              {
                "option_text": "GET",
                "display_order": 0,
              },
              {
                "option_text": "POST",
                "display_order": 1,
              },
              {
                "option_text": "PUT",
                "display_order": 2,
              },
              {
                "option_text": "DELETE",
                "display_order": 3,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    "term": "map",
    "language": "javascript",
    "description": (
      "Creates a new array by transforming "
      "each item in an existing array."
    ),
    "examples": [
      {
        "title": "Basic Array Map",
        "text": (
          'const result = ##Array##.map(('
          '##Item##) => ##Transform##);'
        ),
        "display_order": 0,
        "slots": [
          {
            "slot_label": "Array",
            "slot_type": "array_value",
            "slot_options": [
              {
                "option_text": "[1, 2, 3]",
                "display_order": 0,
              },
              {
                "option_text": "[10, 20, 30]",
                "display_order": 1,
              },
              {
                "option_text": "[\"a\", \"b\", \"c\"]",
                "display_order": 2,
              },
            ],
          },
          {
            "slot_label": "Item",
            "slot_type": "callback_param",
            "slot_options": [
              {
                "option_text": "num",
                "display_order": 0,
              },
              {
                "option_text": "item",
                "display_order": 1,
              },
              {
                "option_text": "letter",
                "display_order": 2,
              },
            ],
          },
          {
            "slot_label": "Transform",
            "slot_type": "transform_expression",
            "slot_options": [
              {
                "option_text": "num * 2",
                "display_order": 0,
              },
              {
                "option_text": "item + 1",
                "display_order": 1,
              },
              {
                "option_text": "letter.toUpperCase()",
                "display_order": 2,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    "term": "setTimeout",
    "language": "javascript",
    "description": (
      "Runs a function once after a delay."
    ),
    "examples": [
      {
        "title": "Delayed Action",
        "text": (
          'setTimeout(() => {\n'
          '  console.log("##Message##");\n'
          '}, ##Delay##);'
        ),
        "display_order": 0,
        "slots": [
          {
            "slot_label": "Message",
            "slot_type": "log_message",
            "slot_options": [
              {
                "option_text": "done",
                "display_order": 0,
              },
              {
                "option_text": "loading complete",
                "display_order": 1,
              },
              {
                "option_text": "saved",
                "display_order": 2,
              },
            ],
          },
          {
            "slot_label": "Delay",
            "slot_type": "milliseconds",
            "slot_options": [
              {
                "option_text": "500",
                "display_order": 0,
              },
              {
                "option_text": "1000",
                "display_order": 1,
              },
              {
                "option_text": "2000",
                "display_order": 2,
              },
            ],
          },
        ],
      },
    ],
  },
]


def reset_db() -> None:
  Base.metadata.drop_all(bind=engine)
  Base.metadata.create_all(bind=engine)


def seed_db() -> None:
  db = SessionLocal()

  try:
    for concept_data in seed_data:
      concept = Concept(
        term=concept_data["term"],
        language=concept_data["language"]
        description=concept_data["description"],
      )

      for example_data in concept_data.get(
        "examples", []
      ):
        example = Example(
          title=example_data["title"],
          text=example_data.get(
            "text"
          ),
          display_order=example_data.get(
            "display_order", 0
          ),
        )

        for slot_data in example_data.get(
          "slots", []
        ):
          slot = ExampleSlot(
            slot_label=slot_data["slot_label"],
            slot_type=slot_data["slot_type"],
          )

          for option_data in slot_data.get(
            "slot_options", []
          ):
            option = SlotOption(
              option_text=option_data[
                "option_text"
              ],
              display_order=option_data.get(
                "display_order", 0
              ),
            )
            slot.slot_options.append(option)

          example.slots.append(slot)

        concept.examples.append(example)

      db.add(concept)

    db.commit()
    print("Seed complete.")

  except Exception:
    db.rollback()
    raise

  finally:
    db.close()


if __name__ == "__main__":
  reset_db()
  seed_db()