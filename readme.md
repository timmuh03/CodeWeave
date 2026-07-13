# CodeWeave

CodeWeave is an early-stage learning and snippet-building application for storing programming concepts, examples, and reusable code patterns. It is built around a simple idea: code examples become easier to understand and reuse when the parts that commonly change are represented as editable **slots**.

A concept can contain one or more examples, each example can contain placeholder slots, and each slot can provide selectable options. This allows a learner to experiment with code patterns without rewriting an entire snippet while also creating the foundation for a practical personal snippet library.

## Current Status

**CodeWeave is a functional, locally run prototype under active development. It is not currently deployed.**

The FastAPI backend, relational data model, concept viewer, concept create/edit workflow, and interactive slot rendering are working. The next major milestone is completing the core authoring workflow for examples, slots, and slot options.

The original working frontend was built with modular vanilla JavaScript. The application is now being migrated incrementally to **React** in Replit. Existing screens and behaviors are being rebuilt as React components while the working vanilla JavaScript implementation remains a reference during the transition.

CodeWeave currently operates as a single-user development prototype. Authentication, user accounts, and content ownership are intentionally deferred until the core editing and snippet-building workflows are complete and stable.

## Project Goals

CodeWeave is being built from scratch as a full-stack portfolio project with two primary goals:

1. **Learning tool** - Help newer developers understand programming concepts through interactive examples.
2. **Snippet tool** - Give developers a place to store, customize, and eventually copy reusable snippets into their own projects.

The project is being developed in stages so the data model, CRUD behavior, frontend architecture, and central user interactions are solid before authentication, deployment, and larger-scale features are introduced.

## Development Progress

| Area | Status |
|---|---|
| FastAPI backend and routing | Working |
| Relational concept/example/slot data model | Working |
| SQLAlchemy persistence and Alembic migrations | Working |
| Concept list and expandable details | Working |
| Concept create/edit workflow | Working |
| Interactive slot-option rendering | Working |
| Nested concept, example, slot, and option saves | Working |
| Frontend migration from vanilla JavaScript to React | In progress |
| Complete visual authoring for examples and slots | In progress |
| Automated test suite | Planned |
| Authentication and content ownership | Planned after core workflows |
| Public deployment | Planned |

## Current Features

- [x] FastAPI backend application structure
- [x] SQLAlchemy models for concepts, examples, slots, and slot options
- [x] SQLite-compatible local database setup
- [x] Alembic migration setup
- [x] REST-style routes for concepts, examples, slots, and slot options
- [x] Nested API operations for saving concepts with related content
- [x] Health-check endpoints
- [x] Concept list page
- [x] Concept create/edit form
- [x] Expandable concept details
- [x] Example rendering for each concept
- [x] Slot placeholder parsing using `##Slot Label##` syntax
- [x] Interactive slot-option selection in rendered examples
- [x] Client-side search and alphabetical sorting
- [x] Seed data for initial learning examples
- [ ] Complete the React migration for all existing frontend behavior
- [ ] Complete the visual editing workflow for examples, slots, and slot options

## Current Limitations

- The frontend is currently in transition from modular vanilla JavaScript to React.
- The visual editing workflow for examples, slots, and slot options is incomplete.
- Authentication and user ownership are not yet implemented.
- The application currently uses SQLite for local development.
- The project is not yet deployed as a public demo.
- Automated test coverage is still planned.

These limitations reflect the project's current development stage rather than its intended final scope.

## How It Works

CodeWeave uses a nested content model:

```text
Concept
`-- Example
    `-- Slot
        `-- Slot Option
```

For example, an `addEventListener` concept can contain an example such as:

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

The frontend parses the placeholder syntax, replaces each placeholder with an interactive control, and allows the user to try different combinations without rewriting the full example.

## Mobile Screenshot

![CodeWeave open slots](assets/screen_shot.png)

> This screenshot represents the earlier working frontend. The interface is currently being rebuilt incrementally in React.

## Tech Stack

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- Alembic
- SQLite for local development

### Frontend

- React - migration in progress
- Modular vanilla JavaScript - original working implementation
- HTML
- CSS
- Browser Fetch API

### Development Environment

- Replit
- Git
- GitHub

## Repository Structure

The committed repository currently reflects the existing FastAPI application and original modular JavaScript frontend. React migration work is being developed incrementally in Replit and will replace the earlier frontend structure as completed screens are integrated.

```text
CodeWeave/
|-- alembic/              # Database migration configuration and versions
|-- models/               # SQLAlchemy database models
|-- routers/              # FastAPI route modules
|-- schemas/              # Pydantic request and response schemas
|-- static/
|   |-- js/               # Existing modular JavaScript frontend
|   `-- styles.css        # Application styling
|-- templates/            # Existing HTML pages served by FastAPI
|-- db.py                 # Database engine, session, and dependency setup
|-- main.py               # FastAPI application entry point
|-- seed.py               # Local seed-data script
`-- requirements.txt      # Python dependencies
```

## Local Development

### Prerequisites

- Python 3.11 or newer
- Git
- Node.js and npm for the React frontend as the migration is integrated

### 1. Clone the repository

```bash
git clone https://github.com/timmuh03/CodeWeave.git
cd CodeWeave
```

### 2. Create and activate a Python virtual environment

macOS or Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Install backend dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL=sqlite:///./codeweave.db
START_PAGE=./templates/index.html
```

