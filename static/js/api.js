export async function fetchConcepts() {
  const response = await fetch("/concepts/");

  if (!response.ok) {
    alert("Failed to fetch concepts");
    return [];
  }

  return await response.json();
}

export async function fetchConceptDetails(
  conceptId
) {
  const response = await fetch("/concepts/" + conceptId);

  if (!response.ok) {
    alert(
      "Failed to fetch concept details");
    return null;
  }

  return await response.json();
}

export async function createConcept(data) {
  const response = await fetch('/concepts/', {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Error saving concept:', error);
    alert("Could not save concept");
    throw Error("Could not save concept");
  }

  return await response.json();
}

export async function editConcept(conceptId, data) {
   const response = await fetch(`/concepts/${conceptId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.json();
    console.error('Error editing concept:', error);
    alert("Could not edit concept");
  }

  return await response.json();
}

export async function deleteConcept(conceptId) {
  const response = await fetch(`/concepts/${conceptId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error deleting concept:', error);
    alert("Could not delete concept");
  }

  window.location.href = '/';
  alert("Concept deleted");

  return true;
}