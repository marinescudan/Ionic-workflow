import { Injectable, inject } from '@angular/core';
import { I18nService } from './i18n.service';
import {
  Locale,
  RelativeTimeUnit,
  NumberFormatOptions,
  CurrencyFormatOptions,
  PercentFormatOptions,
} from './i18n.model';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private readonly i18nService = inject(I18nService);

  /**
   * Get current locale for Intl API
   */
  private getCurrentLocale(): string {
    const locale = this.i18nService.getCurrentLanguage();
    // Map our locale codes to standard locale strings
    const localeMap: Record<Locale, string> = {
      en: 'en-US',
      es: 'es-ES',
      fr: 'fr-FR',
      de: 'de-DE',
      ar: 'ar-SA',
      zh: 'zh-CN',
    };
    return localeMap[locale] || 'en-US';
  }

  // ==================== DATE FORMATTING ====================

  /**
   * Format date with short format (e.g., "1/26/2026")
   */
  formatDateShort(date: Date | string | number): string {
    const dateObj = this.toDate(date);
    return new Intl.DateTimeFormat(this.getCurrentLocale(), {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(dateObj);
  }

  /**
   * Format date with medium format (e.g., "Jan 26, 2026")
   */
  formatDate(date: Date | string | number): string {
    const dateObj = this.toDate(date);
    return new Intl.DateTimeFormat(this.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObj);
  }

  /**
   * Format date with long format (e.g., "January 26, 2026")
   */
  formatDateLong(date: Date | string | number): string {
    const dateObj = this.toDate(date);
    return new Intl.DateTimeFormat(this.getCurrentLocale(), {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(dateObj);
  }

  /**
   * Format time (e.g., "3:45 PM")
   */
  formatTime(date: Date | string | number): string {
    const dateObj = this.toDate(date);
    return new Intl.DateTimeFormat(this.getCurrentLocale(), {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  }

  /**
   * Format date and time (e.g., "Jan 26, 2026, 3:45 PM")
   */
  formatDateTime(date: Date | string | number): string {
    const dateObj = this.toDate(date);
    return new Intl.DateTimeFormat(this.getCurrentLocale(), {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(dateObj);
  }

  /**
   * Format relative time (e.g., "2 hours ago", "in 3 days")
   */
  formatRelativeTime(date: Date | string | number): string {
    const dateObj = this.toDate(date);
    const now = new Date();
    const diffMs = dateObj.getTime() - now.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    const diffWeek = Math.round(diffDay / 7);
    const diffMonth = Math.round(diffDay / 30);
    const diffYear = Math.round(diffDay / 365);

    const rtf = new Intl.RelativeTimeFormat(this.getCurrentLocale(), {
      numeric: 'auto',
      style: 'long',
    });

    // Determine the best unit and value
    if (Math.abs(diffSec) < 60) {
      return rtf.format(diffSec, 'second');
    } else if (Math.abs(diffMin) < 60) {
      return rtf.format(diffMin, 'minute');
    } else if (Math.abs(diffHour) < 24) {
      return rtf.format(diffHour, 'hour');
    } else if (Math.abs(diffDay) < 7) {
      return rtf.format(diffDay, 'day');
    } else if (Math.abs(diffWeek) < 4) {
      return rtf.format(diffWeek, 'week');
    } else if (Math.abs(diffMonth) < 12) {
      return rtf.format(diffMonth, 'month');
    } else {
      return rtf.format(diffYear, 'year');
    }
  }

  /**
   * Format relative time with specific unit
   */
  formatRelativeTimeWithUnit(
    value: number,
    unit: RelativeTimeUnit,
    style: 'long' | 'short' | 'narrow' = 'long'
  ): string {
    const rtf = new Intl.RelativeTimeFormat(this.getCurrentLocale(), {
      numeric: 'auto',
      style,
    });
    return rtf.format(value, unit);
  }

  // ==================== NUMBER FORMATTING ====================

  /**
   * Format number with locale-specific grouping and decimals
   */
  formatNumber(value: number, options?: NumberFormatOptions): string {
    return new Intl.NumberFormat(this.getCurrentLocale(), {
      minimumFractionDigits: options?.minimumFractionDigits,
      maximumFractionDigits: options?.maximumFractionDigits,
      minimumIntegerDigits: options?.minimumIntegerDigits,
      useGrouping: options?.useGrouping ?? true,
    }).format(value);
  }

  /**
   * Format decimal number
   */
  formatDecimal(value: number, fractionDigits: number = 2): string {
    return new Intl.NumberFormat(this.getCurrentLocale(), {
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
      useGrouping: true,
    }).format(value);
  }

  /**
   * Format currency
   */
  formatCurrency(value: number, options: CurrencyFormatOptions): string {
    return new Intl.NumberFormat(this.getCurrentLocale(), {
      style: 'currency',
      currency: options.currency,
      currencyDisplay: options.currencyDisplay || 'symbol',
      minimumFractionDigits: options.minimumFractionDigits,
      maximumFractionDigits: options.maximumFractionDigits,
      useGrouping: options.useGrouping ?? true,
    }).format(value);
  }

  /**
   * Format percentage
   */
  formatPercent(value: number, options?: PercentFormatOptions): string {
    return new Intl.NumberFormat(this.getCurrentLocale(), {
      style: 'percent',
      minimumFractionDigits: options?.minimumFractionDigits ?? 0,
      maximumFractionDigits: options?.maximumFractionDigits ?? 2,
      signDisplay: options?.signDisplay,
      useGrouping: options?.useGrouping ?? true,
    }).format(value);
  }

  /**
   * Format compact number (e.g., 1.2K, 1.5M)
   */
  formatCompact(value: number): string {
    return new Intl.NumberFormat(this.getCurrentLocale(), {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(value);
  }

  /**
   * Format file size (bytes to KB, MB, GB)
   */
  formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    const formatted = this.formatDecimal(size, unitIndex === 0 ? 0 : 2);
    return `${formatted} ${units[unitIndex]}`;
  }

  // ==================== HELPER METHODS ====================

  /**
   * Convert various date inputs to Date object
   */
  private toDate(date: Date | string | number): Date {
    if (date instanceof Date) {
      return date;
    }
    return new Date(date);
  }

  /**
   * Get locale-specific first day of week (0 = Sunday, 1 = Monday)
   */
  getFirstDayOfWeek(): number {
    const locale = this.getCurrentLocale();
    // Most European countries use Monday (1), US uses Sunday (0)
    const mondayFirst = ['de-DE', 'fr-FR', 'es-ES', 'zh-CN'];
    return mondayFirst.includes(locale) ? 1 : 0;
  }

  /**
   * Get locale-specific decimal separator
   */
  getDecimalSeparator(): string {
    const formatted = this.formatNumber(1.1);
    return formatted.charAt(1);
  }

  /**
   * Get locale-specific thousands separator
   */
  getThousandsSeparator(): string {
    const formatted = this.formatNumber(1000);
    return formatted.charAt(1);
  }
}

/*
💡 INTERVIEW: Locale Service & Intl API

Key Concepts:
1. **Intl API Benefits**
   - Native browser support (no external libraries)
   - Automatic locale-specific formatting
   - Consistent across all modern browsers
   - Supports 400+ locales out of the box

2. **Date Formatting Strategy**
   - Multiple formats: short, medium, long, datetime
   - Relative time for "human-friendly" dates
   - Respects locale conventions (month/day order, 12/24 hour)

3. **Number Formatting**
   - Decimal separators vary by locale (. vs ,)
   - Grouping separators vary (1,000 vs 1.000 vs 1 000)
   - Currency symbols and positions differ
   - Percentages format differently

4. **Performance Considerations**
   - Intl formatters can be cached for repeated use
   - For high-frequency formatting, consider memoization
   - Current implementation prioritizes simplicity over optimization

5. **RTL Support**
   - Intl API automatically handles RTL number formatting
   - Arabic numerals display correctly in RTL context
   - Currency symbols position correctly

Common Interview Questions:
Q: Why use Intl API instead of libraries like moment.js or date-fns?
A: Intl API is native, zero-bundle-size, and maintained by browser vendors.
   Modern apps should prefer native APIs for standard use cases.

Q: How would you optimize for repeated formatting?
A: Create and cache Intl.DateTimeFormat and Intl.NumberFormat instances
   instead of creating new ones each time. Store them in a Map keyed by options.

Q: How do you handle relative time across different time zones?
A: Intl.RelativeTimeFormat works with local time. For timezone-aware
   formatting, combine with Intl.DateTimeFormat's timeZone option.

Q: What about older browsers?
A: Intl API is supported in all modern browsers (IE11+). For older browsers,
   use polyfills like @formatjs/intl or fallback to libraries.

Example Usage:
```typescript
// In a component
formattedDate = this.localeService.formatDateLong(new Date());
relativeTime = this.localeService.formatRelativeTime(someDate);
price = this.localeService.formatCurrency(29.99, { currency: 'USD' });
```
*/
