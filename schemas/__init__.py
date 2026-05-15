from schemas.concept import (
  ConceptCreate,
  ConceptRead,
  ConceptReadDown,
  ConceptUpdate,
  ConceptUpdateFull,
)
from schemas.example import (
  ExampleCreate,
  ExampleRead,
  ExampleReadDown,
  ExampleReadUp,
  ExampleUpdate,
  ExampleUpdateFull,
)
from schemas.example_slot import (
  ExampleSlotCreate,
  ExampleSlotReadDown,
  ExampleSlotReadUp,
  ExampleSlotUpdate,
  ExampleSlotUpdateFull,
)
from schemas.slot_option import (
  SlotOptionCreate,
  SlotOptionRead,
  SlotOptionReadUp,
  SlotOptionUpdate,
  SlotOptionUpdateFull,
)

models_to_rebuild = [
  ConceptCreate,
  ConceptRead,
  ConceptReadDown,
  ConceptUpdate,
  ConceptUpdateFull,

  ExampleCreate,
  ExampleRead,
  ExampleReadDown,
  ExampleReadUp,
  ExampleUpdate,
  ExampleUpdateFull,

  ExampleSlotCreate,
  ExampleSlotReadDown,
  ExampleSlotReadUp,
  ExampleSlotUpdate,
  ExampleSlotUpdateFull,

  SlotOptionCreate,
  SlotOptionRead,
  SlotOptionReadUp,
  SlotOptionUpdate,
  SlotOptionUpdateFull,
]

types_namespace = {
  model.__name__: model
  for model in models_to_rebuild
}

for model in models_to_rebuild:
  model.model_rebuild(_types_namespace=types_namespace)