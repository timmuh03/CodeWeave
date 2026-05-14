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
  )

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

  except Exception:
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
      example.display_order = example_data.display_order

      existing_slots = {slot.id: slot for slot in example.slots}
      submitted_slot_ids = set()

      for slot_data in example_data.slots:
        if slot_data.id:
          submitted_slot_ids.add(slot_data.id)
          slot = existing_slots.get(slot_data.id)

          if not slot:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
              detail=f"Slot with id {slot_data.id} not found")

          slot.slot_label = slot_data.slot_label
          slot.slot_type = slot_data.slot_type
          
          existing_options = {option.id: option for option in slot.slot_options}
          submitted_option_ids = set()
  
          for option_data in slot_data.slot_options:
            if option_data.id:
              submitted_option_ids.add(option_data.id)
              option = existing_options.get(option_data.id)
  
              if not option:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                  detail=f"Option with id {option_data.id} not found")
  
              option.option_text = option_data.option_text
              option.display_order = option_data.display_order
  
            else:
              new_option = SlotOption(
                option_text=option_data.option_text,
                display_order=option_data.display_order,
                slot_id=slot.id
              )
              db.add(new_option)
              db.flush()

          for option_id, option in existing_options.items():
            if option_id not in submitted_option_ids:
              db.delete(option)

        else:
          new_slot = ExampleSlot(
            slot_label=slot_data.slot_label,
            slot_type=slot_data.slot_type,
            example_id=example.id
          )
          db.add(new_slot)
          db.flush()

          for option_data in slot_data.slot_options:
            new_option = SlotOption(
              option_text=option_data.option_text,
              display_order=option_data.display_order,
              slot_id=new_slot.id
            )
            db.add(new_option)
            db.flush()

      for slot_id, slot in existing_slots.items():
        if slot_id not in submitted_slot_ids:
          db.delete(slot)

    else:
      new_example = Example(
        title=example_data.title,
        text=example_data.text,
        display_order=example_data.display_order,
        concept_id=concept.id
      )
      db.add(new_example)
      db.flush()

      for slot_data in example_data.slots:
        new_slot = ExampleSlot(
          slot_label=slot_data.slot_label,
          slot_type=slot_data.slot_type,
          example_id=new_example.id
        )
        db.add(new_slot)
        db.flush()

        for option_data in slot_data.slot_options:
          new_option = SlotOption(
            option_text=option_data.option_text,
            display_order=option_data.display_order,
            slot_id=new_slot.id
          )
          db.add(new_option)
          db.flush()
  
  for example_id, example in existing_examples.items():
    if example_id not in submitted_example_ids:
      db.delete(example)

  try:
    db.commit()
    update_concept = db.scalar(select(Concept).where(Concept.id == concept_id)
      .options(
      selectinload(Concept.examples)
      .selectinload(Example.slots)
      .selectinload(ExampleSlot.slot_options)
      )
    )

  except Exception as e:
    db.rollback()
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
      detail=f"An error occurred: {str(e)}")

  return concept