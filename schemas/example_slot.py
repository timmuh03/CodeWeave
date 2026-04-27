from pydantic import BaseModel


class ExampleSlotCreate(BaseModel):
  slot_label: str
  slot_type: str

class ExampleSlotReadDown(
  ExampleSlotCreate):
  id: int
  example_id: int
  slot_options: list["SlotOptionRead"]

  model_config = {"from_attributes": True}

class ExampleSlotReadUp(ExampleSlotCreate):
  id: int
  example_id: int
  example: "ExampleReadUp"

  model_config = {"from_attributes": True}

class ExampleSlotUpdate(BaseModel):
  slot_label: str | None = None
  slot_type: str | None = None

  model_config = {"from_attributes": True}

