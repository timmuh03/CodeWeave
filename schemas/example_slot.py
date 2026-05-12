from pydantic import BaseModel, ConfigDict, Field


class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class ExampleSlotCreate(AppSchema):
  slot_label: str
  slot_type: str
  slot_options: list["SlotOptionCreate"] = Field(default_factory=list)

class ExampleSlotReadDown(AppSchema):
  id: int
  example_id: int
  slot_label: str
  slot_type: str
  slot_options: list["SlotOptionRead"] = Field(default_factory=list)

class ExampleSlotReadUp(AppSchema):
  id: int
  example_id: int
  slot_label: str
  slot_type: str
  example: "ExampleReadUp"

class ExampleSlotUpdate(AppSchema):
  slot_label: str | None = None
  slot_type: str | None = None

class ExampleSlotUpdateFull(AppSchema):
  id: int | None = None
  slot_label: str
  slot_type: str
  slot_options: list["SlotOptionUpdateFull"] = Field(default_factory=list)