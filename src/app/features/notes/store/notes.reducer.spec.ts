import { notesReducer, initialState, NotesState } from './notes.reducer';
import { NotesActions } from './notes.actions';
import { Note } from '../models/note.model';

describe('Notes Reducer', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test content',
    category: 'work',
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = { type: 'Unknown' } as any;
      const result = notesReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('loadNotes', () => {
    it('should set loading to true and clear error', () => {
      const action = NotesActions.loadNotes();
      const result = notesReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadNotesSuccess', () => {
    it('should add notes and set loading to false', () => {
      const notes = [mockNote];
      const action = NotesActions.loadNotesSuccess({ notes });
      const result = notesReducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.entities['1']).toEqual(mockNote);
      expect(result.loading).toBe(false);
    });
  });

  describe('loadNotesFailure', () => {
    it('should set error and loading to false', () => {
      const error = 'Failed to load';
      const action = NotesActions.loadNotesFailure({ error });
      const result = notesReducer(initialState, action);

      expect(result.error).toBe(error);
      expect(result.loading).toBe(false);
    });
  });

  describe('addNoteSuccess', () => {
    it('should add a new note to the state', () => {
      const action = NotesActions.addNoteSuccess({ note: mockNote });
      const result = notesReducer(initialState, action);

      expect(result.ids).toContain('1');
      expect(result.entities['1']).toEqual(mockNote);
    });
  });

  describe('deleteNoteSuccess', () => {
    it('should remove the note from state', () => {
      // Setup: Add a note first
      const stateWithNote = notesReducer(
        initialState,
        NotesActions.addNoteSuccess({ note: mockNote })
      );

      // Act: Delete the note
      const action = NotesActions.deleteNoteSuccess({ id: '1' });
      const result = notesReducer(stateWithNote, action);

      expect(result.ids).not.toContain('1');
      expect(result.entities['1']).toBeUndefined();
    });

    it('should clear selection if deleted note was selected', () => {
      // Setup
      let state = notesReducer(
        initialState,
        NotesActions.addNoteSuccess({ note: mockNote })
      );
      state = notesReducer(state, NotesActions.selectNote({ id: '1' }));

      // Act
      const result = notesReducer(state, NotesActions.deleteNoteSuccess({ id: '1' }));

      expect(result.selectedNoteId).toBeNull();
    });
  });

  describe('togglePin', () => {
    it('should toggle the pinned status', () => {
      // Setup: Add unpinned note
      const stateWithNote = notesReducer(
        initialState,
        NotesActions.addNoteSuccess({ note: mockNote })
      );

      // Act: Toggle pin
      const result = notesReducer(stateWithNote, NotesActions.togglePin({ id: '1' }));

      expect(result.entities['1']?.pinned).toBe(true);

      // Toggle again
      const result2 = notesReducer(result, NotesActions.togglePin({ id: '1' }));
      expect(result2.entities['1']?.pinned).toBe(false);
    });
  });
});
