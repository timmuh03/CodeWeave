from pydantic import BaseModel

class NoteCreate(BaseModel):
  text: str

class NoteRead(BaseModel):
  id: int
  text: str

  model_config = {"from_attributes":True}