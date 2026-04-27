from pydantic import BaseModel




class ExampleCreate(BaseModel):
  title: str
  text: str
  display_order: int = 0

class ExampleRead(
  ExampleCreate):
  id: int
  concept_id: int
  

class ExampleReadDown(
  ExampleCreate):
  id: int
  concept_id: int
  slots: list["ExampleSlotReadDown"]

  model_config = {"from_attributes": True}

class ExampleReadUp(
  ExampleCreate):
  id: int
  concept_id: int
  concept: "ConceptRead"

  model_config = {"from_attributes": True}

class ExampleUpdate(BaseModel):
  title: str | None = None
  text: str | None = None
  display_order: int | None = None

  model_config  = {"from_attributes": True}