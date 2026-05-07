from pydantic import BaseModel, ConfigDict


class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class ExampleSlotCreate(AppSchema):
  slot_label: str
  slot_type: str

class ExampleSlotReadDown(AppSchema):
  id: int
  example_id: int
  slot_label: str
  slot_type: str
  slot_options: list["SlotOptionRead"]

class ExampleSlotReadUp(AppSchema):
  id: int
  example_id: int
  slot_label: str
  slot_type: str
  example: "ExampleReadUp"

class ExampleSlotUpdate(AppSchema):
  slot_label: str | None = None
  slot_type: str | None = None

