from pydantic import BaseModel, ConfigDict



class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class ConceptCreate(AppSchema):
  term: str
  description: str
  language: str | None = None

class ConceptReadDown(AppSchema):
  term: str
  description: str
  id: int
  examples: list["ExampleReadDown"]

class ConceptRead(AppSchema):
  term: str
  id: int
  description: str
  language: str | None = None

class ConceptUpdate(AppSchema):
  term: str | None = None
  description: str | None = None
  language: str | None = None