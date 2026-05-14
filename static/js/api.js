export async function fetchConcepts() {
  const response = await fetch("/concepts/");

  if (!response.ok) {
    const error = await response.json();
    console.error("Failed to fetch concepts \n", error);
    throw new Error("Failed to fetch concepts");
  }

  return await response.json();
}

export async function fetchConceptDetails(conceptId) {
  const response = await fetch("/concepts/" + conceptId);

  if (!response.ok) {
    const error = await response.json();
    console.error("Failed to fetch concept details\n", error);
    throw new Error("Failed to fetch concept details");
  }

  return await response.json();
}

export async function createFullConcept(data) {
  const response = await fetch('/concepts/full', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error saving concept\n', error);
    throw new Error("Could not save concept");
  }

  return await response.json();
}

export async function editFullConcept(conceptId, data) {
  const response = await fetch(`/concepts/${conceptId}/full`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error editing concept\n', error);
    throw new Error("Could not edit concept");
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
    console.error('Error saving concept\n', error);
    throw new Error("Could not save concept");
  }

  return await response.json();
}

export async function createExample(conceptId, data) {
  
  const response = await fetch(`/concepts/${conceptId}/examples`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Error saving example\n', error);
    throw new Error("Could not save example");
  }

  return await response.text();
  
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
    console.error('Error editing concept\n', error);
    throw new Error("Could not edit concept");
  }

  return await response.json();
}

export async function editExample(exampleId, data) {
  const response = await fetch(`/examples/${exampleId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error editing example\n', error);
    throw new Error("Could not edit example");
  }

  return await response.json();
}

export async function deleteConcept(conceptId) {
  const response = await fetch(`/concepts/${conceptId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('Error deleting concept\n', error);
    throw new Error("Could not delete concept");
  }

  window.location.href = '/';
  
  return true;
}

export async function deleteExample(exampleId) {
  const response = await fetch(`/examples/${exampleId}`, { 
    method: 'DELETE' 
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Error deleting example\n', error);
    throw new Error("Could not delete example");
  }

  return true;
}

