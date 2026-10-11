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
        <div className="concept-create-snippet-shell">
          <label className="concept-field">
            Snippet Title
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
        </div>
      </div>
      <div className="concept-create-form-btns">
        <button className="concept-create-form-save">
          Save
        </button>
        <button className="concept-create-form-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}