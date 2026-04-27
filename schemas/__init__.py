from schemas.concept import (
  ConceptCreate, 
  ConceptRead, 
  ConceptReadDown, 
  ConceptUpdate)
from schemas.example import (
  ExampleCreate, 
  ExampleReadDown, 
  ExampleReadUp, 
  ExampleUpdate)
from schemas.example_slot import (
  ExampleSlotCreate, 
  ExampleSlotReadDown, 
  ExampleSlotReadUp, 
  ExampleSlotUpdate)
from schemas.slot_option import (
  SlotOptionCreate, 
  SlotOptionRead, 
  SlotOptionReadUp, 
  SlotOptionUpdate)

ConceptReadDown.model_rebuild()
ExampleReadDown.model_rebuild()
ExampleSlotReadDown.model_rebuild()
SlotOptionRead.model_rebuild()
ConceptRead.model_rebuild()
ExampleReadUp.model_rebuild()
ExampleSlotReadUp.model_rebuild()
SlotOptionReadUp.model_rebuild()