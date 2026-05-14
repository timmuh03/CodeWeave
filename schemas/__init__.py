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

types_namespace = {
    "ConceptCreate": ConceptCreate,
    "ConceptRead": ConceptRead,
    "ConceptReadDown": ConceptReadDown,
    "ConceptUpdate": ConceptUpdate,
    "ConceptUpdateFull": ConceptUpdateFull,
    "ExampleCreate": ExampleCreate,
    "ExampleRead": ExampleRead,
    "ExampleReadDown": ExampleReadDown,
    "ExampleReadUp": ExampleReadUp,
    "ExampleUpdate": ExampleUpdate,
    "ExampleUpdateFull": ExampleUpdateFull,
    "ExampleSlotCreate": ExampleSlotCreate,
    "ExampleSlotReadDown": ExampleSlotReadDown,
    "ExampleSlotReadUp": ExampleSlotReadUp,
    "ExampleSlotUpdate": ExampleSlotUpdate,
    "ExampleSlotUpdateFull": ExampleSlotUpdateFull,
    "SlotOptionCreate": SlotOptionCreate,
    "SlotOptionRead": SlotOptionRead,
    "SlotOptionReadUp": SlotOptionReadUp,
    "SlotOptionUpdate": SlotOptionUpdate,
    "SlotOptionUpdateFull": SlotOptionUpdateFull,
}

ConceptReadDown.model_rebuild(_types_namespace=types_namespace)
ConceptUpdateFull.model_rebuild(_types_namespace=types_namespace)
ConceptCreate.model_rebuild(_types_namespace=types_namespace)
ConceptRead.model_rebuild(_types_namespace=types_namespace)

ExampleReadDown.model_rebuild(_types_namespace=types_namespace)
ExampleReadUp.model_rebuild(_types_namespace=types_namespace)
ExampleRead.model_rebuild(_types_namespace=types_namespace)
ExampleUpdateFull.model_rebuild(_types_namespace=types_namespace)

ExampleSlotReadDown.model_rebuild(_types_namespace=types_namespace)
ExampleSlotReadUp.model_rebuild(_types_namespace=types_namespace)
ExampleSlotUpdateFull.model_rebuild(_types_namespace=types_namespace)

SlotOptionRead.model_rebuild(_types_namespace=types_namespace)
SlotOptionReadUp.model_rebuild(_types_namespace=types_namespace)
SlotOptionUpdateFull.model_rebuild(_types_namespace=types_namespace)
