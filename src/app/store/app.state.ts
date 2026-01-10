import { NotesState } from '@app/features/notes/store/notes.reducer';

// Root state interface - add all feature states here
export interface AppState {
  notes: NotesState;
  // auth: AuthState;
  // settings: SettingsState;
}