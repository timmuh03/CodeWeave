import { fetchConceptDetails, 
       editConcept} from "./api.js";
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

  const HOLD_TIME = 1000;

  let holdTimer;
  let longPress = false;

  term.addEventListener("pointerdown", () => {
    longPress = false;
    
    holdTimer = setTimeout(() => {
      longPress = true;
    }, HOLD_TIME);
  });

  term.addEventListener("pointerup", () => {
    clearTimeout(holdTimer);
    if (!longPress) {
      termBtnHandler(
      termBtn,
      detailsShell,
      concept.id
      );
    } else {
      window.location.href = `/concepts/${concept.id}/form`;
    };
    
  });

  term.addEventListener("pointerleave", () => {
    clearTimeout(holdTimer);
  });

  term.addEventListener("pointercancel", () => {
    clearTimeout(holdTimer);
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

  const language = loadLanguage(concept);
  detailsShell.appendChild(language);

  const description =
    loadDescription(concept);
  detailsShell.appendChild(description);

  const examples = loadExamples(concept);
  detailsShell.appendChild(examples);
}

function loadDescription(concept) {
  const descriptionEl =
    document.createElement("p");
  descriptionEl.className = "description";
  descriptionEl.textContent =
    concept.description ||
    "No description available";

  return descriptionEl;
}

function loadLanguage(concept) {
  const languageEl =
    document.createElement("p");
  languageEl.className = "language";
  languageEl.textContent = concept.language ||
    "Language undefined";

  return languageEl;
}