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
    console.error('Error saving concept:', error);
    alert("Could not save concept");
    throw Error("Could not save concept");
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
    console.error('Error editing concept:', error);
    alert("Could not edit concept");
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

export async function createExample(conceptId, data) {
  try {
    const response = await fetch(`/concepts/${conceptId}/examples`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    alert("Response: " + response.status + " " + response.statusText)

    const responseText = await response.text();

    alert("Response text: " + responseText)
    if (!response.ok) {
      const error = await response.text();
      console.error('Error saving example:', error);
      alert("Could not create example for concept " + conceptId);
      throw new Error(error);
    }
  
    return await response.text();
  } catch (error) {
    console.error('Error saving example:', error);
    alert("Catch: Could not create example for concept " + conceptId);
    alert(error.message);
    throw error;
  }
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
    console.error('Error editing example:', error);
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

export async function deleteExample(exampleId) {
  const response = await fetch(`/examples/${exampleId}`, { 
    method: 'DELETE' 
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Error deleting example:', error);
    alert("Could not delete example");
    throw new Error(error);
  }

  return true;
}

