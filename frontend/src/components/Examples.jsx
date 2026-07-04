export default function Examples({
  examples, exampleConceptId, 
  openedExampleMenuConceptIds, setOpenedExampleMenuConceptIds, 
  activeExampleIds, setActiveExampleIds,
}) {
  const example = activeExampleIds[exampleConceptId] || examples[0];

  const exampleText = example.text;
  const slots = example.slots;

  const parts = exampleText.split(/(##.*?##)/);

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
      
      <pre>
      <code className="example-text">
        {parts.map((part, index) => {
          const isSlot = part.startsWith("##") && part.endsWith("##");

          if (!isSlot) {
            return <span key={index}>{part}</span>
          }

          const slotLabel = part.slice(2, -2);

          const slot = slots.find((slot) => slot.slot_label === slotLabel);

          const optionText = slot?.slot_options?.[0]?.option_text || slotLabel;

          return (
            <span key={`${slotLabel}-${index}`} className="example-slot clickable"
              onClick={(event) => {
                event.stopPropagation();
                onSlotClick(slot?.slot_options)}
              }
            >
              {optionText}
            </span>  
          );
        })}
      </code>
      </pre>
    </div>
  );
}