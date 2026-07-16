import ExampleTitles from "./ExampleTitles"

export default function ConceptList({ 
  conceptsLight, conceptsFull, openedConcepts, 
  onConceptTermClick, 
  openedExampleMenuConceptIds, setOpenedExampleMenuConceptIds,
  activeExampleIds, setActiveExampleIds,
}) {
  return (
    <section className="concept-list-section">
      <ul className="concept-list">
        {conceptsLight.map((concept) => {
          const isOpen = openedConcepts.includes(concept.id);
          const fullConcept = conceptsFull[concept.id];
          const hasExamples = fullConcept?.examples?.length > 0;
    
          return (
          <li key={concept.id} className="concept-term">
            <div className="concept-term-arrow clickable"
              onClick={() => onConceptTermClick(concept.id)}
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
                {hasExamples && (
                  <ExampleTitles
                    examples={fullConcept.examples}
                    exampleConceptId={fullConcept.id}
                    openedExampleMenuConceptIds={openedExampleMenuConceptIds}
                    setOpenedExampleMenuConceptIds={setOpenedExampleMenuConceptIds}
                    activeExampleIds={activeExampleIds}
                    setActiveExampleIds={setActiveExampleIds}
                  />
                )}
              </div>
            )}
          </li>
          );
        })}
      </ul>
    </section>
  );
}