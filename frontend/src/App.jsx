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

    try {
      while (conceptQueueRef.current.length > 0) {
        const conceptId = conceptQueueRef.current.shift();
  
        if (conceptsFull[conceptId]) {
          continue;
        }
  
        await loadConceptDetails(conceptId);
      }
    } finally {
    isLoadingRef.current = false;
    }
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

  async function handleConceptTermClick(conceptId) {
    const isOpen = openedConcepts.includes(conceptId);

    if(isOpen) {
      setOpenedConcepts((currentIds) => 
        currentIds.filter((id) => id !== conceptId));
      return;
    }

    setOpenedConcepts((currentIds) => [...currentIds, conceptId]);

    moveToFront(conceptId);
  }

  function moveToFront(conceptId) {
    if (!conceptQueueRef.current.includes(conceptId)) {
      return;
    }
    conceptQueueRef.current = [
      conceptId,
      ...conceptQueueRef.current.filter((id) => id !== conceptId),
    ];
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
            <li key={concept.id} className="concept-term">
              <div className="concept-term-arrow"
                onClick={() => handleConceptTermClick(concept.id)}
              >
                {concept.term}
              </div>              
              {isOpen && (
                <div className="concept-details">
                  <div className="concept-description">
                    {fullConcept ? fullConcept.description : "Loading..."}
                  </div>
                  {fullConcept?.language && (
                    <div className="concept-language">
                      {fullConcept.language}
                    </div>
                  )}
                  {fullConcept?.examples && (
                    <div className="concept-examples">
                      {fullConcept.examples[0].title}
                    </div>
                  )}
                  {fullConcept?.examples && (
                    <div className="concept-examples">
                      {fullConcept.examples[0].text}
                    </div>
                  )}
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