### 5. Seed the database

```bash
python seed.py
```

> The seed script resets the local database before inserting the initial sample data.

### 6. Run the FastAPI development server

```bash
uvicorn main:app --reload
```

Open the application at:

```text
http://127.0.0.1:8000
```

FastAPI's interactive API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

> React setup and run instructions will be added once the migration structure is finalized and committed to the repository.

## Roadmap

### Phase 1: Core Concept Application

- [x] Create the backend project structure
- [x] Create the relational database models
- [x] Add concept CRUD routes
- [x] Add example, slot, and option routes
- [x] Build the initial concept-list interface
- [x] Build the initial concept create/edit form
- [x] Render concept examples
- [x] Parse slots from example text
- [x] Allow users to select slot options in rendered examples

### Phase 2: React Migration and Core Editing Workflow

- [ ] Rebuild the concept list as React components
- [ ] Rebuild expandable concept details in React
- [ ] Move search, sorting, and open/closed state into React state
- [ ] Rebuild the concept create/edit form in React
- [ ] Preserve working FastAPI API integration during the migration
- [ ] Add a complete UI for creating examples within a concept
- [ ] Add controls for editing example titles and code text
- [ ] Add controls for deleting examples
- [ ] Add a workflow for creating slots from selected example text
- [ ] Add controls for editing slot labels and slot types
- [ ] Add controls for creating, editing, deleting, and ordering slot options
- [ ] Validate that example placeholders match their defined slots
- [ ] Improve error handling and form feedback
- [ ] Add confirmation before deleting content

### Phase 3: Snippet-Builder Features

- [ ] Add a live generated-code preview
- [ ] Add copy-to-clipboard functionality
- [ ] Preserve selected slot values while viewing an example
- [ ] Link repeated slots so changing one updates matching occurrences
- [ ] Allow authors to define whether repeated slot labels are linked or independent
- [ ] Add basic slot metadata such as variable, string, number, selector, callback, or expression

### Phase 4: Validation and Testing

- [ ] Add rules for compatible slot combinations
- [ ] Warn about questionable combinations without unnecessarily blocking users
- [ ] Support language-specific validation
- [ ] Support library- and framework-specific suggestions
- [ ] Add optional required imports and setup notes
- [ ] Add automated tests for APIs, slot parsing, nested updates, and generated output
- [ ] Add frontend component and interaction tests

### Phase 5: Organization and Discovery

- [ ] Add languages as first-class organizational fields
- [ ] Add library and framework categories under each language
- [ ] Add tags for concepts and snippets
- [ ] Add server-side search and filtering
- [ ] Add additional sorting options
- [ ] Add favorites or saved filters
- [ ] Add import and export for snippet packs

### Phase 6: Authentication, Sharing, and Deployment

- [ ] Add user registration and authentication after the core workflow is stable
- [ ] Add ownership and permissions for user-created content
- [ ] Add public and private snippet visibility
- [ ] Add pagination or incremental loading as the content library grows
- [ ] Configure a persistent production database
- [ ] Add deployment configuration
- [ ] Add continuous-integration checks for formatting, tests, and migrations

## Design Notes

### Why slots?

Many code examples contain pieces that change from one project to another: variable names, selectors, endpoint URLs, event names, callbacks, messages, and configuration values. CodeWeave treats those changing pieces as structured slots, turning static examples into reusable templates.

### Why migrate from vanilla JavaScript to React?

The first working frontend was intentionally built with browser-native JavaScript modules. That phase established the fundamental behavior of the interface and provided hands-on experience with DOM rendering, event handling, Fetch API requests, client-side state, and backend integration.

As CodeWeave grew, the interface began managing more connected state: expanded concepts, selected slot options, multiple examples, nested editing forms, and reusable UI behavior. React provides a component-based structure for managing that complexity while making the frontend easier to extend, test, and maintain.

The migration is being completed incrementally so working behavior can be preserved and verified as each part of the interface is rebuilt.

### Why finish the core workflow before authentication and deployment?

The current priority is to complete the application's central workflow:

1. Create a concept.
2. Add examples.
3. Define slots within those examples.
4. Add valid options for each slot.
5. Preview and copy the generated snippet.

Once this workflow is reliable and intuitive, authentication, ownership, deployment, and scaling can be added around a stable product foundation rather than an incomplete one.

## Portfolio Focus

This project demonstrates:

- Full-stack application planning
- Relational data modeling
- REST-style API design
- Nested create and update operations
- Pydantic request and response schema design
- Frontend development with modular vanilla JavaScript
- Migration from imperative DOM code to component-based React
- React state and component architecture for increasingly complex interactions
- Integration between a browser frontend and FastAPI endpoints
- Database seeding and schema migrations
- Incremental feature development, refactoring, and debugging
- Product thinking around learning, snippet reuse, validation, and future scalability
