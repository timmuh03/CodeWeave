import { useEffect, useState, useRef } from "react";
import { fetchConcepts, fetchConcept } from "./api/concepts";
import ConceptList from "./components/ConceptList";
import ConceptEditor from "./components/ConceptEditor"
import Header from "./components/Header"

export default function App() {
  const [conceptsLight, setConceptsLight] = useState([]);
  const [conceptsFull, setConceptsFull] = useState({});
  const [openedConcepts, setOpenedConcepts] = useState([]);
  const [openedExampleMenuConceptIds, setOpenedExampleMenuConceptIds] = useState([]);
  const [activeExampleIds, setActiveExampleIds] = useState({});
  const [openedSlotMenuIds, setOpenedSlotMenuIds] = useState([]);
  const [activeSlotOptions, setActiveSlotOptions] = useState({});
  const [conceptEditorOpen, setConceptEditorOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("az");
  const [searchText, setSearchText] = useState("");


  const conceptQueueRef = useRef([]);
  const isLoadingRef = useRef(false);

  useEffect(() => {
    function closeSlotMenus() {
      setOpenedSlotMenuIds([]);
    }

    document.addEventListener("click", closeSlotMenus);

    return () => {
      document.removeEventListener("click", closeSlotMenus);
    };
  }, []);

  

  useEffect(() => {
    async function loadConceptList() {
      const list = await fetchConcepts();
      setConceptsLight(list);

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
    async function startQueue() {
      const list = await loadConceptList();

      conceptQueueRef.current = list.map((concept) => concept.id);
      loadConceptListDetails();
    }
    startQueue();
  }, []);

  function onConceptTermClick(conceptId) {
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

  function onConceptDeleted(conceptId) {
    setConceptsLight((concepts) =>
      concepts.filter((concept) =>
        conceptId !== concept.id
      )
    );

    setConceptsFull((concepts) => {
      const updatedConcepts = { ...concepts };
      delete updatedConcepts[conceptId];
      return updatedConcepts;
    });
  }

  return (
    <main className="app">
      <Header
        setSortOrder={setSortOrder}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ConceptList
        conceptsLight={conceptsLight}
        conceptsFull={conceptsFull}
        openedConcepts={openedConcepts}
        onConceptTermClick={onConceptTermClick}
        openedExampleMenuConceptIds={openedExampleMenuConceptIds}
        setOpenedExampleMenuConceptIds={setOpenedExampleMenuConceptIds}
        activeExampleIds={activeExampleIds}
        setActiveExampleIds={setActiveExampleIds}
        openedSlotMenuIds={openedSlotMenuIds}
        setOpenedSlotMenuIds={setOpenedSlotMenuIds}
        activeSlotOptions={activeSlotOptions}
        setActiveSlotOptions={setActiveSlotOptions}
        onConceptDeleted={onConceptDeleted}
        setConceptsLight={setConceptsLight}
        setConceptsFull={setConceptsFull}
        sortOrder={sortOrder}
        searchText={searchText}
      />
      <button
        className = "concept-create-btn"
        onClick={ ()=> setConceptEditorOpen(!conceptEditorOpen)}
      >
        +
      </button>
      { conceptEditorOpen && (
        <ConceptEditor
          conceptEditorOpen={conceptEditorOpen}
          setConceptEditorOpen={setConceptEditorOpen}
          setConceptsLight={setConceptsLight}
          setConceptsFull={setConceptsFull}
        />
      )}
    </main>
  );
}