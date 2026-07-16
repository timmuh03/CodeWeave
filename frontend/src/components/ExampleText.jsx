export default function ExampleText({example}){

  const exampleText = example.text || "No example text available";
  const slots = example?.slots || [];

  const parts = exampleText.split(/(##.*?##)/);

  return(
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
  )
}