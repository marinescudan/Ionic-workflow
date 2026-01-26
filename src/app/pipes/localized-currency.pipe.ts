import { Pipe, PipeTransform, inject } from '@angular/core';
import { LocaleService } from '@app/core/services/i18n/locale.service';
import { I18nService } from '@app/core/services/i18n/i18n.service';

@Pipe({
  name: 'localizedCurrency',
  standalone: true,
  pure: false, // Impure to react to language changes
})
export class LocalizedCurrencyPipe implements PipeTransform {
  private readonly localeService = inject(LocaleService);
  private readonly i18nService = inject(I18nService);

  private lastLanguage = this.i18nService.getCurrentLanguage();
  private cache = new Map<string, string>();

  transform(
    value: number | null | undefined,
    currencyCode: string = 'USD',
    display: 'symbol' | 'code' | 'name' = 'symbol'
  ): string {
    if (value === null || value === undefined) return '';

    // Clear cache if language changed
    const currentLanguage = this.i18nService.getCurrentLanguage();
    if (currentLanguage !== this.lastLanguage) {
      this.cache.clear();
      this.lastLanguage = currentLanguage;
    }

    // Create cache key
    const cacheKey = `${value}_${currencyCode}_${display}_${currentLanguage}`;

    // Check cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Format currency
    let formatted: string;
    try {
      formatted = this.localeService.formatCurrency(value, {
        currency: currencyCode,
        currencyDisplay: display,
      });
    } catch (error) {
      console.error('LocalizedCurrencyPipe error:', error);
      formatted = `${currencyCode} ${value}`;
    }

    // Cache result
    this.cache.set(cacheKey, formatted);

    return formatted;
  }
}

/*
💡 INTERVIEW: Currency Formatting Complexity

Currency Formatting Varies by:
1. **Symbol Position**
   - USD in English: $1,234.56
   - EUR in French: 1 234,56 €
   - GBP in English: £1,234.56

2. **Number Formatting**
   - Decimal separators differ
   - Grouping separators differ
   - Decimal places vary (JPY has 0, most have 2, some have 3)

3. **Symbol vs Code vs Name**
   - symbol: $1,234.56
   - code: USD 1,234.56
   - name: 1,234.56 US dollars

Common Interview Questions:
Q: How do you handle currency conversion?
A: This pipe only formats display. Conversion requires exchange rates
   from an API, stored separately. Never mix formatting with business logic.

Q: Why not use Angular's built-in currency pipe?
A: Angular's pipe is locale-aware but doesn't react to runtime language changes
   in the same way. Our impure pipe integrates with our I18n system.

Q: How would you handle cryptocurrency?
A: Extend CurrencyFormatOptions to support custom symbols and decimal places.
   Bitcoin often uses 8 decimal places, Ethereum uses 18.

Example Usage:
```html
<!-- Default USD with symbol -->
<p>{{ 1234.56 | localizedCurrency }}</p>

<!-- EUR with symbol -->
<p>{{ 1234.56 | localizedCurrency:'EUR' }}</p>

<!-- GBP with code -->
<p>{{ 1234.56 | localizedCurrency:'GBP':'code' }}</p>

<!-- JPY (no decimals) -->
<p>{{ 1234 | localizedCurrency:'JPY' }}</p>
```

Real-world Note:
- Always store amounts in smallest unit (cents, not dollars)
- Store currency code separately
- Format only for display, never for calculations
*/
