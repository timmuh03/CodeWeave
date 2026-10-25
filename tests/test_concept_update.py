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

    assert response.status_code == 200
    assert response.json()["examples"][0]["title"]