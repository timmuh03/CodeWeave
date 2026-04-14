const form = document.getElementById("concept-form");
const input = document.getElementById("concept-input");
const list = document.getElementById("concepts-list");

function createConceptElement(concept) {
  const li = document.createElement("li");
  li.className = "concept-shell";

  const term = 
    document.createElement("div");
  term.className = "term";
  term.textContent = concept.term;

  li.appendChild(term);

  return li;
}

async function fetchConcepts() {
  const response = await fetch("/concepts");
  const concepts = await response.json();
  list.innerHTML = "";

  for (const concept of concepts) {
    const li = createConceptElement(concept);
    list.appendChild(li);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const term = input.value.trim();

  if (!term) {
    return;
  }

  const response = await fetch("/concepts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ term }),
  });

  if (!response.ok) {
    alert("Failed to add concept");
    return;
  }

  input.value = "";
  await fetchConcepts();
});

fetchConcepts();