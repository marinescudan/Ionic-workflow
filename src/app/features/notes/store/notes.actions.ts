
import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Note, CreateNoteDto, UpdateNoteDto } from '../models/note.model';

// createActionGroup (NgRx 14+) - cleaner than individual createAction calls
export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    // Load Notes
    'Load Notes': emptyProps(),
    'Load Notes Success': props<{ notes: Note[] }>(),
    'Load Notes Failure': props<{ error: string }>(),

    // Create Note
    'Add Note': props<{ note: CreateNoteDto }>(),
    'Add Note Success': props<{ note: Note }>(),
    'Add Note Failure': props<{ error: string }>(),

    // Update Note
    'Update Note': props<{ note: UpdateNoteDto }>(),
    'Update Note Success': props<{ note: Note }>(),
    'Update Note Failure': props<{ error: string }>(),

    // Delete Note
    'Delete Note': props<{ id: string }>(),
    'Delete Note Success': props<{ id: string }>(),
    'Delete Note Failure': props<{ error: string }>(),

    // Toggle Pin
    'Toggle Pin': props<{ id: string }>(),

    // Selection
    'Select Note': props<{ id: string | null }>(),
    'Clear Selection': emptyProps(),

    // Filter
    'Filter By Category': props<{ category: Note['category'] | null }>(),
    'Clear Filter': emptyProps(),
  },
});