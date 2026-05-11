import logging

from fastapi import (APIRouter, Depends,
  HTTPException, status)
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload
from fastapi.responses import FileResponse

from db import get_db
from models import Concept, Example, ExampleSlot, SlotOption
from schemas import (
  ConceptCreate,
  ConceptRead,
  ConceptReadDown,
  ConceptUpdate,
  ConceptUpdateFull,
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
    language=concept_data.language,
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

@router.post("/full",
  response_model=ConceptReadDown,
  status_code=status.HTTP_201_CREATED)
def create_concept_full(
  concept_data: ConceptCreate,
  db: Session = Depends(get_db)
):
  try:
    concept = Concept(
      term=concept_data.term,
      description=concept_data.description,
      language=concept_data.language,
    )
  
    db.add(concept)
    db.flush()
  
    for example_data in concept_data.examples:
      example = Example(
        title=example_data.title,
        text=example_data.text,
        display_order=example_data.display_order,
        concept_id=concept.id
      )
      db.add(example)
      db.flush()
      for slot_data in example_data.slots:
        slot = ExampleSlot(
          slot_label=slot_data.slot_label,
          slot_type=slot_data.slot_type,
          example_id=example.id
        )
        db.add(slot)
        db.flush()
        for option_data in slot_data.slot_options:
          option = SlotOption(
            option_text=option_data.option_text,
            display_order=option_data.display_order,
            slot_id=slot.id
          )
          db.add(option)
  
    db.commit()
    db.refresh(concept)
    return concept

  except Exception as e:
    db.rollback()
    raise

@router.get("/form", include_in_schema=False,
  status_code=status.HTTP_200_OK)
def create_concept_form():
  return FileResponse("templates/concept_form.html")

@router.get("/{concept_id}/form", include_in_schema=False,
  status_code=status.HTTP_200_OK)
def edit_concept_form():
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

@router.patch("/{concept_id}",
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

  if concept_update.description is not None:
    concept.description = concept_update.description

  if concept_update.language is not None:
    concept.language = concept_update.language

  db.commit()
  db.refresh(concept)

  return concept

@router.put("/{concept_id}/full",
  response_model=ConceptReadDown,
  status_code=status.HTTP_200_OK)
def update_concept_full(
  concept_id: int,
  concept_update: ConceptUpdateFull,
  db: Session = Depends(get_db)
):
  concept = db.scalar(select(Concept).where(Concept.id == concept_id)
    .options(selectinload(Concept.examples).selectinload(Example.slots).selectinload(ExampleSlot.slot_options)))

  if not concept:
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Concept not found")

  concept.term = concept_update.term
  concept.description = concept_update.description
  concept.language = concept_update.language

  existing_examples = {example.id: example for example in concept.examples}

  submitted_example_ids = set()

  for example_data in concept_update.examples:
    if example_data.id:
      submitted_example_ids.add(example_data.id)

      example = existing_examples.get(example_data.id)

      if not example:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
          detail=f"Example with id {example_data.id} not found")

      example.title = example_data.title
      example.text = example_data.text

      # update this example's slots

    else:
      new_example = Example(
        title=example_data.title,
        text=example_data.text,
        display_order=example_data.display_order,
        concept_id=concept.id
      )
      db.add(new_example)
      db.flush()

      # add new slots/options for this example
  
  for example_id, example in existing_examples.items():
    if example_id not in submitted_example_ids:
      db.delete(example)

  db.commit()
  db.refresh(concept)

  return concept