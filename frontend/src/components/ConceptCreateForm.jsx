export default function ConceptCreateForm({ createFormOpen }) {
  return (
    <div className={`concept-create-form-shell ${
      createFormOpen ? "open" : ""
    }`}
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
          />
        </label>
        <label className="concept-field">
          Description
          <textarea
          />
        </label>
        <label className="concept-field">
          Language
          <input
            className="concept-language"
            type="text"
          />
        </label>
        <span className="concept-create-snippet-carousel-menu">
          <a>←</a>K of N<a>→</a>
        </span>
        <div className="concept-create-snippet-shell">
          <label className="concept-field">            
            <p>Snippet Title</p>
            <input
              className="concept-language"
              type="text"
            />
          </label>
          <label className="concept-field">
            Snippet
            <textarea 
              className="code-input"
            />
          </label>
          <div className="concept-create-snippet-btns">
            <button>
              Delete Snippet
            </button>
            <button>
              New Snippet
            </button>
          </div>
        </div>
      </div>
      <div className="concept-create-spacer"></div>
      <div className="concept-create-form-btns">
        <button className="concept-create-form-cancel">
          Cancel
        </button>
        <button className="concept-create-form-save">
          Save
        </button>
      </div>
    </div>
  );
}