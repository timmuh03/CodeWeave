# CodeWeave

CodeWeave is an early-stage learning and snippet-building app for storing programming concepts, examples, and reusable code patterns. The app is built around a simple idea: code examples are easier to learn and reuse when the parts that commonly change are treated as editable "slots."

A concept can contain one or more examples, each example can contain placeholder slots, and each slot can provide selectable options. This lets a learner experiment with code patterns without rewriting the whole snippet, while also creating a foundation for a practical personal snippet library.

## Project Goals

CodeWeave is being built from scratch as a full-stack portfolio project with two goals:

1. **Learning tool** - Help newer developers understand common programming concepts through interactive examples.
2. **Snippet tool** - Give more experienced developers a place to store, customize, and eventually copy reusable snippets into their own projects.

The project is intentionally being developed in stages so the core data model, CRUD behavior, and UI interactions are solid before adding larger-scale features.

## Current Features

- [x] FastAPI backend application structure
- [x] SQLAlchemy models for concepts, examples, slots, and slot options
- [x] SQLite-compatible local database setup
- [x] Alembic migration setup
- [x] API routes for concept CRUD operations
- [x] API routes for examples, slots, and slot options
- [x] Health check endpoints
- [x] Static frontend served by FastAPI
- [x] Concept list page
- [x] Concept create/edit form
- [x] Expandable concept details
- [x] Example rendering for each concept
- [x] Slot placeholder parsing using `##Slot Label##` syntax
- [x] Interactive slot option selection in rendered examples
- [x] Client-side search and sort controls
- [x] Seed data for initial learning examples

## How It Works

CodeWeave uses a nested content model:

```text
Concept
`-- Example
    `-- Slot
        `-- Slot Option
```

For example, an `addEventListener` concept can have an example like:

```js
document.querySelector("##Target##")
  .addEventListener("##Event Type##", () => {
    console.log("##Message##");
  });
```

Each placeholder maps to a slot. Each slot can have multiple selectable options, such as:

- `Target`: `#submit-btn`, `.card`, `button`, `form`
- `Event Type`: `click`, `submit`, `keydown`
- `Message`: `clicked`, `submitted`, `hovered`

The frontend parses the placeholder syntax, replaces each placeholder with an interactive control, and lets the user try different combinations.

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Alembic
- SQLite for local development

### Frontend

- HTML
- CSS
- Vanilla JavaScript modules
- Browser Fetch API

## Repository Structure

```text
CodeWeave/
|-- alembic/              # Database migration configuration and versions
|-- models/               # SQLAlchemy database models
|-- routers/              # FastAPI route modules
|-- schemas/              # Pydantic request/response schemas
|-- static/
|   |-- js/               # Frontend JavaScript modules
|   `-- styles.css        # App styling
|-- templates/            # HTML pages served by FastAPI
|-- db.py                 # Database engine/session setup
|-- main.py               # FastAPI application entry point
|-- seed.py               # Local seed data script
`-- requirements.txt      # Python dependencies
```

## Local Development

### 1. Create and activate a virtual environment

```bash
python -m venv .venv
source .venv/bin/activate
```

On Windows PowerShell:

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=sqlite:///./codeweave.db
START_PAGE=templates/index.html
```

### 4. Seed the database

```bash
python seed.py
```

> Note: the seed script resets the local database before inserting seed data.

### 5. Run the development server

```bash
uvicorn main:app --reload
```

Then open:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Roadmap

### Phase 1: Core Concept App

- [x] Create backend project structure
- [x] Create database models
- [x] Add concept CRUD routes
- [x] Add example, slot, and option routes
- [x] Build concept list UI
- [x] Build concept create/edit form
- [x] Render concept examples
- [x] Parse slots from example text
- [x] Allow users to select slot options in rendered examples

### Phase 2: Complete Editing Workflow

- [ ] Add UI for creating examples inside a concept
- [ ] Add UI for editing example title and code text
- [ ] Add UI for deleting examples
- [ ] Add UI for creating slots from example text
- [ ] Add UI for editing slot labels and slot types
- [ ] Add UI for adding, editing, deleting, and ordering slot options
- [ ] Show clear validation when example placeholders do not match defined slots
- [ ] Improve error handling and form feedback
- [ ] Add confirmation before deleting user-created content

### Phase 3: Snippet Builder Features

- [ ] Add live generated-code preview
- [ ] Add copy-to-clipboard for the current snippet
- [ ] Preserve selected slot values while viewing an example
- [ ] Link repeated slots so changing one updates every matching occurrence
- [ ] Allow authors to define whether repeated slot labels should be linked or independent
- [ ] Add basic slot metadata such as variable name, string value, number value, selector, callback, or expression

### Phase 4: Validation and Smarter Slots

- [ ] Add rule definitions for compatible slot combinations
- [ ] Add warnings for questionable combinations instead of blocking users immediately
- [ ] Support language-specific validation rules
- [ ] Support library/framework-specific slot suggestions
- [ ] Add optional required imports or setup notes for snippets
- [ ] Add tests for slot parsing and generated output

### Phase 5: Organization and Discovery

- [ ] Add languages as first-class organization fields
- [ ] Add library/framework categories under each language
- [ ] Add tags for concepts and snippets
- [ ] Add server-side search and filtering
- [ ] Add better sorting options
- [ ] Add saved filters or favorites
- [ ] Add import/export for snippet packs

### Phase 6: Scaling and Sharing

- [ ] Add pagination, infinite scroll, or load-more behavior after the content library grows
- [ ] Add authentication if the app becomes multi-user
- [ ] Add ownership/permissions for user-created snippets
- [ ] Add public/private snippet visibility
- [ ] Add deployment configuration
- [ ] Add CI checks for formatting, tests, and migrations

## Design Notes

### Why slots?

Many code examples have parts that change from project to project: variable names, selectors, endpoint URLs, event names, callbacks, messages, and configuration values. CodeWeave treats those changing pieces as structured slots so examples become reusable templates instead of static text.

### Why build with vanilla JavaScript first?

The frontend intentionally uses browser-native JavaScript modules instead of a framework. This keeps the early project focused on fundamentals: DOM rendering, event handling, fetch requests, state management, and API design.

### Why focus on editing before scaling?

The app is still in the early product stage. Before adding advanced scaling features, the priority is to make the core workflow complete:

1. Create a concept.
2. Add examples.
3. Define slots in those examples.
4. Add valid options for each slot.
5. Preview and copy the generated snippet.

Once that loop feels smooth, features like infinite scroll, authentication, larger search indexes, and advanced validation will be easier to design correctly.

## Portfolio Focus

This project demonstrates:

- Full-stack application planning
- Relational data modeling
- REST-style API design
- Request and response schema design
- Frontend state and DOM management without a framework
- Incremental feature development
- Database seeding and migrations
- Product thinking around learners, snippet reuse, validation, and future scalability

## Current Status

CodeWeave is a functional early prototype. The core data model and basic viewer are in place, and the next major milestone is completing the in-app editing workflow for examples, slots, and slot options.
