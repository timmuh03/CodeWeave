from pydantic import BaseModel



class ConceptCreate(BaseModel):
  term: str
  description: str
  language: str | None = None

class ConceptReadDown(BaseModel):
  term: str
  description: str
  id: int
  examples: list["ExampleReadDown"]

  model_config = {"from_attributes": True}

class ConceptRead(BaseModel):
  term: str
  id: int
  description: str
  language: str | None = None

  model_config = {"from_attributes": True}

class ConceptUpdate(BaseModel):
  term: str | None = None
  description: str | None = None