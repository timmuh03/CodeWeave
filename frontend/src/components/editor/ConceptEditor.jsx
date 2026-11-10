import { createFullConcept, editFullConcept } from "../../api/concepts";
import ConceptDetails from "./ConceptDetails"

import { useState, useEffect, useRef } from "react";
import { EditorView, basicSetup} from "codemirror";

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

  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  const isEditing = conceptEditor?.mode === "edit"

  useEffect(() => {
    editorInstanceRef.current = new EditorView({
      doc: conceptSnippets[currentSnippetIndex].snippet,
      parent: editorRef.current,
      extensions: [basicSetup],
    });

    return () => {
      editorInstanceRef.current?.destroy();
      editorInstanceRef.current = null;
    };
  }, [currentSnippetIndex]);

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
          conceptDescription={conceptDescription}
          conceptLanguage={conceptLanguage}
        />
        
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
        <div ref={editorRef} />
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
