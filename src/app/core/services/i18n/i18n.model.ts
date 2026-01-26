/**
 * Supported locale codes
 */
export type Locale = 'en' | 'es' | 'fr' | 'de' | 'ar' | 'zh';

/**
 * Text direction for layout
 */
export type Direction = 'ltr' | 'rtl';

/**
 * Supported language configuration
 */
export interface SupportedLanguage {
  /** Language code (ISO 639-1) */
  code: Locale;

  /** Native language name */
  nativeName: string;

  /** English language name */
  englishName: string;

  /** Text direction */
  direction: Direction;

  /** Flag emoji or icon */
  flag: string;

  /** Is this the default language? */
  isDefault?: boolean;
}

/**
 * Parameters for translation interpolation
 */
export interface TranslationParams {
  [key: string]: string | number | boolean | Date;
}

/**
 * Plural rule categories
 */
export type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

/**
 * Plural rules for a translation
 */
export interface PluralRules {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  other: string; // Required fallback
}

/**
 * Translation key structure
 */
export interface TranslationKey {
  key: string;
  params?: TranslationParams;
}

/**
 * Date format options
 */
export type DateFormatStyle = 'short' | 'medium' | 'long' | 'full';

/**
 * Number format options
 */
export interface NumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  minimumIntegerDigits?: number;
  useGrouping?: boolean;
}

/**
 * Currency format options
 */
export interface CurrencyFormatOptions extends NumberFormatOptions {
  currency: string; // ISO 4217 currency code (e.g., 'USD', 'EUR')
  currencyDisplay?: 'symbol' | 'code' | 'name';
}

/**
 * Percent format options
 */
export interface PercentFormatOptions extends NumberFormatOptions {
  signDisplay?: 'auto' | 'never' | 'always' | 'exceptZero';
}

/**
 * Relative time unit
 */
export type RelativeTimeUnit =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second';

/**
 * Language change event
 */
export interface LanguageChangeEvent {
  previousLanguage: Locale | null;
  currentLanguage: Locale;
  direction: Direction;
}

/*
💡 INTERVIEW: I18n Type Safety
- Strong typing for locale codes prevents typos
- SupportedLanguage interface ensures consistent configuration
- TranslationParams allow type-safe parameter interpolation
- PluralRules handle complex pluralization across languages
- Format options provide Intl API compatibility
- Direction type supports RTL languages like Arabic
*/
