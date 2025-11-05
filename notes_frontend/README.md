# Personal Notes App (React)

A modern, lightweight personal notes manager built with React. It features a responsive two-pane layout, localStorage persistence, and the Ocean Professional theme.

## Quick Start
- npm start
- Open http://localhost:3000

## Features
- Create, edit, view, and delete notes
- Auto-save to localStorage (schema key: notes.v1)
- Search/filter by title or body
- Responsive layout with collapsible sidebar on small screens
- Polished UI with Ocean Professional theme (primary #2563EB, secondary #F59E0B, error #EF4444)
- Empty states and no-results states
- Functional components with hooks

## Project Structure
- src/components: Header, Sidebar, Editor, SearchBar, NoteListItem, EmptyState
- src/utils/storage.js: LocalStorage CRUD helpers

No backend required. Environment variables from .env are not used by the app.
