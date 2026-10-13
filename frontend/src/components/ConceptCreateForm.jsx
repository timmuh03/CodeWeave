import { createFullConcept } from "../api/concepts"

import { useState } from "react";

export default function ConceptCreateForm({
  createFormOpen, setCreateFormOpen,
  conceptsFull, setConceptsFull,
  conceptsLight, setConceptsLight,
}) {
  const [newConceptName, setNewConceptName] = useState("");
  const [newConceptDescription, setNewConceptDescription] = useState("");
  const [newConceptLanguage, setNewConceptLanguage] = useState("");
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [newConceptSnippets, setNewConceptSnippets] = useState([
    {
      snippetTitle: "",
      snippet: "",
    },
  ]);

  async function saveConcept() {
    console.log("conceptsLight: ", conceptsLight);
    console.log("concetpsFull: ", conceptsFull);
    
    const newConcept = buildConcept();
    try {
    const savedConcept = await conceptToAPI(newConcept);
    updateState(savedConcept);
      
    setCreateFormOpen(false);
    resetForm();
    } catch(error) {
      console.error("Failed to save concept.", error);
    }
    
    
    console.log("newconcpet", newConcept);

  }

  function buildConcept() {
    const examples = newConceptSnippets.map((snippet) => ({
      title: snippet.snippetTitle,
      text: snippet.snippet
    }));
    const newConcept = {
      term: newConceptName,
      language: newConceptLanguage,
      description: newConceptDescription,
      examples,
    };

    return newConcept;
  }

  async function conceptToAPI(newConcept) {
    const savedConcept = await createFullConcept(newConcept);
    return savedConcept;
  }

  function updateState(savedConcept) {
    setConceptsFull((concepts) => ({
      ...concepts,
      [savedConcept.id]: saveConcept,
    }));
    setConceptsLight((concepts) => [
      ...concepts,
      {
        id: savedConcept.id,
        term: savedConcept.term,
      }
    ]);
  }

  function makeNewSnippet() {
    setNewConceptSnippets((currentSnippets) => [
      ...currentSnippets,
      {
        snippetTitle: "",
        snippet: "",
      }
    ]);
    setCurrentSnippetIndex(() => newConceptSnippets.length);
  }

  function prevSnippet() {
    setCurrentSnippetIndex((currentIndex) =>
      currentIndex === 0 ?
      newConceptSnippets.length - 1
      : currentIndex - 1
    );
  }

  function nextSnippet() {
    setCurrentSnippetIndex((currentIndex) =>
      (currentIndex +1) % newConceptSnippets.length
    );
  }

  function deleteSnippet() {
    if (newConceptSnippets.length === 1) {
      setNewConceptSnippets([
        {
          snippetTitle: "",
          snippet: "",
        }
      ])
      return;
    }
    
    setNewConceptSnippets((currentSnippets) => 
      currentSnippets.filter((snippet, index) =>
        index != currentSnippetIndex
      )
    );

    setCurrentSnippetIndex((currentIndex) =>
      Math.min(currentIndex, newConceptSnippets.length - 2)
    );
  }

  function resetForm() {
    setNewConceptName("");
    setNewConceptDescription("");
    setNewConceptLanguage("");
    setNewConceptSnippets([
      {
        snippetTitle: "",
        snippet: "",
      },
    ]);
    setCurrentSnippetIndex(0);
  }

  return (
    <div
      className={`concept-create-form-shell ${createFormOpen ? "open" : ""}`}
    >
      <div>
        <h1>Concept Create Menu</h1>
      </div>
      <div className="concept-create-form">
        <label className="concept-field">
          Concept Name
          <input
            className="concept-title"
            type="text"
            value={newConceptName}
            onChange={(event) => setNewConceptName(event.target.value)}
          />
        </label>
        <label className="concept-field">
          Description
          <textarea
            value={newConceptDescription}
            onChange={(event) => setNewConceptDescription(event.target.value)}
          />
        </label>
        <label className="concept-field">
          Language
          <input
            className="concept-language"
            type="text"
            value={newConceptLanguage}
            onChange={(event) => setNewConceptLanguage(event.target.value)}
          />
        </label>
        <span className="concept-create-snippet-carousel-menu">
          {/*change to button later */}
          <a 
            onClick={ prevSnippet }
          >
            ←
          </a>
          {currentSnippetIndex + 1} of {newConceptSnippets.length}
          {/*change to button later */}
          <a
            onClick={ nextSnippet }
          >
            →
          </a>
        </span>
        <div className="concept-create-snippet-shell">
          <label className="concept-field">
            <p>Snippet Title</p>
            <input
              className="concept-language"
              type="text"
              value={newConceptSnippets[currentSnippetIndex].snippetTitle}
              onChange={(event) => {
                setNewConceptSnippets((currentSnippets) =>
                  currentSnippets.map((snippet, index) =>
                    index === currentSnippetIndex ?
                      { ...snippet, snippetTitle: event.target.value }
                      : snippet,
                  ),
                );
              }}
            />
          </label>
          <label className="concept-field">
            Snippet
            <textarea
              className="code-input"
              value={newConceptSnippets[currentSnippetIndex].snippet}
              onChange={(event) => {
                setNewConceptSnippets((currentSnippets) =>
                  currentSnippets.map((snippet, index) =>
                    index === currentSnippetIndex ?
                      { ...snippet, snippet: event.target.value }
                      : snippet,
                  ),
                );
              }}
            />
          </label>
          <div className="concept-create-snippet-btns">
            <button
              onClick={ deleteSnippet }
            >
              Delete Snippet
            </button>
            <button
              onClick={ ()=> makeNewSnippet() }
            >
              New Snippet
            </button>
          </div>
        </div>
      </div>
      <div className="concept-create-spacer"></div>
      <div className="concept-create-form-btns">
        <button
          className="concept-create-form-cancel"
          onClick={() => {
            resetForm();
            setCreateFormOpen(!createFormOpen);
          }}
        >
          Cancel
        </button>
        <button
          className="concept-create-form-save"
          onClick={() => {
            saveConcept();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
