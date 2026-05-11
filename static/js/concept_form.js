import { 
  createConcept, editConcept, deleteConcept,
  createExample, editExample, deleteExample,
  createFullConcept, editFullConcept, fetchConceptDetails
} from "/static/js/api.js"

const saveBtn = document.getElementById('form-save-btn');
const backBtn = document.getElementById('back-btn');
const conceptForm = document.querySelector('.concept-form');
const termField = document.getElementById('term');
const descriptionField = document.getElementById('description');
const language = document.getElementById('language');
const deleteBtn = document.getElementById('delete-concept-btn');

const conceptId = getIdFromPath() || null;
let concept = null;
if (conceptId) {
  concept = await fetchConceptDetails(conceptId);
}

function getIdFromPath() {
  const path = window.location.pathname;
  const parts = path.split('/');
  if (parts[1] === 'concepts' && parts[3] === 'form') {
    return parts[2];
  }

  return null;
}

function getFormConceptData() {
  return {
    term: termField.value.trim(),
    description: descriptionField.value.trim(),
    language: language.value.trim()  
    }
}

function getFormExamplesData() {
  const examples = document.querySelectorAll('.form-example-item');

  return Array.from(examples).map((example, index) => {
    const title = example.querySelector('.form-example-title').value.trim();
    const text = example.querySelector('.form-example-text').value.trim();
    const id = example.dataset.exampleId;
    
    return {
      id: id ? Number(id) : null,
      title: title,
      text: text,
      display_order: index,
    }
  })
    .filter((example) => example.title || example.text || example.id);
}

function loadConceptData() {
  if (concept) {
    termField.value = concept.term || '';
    descriptionField.value = concept.description || '';
    language.value = concept.language || '';
  }
  
  loadExamples();
  loadAddExampleBtn();
}

function loadExamples() {
  const examplesShell = document.createElement('div');
  examplesShell.className = 'form-examples-shell';

  const examplesList = document.createElement('div');
  examplesList.className = 'form-examples-list';

  const examples = concept?.examples || []

  examples.forEach((example) => {
    const exampleItem = createExampleItem(example)
    examplesList.appendChild(exampleItem);
  });

  examplesShell.appendChild(examplesList);
  conceptForm.appendChild(examplesShell);
}

function createExampleItem(example) {
  const exampleItem = document.createElement('div');
  exampleItem.className = 'form-example-item';
  if (example.id) {
    exampleItem.dataset.exampleId = example.id;
  } else {
    exampleItem.classList.add('new');
  }

  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title';
  titleLabel.for = 'form-example-title';

  const exampleTitle = document.createElement('input');
  exampleTitle.type = 'text';
  exampleTitle.className = 'form-example-title';
  exampleTitle.value = example.title || '';

  const textLabel = document.createElement('label');
  textLabel.textContent = 'Snippet';
  textLabel.for = 'form-example-text';

  const exampleText = document.createElement('textarea');
  exampleText.className = 'form-example-text';
  exampleText.value = example.text || '';
  // later will load example text without ##...## separators

  const deleteExampleBtn = loadDeleteExampleBtn(exampleItem, example.id);

  exampleItem.appendChild(titleLabel);
  exampleItem.appendChild(exampleTitle);
  exampleItem.appendChild(textLabel);
  exampleItem.appendChild(exampleText);
  exampleItem.appendChild(deleteExampleBtn);

  return exampleItem;
}

function loadAddExampleBtn() {
  const exampleBtnsShell = document.createElement('div');
  exampleBtnsShell.className = 'form-example-btns-shell';
  
  const addExampleBtn = document.createElement('button');
  addExampleBtn.className = 'add-example-btn';
  addExampleBtn.textContent = 'Add Snippet';
  addExampleBtn.type = 'button';

  addExampleBtn.addEventListener('click', (event) =>{
    event.preventDefault();
    const exampleItem = createExampleItem({});
    const examplesList = document.querySelector('.form-examples-list');
    examplesList.appendChild(exampleItem);

    const examplesShell = document.querySelector('.form-examples-shell');
    examplesShell.appendChild(examplesList);
    conceptForm.appendChild(examplesShell);
    conceptForm.appendChild(exampleBtnsShell);
  });

  exampleBtnsShell.appendChild(addExampleBtn);
  conceptForm.appendChild(exampleBtnsShell);
}

function loadDeleteExampleBtn(exampleItem, exampleId) {
  const deleteExampleBtn = document.createElement('button');
  deleteExampleBtn.className = 'delete-example-btn';
  deleteExampleBtn.textContent = 'Delete Snippet';
  deleteExampleBtn.type = 'button';

  deleteExampleBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    exampleItem.remove();
  });

  return deleteExampleBtn;
}

async function setEventListeners() {
  conceptForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    await saveConcept();
  });

  deleteBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!conceptId) return;

    await deleteConcept(conceptId);
  });
}

async function saveConcept() {
  const conceptData = getFormConceptData();
  const examplesData = getFormExamplesData();

  conceptData.examples = examplesData

  if (!conceptId) {
    await createFullConcept(conceptData);
  } else {
    await editFullConcept(conceptId, conceptData);
  }

  window.location.href = '/';
}

loadConceptData();
setEventListeners();
