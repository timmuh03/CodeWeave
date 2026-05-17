import logging
import os

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import (
RedirectResponse, FileResponse)

from db import engine
from models.base import Base
import routers

app = FastAPI()
app.include_router(routers.health_router)
app.include_router(routers.concept_router)
app.include_router(
  routers.example_router)
app.include_router(
  routers.example_slot_router)
app.include_router(
  routers.slot_option_router)

app.mount(
  "/static",
  StaticFiles(directory="static"),
  name="static"
)

logging.basicConfig(level=logging.INFO)

Base.metadata.create_all(bind=engine)

SHOW_DOCS = False
# SHOW_DOCS = True

@app.get("/", include_in_schema=False)
def read_root():
  if SHOW_DOCS:
    return RedirectResponse(url="/docs")

  site = os.environ['START_PAGE']
  # site = os.environ["CONCEPT_PAGE"]
  return FileResponse(site)