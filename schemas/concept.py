from pydantic import BaseModel, ConfigDict, Field



class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class ConceptCreate(AppSchema):
  term: str
  description: str
  language: str | None = None
  examples: list["ExampleCreate"] = Field(default_factory=list)

class ConceptReadDown(AppSchema):
  term: str
  language: str | None = None
  description: str
  id: int
  examples: list["ExampleReadDown"] = Field(default_factory=list)

class ConceptRead(AppSchema):
  term: str
  id: int
  description: str
  language: str | None = None

class ConceptUpdate(AppSchema):
  term: str | None = None
  description: str | None = None
  language: str | None = None

class ConceptUpdateFull(AppSchema):
  term: str
  description: str
  language: str
  examples: list["ExampleUpdateFull"] = Field(default_factory=list)