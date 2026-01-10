import {
  selectAllNotes,
  selectNotesLoading,
  selectSelectedNote,
  selectPinnedNotes,
  selectFilteredNotes,
  selectNoteById,
} from './notes.selectors';
import { NotesState } from './notes.reducer';
import { Note } from '../models/note.model';

describe('Notes Selectors', () => {
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'Pinned Note',
      content: 'Content 1',
      category: 'work',
      pinned: true,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'Regular Note',
      content: 'Content 2',
      category: 'personal',
      pinned: false,
      createdAt: '2024-01-02',
      updatedAt: '2024-01-02',
    },
  ];

  const mockState = {
    notes: {
      ids: ['1', '2'],
      entities: {
        '1': mockNotes[0],
        '2': mockNotes[1],
      },
      selectedNoteId: '1',
      filterCategory: null,
      loading: false,
      error: null,
    } as NotesState,
  };

  describe('selectAllNotes', () => {
    it('should return all notes as an array', () => {
      const result = selectAllNotes(mockState);
      expect(result.length).toBe(2);
    });
  });

  describe('selectNotesLoading', () => {
    it('should return the loading state', () => {
      const result = selectNotesLoading(mockState);
      expect(result).toBe(false);
    });
  });

  describe('selectSelectedNote', () => {
    it('should return the selected note', () => {
      const result = selectSelectedNote(mockState);
      expect(result?.id).toBe('1');
      expect(result?.title).toBe('Pinned Note');
    });

    it('should return null when no note is selected', () => {
      const stateNoSelection = {
        notes: { ...mockState.notes, selectedNoteId: null },
      };
      const result = selectSelectedNote(stateNoSelection);
      expect(result).toBeNull();
    });
  });

  describe('selectPinnedNotes', () => {
    it('should return only pinned notes', () => {
      const result = selectPinnedNotes(mockState);
      expect(result.length).toBe(1);
      expect(result[0].pinned).toBe(true);
    });
  });

  describe('selectFilteredNotes', () => {
    it('should return all notes when no filter is set', () => {
      const result = selectFilteredNotes(mockState);
      expect(result.length).toBe(2);
    });

    it('should filter by category when filter is set', () => {
      const filteredState = {
        notes: { ...mockState.notes, filterCategory: 'work' as const },
      };
      const result = selectFilteredNotes(filteredState);
      expect(result.length).toBe(1);
      expect(result[0].category).toBe('work');
    });
  });

  describe('selectNoteById', () => {
    it('should return the note with matching id', () => {
      const result = selectNoteById('2')(mockState);
      expect(result?.id).toBe('2');
      expect(result?.title).toBe('Regular Note');
    });

    it('should return undefined for non-existent id', () => {
      const result = selectNoteById('999')(mockState);
      expect(result).toBeUndefined();
    });
  });
});
