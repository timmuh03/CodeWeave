import os
import tempfile
from pathlib import Path
from fastapi.testclient import TestClient

test_directory = tempfile.TemporaryDirectory()

os.environ["DATABASE_URL"] = (
  f"sqlite:///{Path(test_directory.name) / 'test.db'}"
)

import pytest
from db import engine
from models.base import Base
from main import app
import models

@pytest.fixture(autouse=True)
def clean_test_db():

  assert (
    Path(engine.url.database).resolve().parent
    == Path(test_directory.name).resolve()
  )

  Base.metadata.drop_all(bind=engine)
  Base.metadata.create_all(bind=engine)

  yield


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
