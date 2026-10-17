
# CodeWeave

**An interactive library for learning programming concepts and adapting reusable code examples.**

CodeWeave brings explanations and practical snippets into one place. A concept can be a standalone explanation, or it can include multiple code examples with selectable **slots**: parts of a snippet that can be changed without rewriting the whole thing.

The long-term goal is a searchable, curated reference covering programming languages, frameworks, and libraries, with optional study tools and an AI-assisted workflow for proposing new content from documentation. CodeWeave is being built incrementally as a full-stack learning and portfolio project.

## Project status

**Working prototype, under active development.** The original vanilla JavaScript frontend has been replaced with React, and the core concept-management flow works. Development currently uses SQLite; a persistent production database and public release have not been set up.

### Available now

- Create, view, edit, and delete programming concepts.
- Store a concept's name, description, and language.
- Add, edit, and remove code examples (called *snippets* in the interface).
- Keep explanation-only concepts without displaying an empty snippet section.
- Expand or collapse concepts, search by name, and sort A-Z or Z-A.
- View multiple examples for a concept and switch between them.
- Interact with existing slot options embedded in snippets.
- Save and retrieve nested concept, example, slot, and option data through FastAPI.

### Not yet implemented

- Visual tools for creating and editing slots and their options in the React editor.
- Automated backend and frontend test suites.
- Copy-to-clipboard for completed snippets and dedicated snippet show/hide controls.
- Study/flashcard mode, advanced organization, and scalable server-side search.
- AI-assisted concept discovery, duplicate checking, and an approval queue.
- User accounts, sharing, and production hosting with durable storage.

## How CodeWeave works

A concept contains an explanation and, optionally, one or more examples. Each example can define slots, and each slot can offer selectable values.

```text
Concept (name, description, language)
└── Example / snippet (title, code)
    └── Slot (label, type)
        └── Slot options (selectable values)
```

For example, a JavaScript event-listener snippet might contain:

```javascript
document.querySelector("##Selector##")
  .addEventListener("##Event Type##", () => {
    console.log("Hello!");
  });
```

The `##Selector##` and `##Event Type##` placeholders correspond to saved slots. A user can select an option such as `#save-btn` or `click`, and CodeWeave displays the resulting snippet interactively.

Not every concept needs code. A concept describing a rendering lifecycle, networking principle, or design pattern can consist of its explanation alone. In the future, examples will also be independently collapsible, allowing users to reveal them after trying to recall the answer themselves.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, JavaScript, Vite, CSS |
| Backend | Python, FastAPI, Pydantic |
| Data | SQLAlchemy, SQLite (development), Alembic |
| Development | Replit, Git, GitHub |

The frontend communicates with FastAPI through the Fetch API. The React development server proxies API requests to FastAPI, while FastAPI can serve a built frontend from `frontend/dist`.

## Repository layout

```text
CodeWeave/
├── frontend/
│   ├── src/
│   │   ├── api/          # Frontend API requests
│   │   ├── components/   # React UI components
│   │   ├── App.jsx       # Application state and layout
│   │   └── index.css     # Application styles
│   └── vite.config.js    # Development server and API proxy
├── models/               # SQLAlchemy models
├── routers/              # FastAPI routes
├── schemas/              # Pydantic schemas
├── alembic/              # Database migrations
├── db.py                 # Database engine and sessions
├── main.py               # FastAPI entry point
├── seed.py               # Optional, destructive sample-data reset
├── requirements.txt      # Backend dependencies
└── readme.md
```

## Run locally

**Prerequisites:** Python 3.11+, a Node.js version compatible with Vite 8, npm, and Git.

1. Clone the repository and enter the project directory:

   ```bash
   git clone https://github.com/timmuh03/CodeWeave.git
   cd CodeWeave
   ```

