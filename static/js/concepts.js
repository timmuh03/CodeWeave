import { fetchConceptDetails } from "./api.js";
import { loadExamples } from "./examples.js";

export function createConceptElement(concept) {
  const li = document.createElement("li");
  li.className = "concept-shell";

  const termShell =
    document.createElement("div");
  termShell.className = "term-shell";

  const termBtn =
    document.createElement("button");
  termBtn.className = "term-btn";
  termBtn.textContent = ">";

  const term =
    document.createElement("button");
  term.className = "term";
  term.textContent = concept.term;

  const detailsShell =
    document.createElement("div");
  detailsShell.className = "details-shell";

  termBtn.addEventListener("click", () => {
    termBtnHandler(
      termBtn,
      detailsShell,
      concept.id
    );
  });

  term.addEventListener("click", () => {
    termBtnHandler(
      termBtn,
      detailsShell,
      concept.id
    );
  });

  termShell.appendChild(termBtn);
  termShell.appendChild(term);

  li.appendChild(termShell);
  li.appendChild(detailsShell);

  return li;
}

export function renderConcepts(
  list,
  concepts
) {
  list.innerHTML = "";

  for (const concept of concepts) {
    const li = createConceptElement(concept);
    list.appendChild(li);
  }
}

async function termBtnHandler(
  termBtn,
  detailsShell,
  conceptId
) {
  const isHidden =
    !detailsShell.classList.contains(
      "open-details"
    );

  if (isHidden) {
    detailsShell.classList.add(
      "open-details"
    );
    termBtn.textContent = "v";

    if (detailsShell.innerHTML === "") {
      await loadConceptDetails(
        conceptId,
        detailsShell
      );
    }
  } else {
    detailsShell.classList.remove(
      "open-details"
    );
    termBtn.textContent = ">";
  }
}

async function loadConceptDetails(
  conceptId,
  detailsShell
) {
  const concept =
    await fetchConceptDetails(conceptId);

  if (!concept) return;

  const description =
    loadDescription(concept);
  detailsShell.appendChild(description);

  const examples = loadExamples(concept);
  detailsShell.appendChild(examples);
}

function loadDescription(concept) {
  const descriptionE =
    document.createElement("p");
  descriptionE.className = "description";
  descriptionE.textContent =
    concept.description ||
    "No description available";

  return descriptionE;
}