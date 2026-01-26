import { NotesState } from '@app/features/notes/store/notes.reducer';
import { I18nState } from '@app/features/i18n-demo/store/i18n.reducer';

// Root state interface - add all feature states here
export interface AppState {
  notes: NotesState;
  i18n: I18nState;
  // auth: AuthState;
  // settings: SettingsState;
}