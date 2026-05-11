from pydantic import BaseModel, ConfigDict



class AppSchema(BaseModel):
  model_config = ConfigDict(from_attributes=True)

class SlotOptionCreate(AppSchema):
  option_text: str
  display_order: int = 0

class SlotOptionRead(AppSchema):
  id: int
  slot_id: int
  option_text: str
  display_order: int = 0

class SlotOptionReadUp(AppSchema):
  id:  int
  slot_id: int
  option_text: str
  display_order: int = 0
  slot: "ExampleSlotReadUp"

class SlotOptionUpdate(AppSchema):
  option_text: str | None = None
  display_order: int | None = None

class SlotOptionUpdateFull(AppSchema):
   id: int | None = None
   option_text: str
   display_order: int = 0