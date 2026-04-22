from pydantic import BaseModel




class ExampleTemplateCreate(BaseModel):
  title: str
  template_text: str
  display_order: int = 0

class ExampleTemplateRead(
  ExampleTemplateCreate):
  id: int
  concept_id: int
  

class ExampleTemplateReadDown(
  ExampleTemplateCreate):
  id: int
  concept_id: int
  slots: list["ExampleSlotReadDown"]

  model_config = {"from_attributes": True}

class ExampleTemplateReadUp(
  ExampleTemplateCreate):
  id: int
  concept_id: int
  concept: "ConceptRead"

  model_config = {"from_attributes": True}

class ExampleTemplateUpdate(BaseModel):
  title: str | None = None
  template_text: str | None = None
  display_order: int | None = None

  model_config  = {"from_attributes": True}