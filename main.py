from fastapi import FastAPI
from fastapi.responses import RedirectResponse, FileResponse

from db import check_db_connection, engine
from routers import router as notes_router
from models import Base

app = FastAPI()

Base.metadata.create_all(bind=engine)

@app.get("/", include_in_schema=False)
def read_root():
  return FileResponse("index.html")
  # return RedirectResponse(url="/docs")

@app.get("/health")
def health_check():
  return {"status": "ok"}

@app.get("/health/db")
def db_health_check():
  db_ok = check_db_connection()

  if db_ok:
    return {
      "status": "ok",
      "database": "connected"
    }

  return {
    "status": "error",
    "database": "not connected"
  }

app.include_router(notes_router)