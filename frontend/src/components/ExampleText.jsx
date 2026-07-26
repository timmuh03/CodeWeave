import { useRef, useState } from "react";

export default function ExampleText({
  example, 
  activeSlotOptions, setActiveSlotOptions,
  openedSlotMenuIds, setOpenedSlotMenuIds
}){
  const containerRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const exampleText = example.text || "No example text available";
  const slots = example?.slots || [];
  const parts = exampleText.split(/(##.*?##)/);

  function onSlotClick(event, slot) {
    event.stopPropagation();

    const slotRect = event.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    setMenuPosition({
      top: slotRect.top - containerRect.top,
      left: slotRect.left - containerRect.left,
    })
    
    setOpenedSlotMenuIds((currentIds) => {
      if (currentIds.includes(slot.id)) {
        return currentIds.filter((id) => id !== slot.id);
      }
      return [...currentIds, slot.id];
    });
  }

  const openSlot = slots.find((slot) => openedSlotMenuIds.includes(slot.id));
  // const slotMenuIsOpen = Boolean(openSlot);
    
  return(
    <div ref={containerRef} className="example-text-container">
      <pre className="example-text-scroller">
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
              <span key={`${slotLabel}-${index}`} className="slot-wrapper"
                onClick={(event) => onSlotClick(event, slot)}
              >
                <span className="example-slot">
                  {optionText}
                </span>
              </span>
            );
          })}
        </code>
      </pre>
      {openSlot && (
        <div className="slot-menu-overlay"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
          }}  
        >
          <ul className="slot-menu-list">
            {openSlot.slot_options.map((option) => 
              <li key={option.id} className="slot-menu-list-item">
                <p className="clickable">{option.option_text}</p>
              </li>
            )}
          </ul>
        </div>
        )}
    </div>
  )
}