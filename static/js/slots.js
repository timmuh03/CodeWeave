export function loadSlots(
  templateText,
  slots
) {
  const shell =
    document.createElement("pre");
  shell.className = "example-btn-preview";

  if (!templateText || !slots) {
    shell.textContent =
      templateText || "No template text";
    return shell;
  }

  const parts =
    templateText.split(/(##.*?##)/);

  for (const part of parts) {
    const isSlot =
      part.startsWith("##") &&
      part.endsWith("##");

    if (isSlot) {
      const slotLabel =
        part.slice(2, -2);

      const slot = slots.find(
        (slot) =>
          slot.slot_label === slotLabel
      );

      if (!slot) {
        const missingSlot =
          document.createElement("span");
        missingSlot.textContent =
          `[Missing slot: ${slotLabel}]`;
        shell.appendChild(missingSlot);
        continue;
      }

      const slotElement =
        createSlotElement(slot);

      shell.appendChild(slotElement);
    } else {
      shell.appendChild(
        document.createTextNode(part)
      );
    }
  }

  return shell;
}

function createSlotElement(slot) {
  const slotShell =
    document.createElement("span");
  slotShell.className = "slot-shell";

  const selectedBtn =
    document.createElement("button");
  selectedBtn.className = "slot-btn";
  selectedBtn.type = "button";

  const defaultText =
    slot.slot_options?.[0]?.option_text ||
    slot.slot_label;

  selectedBtn.textContent = defaultText;

  const optionsMenu =
    document.createElement("span");
  optionsMenu.className =
    "slot-options-menu";

  if (
    !slot.slot_options ||
    slot.slot_options.length === 0
  ) {
    const emptyOption =
      document.createElement("button");
    emptyOption.className =
      "slot-option-btn";
    emptyOption.type = "button";
    emptyOption.textContent = "No options";
    optionsMenu.appendChild(emptyOption);
  } else {
    slot.slot_options.forEach((option) => {
      const optionBtn =
        document.createElement("button");
      optionBtn.className =
        "slot-option-btn";
      optionBtn.type = "button";
      optionBtn.textContent =
        option.option_text;

      optionBtn.addEventListener(
        "click",
        (event) => {
          event.stopPropagation();

          selectedBtn.textContent =
            option.option_text;

          optionsMenu.classList.remove(
            "open-slot-menu"
          );
        }
      );

      optionsMenu.appendChild(optionBtn);
    });
  }

  selectedBtn.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      const isOpen =
        optionsMenu.classList.contains(
          "open-slot-menu"
        );

      closeAllSlotMenus();

      if (!isOpen) {
        optionsMenu.classList.add(
          "open-slot-menu"
        );
      }
    }
  );

  slotShell.appendChild(selectedBtn);
  slotShell.appendChild(optionsMenu);

  return slotShell;
}

function closeAllSlotMenus() {
  const openMenus =
    document.querySelectorAll(
      ".slot-options-menu.open-slot-menu"
    );

  for (const menu of openMenus) {
    menu.classList.remove(
      "open-slot-menu"
    );
  }
}

document.addEventListener("click", () => {
  closeAllSlotMenus();
});