import React from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ query, setQuery }) {
  /** Search bar to filter notes by title or content */
  return (
    <div className="search-bar">
      <span className="search-icon" aria-hidden>🔎</span>
      <input
        type="text"
        placeholder="Search notes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search notes"
      />
      {query && (
        <button
          className="icon-btn"
          onClick={() => setQuery('')}
          aria-label="Clear search"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
