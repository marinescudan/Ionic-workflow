import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '@app/core/services/i18n/locale.service';
import { I18nService } from '@app/core/services/i18n/i18n.service';
import { NumberFormatOptions } from '@app/core/services/i18n/i18n.model';

@Pipe({
  name: 'localizedNumber',
  standalone: true,
  pure: false, // Impure to react to language changes
})
export class LocalizedNumberPipe implements PipeTransform {
  private readonly localeService = inject(LocaleService);
  private readonly i18nService = inject(I18nService);

  private lastLanguage = this.i18nService.getCurrentLanguage();
  private cache = new Map<string, string>();

  transform(
    value: number | null | undefined,
    options?: NumberFormatOptions
  ): string {
    if (value === null || value === undefined) return '';

    // Clear cache if language changed
    const currentLanguage = this.i18nService.getCurrentLanguage();
    if (currentLanguage !== this.lastLanguage) {
      this.cache.clear();
      this.lastLanguage = currentLanguage;
    }

    // Create cache key
    const optionsKey = JSON.stringify(options || {});
    const cacheKey = `${value}_${optionsKey}_${currentLanguage}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Format number
    let formatted: string;
    try {
      formatted = this.localeService.formatNumber(value, options);
    } catch (error) {
      console.error('LocalizedNumberPipe error:', error);
      formatted = String(value);
    }

    // Cache result
    this.cache.set(cacheKey, formatted);

    return formatted;
  }
}

/*
💡 INTERVIEW: Number Formatting Across Locales

Key Differences by Locale:
- English (en-US): 1,234.56
- German (de-DE): 1.234,56
- French (fr-FR): 1 234,56
- Arabic (ar-SA): ١٬٢٣٤٫٥٦ (Arabic-Indic numerals)

Why Caching Matters:
- Intl.NumberFormat instantiation is expensive
- Formatting operations happen frequently in lists/tables
- Cache provides 10-100x performance improvement
- Memory impact is minimal for typical usage

Example Usage:
```html
<!-- Basic number -->
<p>{{ 1234.56 | localizedNumber }}</p>

<!-- With options -->
<p>{{ 1234.56 | localizedNumber:{ minimumFractionDigits: 2, maximumFractionDigits: 2 } }}</p>

<!-- In an ngFor (where caching really helps) -->
<ion-item *ngFor="let item of items">
  <ion-label>{{ item.price | localizedNumber }}</ion-label>
</ion-item>
```
*/
