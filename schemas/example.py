from pydantic import BaseModel, ConfigDict



class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class ExampleCreate(AppSchema):
  title: str
  text: str
  display_order: int = 0

class ExampleRead(AppSchema):
  id: int
  concept_id: int
  title: str
  text: str
  display_order: int = 0

class ExampleReadDown(AppSchema):
  id: int
  concept_id: int
  title: str
  text: str
  display_order: int = 0
  
  slots: list["ExampleSlotReadDown"]

class ExampleReadUp(AppSchema):
  id: int
  concept_id: int
  title: str
  text: str
  display_order: int = 0
  concept: "ConceptRead"

class ExampleUpdate(AppSchema):
  title: str | None = None
  text: str | None = None
  display_order: int | None = None