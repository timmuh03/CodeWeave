import { 
  fetchConceptDetails, createConcept, editConcept 
} from "/static/js/api.js"

const saveBtn = document.getElementById('form-save-btn');
const backBtn = document.getElementById('back-btn');
const conceptForm = document.getElementById('concept-form');
const termField = document.getElementById('term');
const descriptionField = document.getElementById('description');
const language = document.getElementById('language');

function getIdFromPath() {
  const path = window.location.pathname;
  const parts = path.split('/');
  if (parts[1] === 'concepts' && parts[3] === 'form') {
    return parts[2];
  }

  return null;
}

async function loadConceptData() {
  const conceptId = getIdFromPath();
  if (!conceptId) return;

  const concept = await fetchConceptDetails(conceptId);
  if (!concept) return;

  termField.value = concept.term || '';
  descriptionField.value = concept.description || '';
  language.value = concept.language || '';
}

function getFormData() {
  return {
    term: termField.value.trim(),
    description: descriptionField.value.trim(),
    language: language.value.trim()
  };
}

function setEventListeners() {
  conceptForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const data = getFormData();
    const conceptId = getIdFromPath();

    await saveConcept(conceptId, data);
  });
}

async function saveConcept(conceptId, data) {
  try {
    if (conceptId) {
      const savedConcept = await editConcept(conceptId, data);
      console.log('Concept updated:', savedConcept);
    } else {
      const savedConcept = await createConcept(data);
      console.log('Concept saved:', savedConcept);
    }

    window.location.href = '/';
  } catch (error) {
    alert("Couldn't save concept: " + JSON.stringify()(data));
  }
}

setEventListeners();
loadConceptData();