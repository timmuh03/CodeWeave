from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import (Mapped,
  mapped_column, relationship)

from models.base import Base



class Example(Base):
  __tablename__ = "examples"

  id: Mapped[int] = (
    mapped_column(primary_key=True)
  )
  concept_id: Mapped[int] = (mapped_column(
    ForeignKey("concepts.id"))
  )
  title: Mapped[str] = (
    mapped_column(String(100))
  )
  text: Mapped[str | None] = (
    mapped_column(Text, nullable=True)
  )
  display_order: Mapped[int] = (
    mapped_column(default=0)
  )

  concept: Mapped["Concept"] = (
    relationship(
      back_populates="examples")
  )
  slots: Mapped[list[
    "ExampleSlot"]] = (relationship(
       back_populates="example",
       cascade="all, delete-orphan")
  )


