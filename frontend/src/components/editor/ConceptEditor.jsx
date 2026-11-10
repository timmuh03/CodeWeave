import { createFullConcept, editFullConcept } from "../../api/concepts";
import ConceptDetails from "./ConceptDetails"
import SnippetEditor from "./SnippetEditor"

import { useState } from "react";

export default function ConceptEditor({
  conceptEditor,
  setConceptEditor,
  setConceptsFull,
  setConceptsLight,
}) {
  const [conceptName, setConceptName] = useState(conceptEditor?.concept?.term ?? "");
  const [conceptDescription, setConceptDescription] = useState(conceptEditor?.concept?.description ?? "");
  const [conceptLanguage, setConceptLanguage] = useState(conceptEditor?.concept?.language ?? "");
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0);
  const [conceptSnippets, setConceptSnippets] = useState(() => {
    const examples = conceptEditor.concept?.examples ?? [];

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

  const isEditing = conceptEditor?.mode === "edit"

  async function saveConcept() {
    if (!conceptName.trim()) {
      return;
    }

    const conceptData = buildConcept();
    try {
      const savedConcept = await conceptToAPI(conceptData);
      updateState(savedConcept);

      setConceptEditor(null);
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
        return await editFullConcept(conceptEditor.concept?.id, concept);
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
      inert={!conceptEditor}
      className={`concept-create-form-shell ${conceptEditor ? "open" : ""}`}
    >
      <div>
        <h1>Concept Editor</h1>
      </div>
      <form 
        id="concept-editor-form"
        className="concept-create-form"
        onSubmit={(event) => {
          event.preventDefault();
          saveConcept();
        }}
      >
        <ConceptDetails 
          conceptName={conceptName}
          setConceptName={setConceptName}
          conceptDescription={conceptDescription}
          setConceptDescription={setConceptDescription}
          conceptLanguage={conceptLanguage}
          setConceptLanguage={setConceptLanguage}
        />

        <SnippetEditor
          conceptSnippets={conceptSnippets}
          setConceptSnippets={setConceptSnippets}
          currentSnippetIndex={currentSnippetIndex}
          setCurrentSnippetIndex={setCurrentSnippetIndex}
        />
        
      </form>
      <div className="concept-create-spacer"></div>
      <div className="concept-create-form-btns">
        <button
          className="concept-create-form-cancel"
          onClick={() => {
            resetForm();
            setConceptEditor(null);
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
