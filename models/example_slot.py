from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import (Mapped,
  mapped_column, relationship)

from models.base import Base



class ExampleSlot(Base):
  __tablename__ = "example_slots"

  id: Mapped[int] = (
    mapped_column(primary_key=True)
  )
  example_id: Mapped[int] = (
    mapped_column(ForeignKey(
                  "examples.id"))
  )
  slot_label: Mapped[str] = (
    mapped_column(String(50))
  )
  slot_type: Mapped[str] = (
    mapped_column(String(50))
  )

  example: Mapped["Example"] = (
    relationship(back_populates="slots")
  )
  slot_options: Mapped[list[
    "SlotOption"]] = (relationship(
    back_populates="slot", 
    cascade="all, delete-orphan")
  )