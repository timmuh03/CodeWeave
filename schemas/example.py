from pydantic import BaseModel, ConfigDict, Field



class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class ExampleCreate(AppSchema):
  title: str
  text: str
  display_order: int | None = None
  slots: list["ExampleSlotCreate"] = Field(default_factory=list)

class ExampleRead(AppSchema):
  id: int
  concept_id: int
  title: str
  text: str
  display_order: int

class ExampleReadDown(AppSchema):
  id: int
  concept_id: int
  title: str
  text: str
  display_order: int
  
  slots: list["ExampleSlotReadDown"] = Field(default_factory=list)
class ExampleReadUp(AppSchema):
  id: int
  concept_id: int
  title: str
  text: str
  display_order: int

class ExampleUpdate(AppSchema):
  title: str | None = None
  text: str | None = None
  display_order: int | None = None

class ExampleUpdateFull(AppSchema):
  id: int | None = None
  title: str
  text: str
  display_order: int | None = None
  slots: list["ExampleSlotUpdateFull"] = Field(default_factory=list)