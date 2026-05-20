import { useEffect, useState } from "react";
import {
  fetchConcepts,
  fetchConcept,
  createFullConcept,
} from "./api/concepts";
import "./App.css";

function App() {
  const [concepts, setConcepts] = useState([]);
  

  useEffect(() => {
    fetchConcepts().then((data) => setConcepts(data));
  }, [])
  
  return (
    <main className="app">
      <header className="app-header">
        <h1>Concepts</h1>
      </header>
      <section className="concept-list">
        {concepts.map((concept) => (
          <div key={concept.id} className="concept-term">
            {concept.term}
          </div>
        ))}
      </section>
    </main>
  )
}

export default App;