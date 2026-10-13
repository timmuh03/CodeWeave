import { useState } from "react"
import { deleteConcept } from "../api/concepts"

export default function ConceptActions({ conceptId }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  
  async function deletePress() {
    await deleteConcept(conceptId);
    
    
    setDeleteOpen(false);
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
