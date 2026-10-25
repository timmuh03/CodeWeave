from fastapi.testclient import TestClient
from main import app
from copy import deepcopy
import pytest


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


def test_delete_concept(basic_concept):
  with TestClient(app) as client:
    response = client.delete(f"/concepts/{basic_concept.json()['id']}")

    get_response = client.get(f"/concepts/{basic_concept.json()['id']}")

    assert response.status_code == 204
    assert get_response.status_code == 404
