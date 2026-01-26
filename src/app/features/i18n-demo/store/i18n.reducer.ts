import { createReducer, on } from '@ngrx/store';
import { Locale, Direction } from '@app/core/services/i18n/i18n.model';
import { I18nActions } from './i18n.actions';

export interface I18nState {
  currentLanguage: Locale;
  direction: Direction;
  loading: boolean;
  error: string | null;
}

const initialState: I18nState = {
  currentLanguage: 'en',
  direction: 'ltr',
  loading: false,
  error: null,
};

export const i18nReducer = createReducer(
  initialState,

  // Init Language
  on(I18nActions.initLanguage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Set Language
  on(I18nActions.setLanguage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Set Language Success
  on(I18nActions.setLanguageSuccess, (state, { language, direction }) => ({
    ...state,
    currentLanguage: language,
    direction,
    loading: false,
    error: null,
  })),

  // Set Language Failure
  on(I18nActions.setLanguageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Reload Translations
  on(I18nActions.reloadTranslations, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Reload Translations Success
  on(I18nActions.reloadTranslationsSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  // Reload Translations Failure
  on(I18nActions.reloadTranslationsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

/*
💡 INTERVIEW: Reducer Pattern for I18n

State Structure:
1. **currentLanguage**
   - Locale type ensures type safety
   - Synced with I18nService
   - Drives all localized content

2. **direction**
   - Cached from language config
   - Avoids service lookups in components
   - Used for RTL/LTR layout decisions

3. **loading**
   - Shows loading state during language switch
   - Important for large translation files
   - Better UX than instant switch that might flash

4. **error**
   - Handles failed language loads
   - Could show toast/alert to user
   - Allows retry logic

Immutability:
- All updates use spread operator
- Never mutate state directly
- Enables time-travel debugging
- Required for NgRx to detect changes

Common Interview Questions:
Q: Why store direction in state if we can derive it from language?
A: Performance. Derived selectors are memoized, but storing it directly
   is simpler and equally performant. It's cached from the service anyway.

Q: How would you handle optimistic updates?
A: Update state immediately in "Set Language", revert in "Set Language Failure".
   Provides instant feedback while API call completes.

Q: Should loading be true during init?
A: Yes if you show a splash screen. No if you want content to render
   immediately with default language. Trade-off between perceived performance.

Redux DevTools View:
```
State {
  i18n: {
    currentLanguage: "es",
    direction: "ltr",
    loading: false,
    error: null
  }
}
```
*/
