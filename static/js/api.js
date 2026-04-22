export async function fetchConcepts() {
  const response = await fetch("/concepts");

  if (!response.ok) {
    alert("Failed to fetch concepts");
    return [];
  }

  return await response.json();
}

export async function fetchConceptDetails(
  conceptId
) {
  const response = await fetch(
    "/concepts/" + conceptId
  );

  if (!response.ok) {
    alert("Failed to fetch concept details");
    return null;
  }

  return await response.json();
}