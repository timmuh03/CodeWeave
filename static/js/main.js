import { appState } from 
  "/static/js/state.js";
import { fetchConcepts } from 
  "/static/js/api.js";
import {
  toggleControl,
  hideAllControls,
  applyState,
} from "/static/js/controls.js";

const sortBtn =
  document.getElementById("sort-btn");
const sortSelect =
  document.getElementById("sort-select");

const sortTermAz =
  document.getElementById("sort-term-az");
const sortTermZa =
  document.getElementById("sort-term-za");

const searchBtn =
  document.getElementById("search-btn");
const searchInput =
  document.getElementById("search-input");
const searchClearBtn = 
  document.getElementById(
    "search-clear-btn");
const searchField =
  document.getElementById("search-field");

const filterBtn =
  document.getElementById("filter-btn");
const filterSelect =
  document.getElementById("filter-select");

const list =
  document.getElementById("concepts-list");

const sortCtlShell =
  document.getElementById(
    "sort-ctl-shell"
  );
const searchCtlShell =
  document.getElementById(
    "search-ctl-shell"
  );
const filterCtlShell =
  document.getElementById(
    "filter-ctl-shell"
  );

const refs = {
  sortBtn,
  sortSelect,
  searchBtn,
  searchField,
  filterBtn,
  filterSelect,
};

function setListeners() {
  sortBtn.addEventListener("click", () => {
    toggleControl(
      sortBtn, sortSelect, refs);
  });

  searchBtn.addEventListener("click",
    () => {
    toggleControl(
      searchBtn,
      searchField,
      refs
    );
  });

  filterBtn.addEventListener("click", 
    () => {
    toggleControl(
      filterBtn,
      filterSelect,
      refs
    );
  });

  sortTermAz.addEventListener("click", 
    () => {
    sortTermAz.textContent = "✓ Term A-Z";
    sortTermZa.textContent = "Term Z-A";
    appState.currentSort = "term-az";
    applyState(list);
  });

  sortTermZa.addEventListener("click", 
    () => {
    sortTermAz.textContent = "Term A-Z";
    sortTermZa.textContent = "✓ Term Z-A";
    appState.currentSort = "term-za";
    applyState(list);
  });

  searchInput.addEventListener(
    "input",
    (event) => {
      appState.currentSearch =
        event.target.value
          .toLowerCase()
          .trim();

      applyState(list);
    }
  );

  searchClearBtn.addEventListener(
    "click", () => {
      searchInput.value = "";
      appState.currentSearch = "";
      applyState(list);
    }
  );

  document.addEventListener(
    "click",
    (event) => {
      const clickedInsideSort =
        sortCtlShell.contains(
          event.target);
      const clickedInsideSearch =
        searchCtlShell.contains(
          event.target);
      const clickedInsideFilter =
        filterCtlShell.contains(
          event.target);

      if (
        !clickedInsideSort &&
        !clickedInsideSearch &&
        !clickedInsideFilter
      ) {
        hideAllControls(refs);
      }
    }
  );
}

async function init() {
  setListeners();
  appState.allConcepts = 
    await fetchConcepts();
  applyState(list);
}

init();