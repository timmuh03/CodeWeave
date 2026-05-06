import { createConcept } from "/static/js/api.js"

const saveBtn = document.getElementById('form-save-btn');
const backBtn = document.getElementById('back-btn');
const conceptForm = document.getElementById('concept-form');
const termField = document.getElementById('term');
const descriptionField = document.getElementById('description');
const tagsField = document.getElementById('tags');
const codeField = document.getElementById('code');
const notesField = document.getElementById('notes');

function getFormData() {
  const data = {
    term: termField.value,
    description: descriptionField.value,
    tags: tagsField.value,
    code: codeField.value,
    notes: notesField.value,
  };
  return data;
}

function setEventListeners() {
  conceptForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const data = getFormData();
    await saveConcept(data);
  });
}

async function saveConcept(data) {
  try {
    const savedConcept = await createConcept(data);
    console.log('Concept saved:', savedConcept);

    window.location.href = '/';
  } catch (error) {
    alert("Couldn't save concept: " + str(data));
  }
}

setEventListeners();