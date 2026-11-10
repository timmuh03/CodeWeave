export default function ConceptDetails ({
  conceptName,
  conceptDescription,
  conceptLanguage
}) {
  return (
    <div>
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
    </div>
  );
}