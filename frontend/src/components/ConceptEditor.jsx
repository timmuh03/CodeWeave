import { createFullConcept, editFullConcept } from "../api/concepts";

import { useState } from "react";

export default function ConceptEditor({
  conceptToEdit = null,
  conceptEditorOpen,
  setConceptEditorOpen,
  setConceptsFull,
  setConceptsLight,
}) {
  const [conceptName, setConceptName] = useState(conceptToEdit?.term ?? "");
  const [conceptDescription, setConceptDescription] = useState(conceptToEdit?.description ?? "");
  const [conceptLanguage, setConceptLanguage] = useState(conceptToEdit?.language ?? "");
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [conceptSnippets, setConceptSnippets] = useState(() => {
    const examples = conceptToEdit?.examples ?? [];

    return examples.length > 0
      ? examples.map((example) => ({
          id: example.id,
          snippetTitle: example.title,
          snippet: example.text ?? "",
          display_order: example.display_order,
          slots: example.slots ?? [],
        }))
      : [{ snippetTitle: "", snippet: "" }];
  });

  const isEditing = !!conceptToEdit

  async function saveConcept() {
    if (!conceptName.trim()) {
      return;
    }

    const conceptData = buildConcept();
    try {
      const savedConcept = await conceptToAPI(conceptData);
      updateState(savedConcept);

      setConceptEditorOpen(false);
      resetForm();
    } catch (error) {
      console.error("Failed to save concept.", error);
    }
  }

  function buildConcept() {
    const examples = conceptSnippets
    .filter((snippet) =>
      snippet.id != null ||
      snippet.snippetTitle.trim() ||
      snippet.snippet.trim()
    )
      .map((snippet, index) => ({
      ...(snippet.id != null ? { id: snippet.id } : {}),
      title: snippet.snippetTitle,
      text: snippet.snippet,
      display_order: snippet.display_order ?? index,
      slots: snippet.slots ?? [],
    }));
    const newConcept = {
      term: conceptName.trim(),
      language: conceptLanguage,
      description: conceptDescription,
      examples,
    };

    return newConcept;
  }

  async function conceptToAPI(concept) {
      if (isEditing) {
        return await editFullConcept(conceptToEdit.id, concept);
      }
      else {
        return await createFullConcept(concept);
      }
  }

  function updateState(savedConcept) {
    setConceptsFull((concepts) => ({
      ...concepts,
      [savedConcept.id]: savedConcept,
    }));
    
    setConceptsLight((concepts) => 
      isEditing
        ? concepts.map((concept) =>
          concept.id === savedConcept.id
            ? { ...concept, term: savedConcept.term }
            : concept
        )
        : [...concepts,
           {
             id: savedConcept.id,
             term: savedConcept.term,
           }
        ]
    );
  }

  function makeNewSnippet() {
    setConceptSnippets((currentSnippets) => [
      ...currentSnippets,
      {
        snippetTitle: "",
        snippet: "",
      },
    ]);
    setCurrentSnippetIndex(() => conceptSnippets.length);
  }

  function prevSnippet() {
    setCurrentSnippetIndex((currentIndex) =>
      currentIndex === 0 ? conceptSnippets.length - 1 : currentIndex - 1,
    );
  }

  function nextSnippet() {
    setCurrentSnippetIndex(
      (currentIndex) => (currentIndex + 1) % conceptSnippets.length,
    );
  }

  function deleteSnippet() {
    if (conceptSnippets.length === 1) {
      setConceptSnippets([
        {
          snippetTitle: "",
          snippet: "",
        },
      ]);
      return;
    }

    setConceptSnippets((currentSnippets) =>
      currentSnippets.filter((snippet, index) => index != currentSnippetIndex),
    );

    setCurrentSnippetIndex((currentIndex) =>
      Math.min(currentIndex, conceptSnippets.length - 2),
    );
  }

  function resetForm() {
    setConceptName("");
    setConceptDescription("");
    setConceptLanguage("");
    setConceptSnippets([
      {
        snippetTitle: "",
        snippet: "",
      },
    ]);
    setCurrentSnippetIndex(0);
  }

  return (
    <div
      inert={!conceptEditorOpen}
      className={`concept-create-form-shell ${conceptEditorOpen ? "open" : ""}`}
    >
      <div>
        <h1>Concept Editor</h1>
        <p>{String(isEditing)}</p>
      </div>
      <form 
        id="concept-editor-form"
        className="concept-create-form"
        onSubmit={(event) => {
          event.preventDefault();
          saveConcept();
        }}
      >
        <label className="concept-field">
          Concept Name
          <input
            required
            className="concept-title"
            type="text"
            value={conceptName}
            onChange={(event) => setConceptName(event.target.value)}
          />
        </label>
        <label className="concept-field">
          Description
          <textarea
            value={conceptDescription}
            onChange={(event) => setConceptDescription(event.target.value)}
          />
        </label>
        <label className="concept-field">
          Language
          <input
            className="concept-language"
            type="text"
            value={conceptLanguage}
            onChange={(event) => setConceptLanguage(event.target.value)}
          />
        </label>
        <span className="concept-create-snippet-carousel-menu">
          {/*change to button later */}
          <a onClick={prevSnippet}>←</a>
          {currentSnippetIndex + 1} of {conceptSnippets.length}
          {/*change to button later */}
          <a onClick={nextSnippet}>→</a>
        </span>
        <div className="concept-create-snippet-shell">
          <label className="concept-field">
            <p>Snippet Title</p>
            <input
              className="concept-language"
              type="text"
              value={conceptSnippets[currentSnippetIndex].snippetTitle}
              onChange={(event) => {
                setConceptSnippets((currentSnippets) =>
                  currentSnippets.map((snippet, index) =>
                    index === currentSnippetIndex
                      ? { ...snippet, snippetTitle: event.target.value }
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
              value={conceptSnippets[currentSnippetIndex].snippet}
              onChange={(event) => {
                setConceptSnippets((currentSnippets) =>
                  currentSnippets.map((snippet, index) =>
                    index === currentSnippetIndex
                      ? { ...snippet, snippet: event.target.value }
                      : snippet,
                  ),
                );
              }}
            />
          </label>
          <div className="concept-create-snippet-btns">
            <button 
              type="button"
              onClick={deleteSnippet}
            >
              Delete Snippet
            </button>
            <button 
              type="button"
              onClick={() => makeNewSnippet()}
            >
              New Snippet
            </button>
          </div>
        </div>
      </form>
      <div className="concept-create-spacer"></div>
      <div className="concept-create-form-btns">
        <button
          className="concept-create-form-cancel"
          onClick={() => {
            resetForm();
            setConceptEditorOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          form="concept-editor-form"
          className="concept-create-form-save"
        >
          Save
        </button>
      </div>
    </div>
  );
}
