from fastapi import FastAPI
from db import check_db_connection
from routers import router as notes_router

app = FastAPI()

@app.get("/")
def read_root():
  return {"message": "Edited in Replit!"}

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