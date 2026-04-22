const sortBtn = 
  document.getElementById("sort-btn");
const sortSelect = 
  document.getElementById("sort-select");

const sortTermAz = document.getElementById(
  "sort-term-az");
const sortTermZa = document.getElementById(
  "sort-term-za");

const searchBtn = 
  document.getElementById("search-btn");
const searchInput = 
  document.getElementById("search-input");

const filterBtn = 
  document.getElementById("filter-btn");
const filterSelect = 
  document.getElementById("filter-select");

const list = 
  document.getElementById("concepts-list");

const sortCtlShell = 
  document.getElementById(
    "sort-ctl-shell");
const searchCtlShell = 
  document.getElementById(
    "search-ctl-shell");
const filterCtlShell = 
  document.getElementById(
    "filter-ctl-shell");

const appState = {
  allConcepts: [],
  visibleConcepts: [],
  currentSort: "✓ term-az",
  currentFilter: "all",
  currentSearch: "",
};

function createConceptElement(concept) {
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
    termBtnHandler(termBtn, detailsShell,
      concept.id);
  });

  term.addEventListener("click", () => {
    termBtnHandler(termBtn, detailsShell,
      concept.id);
  });

  termShell.appendChild(termBtn);
  termShell.appendChild(term);

  li.appendChild(termShell);
  li.appendChild(detailsShell);

  return li;
}

async function termBtnHandler(termBtn, 
  detailsShell, conceptId) 
{
  const isHidden = 
    !detailsShell.classList.contains(
      "open-details");

  if (isHidden) {
    detailsShell.classList.add(
      "open-details");
    termBtn.textContent = "v";
    if (detailsShell.innerHTML === "") {
      await loadConceptDetails(
        conceptId, detailsShell);
    }
    
  } else {
    detailsShell.classList.remove(
      "open-details")
    termBtn.textContent = ">";
  }
}

async function loadConceptDetails(
  conceptId, 
  detailsShell)
{
  const response = await fetch(
    "/concepts/" + conceptId);
  const concept = await response.json();

  const description = loadDescription(
    concept)

  detailsShell.appendChild(description);

  const examples = loadExamples(concept);

  detailsShell.appendChild(examples);
}

function loadDescription(concept)
{

  if (!concept.description) {
    concept.description =
      "No description available";
  }

  const descriptionE = 
    document.createElement("p");
  descriptionE.className = "description";
  descriptionE.textContent =
    concept.description;

  return descriptionE;
}

function loadExamples(concept) {
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

  const exampleBtn =
    document.createElement("div");
  exampleBtn.className =
    "example-btn";

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

  exampleBtn.appendChild(exampleTitle);
  exampleBtn.appendChild(examplePreview);
  exampleItem.appendChild(exampleBtn);

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
  examplesBtn, examplesList)
{
  const isHidden =
    !examplesList.classList.contains(
      "open-examples");

  if (isHidden) {
    examplesList.classList.add(
      "open-examples");
    examplesBtn.textContent = "-";
  } else {
    examplesList.classList.remove(
      "open-examples");
    examplesBtn.textContent = "+";
  }
  
}

function hideAllControls() {
  sortSelect.classList.remove(
    "open-panel");
  searchInput.classList.remove(
    "open-panel");
  filterSelect.classList.remove(
    "open-panel");

  sortBtn.classList.remove("open-btn");
  searchBtn.classList.remove("open-btn");
  filterBtn.classList.remove("open-btn");
}

function toggleControl(btn, panel) {
  const isHidden = 
    !panel.classList.contains(
      "open-panel");

  hideAllControls();

  if (isHidden) {
    btn.classList.add("open-btn");
    panel.classList.add("open-panel");
  }
}

function getSortedConcepts(concepts) {
  if (appState.currentSort ===
      "term-az") {
    return concepts.toSorted((a, b) =>
      a.term.localeCompare(b.term)
    );
  } else if (appState.currentSort ===
             "term-za") {
    return concepts.toSorted((a, b) =>
      b.term.localeCompare(a.term)
    );
  }
  return concepts;
}

 function applyState() {
   let concepts = 
     [...appState.allConcepts];

   concepts = concepts.filter((concept) =>
       concept.term.toLowerCase().
       includes(appState.currentSearch));

   concepts = getSortedConcepts(concepts);

   appState.visibleConcepts = concepts;
   renderConcepts();
 }

function renderConcepts() {
  list.innerHTML = "";
  
  for (const concept of appState.
       visibleConcepts) {
    const li = 
      createConceptElement(concept);
    list.appendChild(li);
  }
}

async function fetchConcepts() {
  const response = 
    await fetch("/concepts");

  if (!response.ok) {
    alert("Failed to fetch concepts")
    return [];
  }
  
  const concepts = await response.json();
  return concepts;
}

function setListeners() {
  sortBtn.addEventListener("click", () => {
    toggleControl(
      sortBtn, sortSelect);
  });

  searchBtn.addEventListener(
    "click", () => {
    toggleControl(
      searchBtn, searchInput);
  });

  filterBtn.addEventListener(
    "click", () => {
    toggleControl(
      filterBtn, filterSelect);
  });

  sortTermAz.addEventListener(
    "click", () => {
      sortTermAz.textContent = 
        "✓ Term A-Z";
      sortTermZa.textContent = "Term Z-A";
      appState.currentSort = "term-az";

      applyState();
  });
  sortTermZa.addEventListener(
    "click", () => {
      sortTermAz.textContent = "Term A-Z";
      sortTermZa.textContent = 
        "✓ Term Z-A";
      appState.currentSort = "term-za";

      applyState();
  });

  searchInput.addEventListener(
    "input", (event) => {
      appState.currentSearch =
        event.target.value.toLowerCase().
          trim();
      console.log("Searching for: " +
        appState.currentSearch);

      applyState();
  });

  //closes all panels when clicking outside
  document.addEventListener(
    "click", (event) => {
    const clickedInsideSort = 
      sortCtlShell.contains(event.target);
    const clickedInsideSearch = 
        searchCtlShell.contains(
          event.target);
    const clickedInsideFilter = 
        filterCtlShell.contains(
          event.target);

    if (!clickedInsideSort && 
      !clickedInsideSearch && 
      !clickedInsideFilter) {
        hideAllControls();
    }
  });
}

async function init() {
  setListeners();
  appState.allConcepts = 
    await fetchConcepts();

  applyState();
}

init();

