import logging

from fastapi import (APIRouter, Depends,
  HTTPException, status)
from sqlalchemy import select
from sqlalchemy.orm import Session

from db import get_db
from models.example_slot import (
  ExampleSlot)
from models.example import (
  Example)
from schemas import (
  ExampleSlotCreate,
  ExampleSlotReadUp, 
  ExampleSlotReadDown,
  ExampleSlotUpdate)

logger = logging.getLogger(__name__)

router = APIRouter(
  tags=["Example Slots"])

@router.post("/examples/{example_id}/"
  "slots",
  response_model=ExampleSlotReadUp,
  status_code=status.HTTP_201_CREATED)
def create_example_slot(
  example_id: int,
  slot_data: ExampleSlotCreate,
  db: Session = Depends(get_db),
):
  example = db.scalar(select(
    Example).where(
      Example.id == example_id)
  )

  if not example:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Example not found")
  
  slot = ExampleSlot(
    slot_label=slot_data.slot_label,
    slot_type=slot_data.slot_type,
    example_id=example_id,
  )

  db.add(slot)
  db.commit()
  db.refresh(slot)

  return slot 

@router.delete("/slots/{slot_id}",
  status_code=status.HTTP_204_NO_CONTENT)
def delete_example_slot(
  slot_id: int,
  db: Session = Depends(get_db),
):
  slot = db.scalar(select(
    ExampleSlot).where(
      ExampleSlot.id == slot_id)
  )

  if not slot:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Slot not found")

  db.delete(slot)
  db.commit()

@router.patch("/slots/{slot_id}",
  response_model=ExampleSlotReadUp,
  status_code=status.HTTP_200_OK)
def update_example_slot(
  slot_id: int,
  slot_update: ExampleSlotUpdate,
  db: Session = Depends(get_db),
):
  slot = db.scalar(select(
    ExampleSlot).where(
      ExampleSlot.id == slot_id)
  )

  if not slot:
    raise HTTPException(
      status_code=status.HTTP_404_NOT_FOUND,
      detail="Slot not found")

  if slot_update.slot_label is not None:
    slot.slot_label = slot_update.slot_label
  if slot_update.slot_type is not None:
    slot.slot_type = slot_update.slot_type
  
  db.commit()
  db.refresh(slot)

  return slot

@router.get("/examples/{example_id}/slots",
  response_model=list[
  ExampleSlotReadDown],
  status_code=status.HTTP_200_OK,
)
def get_example_slots(
  example_id: int,
  db: Session = Depends(get_db),
):
  example = db.scalar(select(
    Example).where(
    Example.id == example_id)
  )

  if not example:
    raise HTTPException(
      status_code=(
        status.HTTP_404_NOT_FOUND),
      detail="Example not found"
    )

  slots = db.scalars(select(
    ExampleSlot).where(
    ExampleSlot.example_id == example_id)
  ).all()

  if not slots:
    logger.info("No slots found")

  return slots