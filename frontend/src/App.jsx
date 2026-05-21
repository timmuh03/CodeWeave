import { useEffect, useState } from "react";
import {
  fetchConcepts,
  fetchConcept,
  createFullConcept,
} from "./api/concepts";
import "./App.css";

function App() {
  const [conceptsLight, setConcepts] = useState([]);
  const [openedConcepts, setOpenedConcepts] = useState([]);
  const [conceptsFull, setConceptsFull] = useState({});

  useEffect(() => {
    loadConceptList();
  }, []);

  async function loadConceptList() {
    const list = await fetchConcepts();
    setConcepts(list);
  }

  async function handleConceptTermClick(conceptId) {
    const isOpen = openedConcepts.includes(conceptId);

    if(isOpen) {
      setOpenedConcepts((currentIds) => 
        currentIds.filter((id) => id !== conceptId));
      return;
    }

    setOpenedConcepts((currentIds) => [...currentIds, conceptId]);

    if (conceptsFull.conceptId) {
      return;
    }

    await loadConceptDetails(conceptId);
  }

  async function loadConceptDetails(conceptId) {
    const details = await fetchConcept(conceptId);

    setConceptsFull((currentConcepts) => ({
      ...currentConcepts,
      [conceptId]: details,
    }));
  }
  
  return (
    <main className="app">
      <header className="app-header">
        <h1>Concepts</h1>
      </header>
      <section className="concept-list-section">
        <ul className="concept-list">
          {conceptsLight.map((concept) => {
            const isOpen = openedConcepts.includes(concept.id);
            const fullConcept = conceptsFull[concept.id];
      
            return (
            <li key={concept.id} className="concept-term"
              onClick={() => handleConceptTermClick(concept.id)}
            >
              {concept.term}
              
              {isOpen && (
                <div className="concept-description">
                  {fullConcept ? fullConcept.description : "Loading..."}
                </div>
              )}
            </li>
            );
          })}
        </ul>
      </section>
    </main>
  )
}

export default App;