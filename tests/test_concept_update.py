from fastapi.testclient import TestClient
from main import app
from copy import deepcopy
import pytest


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

  saved_concept = response.json()

  assert response.status_code == 200
  assert saved_concept["description"] == "foobar"
  assert saved_concept["term"] == full_concept["term"]
  assert saved_concept["language"] == full_concept["language"]
  assert saved_concept["examples"] == full_concept["examples"]
  

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


def test_add_example_to_concept(basic_concept):
  update_payload = deepcopy(basic_concept)
  update_payload["examples"] = [{
    "title": "Test example title",
    "text": "Test example text",
    "slots": []
  }]

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{basic_concept['id']}/full",
      json=update_payload
    )
    get_response = client.get(
      f"/concepts/{basic_concept['id']}"
    )
    
  assert response.status_code == 200
  assert response.json()["examples"][0]["title"] == "Test example title"
  assert get_response.json()["examples"][0]["title"] == "Test example title"
    


def test_add_slot_to_example(full_concept):
  update_payload = deepcopy(full_concept)
  update_payload["examples"][0]["slots"].append({
    "slot_label": "foo",
    "slot_type": "bar",
    "slot_options": []
  })

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{full_concept['id']}/full",
      json=update_payload
    )
    get_response = client.get(
      f"/concepts/{full_concept['id']}"
    )
    get_json = get_response.json()

  slots = get_json["examples"][0]["slots"]

  assert get_response.status_code == 200
  assert response.status_code == 200
  assert len(slots) == 2
  assert {slot["slot_label"] for slot in slots} == {"Count", "foo"}


def test_update_non_existent_concept(basic_concept):
  with TestClient(app) as client:
    response = client.put(
      "/concepts/9999999/full",
      json=basic_concept
    )

  assert response.status_code == 404


def test_update_concept_with_duplicate_name(basic_concept, full_concept):
  update_payload = {
    "term": full_concept["term"],
    "description": "An ordered, mutable collection",
    "language": "Python",
    "examples": []
  }

  with TestClient(app) as client:
    response = client.put(
      f"/concepts/{basic_concept['id']}/full",
      json=update_payload
    )

  assert response.status_code == 409
  