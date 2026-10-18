import os
import tempfile
from pathlib import Path

test_directory = tempfile.TemporaryDirectory()

os.environ["DATABASE_URL"] = (
  f"sqlite:///{Path(test_directory.name) / 'test.db'}"
)


import pytest
from db import engine
from models.base import Base
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