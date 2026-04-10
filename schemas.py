from pydantic import BaseModel

class NoteCreate(BaseModel):
  text: str