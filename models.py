from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
  pass

class Concept(Base):
  __tablename__ = "concepts"
  
  id: Mapped[int] =  (
    mapped_column(primary_key=True))
  term: Mapped[str] = (
    mapped_column(unique=True))
  description: Mapped[str]
  example: Mapped[str | None]