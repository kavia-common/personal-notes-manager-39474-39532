import React from 'react';

function formatDate(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleString();
  } catch {
    return '';
  }
}

// PUBLIC_INTERFACE
export default function NoteListItem({ note, isActive, onSelect, onDelete }) {
  /** A single item in the sidebar list showing title and updated time */
  return (
    <div
      className={`note-list-item ${isActive ? 'active' : ''}`}
      onClick={() => onSelect(note.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onSelect(note.id);
      }}
    >
      <div className="note-item-main">
        <div className="note-title" title={note.title || 'Untitled'}>
          {note.title || 'Untitled'}
        </div>
        <div className="note-date" title={`Updated: ${formatDate(note.updatedAt)}`}>
          {formatDate(note.updatedAt)}
        </div>
      </div>
      <button
        className="icon-btn danger"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id);
        }}
        aria-label="Delete note"
        title="Delete note"
      >
        🗑
      </button>
    </div>
  );
}
