import logging

from fastapi import (APIRouter, Depends,
  HTTPException, status)
from sqlalchemy import select
from sqlalchemy.orm import Session

from db import get_db
from models.concept import Concept
from models.example import (
  Example)
from schemas import (
  ExampleCreate,
  ExampleRead,
  ExampleReadUp, 
  ExampleReadDown,
  ExampleUpdate)

logger = logging.getLogger(__name__)

router = APIRouter(
  tags=["Examples"])


@router.post("/concepts/{concept_id}/examples",
  response_model=ExampleRead,
  status_code=status.HTTP_201_CREATED)
def create_example(
  concept_id: int,
  example_data: ExampleCreate,
  db: Session = Depends(get_db),
):
  print("CREATE EXAMPLE ROUTE HIT")

  print("concept_id:", concept_id)

  print("example_data:", example_data)
  
  concept = db.scalar(
    select(Concept).where(
      Concept.id == concept_id))

  if not concept:
    raise HTTPException(
      status_code=status.
      HTTP_404_NOT_FOUND,
      detail="Concept not found",
    )

  example = Example(
    title=example_data.title,
    text=example_data.text,
    display_order=example_data.display_order,
    concept_id=concept_id,
  )

  db.add(example)
  db.commit()
  db.refresh(example)

  print("EXAMPLE CREATED:", example.id)

  print("RETURNING EXAMPLE")

  return {
      "id": example.id,
      "concept_id": example.concept_id,
      "title": example.title,
      "text": example.text,
      "display_order": example.display_order,
  }

@router.delete("/examples/{example_id}",
  status_code=status.HTTP_204_NO_CONTENT)
def delete_example(
  example_id: int,
  db: Session = Depends(get_db),
):
  example = db.scalar(select(
    Example).where(
      Example.id == example_id))

  if not example:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Example not found"
    )
    
  db.delete(example)
  db.commit()

@router.patch("/examples/{example_id}",
  response_model=ExampleReadUp,
  status_code=status.HTTP_200_OK)
def update_example(
  example_id: int,
  example_update: ExampleUpdate,
  db: Session = Depends(get_db),
):
  example = db.scalar(select(
    Example).where(
      Example.id == example_id)
  )

  if not example:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Example not found",
    )

  if example_update.title is not None:
    example.title = example_update.title
  if (
    example_update.text 
    is not None):
    example.text = (
      example_update.text)
  if (example_update.display_order
    is not None):
    example.display_order = (
      example_update.display_order)

  db.commit()
  db.refresh(example)
  
  return example

@router.get(
  "/concepts/{concept_id}/examples",
  response_model=list[
  ExampleReadDown],
  status_code=status.HTTP_200_OK)
def get_examples(
  concept_id: int,
  db: Session = Depends(get_db),
):
  concept = db.scalar(select(
    Concept).where(
    Concept.id == concept_id)
  )

  if not concept:
    raise HTTPException(
      status_code=(
      status.HTTP_404_NOT_FOUND),
      detail="Concept not found",
    )

  examples = db.scalars(select(
    Example).where(
    Example.concept_id ==
    concept_id)
  ).all()

  if not examples:
    logger.info("No examples found")
    
  return examples

  