import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NotesActions } from './notes.actions';
import { Note } from '../models/note.model';

// Extend EntityState for automatic ID/entity management
export interface NotesState extends EntityState<Note> {
  selectedNoteId: string | null;
  filterCategory: Note['category'] | null;
  loading: boolean;
  error: string | null;
}

// Create the entity adapter
export const notesAdapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  // Custom ID selector (default looks for 'id' property)
  selectId: (note: Note) => note.id,

  // Sort by pinned first, then by createdAt descending
  sortComparer: (a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  },
});

// Initial state using adapter helper
export const initialState: NotesState = notesAdapter.getInitialState({
  selectedNoteId: null,
  filterCategory: null,
  loading: false,
  error: null,
});


export const notesReducer = createReducer(
  initialState,

  // ========== Load Notes ==========
  on(NotesActions.loadNotes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(NotesActions.loadNotesSuccess, (state, { notes }) =>
    notesAdapter.setAll(notes, {
      ...state,
      loading: false,
      error: null,
    })
  ),

  on(NotesActions.loadNotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ========== Add Note ==========
  on(NotesActions.addNote, (state) => ({
    ...state,
    loading: true,
  })),

  on(NotesActions.addNoteSuccess, (state, { note }) =>
    notesAdapter.addOne(note, {
      ...state,
      loading: false,
    })
  ),

  on(NotesActions.addNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ========== Update Note ==========
  on(NotesActions.updateNoteSuccess, (state, { note }) =>
    notesAdapter.updateOne(
      { id: note.id, changes: note },
      state
    )
  ),

  // ========== Delete Note ==========
  on(NotesActions.deleteNote, (state) => ({
    ...state,
    loading: true,
  })),

  on(NotesActions.deleteNoteSuccess, (state, { id }) =>
    notesAdapter.removeOne(id, {
      ...state,
      loading: false,
      // Clear selection if deleted note was selected
      selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
    })
  ),

  on(NotesActions.deleteNoteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // ========== Toggle Pin ==========
  on(NotesActions.togglePin, (state, { id }) => {
    const note = state.entities[id];
    if (!note) return state;

    return notesAdapter.updateOne(
      { id, changes: { pinned: !note.pinned } },
      state
    );
  }),

  // ========== Selection ==========
  on(NotesActions.selectNote, (state, { id }) => ({
    ...state,
    selectedNoteId: id,
  })),

  on(NotesActions.clearSelection, (state) => ({
    ...state,
    selectedNoteId: null,
  })),

  // ========== Filter ==========
  on(NotesActions.filterByCategory, (state, { category }) => ({
    ...state,
    filterCategory: category,
  })),

  on(NotesActions.clearFilter, (state) => ({
    ...state,
    filterCategory: null,
  }))
);