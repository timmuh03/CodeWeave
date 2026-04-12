from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from db import get_db
from models import Note
from schemas import NoteCreate, NoteRead


router = APIRouter()


@router.post(
  "/notes", 
  response_model=NoteRead
)
def create_note(
  note: NoteCreate, 
  db: Session = Depends(get_db)
):
  db_note = Note(text=note.text)
  
  db.add(db_note)
  db.commit()
  db.refresh(db_note)
  
  return db_note

@router.get(
  "/notes",
  response_model=list[NoteRead]
)
def get_notes(
  db: Session = Depends(get_db)
):
   notes = db.scalars(select(Note)).all()
   return notes

@router.delete(
  "/notes/{note_id}",
  response_model=NoteRead
)
def delete_note(
  note_id: int,
  db: Session = Depends(get_db)
):
   note = db.scalars(select(Note).where(Note.id == note_id)).first()

   if note:
     db.delete(note)
     db.commit()
     return note