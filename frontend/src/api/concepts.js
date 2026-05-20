async function request(path, options = {}) {
  const response = await fetch(path, options);

  if (!response.ok) {
    let errorData = null;

    try {
      errorData = await response.json();
    } catch {
      errorData = { detail: response.statusText };
    }

    console.error("API request failed:", {
      path,
      status: response.status,
      errorData,
    });

    throw new Error(errorData.detail || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return await response.json();
}

export function fetchConcepts() {
  return request("/concepts/");
}

export function fetchConcept(conceptId) {
  return request(`/concepts/${conceptId}`);
}

export function createFullConcept(data) {
  return request("/concepts/full", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function editFullConcept(conceptId, data) {
  return request(`/concepts/${conceptId}/full`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function deleteConcept(conceptId) {
  return request(`/concepts/${conceptId}`, {
    method: "DELETE",
  });
}