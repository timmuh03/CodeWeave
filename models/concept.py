from sqlalchemy import (ForeignKey, String, 
  Text)
from sqlalchemy.orm import (Mapped, 
  mapped_column, relationship)

from models.base import Base



class Concept(Base):
  __tablename__ = "concepts"

  id: Mapped[int] = (
    mapped_column(primary_key=True))
  term: Mapped[str] = (
    mapped_column(unique=True))
  description: Mapped[str] = (
    mapped_column(String(255))
  )
  language: Mapped[str | None] = (
    mapped_column(
      String(50),
      default="missing data"
    )
  )
  examples: Mapped[list["Example"]] = (
    relationship(back_populates="concept",
      cascade="all, delete-orphan")
  )