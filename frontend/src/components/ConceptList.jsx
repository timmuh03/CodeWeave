import ExampleTitles from "./ExampleTitles"
import ConceptActions from "./ConceptActions"

export default function ConceptList({ 
  conceptsLight, conceptsFull, openedConcepts, 
  setConceptsLight, setConceptsFull, 
  onConceptTermClick, 
  openedExampleMenuConceptIds, setOpenedExampleMenuConceptIds,
  activeExampleIds, setActiveExampleIds,
  openedSlotMenuIds, setOpenedSlotMenuIds,
  activeSlotOptions, setActiveSlotOptions,
  onConceptDeleted, sortOrder,
  searchText,
}) {
  const filteredConcepts = conceptsLight.filter((concept) =>
    concept.term.toLowerCase().includes(searchText.toLowerCase())
    );
  
  const sortedConcepts = filteredConcepts.sort((a,b) =>
    sortOrder === "az"
    ? a.term.localeCompare(b.term)
    : b.term.localeCompare(a.term)
  );
  
  return (
    <section className="concept-list-section">
      <ul className="concept-list">
        {sortedConcepts.map((concept) => {
          const isOpen = openedConcepts.includes(concept.id);
          const fullConcept = conceptsFull[concept.id];
          const visibleExamples = (fullConcept?.examples ?? []).filter(
            (example) => example.title?.trim() || example.text?.trim()
          );

          const hasExamples = visibleExamples.length > 0;
      
          return (
          <li key={concept.id} className="concept-term">
            <div className="concept-term-arrow clickable"
              onClick={() => onConceptTermClick(concept.id)}
            >
              {concept.term?.trim() || `Untitled Concept`}
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
                {hasExamples && (
                  <ExampleTitles
                    examples={visibleExamples}
                    exampleConceptId={fullConcept.id}
                    openedExampleMenuConceptIds={openedExampleMenuConceptIds}
                    setOpenedExampleMenuConceptIds={setOpenedExampleMenuConceptIds}
                    activeExampleIds={activeExampleIds}
                    setActiveExampleIds={setActiveExampleIds}
                    activeSlotOptions={activeSlotOptions}
                    setActiveSlotOptions={setActiveSlotOptions}
                    openedSlotMenuIds={openedSlotMenuIds}
                    setOpenedSlotMenuIds={setOpenedSlotMenuIds}
                  />
                )}
                {
                  <ConceptActions 
                  conceptId={concept.id}
                  fullConcept={fullConcept}
                  onConceptDeleted={onConceptDeleted}
                  setConceptsLight={setConceptsLight}
                  setConceptsFull={setConceptsFull}
                  />
                }
              </div>
            )}
          </li>
          );
        })}
      </ul>
    </section>
  );
}