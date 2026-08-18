from db import SessionLocal, engine
from models.base import Base
from models.concept import Concept
from models.example import Example
from models.example_slot import ExampleSlot
from models.slot_option import SlotOption


seed_data = [
    # =========================================================
    # addEventListener
    # =========================================================
    {
        "term": "addEventListener",
        "language": "javascript",
        "description": (
            "Attaches a function that runs when a specific event "
            "happens on an element or other event target."
        ),
        "examples": [
            {
                "title": "Button Click",
                "text": (
                    'document.querySelector("##Selector##")'
                    '.addEventListener("##Event Type##", () => {\n'
                    '  console.log("##Message##");\n'
                    '});'
                ),
                "display_order": 0,
                "slots": [
                    {
                        "slot_label": "Selector",
                        "slot_type": "css_selector",
                        "slot_options": [
                            {
                                "option_text": "#save-btn",
                                "display_order": 0,
                            },
                            {
                                "option_text": ".menu-button",
                                "display_order": 1,
                            },
                            {
                                "option_text": "button",
                                "display_order": 2,
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
                        ],
                    },
                    {
                        "slot_label": "Message",
                        "slot_type": "log_message",
                        "slot_options": [
                            {
                                "option_text": "Button activated",
                                "display_order": 0,
                            },
                            {
                                "option_text": "Event detected",
                                "display_order": 1,
                            },
                            {
                                "option_text": "Action complete",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Named Event Handler",
                "text": (
                    'function handleEvent() {\n'
                    '  console.log("##Message##");\n'
                    '}\n\n'
                    'window.addEventListener("##Event Type##", handleEvent);'
                ),
                "display_order": 1,
                "slots": [
                    {
                        "slot_label": "Message",
                        "slot_type": "log_message",
                        "slot_options": [
                            {
                                "option_text": "Window changed",
                                "display_order": 0,
                            },
                            {
                                "option_text": "Page loaded",
                                "display_order": 1,
                            },
                            {
                                "option_text": "User scrolled",
                                "display_order": 2,
                            },
                        ],
                    },
                    {
                        "slot_label": "Event Type",
                        "slot_type": "event_type",
                        "slot_options": [
                            {
                                "option_text": "resize",
                                "display_order": 0,
                            },
                            {
                                "option_text": "load",
                                "display_order": 1,
                            },
                            {
                                "option_text": "scroll",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    # =========================================================
    # map
    # =========================================================
    {
        "term": "map",
        "language": "javascript",
        "description": (
            "Creates a new array by running a callback function "
            "on every item in an existing array."
        ),
        "examples": [
            {
                "title": "Transform Numbers",
                "text": (
                    "const result = numbers.map("
                    "(number) => number ##Operator## ##Value##);"
                ),
                "display_order": 0,
                "slots": [
                    {
                        "slot_label": "Operator",
                        "slot_type": "operator",
                        "slot_options": [
                            {
                                "option_text": "*",
                                "display_order": 0,
                            },
                            {
                                "option_text": "+",
                                "display_order": 1,
                            },
                            {
                                "option_text": "-",
                                "display_order": 2,
                            },
                        ],
                    },
                    {
                        "slot_label": "Value",
                        "slot_type": "number",
                        "slot_options": [
                            {
                                "option_text": "2",
                                "display_order": 0,
                            },
                            {
                                "option_text": "5",
                                "display_order": 1,
                            },
                            {
                                "option_text": "10",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Extract Object Property",
                "text": (
                    "const names = users.map("
                    "(user) => user.##Property##);"
                ),
                "display_order": 1,
                "slots": [
                    {
                        "slot_label": "Property",
                        "slot_type": "object_property",
                        "slot_options": [
                            {
                                "option_text": "name",
                                "display_order": 0,
                            },
                            {
                                "option_text": "email",
                                "display_order": 1,
                            },
                            {
                                "option_text": "id",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    # =========================================================
    # filter
    # =========================================================
    {
        "term": "filter",
        "language": "javascript",
        "description": (
            "Creates a new array containing only the items that "
            "pass a condition in the callback function."
        ),
        "examples": [
            {
                "title": "Filter Numbers",
                "text": (
                    "const filtered = numbers.filter("
                    "(number) => number ##Comparison## ##Value##);"
                ),
                "display_order": 0,
                "slots": [
                    {
                        "slot_label": "Comparison",
                        "slot_type": "comparison_operator",
                        "slot_options": [
                            {
                                "option_text": ">",
                                "display_order": 0,
                            },
                            {
                                "option_text": ">=",
                                "display_order": 1,
                            },
                            {
                                "option_text": "<",
                                "display_order": 2,
                            },
                        ],
                    },
                    {
                        "slot_label": "Value",
                        "slot_type": "number",
                        "slot_options": [
                            {
                                "option_text": "10",
                                "display_order": 0,
                            },
                            {
                                "option_text": "20",
                                "display_order": 1,
                            },
                            {
                                "option_text": "100",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Filter Active Users",
                "text": (
                    "const activeUsers = users.filter("
                    "(user) => user.active === ##Status##);"
                ),
                "display_order": 1,
                "slots": [
                    {
                        "slot_label": "Status",
                        "slot_type": "boolean",
                        "slot_options": [
                            {
                                "option_text": "true",
                                "display_order": 0,
                            },
                            {
                                "option_text": "false",
                                "display_order": 1,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    # =========================================================
    # fetch
    # =========================================================
    {
        "term": "fetch",
        "language": "javascript",
        "description": (
            "Starts an HTTP request and returns a Promise that "
            "resolves to the server response."
        ),
        "examples": [
            {
                "title": "Basic GET Request",
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
                                "option_text": "/api/tasks",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Request With Options",
                "text": (
                    'fetch("##URL##", {\n'
                    '  method: "##Method##",\n'
                    '  headers: {\n'
                    '    "Content-Type": "application/json"\n'
                    '  }\n'
                    '});'
                ),
                "display_order": 1,
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
                                "option_text": "/api/orders",
                                "display_order": 1,
                            },
                            {
                                "option_text": "/api/tasks",
                                "display_order": 2,
                            },
                        ],
                    },
                    {
                        "slot_label": "Method",
                        "slot_type": "http_method",
                        "slot_options": [
                            {
                                "option_text": "POST",
                                "display_order": 0,
                            },
                            {
                                "option_text": "PUT",
                                "display_order": 1,
                            },
                            {
                                "option_text": "PATCH",
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

    # =========================================================
    # async / await
    # =========================================================
    {
        "term": "async / await",
        "language": "javascript",
        "description": (
            "Provides syntax for working with Promises in a style "
            "that reads more like synchronous code. An async "
            "function can pause at await until a Promise settles."
        ),
        "examples": [
            {
                "title": "Fetch With Await",
                "text": (
                    "async function loadData() {\n"
                    '  const response = await fetch("##URL##");\n'
                    "  const data = await response.json();\n"
                    "  console.log(data);\n"
                    "}"
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
                                "option_text": "/api/products",
                                "display_order": 1,
                            },
                            {
                                "option_text": "/api/messages",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Handle Errors",
                "text": (
                    "async function loadData() {\n"
                    "  try {\n"
                    '    const response = await fetch("##URL##");\n'
                    "    return await response.json();\n"
                    "  } catch (error) {\n"
                    '    console.error("##Error Message##", error);\n'
                    "  }\n"
                    "}"
                ),
                "display_order": 1,
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
                                "option_text": "/api/orders",
                                "display_order": 1,
                            },
                            {
                                "option_text": "/api/settings",
                                "display_order": 2,
                            },
                        ],
                    },
                    {
                        "slot_label": "Error Message",
                        "slot_type": "log_message",
                        "slot_options": [
                            {
                                "option_text": "Request failed",
                                "display_order": 0,
                            },
                            {
                                "option_text": "Unable to load data",
                                "display_order": 1,
                            },
                            {
                                "option_text": "Network error",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    # =========================================================
    # useState
    # =========================================================
    {
        "term": "useState",
        "language": "javascript",
        "description": (
            "A React Hook that stores a value in component state "
            "and provides a setter function for updating that value. "
            "Updating state causes React to render the component again."
        ),
        "examples": [
            {
                "title": "Counter State",
                "text": (
                    "const [count, setCount] = "
                    "useState(##Initial Value##);"
                ),
                "display_order": 0,
                "slots": [
                    {
                        "slot_label": "Initial Value",
                        "slot_type": "initial_state",
                        "slot_options": [
                            {
                                "option_text": "0",
                                "display_order": 0,
                            },
                            {
                                "option_text": "1",
                                "display_order": 1,
                            },
                            {
                                "option_text": "10",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Boolean State",
                "text": (
                    "const [isOpen, setIsOpen] = "
                    "useState(##Initial Value##);"
                ),
                "display_order": 1,
                "slots": [
                    {
                        "slot_label": "Initial Value",
                        "slot_type": "initial_state",
                        "slot_options": [
                            {
                                "option_text": "false",
                                "display_order": 0,
                            },
                            {
                                "option_text": "true",
                                "display_order": 1,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "String State",
                "text": (
                    'const [name, setName] = '
                    'useState("##Initial Value##");'
                ),
                "display_order": 2,
                "slots": [
                    {
                        "slot_label": "Initial Value",
                        "slot_type": "initial_state",
                        "slot_options": [
                            {
                                "option_text": "",
                                "display_order": 0,
                            },
                            {
                                "option_text": "Guest",
                                "display_order": 1,
                            },
                            {
                                "option_text": "Shannon",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
        ],
    },

    # =========================================================
    # useEffect
    # =========================================================
    {
        "term": "useEffect",
        "language": "javascript",
        "description": (
            "A React Hook for running side-effect code after a "
            "component renders. Its dependency array determines "
            "when the effect runs again."
        ),
        "examples": [
            {
                "title": "Run Once",
                "text": (
                    "useEffect(() => {\n"
                    '  console.log("Component mounted");\n'
                    "}, []);"
                ),
                "display_order": 0,
                "slots": [],
            },
            {
                "title": "Watch a Value",
                "text": (
                    "useEffect(() => {\n"
                    "  console.log(##Value##);\n"
                    "}, [##Value##]);"
                ),
                "display_order": 1,
                "slots": [
                    {
                        "slot_label": "Value",
                        "slot_type": "dependency",
                        "slot_options": [
                            {
                                "option_text": "count",
                                "display_order": 0,
                            },
                            {
                                "option_text": "isOpen",
                                "display_order": 1,
                            },
                            {
                                "option_text": "user",
                                "display_order": 2,
                            },
                        ],
                    },
                ],
            },
            {
                "title": "Event Listener Cleanup",
                "text": (
                    "useEffect(() => {\n"
                    "  function handleEvent() {\n"
                    '    console.log("##Message##");\n'
                    "  }\n\n"
                    '  window.addEventListener("##Event Type##", '
                    "handleEvent);\n\n"
                    "  return () => {\n"
                    '    window.removeEventListener("##Event Type##", '
                    "handleEvent);\n"
                    "  };\n"
                    "}, []);"
                ),
                "display_order": 2,
                "slots": [
                    {
                        "slot_label": "Message",
                        "slot_type": "log_message",
                        "slot_options": [
                            {
                                "option_text": "Window resized",
                                "display_order": 0,
                            },
                            {
                                "option_text": "User scrolled",
                                "display_order": 1,
                            },
                            {
                                "option_text": "Key pressed",
                                "display_order": 2,
                            },
                        ],
                    },
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
                                "option_text": "keydown",
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
                language=concept_data["language"],
                description=concept_data["description"],
            )

            for example_data in concept_data.get("examples", []):
                example = Example(
                    title=example_data["title"],
                    text=example_data.get("text"),
                    display_order=example_data.get(
                        "display_order", 0
                    ),
                )

                for slot_data in example_data.get("slots", []):
                    slot = ExampleSlot(
                        slot_label=slot_data["slot_label"],
                        slot_type=slot_data["slot_type"],
                    )

                    for option_data in slot_data.get(
                        "slot_options", []
                    ):
                        option = SlotOption(
                            option_text=option_data["option_text"],
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