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
}) {
  const sortedConcepts = [...conceptsLight].sort((a,b) =>
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
          const hasExamples = fullConcept?.examples?.length > 0;

          console.log(
            "Empty concepts:",
            sortedConcepts.filter((concept) => !concept.term?.trim())
          );
    
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
                    examples={fullConcept.examples}
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