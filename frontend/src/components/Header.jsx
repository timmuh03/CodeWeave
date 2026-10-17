import { useState, useRef, useEffect } from "react";


export default function Header({
  setSortOrder, searchText, setSearchText,
}) {
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const headerMenuRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        headerMenuRef.current &&
        !headerMenuRef.current.contains(event.target)
      ) {
        setSortMenuOpen(false);
        setSearchMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (searchMenuOpen) {
      inputRef.current?.focus();
    }
  }, [searchMenuOpen]);
  
  return (
    <header className="app-header">
      <h1>Concepts</h1>
      <div className="header-menu" ref={headerMenuRef}>
        <div className="sort-concepts-shell">
          <button
            className="sort-concepts-btn"
            onClick={ ()=> {
              setSortMenuOpen(!sortMenuOpen);
              setSearchMenuOpen(false);
            }}
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
        <div className="search-shell">
          <button
            onClick={ ()=> {
              setSearchMenuOpen(!searchMenuOpen);
              setSortMenuOpen(false);
            }}
          >
            🔍
          </button>
          {searchMenuOpen &&
            <div 
              className="search-menu-shell"
            >
              <div>
                <input 
                  type="text"
                  ref={inputRef}
                  className="search-input"
                  value={ searchText }
                  onChange={(event) => setSearchText(event.target.value)}
                />
              </div>
              <div 
                className="search-clear"
                onClick={()=> setSearchText("")}
              >
                <p>
                  X
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    </header>
  )
}
