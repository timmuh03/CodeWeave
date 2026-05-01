import os
from dotenv import load_dotenv
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(
  DATABASE_URL,
  connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
  autocommit=False,
  autoflush=False,
  bind=engine
)

def check_db_connection() -> bool:
  try:
    with engine.connect() as connection:
      connection.execute(text("SELECT 1"))
    return True
  except Exception:
    return False

def get_db():
   db = SessionLocal()
   try:
     yield db
   finally:
     db.close()