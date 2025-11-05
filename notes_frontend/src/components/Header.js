import React from 'react';

// PUBLIC_INTERFACE
export default function Header({ onNewNote, onToggleSidebar, isSidebarOpen }) {
  /** Header bar with app title, new note button, and sidebar toggle for mobile */
  return (
    <header className="header">
      <div className="header-left">
        <button
          className="icon-btn mobile-only"
          aria-label={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          onClick={onToggleSidebar}
          title={isSidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          ☰
        </button>
        <h1 className="app-title">Personal Notes</h1>
      </div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onNewNote} aria-label="Create new note">
          + New Note
        </button>
      </div>
    </header>
  );
}
