import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notesAdapter, NotesState } from './notes.reducer';
import { Note } from '../models/note.model';

// Feature selector - selects the 'notes' slice from root state
export const selectNotesState = createFeatureSelector<NotesState>('notes');

// Get built-in selectors from the entity adapter
const {
  selectIds,       // Select array of IDs
  selectEntities,  // Select entity dictionary
  selectAll,       // Select all entities as array
  selectTotal,     // Select count of entities
} = notesAdapter.getSelectors();

// Compose with feature selector
export const selectAllNotes = createSelector(
  selectNotesState,
  selectAll
);

export const selectNotesEntities = createSelector(
  selectNotesState,
  selectEntities
);

export const selectNotesTotal = createSelector(
  selectNotesState,
  selectTotal
);

export const selectNotesIds = createSelector(
  selectNotesState,
  selectIds
);

// UI State Selectors
export const selectNotesLoading = createSelector(
  selectNotesState,
  (state) => state.loading
);

export const selectNotesError = createSelector(
  selectNotesState,
  (state) => state.error
);

export const selectSelectedNoteId = createSelector(
  selectNotesState,
  (state) => state.selectedNoteId
);

export const selectFilterCategory = createSelector(
  selectNotesState,
  (state) => state.filterCategory
);


// Derived: Get selected note entity
export const selectSelectedNote = createSelector(
  selectNotesEntities,
  selectSelectedNoteId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

// Derived: Get pinned notes only
export const selectPinnedNotes = createSelector(
  selectAllNotes,
  (notes) => notes.filter(n => n.pinned)
);

// Derived: Get unpinned notes
export const selectUnpinnedNotes = createSelector(
  selectAllNotes,
  (notes) => notes.filter(n => !n.pinned)
);

// Derived: Get filtered notes by category
export const selectFilteredNotes = createSelector(
  selectAllNotes,
  selectFilterCategory,
  (notes, category) => {
    if (!category) return notes;
    return notes.filter(n => n.category === category);
  }
);

// Derived: Get notes by category with counts
export const selectNotesByCategory = createSelector(
  selectAllNotes,
  (notes) => {
    const categories = ['personal', 'work', 'ideas'] as const;
    return categories.map(category => ({
      category,
      notes: notes.filter(n => n.category === category),
      count: notes.filter(n => n.category === category).length,
    }));
  }
);

// Derived: Check if there are any notes
export const selectHasNotes = createSelector(
  selectNotesTotal,
  (total) => total > 0
);



// Parameterized: Get note by ID
export const selectNoteById = (id: string) =>
  createSelector(
    selectNotesEntities,
    (entities) => entities[id]
  );

// Parameterized: Search notes
export const selectNotesBySearch = (searchTerm: string) =>
  createSelector(
    selectAllNotes,
    (notes) => {
      if (!searchTerm?.trim()) return notes;

      const term = searchTerm.toLowerCase();
      return notes.filter(
        n =>
          n.title.toLowerCase().includes(term) ||
          n.content.toLowerCase().includes(term)
      );
    }
  );

// Parameterized: Get notes by category
export const selectNotesByCategoryParam = (category: Note['category']) =>
  createSelector(
    selectAllNotes,
    (notes) => notes.filter(n => n.category === category)
  );

// Parameterized: Get recent notes (within days)
export const selectRecentNotes = (days: number) =>
  createSelector(
    selectAllNotes,
    (notes) => {
      const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
      return notes.filter(n => new Date(n.createdAt).getTime() > cutoff);
    }
  );
