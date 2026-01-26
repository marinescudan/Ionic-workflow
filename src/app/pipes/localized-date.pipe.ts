import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '@app/core/services/i18n/locale.service';
import { I18nService } from '@app/core/services/i18n/i18n.service';

export type DateFormat = 'short' | 'medium' | 'long' | 'time' | 'dateTime' | 'relative';

@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false, // Impure to react to language changes
})
export class LocalizedDatePipe implements PipeTransform {
  private readonly localeService = inject(LocaleService);
  private readonly i18nService = inject(I18nService);

  private lastLanguage = this.i18nService.getCurrentLanguage();
  private cache = new Map<string, string>();

  transform(value: Date | string | number | null | undefined, format: DateFormat = 'medium'): string {
    if (!value) return '';

    // Clear cache if language changed
    const currentLanguage = this.i18nService.getCurrentLanguage();
    if (currentLanguage !== this.lastLanguage) {
      this.cache.clear();
      this.lastLanguage = currentLanguage;
    }

    // Create cache key
    const cacheKey = `${value}_${format}_${currentLanguage}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Format based on type
    let formatted: string;
    try {
      switch (format) {
        case 'short':
          formatted = this.localeService.formatDateShort(value);
          break;
        case 'medium':
          formatted = this.localeService.formatDate(value);
          break;
        case 'long':
          formatted = this.localeService.formatDateLong(value);
          break;
        case 'time':
          formatted = this.localeService.formatTime(value);
          break;
        case 'dateTime':
          formatted = this.localeService.formatDateTime(value);
          break;
        case 'relative':
          formatted = this.localeService.formatRelativeTime(value);
          break;
        default:
          formatted = this.localeService.formatDate(value);
      }
    } catch (error) {
      console.error('LocalizedDatePipe error:', error);
      formatted = String(value);
    }

    // Cache result
    this.cache.set(cacheKey, formatted);

    return formatted;
  }
}

/*
💡 INTERVIEW: Impure Pipes & Language Changes

Why is this pipe impure (pure: false)?
- Pure pipes only re-run when input reference changes
- Language changes don't change the input date reference
- Impure pipes re-run on every change detection cycle
- This allows the pipe to respond to language switches

Performance Considerations:
- Impure pipes run frequently (every change detection)
- We implement caching to minimize Intl API calls
- Cache invalidated only when language changes
- This balances reactivity with performance

Alternative Approach:
- Use AsyncPipe with an Observable that emits on language change
- More complex but could be more performant for many instances

Common Interview Question:
Q: When should you use impure pipes?
A: Only when you need to react to external state changes (like language).
   Always implement caching to minimize performance impact.

Example Usage:
```html
<p>{{ someDate | localizedDate:'short' }}</p>
<p>{{ someDate | localizedDate:'relative' }}</p>
<p>{{ someDate | localizedDate:'dateTime' }}</p>
```
*/
