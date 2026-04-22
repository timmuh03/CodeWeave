from pydantic import BaseModel



class SlotOptionCreate(BaseModel):
  option_text: str
  display_order: int = 0

class SlotOptionRead(SlotOptionCreate):
  id: int
  slot_id: int

  model_config = {"from_attributes": True}

class SlotOptionReadUp(SlotOptionCreate):
  id:  int
  slot_id: int
  slot: "ExampleSlotReadUp"

  model_config = {"from_attributes": True}

class SlotOptionUpdate(BaseModel):
  option_text: str | None = None
  display_order: int | None = None