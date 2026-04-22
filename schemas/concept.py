from pydantic import BaseModel



class ConceptCreate(BaseModel):
  term: str
  description: str

class ConceptReadDown(BaseModel):
  term: str
  description: str
  id: int
  examples: list["ExampleTemplateReadDown"]

  model_config = {"from_attributes": True}

class ConceptRead(BaseModel):
  term: str
  id: int

  model_config = {"from_attributes": True}

class ConceptUpdate(BaseModel):
  term: str | None = None
  description: str | None = None