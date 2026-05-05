import logging

from fastapi import (APIRouter, Depends,
  HTTPException, status)
from sqlalchemy import select
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse

from db import get_db
from models.concept import Concept
from models.example import (
  Example)
from schemas import (
  ConceptCreate,
  ConceptRead,
  ConceptReadDown,
  ConceptUpdate,
  ExampleCreate,
  ExampleReadDown)

router = APIRouter(
  prefix="/concepts",
  tags=["Concepts"])

logger = logging.getLogger(__name__)

@router.post(
  "/", 
  response_model=ConceptRead,
  status_code=status.HTTP_201_CREATED
)
def create_concept(
  concept_data: ConceptCreate, 
  db: Session = Depends(get_db)
):
  concept = Concept(
    term=concept_data.term,
    description=concept_data.description,
  )

  if not concept.term or (
    not concept.description):
    raise HTTPException(
      status_code=(
      status.HTTP_400_BAD_REQUEST),
      detail="Missing term or description"
    )
  
  db.add(concept)
  db.commit()
  db.refresh(concept)
  
  return concept

@router.get("/form", include_in_schema=False,
  status_code=status.HTTP_200_OK)
def get_concept_form():
  return FileResponse("templates/concept_form.html")

@router.get(
  "/",
  response_model=list[ConceptRead],
  status_code=status.HTTP_200_OK
)
def get_concepts(
  db: Session = Depends(get_db)
):
  concepts = (
    db.scalars(select(Concept)).all()
    )

  if not concepts:
    logger.info("No concepts found")
    
  return concepts

@router.get(
  "/{concept_id}",
  response_model=ConceptReadDown,
  status_code=status.HTTP_200_OK
)
def get_concept(
  concept_id: int,
  db: Session = Depends(get_db)
):
  concept = db.scalar(
    select(Concept).where(
      Concept.id == concept_id)
  )
  
  if not concept:
    raise HTTPException(
      status_code=status.
      HTTP_404_NOT_FOUND,
      detail="Concept not found"
    )

  return concept

@router.delete(
  "/{concept_id}",
  status_code=status.HTTP_204_NO_CONTENT
)
def delete_concept(
  concept_id: int,
  db: Session = Depends(get_db)
):
  concept = db.scalar(
    select(Concept).where(
      Concept.id == concept_id))
  if not concept:
    raise HTTPException(
      status_code=status.
      HTTP_404_NOT_FOUND,
      detail="Concept not found"
    )

  db.delete(concept)
  db.commit()

@router.patch(
  "/{concept_id}",
  response_model=ConceptRead,
  status_code=status.HTTP_200_OK)
def update_concept(
  concept_id: int,
  concept_update: ConceptUpdate,
  db: Session = Depends(get_db)
):
  concept = db.scalar(
    select(Concept).where(
      Concept.id == concept_id))
  
  if not concept:
    raise HTTPException(
      status_code=status.
      HTTP_404_NOT_FOUND,
      detail="Concept not found")

  if concept_update.term is not None:
    concept.term = concept_update.term

  if (
    concept_update.description
    is not None):
    concept.description = (
      concept_update.description)

  db.commit()
  db.refresh(concept)

  return concept