import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import {
  Locale,
  Direction,
  SupportedLanguage,
  TranslationParams,
  LanguageChangeEvent,
} from './i18n.model';

const LANGUAGE_STORAGE_KEY = 'app_language';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly translateService = inject(TranslateService);

  /**
   * Supported languages configuration
   */
  readonly supportedLanguages: SupportedLanguage[] = [
    {
      code: 'en',
      nativeName: 'English',
      englishName: 'English',
      direction: 'ltr',
      flag: '🇬🇧',
      isDefault: true,
    },
    {
      code: 'es',
      nativeName: 'Español',
      englishName: 'Spanish',
      direction: 'ltr',
      flag: '🇪🇸',
    },
    {
      code: 'fr',
      nativeName: 'Français',
      englishName: 'French',
      direction: 'ltr',
      flag: '🇫🇷',
    },
    {
      code: 'de',
      nativeName: 'Deutsch',
      englishName: 'German',
      direction: 'ltr',
      flag: '🇩🇪',
    },
    {
      code: 'ar',
      nativeName: 'العربية',
      englishName: 'Arabic',
      direction: 'rtl',
      flag: '🇸🇦',
    },
    {
      code: 'zh',
      nativeName: '中文',
      englishName: 'Chinese (Simplified)',
      direction: 'ltr',
      flag: '🇨🇳',
    },
  ];

  private currentLanguageSubject = new BehaviorSubject<Locale>('en');
  private directionSubject = new BehaviorSubject<Direction>('ltr');

  currentLanguage$ = this.currentLanguageSubject.asObservable();
  direction$ = this.directionSubject.asObservable();

  constructor() {
    this.initializeLanguage();
  }

  /**
   * Initialize language from storage, browser, or default
   */
  private initializeLanguage(): void {
    const detectedLanguage = this.detectLanguage();
    this.setLanguageInternal(detectedLanguage, false);
  }

  /**
   * Detect language from localStorage → browser → default
   */
  private detectLanguage(): Locale {
    // 1. Check localStorage
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Locale;
    if (stored && this.isSupported(stored)) {
      return stored;
    }

    // 2. Check browser language
    const browserLang = navigator.language.split('-')[0] as Locale;
    if (this.isSupported(browserLang)) {
      return browserLang;
    }

    // 3. Fallback to default
    const defaultLang = this.supportedLanguages.find((lang) => lang.isDefault);
    return defaultLang?.code || 'en';
  }

  /**
   * Check if language is supported
   */
  private isSupported(code: string): code is Locale {
    return this.supportedLanguages.some((lang) => lang.code === code);
  }

  /**
   * Set current language
   */
  async setLanguage(code: Locale): Promise<void> {
    if (!this.isSupported(code)) {
      console.warn(`Language ${code} is not supported. Falling back to English.`);
      code = 'en';
    }

    const previousLanguage = this.currentLanguageSubject.value;
    await this.setLanguageInternal(code, true);

    // Emit language change event (can be listened to by other services)
    const event: LanguageChangeEvent = {
      previousLanguage,
      currentLanguage: code,
      direction: this.directionSubject.value,
    };

    console.log('Language changed:', event);
  }

  /**
   * Internal method to set language
   */
  private async setLanguageInternal(
    code: Locale,
    saveToStorage: boolean
  ): Promise<void> {
    const language = this.supportedLanguages.find((lang) => lang.code === code);
    if (!language) return;

    // Set translate service language
    this.translateService.setDefaultLang(code);
    await firstValueFrom(this.translateService.use(code));

    // Update subjects
    this.currentLanguageSubject.next(code);
    this.directionSubject.next(language.direction);

    // Update DOM attributes
    this.updateDocumentAttributes(code, language.direction);

    // Save to localStorage
    if (saveToStorage) {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    }
  }

  /**
   * Update document HTML attributes for language and direction
   */
  private updateDocumentAttributes(code: Locale, direction: Direction): void {
    const html = document.documentElement;

    // Set lang attribute
    html.setAttribute('lang', code);

    // Set dir attribute
    html.setAttribute('dir', direction);

    // Add/remove RTL class for styling
    if (direction === 'rtl') {
      html.classList.add('rtl');
    } else {
      html.classList.remove('rtl');
    }
  }

  /**
   * Get current language code
   */
  getCurrentLanguage(): Locale {
    return this.currentLanguageSubject.value;
  }

  /**
   * Get current language config
   */
  getCurrentLanguageConfig(): SupportedLanguage | undefined {
    return this.supportedLanguages.find(
      (lang) => lang.code === this.currentLanguageSubject.value
    );
  }

  /**
   * Get all supported languages
   */
  getSupportedLanguages(): SupportedLanguage[] {
    return this.supportedLanguages;
  }

  /**
   * Get current text direction
   */
  getDirection(): Direction {
    return this.directionSubject.value;
  }

  /**
   * Check if current language is RTL
   */
  isRTL(): boolean {
    return this.directionSubject.value === 'rtl';
  }

  /**
   * Translate a key synchronously (immediate)
   */
  translate(key: string, params?: TranslationParams): string {
    return this.translateService.instant(key, params);
  }

  /**
   * Translate a key asynchronously (returns Observable)
   */
  translateAsync(key: string, params?: TranslationParams): Observable<string> {
    return this.translateService.get(key, params);
  }

  /**
   * Translate multiple keys at once
   */
  translateMultiple(keys: string[]): Observable<Record<string, string>> {
    return this.translateService.get(keys);
  }

  /**
   * Reload translations (useful after adding new translation files)
   */
  async reloadTranslations(): Promise<void> {
    const currentLang = this.currentLanguageSubject.value;
    await firstValueFrom(this.translateService.reloadLang(currentLang));
  }
}

/*
💡 INTERVIEW: I18n Service Architecture

Key Design Decisions:
1. **Language Detection Strategy**
   - Priority: localStorage → browser language → default
   - Ensures user preference is respected across sessions

2. **DOM Integration**
   - Updates html[lang] for accessibility (screen readers)
   - Updates html[dir] for RTL layout
   - Adds .rtl class for CSS hooks

3. **Reactive API**
   - BehaviorSubject for current language state
   - Observables for reactive updates in components
   - Async/await for language loading

4. **Type Safety**
   - Locale type ensures only supported languages
   - SupportedLanguage interface standardizes config
   - Prevents runtime errors from invalid language codes

5. **Error Handling**
   - Graceful fallback to English if unsupported language
   - Console warnings for debugging
   - Always returns a valid language

6. **Performance**
   - Translations cached by ngx-translate
   - localStorage prevents re-detection on reload
   - Immediate (instant) translate for synchronous use

Common Interview Questions:
Q: Why use both synchronous and asynchronous translate methods?
A: Synchronous (instant) for templates where we know translations are loaded.
   Asynchronous (get) for dynamic translations or when loading state matters.

Q: How would you handle missing translations?
A: ngx-translate falls back to the key itself. We could add a custom
   MissingTranslationHandler to log missing keys or provide placeholders.

Q: Why update document.documentElement attributes?
A: For accessibility (screen readers use lang attribute) and to enable
   CSS selectors like html[dir="rtl"] for layout adjustments.

Q: How would you handle lazy-loaded translation files?
A: ngx-translate's HttpLoader already supports this. We could implement
   feature-specific translation files and load them on demand.
*/
