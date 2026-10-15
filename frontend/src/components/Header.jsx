import { useState } from "react";


export default function Header({
  setSortOrder,
}) {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  function onSortConceptsBtn() {
    setSortMenuOpen(!sortMenuOpen);
  }

  
  return (
    <header className="app-header">
      <h1>Concepts</h1>
      <div className="header-menu">
        <div className="sort-concepts-shell">
          <button
            className="sort-concepts-btn"
            onClick={ ()=> onSortConceptsBtn() }
          >
            ⇅
          </button>
          <div className="sort-concepts-menu-shell">
            {sortMenuOpen &&
              <ul className="sort-concepts-menu">
                <li className="clickable"
                  onClick={ ()=> {
                    setSortOrder("az");
                    setSortMenuOpen(false);
                  }}
                  
                >
                  A-Z
                </li>
                <li className="clickable"
                  onClick={ ()=> {
                    setSortOrder("za");
                    setSortMenuOpen(false);
                  }}
                >
                  Z-A
                </li>
              </ul>
            }
          </div>
        </div>
      </div>
    </header>
  )
}
