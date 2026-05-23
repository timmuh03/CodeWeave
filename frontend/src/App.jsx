import { useEffect, useState, useRef } from "react";
import {
  fetchConcepts,
  fetchConcept,
} from "./api/concepts";
import "./App.css";

 export default function App() {
  const [conceptsLight, setConcepts] = useState([]);
  const [openedConcepts, setOpenedConcepts] = useState([]);
  const [conceptsFull, setConceptsFull] = useState({});

  const conceptQueueRef = useRef([]);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    async function startQueue() {
      const list = await loadConceptList();

      conceptQueueRef.current = list.map((concept) => concept.id);
      loadConceptListDetails()
    }
    startQueue();
  }, []);

  async function loadConceptList() {
    const list = await fetchConcepts();
    setConcepts(list);

    return list;
  }

  async function loadConceptListDetails() {
    if (isLoadingRef.current) {
      return;
    }

    isLoadingRef.current = true;

    while (conceptQueueRef.current.length > 0) {
      const conceptId = conceptQueueRef.current.shift();

      if (conceptsFull[conceptId]) {
        continue;
      }

      await loadConceptDetails(conceptId);
    }

    isLoadingRef.current = false;
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
    try {
      const details = await fetchConcept(conceptId);
  
      setConceptsFull((currentConcepts) => ({
        ...currentConcepts,
        [conceptId]: details,
      }));
      return details;
    } catch (error) {
      console.error(`Failed to load concept details for ${conceptId}:`, error);
      return null;
    }
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