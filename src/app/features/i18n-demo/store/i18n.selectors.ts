import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I18nState } from './i18n.reducer';

// Feature selector
export const selectI18nState = createFeatureSelector<I18nState>('i18n');

// Current language
export const selectCurrentLanguage = createSelector(
  selectI18nState,
  (state) => state.currentLanguage
);

// Text direction
export const selectDirection = createSelector(
  selectI18nState,
  (state) => state.direction
);

// Is RTL
export const selectIsRTL = createSelector(
  selectDirection,
  (direction) => direction === 'rtl'
);

// Loading state
export const selectLoading = createSelector(
  selectI18nState,
  (state) => state.loading
);

// Error state
export const selectError = createSelector(
  selectI18nState,
  (state) => state.error
);

// Has error
export const selectHasError = createSelector(
  selectError,
  (error) => error !== null
);

// Is ready (not loading, no error)
export const selectIsReady = createSelector(
  selectLoading,
  selectHasError,
  (loading, hasError) => !loading && !hasError
);

// Language info (combined selector)
export const selectLanguageInfo = createSelector(
  selectCurrentLanguage,
  selectDirection,
  selectIsRTL,
  (language, direction, isRTL) => ({
    language,
    direction,
    isRTL,
  })
);

/*
💡 INTERVIEW: NgRx Selectors for I18n

Selector Benefits:
1. **Memoization**
   - Selectors cache results
   - Only recompute when input state changes
   - Prevents unnecessary re-renders

2. **Composition**
   - Build complex selectors from simple ones
   - selectIsRTL derives from selectDirection
   - selectIsReady combines loading + error

3. **Testability**
   - Pure functions, easy to test
   - No dependencies, just input → output
   - Mock state, verify output

4. **Type Safety**
   - TypeScript infers return types
   - Autocomplete in components
   - Compile-time error checking

Selector Pattern Examples:

// Simple property selector
selectCurrentLanguage → 'en'

// Derived selector (one input)
selectIsRTL → true/false

// Combined selector (multiple inputs)
selectLanguageInfo → { language: 'ar', direction: 'rtl', isRTL: true }

Usage in Components:
```typescript
// Single selector
currentLanguage$ = this.store.select(selectCurrentLanguage);

// Multiple selectors
languageInfo$ = this.store.select(selectLanguageInfo);

// In template with async pipe
<p>{{ (languageInfo$ | async)?.language }}</p>
```

Common Interview Questions:
Q: Why create selectIsRTL when we have selectDirection?
A: Convenience and readability. Components often need boolean,
   not the direction string. Selector hides the comparison logic.

Q: When do selectors recompute?
A: Only when their input state changes (by reference).
   Memoization prevents recomputation on every store change.

Q: How would you handle parameterized selectors?
A: Use factory functions that return selectors:
   ```typescript
   export const selectLanguageConfig = (code: Locale) =>
     createSelector(selectSupportedLanguages, langs =>
       langs.find(l => l.code === code)
     );
   ```

Performance Note:
- Selectors are the recommended way to read from store
- Always prefer selectors over directly accessing state
- Memoization makes them extremely efficient
*/
