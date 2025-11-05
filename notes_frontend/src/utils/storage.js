 // PUBLIC_INTERFACE
 /**
  * Storage utility for persisting notes to localStorage with a versioned schema.
  * Schema key: 'notes.v1'
  * Each note: { id: string, title: string, content: string, createdAt: number, updatedAt: number }
  */
 export const STORAGE_KEY = 'notes.v1';

 // PUBLIC_INTERFACE
 export function loadNotes() {
   /** Load notes array from localStorage or return [] */
   try {
     const raw = localStorage.getItem(STORAGE_KEY);
     if (!raw) return [];
     const parsed = JSON.parse(raw);
     if (Array.isArray(parsed)) {
       return parsed;
     }
     return [];
   } catch (e) {
     console.warn('Failed to load notes from localStorage', e);
     return [];
   }
 }

 // PUBLIC_INTERFACE
 export function saveNotes(notes) {
   /** Save notes array to localStorage */
   try {
     localStorage.setItem(STORAGE_KEY, JSON.stringify(notes || []));
   } catch (e) {
     console.warn('Failed to save notes to localStorage', e);
   }
 }

 // PUBLIC_INTERFACE
 export function generateId() {
   /** Generate a simple unique id */
   return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
 }
