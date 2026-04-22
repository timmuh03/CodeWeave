export function loadExamples(concept) {
  const examplesShell =
    document.createElement("div");
  examplesShell.className =
    "examples-shell";

  const examplesBtn =
    document.createElement("button");
  examplesBtn.className = "examples-btn";
  examplesBtn.textContent = "+";

  const examplesList =
    document.createElement("div");
  examplesList.className = "examples-list";

  examplesBtn.addEventListener(
    "click",
    () => {
      examplesBtnHandler(
        examplesBtn,
        examplesList
      );
    }
  );

  if (!concept.examples ||
      concept.examples.length === 0) {
    const mtMessage =
      document.createElement("p");
    mtMessage.textContent =
      "No examples available";
    examplesList.appendChild(mtMessage);
  } else {
    concept.examples.forEach(
      (example, index) => {
        const exampleItem =
          createExampleItem(
            example,
            index,
            examplesList,
            examplesBtn
          );
        examplesList.appendChild(
          exampleItem
        );
      }
    );
  }

  examplesShell.appendChild(examplesBtn);
  examplesShell.appendChild(examplesList);

  return examplesShell;
}

function createExampleItem(
  example,
  index,
  examplesList,
  examplesBtn
) {
  const exampleItem =
    document.createElement("div");
  exampleItem.className =
    "example-item";

  if (index === 0) {
    exampleItem.classList.add(
      "selected-example"
    );
  }

  const exampleShell =
    document.createElement("div");
  exampleShell.className =
    "example-shell";

  const exampleTitle =
    document.createElement("button");
  exampleTitle.className =
    "example-btn-title";
  exampleTitle.textContent =
    example.title;

  const examplePreview =
    document.createElement("pre");
  examplePreview.className =
    "example-btn-preview";
  examplePreview.textContent =
    example.template_text ||
    "No example available";

  exampleTitle.addEventListener(
    "click",
    () => {
      selectExample(
        exampleItem,
        examplesList,
        examplesBtn
      );
    }
  );

  exampleShell.appendChild(exampleTitle);
  exampleShell.appendChild(examplePreview);
  exampleItem.appendChild(exampleShell);

  return exampleItem;
}

function selectExample(
  exampleItem,
  examplesList,
  examplesBtn
) {
  const allItems =
    examplesList.querySelectorAll(
      ".example-item"
    );

  for (const item of allItems) {
    item.classList.remove(
      "selected-example"
    );
  }

  exampleItem.classList.add(
    "selected-example"
  );

  examplesList.classList.remove(
    "open-examples"
  );
  examplesBtn.textContent = "+";
}

function examplesBtnHandler(
  examplesBtn,
  examplesList
) {
  const isHidden =
    !examplesList.classList.contains(
      "open-examples"
    );

  if (isHidden) {
    examplesList.classList.add(
      "open-examples"
    );
    examplesBtn.textContent = "-";
  } else {
    examplesList.classList.remove(
      "open-examples"
    );
    examplesBtn.textContent = "+";
  }
}