import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { I18nService } from '@app/core/services/i18n/i18n.service';
import { I18nActions } from './i18n.actions';

@Injectable()
export class I18nEffects {
  private readonly actions$ = inject(Actions);
  private readonly i18nService = inject(I18nService);

  /**
   * Initialize language on app start
   */
  initLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(I18nActions.initLanguage),
      map(() => {
        // Get current language from service (already initialized in constructor)
        const language = this.i18nService.getCurrentLanguage();
        const direction = this.i18nService.getDirection();

        return I18nActions.setLanguageSuccess({ language, direction });
      }),
      catchError((error) => {
        console.error('Init language failed:', error);
        return of(
          I18nActions.setLanguageFailure({
            error: 'Failed to initialize language',
          })
        );
      })
    )
  );

  /**
   * Set new language
   */
  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(I18nActions.setLanguage),
      switchMap(({ language }) =>
        // Call service to set language (returns Promise)
        this.i18nService.setLanguage(language).then(() => {
          const direction = this.i18nService.getDirection();
          return I18nActions.setLanguageSuccess({ language, direction });
        })
      ),
      catchError((error) => {
        console.error('Set language failed:', error);
        return of(
          I18nActions.setLanguageFailure({
            error: error.message || 'Failed to set language',
          })
        );
      })
    )
  );

  /**
   * Log language changes (side effect)
   */
  logLanguageChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(I18nActions.setLanguageSuccess),
        tap(({ language, direction }) => {
          console.log(`Language changed to: ${language} (${direction})`);
          // Here you could:
          // - Send analytics event
          // - Update user preferences in API
          // - Trigger other side effects
        })
      ),
    { dispatch: false } // Non-dispatching effect
  );

  /**
   * Reload translations
   */
  reloadTranslations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(I18nActions.reloadTranslations),
      switchMap(() =>
        this.i18nService.reloadTranslations().then(() => {
          return I18nActions.reloadTranslationsSuccess();
        })
      ),
      catchError((error) => {
        console.error('Reload translations failed:', error);
        return of(
          I18nActions.reloadTranslationsFailure({
            error: error.message || 'Failed to reload translations',
          })
        );
      })
    )
  );
}

/*
💡 INTERVIEW: NgRx Effects for I18n

Effects Pattern:
1. **Listen** to actions (via ofType)
2. **Process** side effects (API calls, service methods)
3. **Dispatch** new actions (success/failure)

Key Operators:

**switchMap**
- Cancels previous requests
- Use for user-triggered actions
- Example: User clicks language selector multiple times quickly
- Only the latest selection completes

**map**
- Synchronous transformation
- Use for simple conversions
- Example: Init language just reads current state

**tap**
- Side effects without dispatching
- Use for logging, analytics
- Doesn't change action flow

**catchError**
- Handle errors gracefully
- Always return an action (of())
- Keeps effect stream alive

Effect Types:

1. **Dispatching Effects** (default)
   - Return actions
   - Continue the action flow
   - Most common type

2. **Non-dispatching Effects** ({ dispatch: false })
   - Pure side effects
   - Logging, analytics, external APIs
   - Don't affect store state

Common Interview Questions:

Q: Why use switchMap instead of mergeMap?
A: switchMap cancels previous incomplete requests. If user rapidly
   changes languages, only the latest request matters. mergeMap would
   process all requests, causing race conditions.

Q: How do you test effects?
A: Mock Actions observable, provide mock services, verify emitted
   actions. Use marble testing for complex async flows.

Q: What if I18nService.setLanguage fails?
A: catchError catches the error, logs it, and dispatches failure action.
   Reducer updates state with error. Component can show error message.

Q: Why separate logLanguageChange$ effect?
A: Separation of concerns. Main effect handles state updates,
   logging effect handles side effects. Easier to test and maintain.

Real-world Enhancements:
- Add retry logic (retryWhen operator)
- Debounce rapid language changes (debounceTime)
- Add optimistic updates (dispatch success immediately, revert on error)
- Persist to backend (call user preferences API)
- Track analytics (Google Analytics, Mixpanel)

Example with API persistence:
```typescript
saveLanguagePreference$ = createEffect(() =>
  this.actions$.pipe(
    ofType(I18nActions.setLanguageSuccess),
    switchMap(({ language }) =>
      this.http.put('/api/user/preferences', { language }).pipe(
        map(() => I18nActions.saveLanguagePreferenceSuccess()),
        catchError(error => of(I18nActions.saveLanguagePreferenceFailure({ error })))
      )
    )
  )
);
```
*/
