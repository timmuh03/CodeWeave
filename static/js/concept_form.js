import { 
  fetchConceptDetails, createConcept, editConcept,
  deleteConcept, createExample, editExample, deleteExample
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

function getConceptData() {
  return {
    term: termField.value.trim(),
    description: descriptionField.value.trim(),
    language: language.value.trim()
  };
}

function loadConceptData() {
  if (!concept) return;

  termField.value = concept.term || '';
  descriptionField.value = concept.description || '';
  language.value = concept.language || '';

  loadExamples();
  loadAddExampleBtn();
}

function loadExamples() {
  const examplesShell = document.createElement('div');
  examplesShell.className = 'form-examples-shell';

  const examplesList = document.createElement('div');
  examplesList.className = 'form-examples-list';

  concept.examples.forEach((example) => {
    const exampleItem = createExampleItem(example);
    exampleItem.classList.add(example.id);
    examplesList.appendChild(exampleItem);
  });

  examplesShell.appendChild(examplesList);
  conceptForm.appendChild(examplesShell);
}

function createExampleItem(example) {
  const exampleItem = document.createElement('div');
  exampleItem.className = 'form-example-item';
  if (example.id) {
    exampleItem.classList.add(example.id);
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
  exampleText.textContent = example.text;
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

  deleteExampleBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    await deleteExample(exampleId);
    exampleItem.remove();
  });

  return deleteExampleBtn;
}

async function setEventListeners() {
  conceptForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const data = getConceptData();

    await saveConcept(conceptId, data);
  });

  deleteBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    if (!conceptId) return;

    await deleteConcept(conceptId);
  });
}

async function saveConcept(conceptId, data) {
  try {
    if (conceptId) {
      const savedConcept = await editConcept(conceptId, data);
      console.log('Concept updated:', savedConcept);
      
      const examplesList = document.querySelector('.form-examples-list');
      if (examplesList) {
        const exampleItems = examplesList.querySelectorAll('.form-example-item');
        exampleItems.forEach(async (item) => {
          const exampleId = item.classList[1];
          const title = item.querySelector('.form-example-title').value;
          const text = item.querySelector('.form-example-text').value;
          const exampleData = { title, text, };

          if (exampleId != 'new') {
            alert("Editing example " + exampleId + " with data " + JSON.stringify(exampleData))
            await editExample(exampleId, exampleData);
          } else {
            await createExample(conceptId, exampleData);
          }
        });
      }
    } else {
      const savedConcept = await createConcept(data);
      console.log('Concept saved:', savedConcept);
    }

    window.location.href = '/';
  } catch (error) {
    alert("Couldn't save concept: " + JSON.stringify(data));
    alert(error);
  }
}

loadConceptData();
setEventListeners();