2. Set up the Python environment and install backend dependencies:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```

   On Windows, activate the environment with `.venv\Scripts\activate` in Command Prompt or `.venv\Scripts\Activate.ps1` in PowerShell.

3. Create `.env` in the repository root:

   ```env
   DATABASE_URL=sqlite:///./codeweave.db
   ```

4. Start the backend from the repository root:

   ```bash
   uvicorn main:app --reload --port 8000
   ```

5. In another terminal, install and start the frontend:

   ```bash
   cd frontend
   npm ci
   npm run dev
   ```

Open **http://localhost:5173** for the React app and **http://localhost:8000/docs** for FastAPI's interactive API documentation. The backend creates missing tables on startup for the current models.

> **Important: `python3 seed.py` deletes and recreates the database tables before inserting sample concepts.** Use it only with a disposable development database. Do not run it against a database containing work you want to keep.

### Current development checks

From `frontend/`:

```bash
npm run lint
npm run build
```

An automated test suite is the next development milestone; these commands check linting and frontend compilation, not application behavior.

## Roadmap

The milestones below describe the intended sequence, not features that are already available. Priorities may change as the application is tested and used.

### 1. Build a reliable foundation — next

- [ ] Add pytest and FastAPI API tests using an isolated test database.
- [ ] Cover concept CRUD, nested updates, deletion, invalid input, and error responses.
- [ ] Add Vitest and React Testing Library for important UI interactions.
- [ ] Improve save failures, loading states, validation, and regression checks.
- [ ] Run automated checks as part of the development workflow.

### 2. Finish the core authoring experience

- [ ] Build visual controls to create, edit, reorder, and delete snippet slots and options.
- [ ] Validate that placeholders in example text match defined slots.
- [ ] Improve snippet editing, previews, and confirmation/error feedback.
- [ ] Add copy-to-clipboard for the currently selected snippet configuration.
- [ ] Refine accessibility and mobile usability.

### 3. Make concepts useful for both reference and study

- [ ] Let readers independently hide or reveal snippets, even when snippets exist.
- [ ] Add an optional study mode that reveals explanations and examples in stages.
- [ ] Explore lightweight study progress or review history after the basic mode works.
- [ ] Polish navigation and reading experience for both short and detailed concepts.

### 4. Organize and scale the library

- [ ] Organize concepts by language, then library/framework and topic.
- [ ] Introduce tags and supporting metadata where useful.
- [ ] Add server-side search, filters, and pagination or incremental loading.
- [ ] Load concept details on demand instead of preloading the entire library.
- [ ] Plan versioning, data migrations, backups, and import/export tools.

### 5. Introduce AI-assisted, human-approved content

- [ ] Select **one language or library at a time** and identify authoritative documentation.
- [ ] Have AI propose concept topics and record their documentation sources.
- [ ] Detect exact and near-duplicate suggestions against existing and pending concepts.
- [ ] Build a separate review queue to approve, reject, revise, or combine proposals.
- [ ] Generate draft explanations and examples for approved topics, with source and version metadata.
- [ ] Validate code examples, slot references, and content quality before publication.

**Editorial principle:** AI proposes; a human approves. Generated content should be checked against its sources, and documentation should be referenced rather than copied wholesale. AI suggestions will not automatically become published concepts.

### 6. Prepare for a public application

- [ ] Establish a persistent production database and backup/recovery procedures.
- [ ] Add deployment and continuous-integration workflows.
- [ ] Introduce authentication, content ownership, and permissions if multi-user features are needed.
- [ ] Consider sharing, personal collections, and community contributions after the core library is reliable.

## Why this project?

CodeWeave began as a way to practice FastAPI, databases, and frontend development. It has grown into a project about making programming knowledge easier to understand, revisit, and apply.

The original frontend used vanilla JavaScript to establish the core interactions. Migrating it to React provided hands-on experience with components, state management, API integration, debugging, and maintaining a working application through a major refactor.

The next focus is **reliability first**: adding tests before expanding the editor and eventually introducing AI-generated content at scale.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).
