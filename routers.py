from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from db import get_db
from models import Concept
from schemas import ConceptCreate, ConceptRead


router = APIRouter()


@router.post(
  "/concepts", 
  response_model=ConceptRead
)
def create_concept(
  concept: ConceptCreate, 
  db: Session = Depends(get_db)
):
  db_concept = Concept (
    term=concept.term,
    description=concept.description,
    example=concept.example
  )

  
  db.add(db_concept)
  db.commit()
  db.refresh(db_concept)
  
  return db_concept

@router.get(
  "/concepts",
  response_model=list[ConceptRead]
)
def get_concepts(
  db: Session = Depends(get_db)
):
  concepts = (
    db.scalars(select(Concept)).all()
    )
  return concepts

@router.delete(
  "/concepts/{concept_id}",
  response_model=ConceptRead
)
def delete_concept(
  concept_id: int,
  db: Session = Depends(get_db)
):
  concept = db.scalars(
    select(Concept).where(
      Concept.id == concept_id)).first()

  if concept:
     db.delete(concept)
     db.commit()
     return concept