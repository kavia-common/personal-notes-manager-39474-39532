import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState() {
  /** Empty state when there are zero notes in the store */
  return (
    <div className="empty-state">
      <h2>Welcome to Personal Notes</h2>
      <p>Create your first note to get started.</p>
    </div>
  );
}
