from pydantic import BaseModel

class ConceptCreate(BaseModel):
  term: str
  description: str
  example: str | None = None

class ConceptRead(ConceptCreate):
  id: int

  model_config = {"from_attributes":True}