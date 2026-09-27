export default function ConceptCreate() {
  return (
    <div>
      <div>
        <h1>concept create menu</h1>
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
        <label className="concept-field">
          Code
          <textarea 
            className="code-input"
          />
        </label>
      </div>
    </div>
  );
}