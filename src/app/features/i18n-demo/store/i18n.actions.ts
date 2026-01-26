import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Locale, Direction } from '@app/core/services/i18n/i18n.model';

export const I18nActions = createActionGroup({
  source: 'I18n',
  events: {
    // Initialize language on app start
    'Init Language': emptyProps(),

    // Set new language
    'Set Language': props<{ language: Locale }>(),

    // Language change success
    'Set Language Success': props<{ language: Locale; direction: Direction }>(),

    // Language change failure
    'Set Language Failure': props<{ error: string }>(),

    // Reload translations
    'Reload Translations': emptyProps(),

    // Reload translations success
    'Reload Translations Success': emptyProps(),

    // Reload translations failure
    'Reload Translations Failure': props<{ error: string }>(),
  },
});

/*
💡 INTERVIEW: NgRx Actions for I18n

Action Design Patterns:
1. **Init Language**
   - Triggered on app bootstrap
   - Reads from localStorage/browser
   - Sets initial language state

2. **Set Language Flow**
   - User triggers "Set Language"
   - Effect calls I18nService
   - Success/Failure actions update state
   - Classic async action pattern

3. **Reload Translations**
   - Useful for development/testing
   - Rare in production
   - Could be triggered by admin panel

Why Use NgRx for I18n?
- Centralized language state
- Time-travel debugging (see language changes in DevTools)
- Predictable state updates
- Easy to test effects and reducers
- Can trigger side effects (analytics, API calls)

Alternative: Simple Service
- For small apps, I18nService alone might suffice
- NgRx adds complexity but improves scalability
- Choose based on app size and team preferences

Common Interview Questions:
Q: Why both "Set Language" and "Set Language Success"?
A: Async operations need three states: pending, success, failure.
   Allows showing loading states and handling errors.

Q: How would you persist language preference to backend?
A: Add effect that listens to "Set Language Success" and calls
   API to update user preferences. Keep UI responsive - don't block.

Q: Should language state be in root or feature store?
A: Root store. Language affects entire app, not just one feature.
   We're creating it in feature folder for demo purposes only.
*/
