import { EditorView, minimalSetup} from "codemirror";
import { useEffect, useRef } from "react"

export default function SnippetEditor({
  conceptSnippets, setConceptSnippets,
  currentSnippetIndex, setCurrentSnippetIndex
}) {
  const editorRef = useRef(null);
  const editorInstanceRef = useRef(null);
  
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

  function onSnippetChange(newText) {
    setConceptSnippets((currentSnippets) => 
      currentSnippets.map((snippet, index) =>
        index === currentSnippetIndex
          ? {...snippet, snippet: newText}
          : snippet
      )
    );
  }

  useEffect(() => {
    editorInstanceRef.current = new EditorView({
      doc: conceptSnippets[currentSnippetIndex].snippet,
      parent: editorRef.current,
      extensions: [
        minimalSetup,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newText = update.state.doc.toString();
            onSnippetChange(newText);
          }
        }),
      ],
    });

    return () => {
      editorInstanceRef.current?.destroy();
      editorInstanceRef.current = null;
    };
  }, [currentSnippetIndex]);
  
  return (
    <div>
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
          <div 
            ref={editorRef} 
            className="code-input"
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
    </div>
  );
}