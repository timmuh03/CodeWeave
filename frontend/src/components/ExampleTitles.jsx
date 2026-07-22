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
      <div className="example-title clickable"
        onClick={onExampleTitleClick}
      >
        {example.title}
      </div>

      {exampleMenuIsOpen &&
        <div>
          <ul className="example-title-list">
            {examples.filter((menuExample) => menuExample.id !== example.id)
              .map((example) => (
              <li key={example.id} className="example-title-list-item">
                <div className="example-title-list-item clickable"
                  onClick={(event) => handleExampleSelect(event, example)}
                >
                  {example.title}
                </div>
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