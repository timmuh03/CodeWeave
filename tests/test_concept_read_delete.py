from fastapi.testclient import TestClient
from main import app
from copy import deepcopy
import pytest


def test_get_concept_by_id(basic_concept):
  with TestClient(app) as client:
    get_response = client.get(
      f"/concepts/{basic_concept['id']}"
    )

  assert get_response.status_code == 200
  assert get_response.json()["term"] == "Python Lists"


def test_get_concepts(basic_concept):
  with TestClient(app) as client:
    response = client.get("/concepts/")

    assert response.status_code == 200
    assert response.json()[0]["term"] == "Python Lists"


def test_delete_concept(basic_concept):
  with TestClient(app) as client:
    response = client.delete(f"/concepts/{basic_concept['id']}")

    get_response = client.get(f"/concepts/{basic_concept['id']}")

    assert response.status_code == 204
    assert get_response.status_code == 404


def test_delete_example_from_concept(full_concept):
  payload = deepcopy(full_concept)
  payload["examples"] = []

  with TestClient(app) as client:
    response = client.put(f"/concepts/{full_concept['id']}/full", json=payload)

    get_response = client.get(f"/concepts/{full_concept['id']}")

  assert response.status_code == 200
  assert get_response.status_code == 200
  assert get_response.json()["examples"] == []
