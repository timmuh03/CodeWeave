from schemas import NoteCreate
from fastapi import APIRouter


router = APIRouter()


@router.post("/notes")
def create_note(note: NoteCreate):
  return {
    "message":"Note Created",
    "note": note.text,
  }
  