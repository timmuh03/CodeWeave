from fastapi.testclient import TestClient
from main import app
from copy import deepcopy
import pytest


def test_create_concept_basic(basic_concept):

  assert basic_concept.status_code == 201

  saved_concept = basic_concept.json()

  assert saved_concept["term"] == "Python Lists"
  assert saved_concept["description"] == "An ordered, mutable collection"
  assert saved_concept["language"] == "Python"
  assert saved_concept["examples"] == []
  assert isinstance(saved_concept["id"], int)


def test_create_concept_with_example():
  concept_data = {
    "term": "Python Loops",
    "description": "Repeating operations.",
    "language": "Python",
    "examples": [
      {
        "title": "For Loop",
        "text": "for x in range(5): print(x)",
        "display_order": 0,
        "slots": []
      }
    ]
  }

  with TestClient(app) as client:
    response = client.post("/concepts/full", json=concept_data)

  assert response.status_code == 201

  examples = response.json()["examples"]

  assert len(examples) == 1
  assert examples[0]["title"] == "For Loop"


def test_create_concept_with_slots():
  concept_data = {
    "term": "Python Loops",
    "description": "Repeating operations.",
    "language": "Python",
    "examples": [
      {
        "title": "For Loop",
        "text": "for x in range(##Count##): print(x)",
        "display_order": 0,
        "slots": [
          {
            "slot_label": "Count",
            "slot_type": "number",
            "slot_options": []
          }
        ]
      }
    ]
  }

  with TestClient(app) as client:
    response = client.post("/concepts/full", json=concept_data)

  assert response.status_code == 201

  slots = response.json()["examples"][0]["slots"]

  assert len(slots) == 1
  assert slots[0]["slot_label"] == "Count"


def test_create_concept_with_slot_options():
  concept_data = {
    "term": "Python Loops",
    "description": "Repeating operations.",
    "language": "Python",
    "examples": [
      {
        "title": "For Loop",
        "text": "for x in range(##Count##): print(x)",
        "display_order": 0,
        "slots": [
          {
            "slot_label": "Count",
            "slot_type": "number",
            "slot_options": [
              {
                "option_text": "5",
                "display_order": 0
              },
              {
                "option_text": "10",
                "display_order": 1
              }
            ]
          }
        ]
      }
    ]
  }

  with TestClient(app) as client:
    response = client.post("/concepts/full", json=concept_data)

  assert response.status_code == 201

  slots = response.json()["examples"][0]["slots"]

  assert len(slots) == 1
  assert slots[0]["slot_label"] == "Count"
  assert slots[0]["slot_options"][0]["option_text"] == "5"


def test_create_duplicate_concept():
  concept_data = {
    "term": "Python Loops",
    "description": "Repeating operations.",
    "language": "Python",
    "examples": []
  }

  with TestClient(app) as client:
    response = client.post("/concepts/full", json=concept_data)
    dup_response = client.post("/concepts/full", json=concept_data)

  assert dup_response.status_code == 409