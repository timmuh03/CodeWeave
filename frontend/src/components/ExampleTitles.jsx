import ExampleText from "./ExampleText"

export default function ExampleTitles({
  examples, exampleConceptId, 
  openedExampleMenuConceptIds, setOpenedExampleMenuConceptIds, 
  activeExampleIds, setActiveExampleIds,
}) {
  const example = activeExampleIds[exampleConceptId] || examples[0];

  const exampleMenuIsOpen = openedExampleMenuConceptIds.includes(exampleConceptId)
  function onExampleTitleClick(event) {
    event.stopPropagation();

    setOpenedExampleMenuConceptIds((currentIds) => {
      if (currentIds.includes(exampleConceptId)) {
        return currentIds.filter((id) => id !== exampleConceptId);
      }
      return [...currentIds, exampleConceptId];
    });
  }

  function handleExampleSelect(event, example) {
    event.stopPropagation();
    setActiveExampleIds((currentIds) => ({
      ...currentIds,
        [exampleConceptId]: example,
    }));
    
    setOpenedExampleMenuConceptIds((currentIds) => {
      return currentIds.filter((id) => id !== exampleConceptId);
    });
  }
  return (
    <div className="example">
      <div className="example-title"
        onClick={onExampleTitleClick}
      >
        {example.title}
      </div>

      {exampleMenuIsOpen &&
        <div>
          <ul className="example-title-list">
            {examples.map((example) => (
              <li key={example.id} className="example-title-list-item"
                onClick={(event) => handleExampleSelect(event, example)}>
                {example.title}
              </li>
            ))}
          </ul>
        </div>
      }
      
      <ExampleText 
        example={example}
      />
    </div>
  );
}