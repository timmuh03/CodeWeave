import { appState } from "./state.js";
import { renderConcepts } from "./concepts.js";

export function hideAllControls(refs) {
  refs.sortSelect.classList.remove(
    "open-panel"
  );
  refs.searchField.classList.remove(
    "open-panel"
  );
  refs.filterSelect.classList.remove(
    "open-panel"
  );

  refs.sortBtn.classList.remove("open-btn");
  refs.searchBtn.classList.remove(
    "open-btn");
  refs.filterBtn.classList.remove(
    "open-btn");
}

export function toggleControl(
  btn,
  panel,
  refs
) {
  const isHidden =
    !panel.classList.contains(
      "open-panel"
    );

  hideAllControls(refs);

  if (isHidden) {
    btn.classList.add("open-btn");
    panel.classList.add("open-panel");
  }
}

function getSortedConcepts(concepts) {
  if (appState.currentSort === "term-az") {
    return concepts.toSorted((a, b) =>
      a.term.localeCompare(b.term)
    );
  }

  if (appState.currentSort === "term-za") {
    return concepts.toSorted((a, b) =>
      b.term.localeCompare(a.term)
    );
  }

  return concepts;
}

export function applyState(list) {
  let concepts = [...appState.allConcepts];

  concepts = concepts.filter((concept) =>
    concept.term.toLowerCase().includes(
      appState.currentSearch /* or 
      concept.meta.includes(
      appState.currentFilter) */
    )
  );

  concepts = getSortedConcepts(concepts);

  appState.visibleConcepts = concepts;
  renderConcepts(
    list,
    appState.visibleConcepts
  );
}