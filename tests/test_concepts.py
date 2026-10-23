from fastapi.testclient import TestClient
from main import app
from copy import deepcopy
import pytest


@pytest.fixture
def basic_concept():
  concept_data = {
    "term": "Python Lists",
    "description": "An ordered, mutable collection",
    "language": "Python",
    "examples": []
  }

  with TestClient(app) as client:
    response = client.post("/concepts/full", json=concept_data)

  return response


@pytest.fixture
def full_concept():
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
    return response.json()


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


def test_get_concept_by_id(basic_concept):
  with TestClient(app) as client:
    get_response = client.get(
      f"/concepts/{basic_concept.json()['id']}"
    )

  assert get_response.status_code == 200
  assert get_response.json()["term"] == "Python Lists"


def test_get_concepts(basic_concept):
  with TestClient(app) as client:
    response = client.get("/concepts/")

    assert response.status_code == 200
    assert response.json()[0]["term"] == "Python Lists"


def test_edit_concept_name(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["term"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 200
  assert response.json()["term"] == "foobar"


def test_edit_concept_description(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["description"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 200
  assert response.json()["description"] == "foobar"


def test_edit_concept_language(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["language"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

    assert response.status_code == 200
    assert response.json()["language"] == "foobar"


def test_edit_example_title(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["examples"][0]["title"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

    assert response.status_code == 200
    assert response.json()["examples"][0]["title"] == "foobar"


def test_edit_example_text(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["examples"][0]["text"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 200
  assert response.json()["examples"][0]["text"] == "foobar"


def test_edit_slot_label(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["examples"][0]["slots"][0]["slot_label"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 200
  assert response.json()["examples"][0]["slots"][0]["slot_label"] == "foobar"


def test_edit_slot_type(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["examples"][0]["slots"][0]["slot_type"] = "foobar"

  with  TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 200
  assert response.json()["examples"][0]["slots"][0]["slot_type"] == "foobar"


def test_edit_option_text(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["examples"][0]["slots"][0]["slot_options"][0]["option_text"] = "foobar"

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 200
  assert response.json()["examples"][0]["slots"][0]["slot_options"][0]["option_text"] == "foobar"


def test_delete_concept(basic_concept):
  with TestClient(app) as client:
    response = client.delete(f"/concepts/{basic_concept.json()['id']}")

    get_response = client.get(f"/concepts/{basic_concept.json()['id']}")

    assert response.status_code == 204
    assert get_response.status_code == 404




  
