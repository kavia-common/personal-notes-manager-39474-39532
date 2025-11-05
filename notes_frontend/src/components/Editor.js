import React, { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function Editor({ note, onChange }) {
  /**
   * Editor for title and content. Auto-saves via onChange controlled props.
   * When no note is selected, shows an empty view.
   */
  const titleRef = useRef(null);

  useEffect(() => {
    // Focus title when a new note is created
    if (note && titleRef.current && (note.title || '') === '' && (note.content || '') === '') {
      titleRef.current.focus();
    }
  }, [note?.id]);

  if (!note) {
    return (
      <div className="editor empty">
        <div className="empty-state">
          <h2>Select a note to view or edit</h2>
          <p>Create a new note from the top right to get started.</p>
        </div>
      </div>
    );
  }

  const onTitle = (e) => {
    onChange({ ...note, title: e.target.value, updatedAt: Date.now() });
  };

  const onContent = (e) => {
    onChange({ ...note, content: e.target.value, updatedAt: Date.now() });
  };

  return (
    <div className="editor">
      <input
        ref={titleRef}
        className="title-input"
        placeholder="Untitled"
        value={note.title}
        onChange={onTitle}
        aria-label="Note title"
      />
      <textarea
        className="content-input"
        placeholder="Write your note here..."
        value={note.content}
        onChange={onContent}
        aria-label="Note content"
      />
    </div>
  );
}
