import logging

from fastapi import FastAPI
from fastapi.responses import RedirectResponse, FileResponse

from db import check_db_connection, engine
from models.base import Base
import routers

app = FastAPI()
app.include_router(routers.health_router)
app.include_router(routers.concept_router)
app.include_router(
  routers.example_template_router)
app.include_router(
  routers.example_slot_router)
app.include_router(
  routers.slot_option_router)

logging.basicConfig(level=logging.INFO)

Base.metadata.create_all(bind=engine)

SHOW_DOCS = True
SHOW_DOCS = False

@app.get("/", include_in_schema=False)
def read_root():
  if SHOW_DOCS:
    return RedirectResponse(url="/docs")
  return FileResponse(
    "templates/index.html")
  


@app.get("/app.js", include_in_schema=False)
def serve_js():
  return FileResponse(
    "static/app.js", 
    media_type="application/javascript"
  )
@app.get(
  "/styles.css",
  include_in_schema=False
)
def serve_css():
  return FileResponse(
    "static/styles.css",
    media_type="text/css"
  )

