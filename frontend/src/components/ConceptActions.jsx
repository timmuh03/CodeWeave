import { useState } from "react"
import { deleteConcept } from "../api/concepts"

export default function ConceptActions({ 
  conceptId,
  onConceptDeleted,
}) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  async function deletePress() {
    try {
      await deleteConcept(conceptId);
      onConceptDeleted(conceptId);
      setDeleteOpen(false);
    } catch (error) {
      console.error("Failed to delete concept", error);
    }
  }
  return (
    <div>
      <button>Edit</button>
      <button onClick={() => setDeleteOpen(true)}>
        Delete
      </button>
      {deleteOpen && (
        <div>
          <p>Are you sure you want to delete this concept?</p>
          <button onClick={deletePress}>
            Yes
          </button>
          <button onClick={() => setDeleteOpen(false)}>
            No
          </button>
        </div>
      )}
    </div>
  );
}
