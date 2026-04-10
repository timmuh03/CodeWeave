from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

class Base(DeclarativeBase):
  pass

class Note(Base):
  __tablename__ = "notes"
  
  id: Mapped[int] =  mapped_column(primary_key=True)
  text: Mapped[str]