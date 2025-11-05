import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import EmptyState from './components/EmptyState';
import { loadNotes, saveNotes, generateId } from './utils/storage';

// PUBLIC_INTERFACE
function App() {
  /**
   * Personal Notes App
   * - Sidebar lists notes with search/filter
   * - Editor to create/edit selected note
   * - Persist in localStorage (notes.v1)
   * - Responsive layout with collapsible sidebar
   * - Ocean Professional theme
   */
  const [notes, setNotes] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize from localStorage
  useEffect(() => {
    const existing = loadNotes();
    setNotes(existing);
    setActiveId(existing[0]?.id || null);
  }, []);

  // Persist changes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const activeNote = useMemo(
    () => notes.find((n) => n.id === activeId) || null,
    [notes, activeId]
  );

  // PUBLIC_INTERFACE
  const createNote = () => {
    const now = Date.now();
    const newNote = {
      id: generateId(),
      title: '',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setActiveId(newNote.id);
    setIsSidebarOpen(false); // on mobile, auto-close sidebar
  };

  // PUBLIC_INTERFACE
  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id) => {
    const target = notes.find((n) => n.id === id);
    if (!target) return;
    const ok = window.confirm('Delete this note? This cannot be undone.');
    if (!ok) return;
    const filtered = notes.filter((n) => n.id !== id);
    setNotes(filtered);
    if (activeId === id) {
      setActiveId(filtered[0]?.id || null);
    }
  };

  // PUBLIC_INTERFACE
  const selectNote = (id) => {
    setActiveId(id);
    setIsSidebarOpen(false);
  };

  // Filter notes by query (title or content)
  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes.sort((a, b) => b.updatedAt - a.updatedAt);
    return notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, query]);

  // PUBLIC_INTERFACE
  const toggleSidebar = () => setIsSidebarOpen((s) => !s);

  return (
    <div className="ocean-app">
      <Header
        onNewNote={createNote}
        onToggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="layout">
        <Sidebar
          notes={filteredNotes}
          activeId={activeId}
          onSelect={selectNote}
          onDelete={deleteNote}
          query={query}
          setQuery={setQuery}
          isOpen={isSidebarOpen}
        />
        <main className="main">
          {notes.length === 0 ? (
            <div className="main-empty">
              <EmptyState />
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="main-empty">
              <div className="empty-state">
                <h2>No results</h2>
                <p>Try adjusting your search terms.</p>
              </div>
            </div>
          ) : (
            <Editor note={activeNote} onChange={updateNote} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
