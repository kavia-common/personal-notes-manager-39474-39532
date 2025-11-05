import React from 'react';
import SearchBar from './SearchBar';
import NoteListItem from './NoteListItem';

// PUBLIC_INTERFACE
export default function Sidebar({
  notes,
  activeId,
  onSelect,
  onDelete,
  query,
  setQuery,
  isOpen,
}) {
  /** Sidebar listing notes with a search bar. Collapsible on mobile via isOpen. */
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <SearchBar query={query} setQuery={setQuery} />
      <div className="note-list">
        {notes.length === 0 ? (
          <div className="empty-state small">No notes found.</div>
        ) : (
          notes.map((n) => (
            <NoteListItem
              key={n.id}
              note={n}
              isActive={n.id === activeId}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </aside>
  );
}
