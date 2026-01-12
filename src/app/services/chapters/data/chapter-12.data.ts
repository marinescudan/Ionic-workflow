// src/app/services/chapters/data/chapter-12.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_12_DATA: Chapter = {
  id: 12,
  title: 'Internationalization & Localization',
  description: 'Build multi-language apps with ngx-translate, RTL support, and locale-aware formatting',
  icon: 'language-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 120,
      title: 'i18n Fundamentals',
      content: `
        <h2>Understanding Internationalization (i18n)</h2>
        <p>Internationalization (i18n) and Localization (l10n) are essential for reaching global audiences. The numbers 18 and 10 represent the count of letters between the first and last characters.</p>

        <h3>i18n vs l10n</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>Internationalization (i18n)</th>
            <th>Localization (l10n)</th>
          </tr>
          <tr>
            <td>Definition</td>
            <td>Designing software to support multiple languages</td>
            <td>Adapting software for a specific locale</td>
          </tr>
          <tr>
            <td>Focus</td>
            <td>Architecture and code structure</td>
            <td>Content translation and cultural adaptation</td>
          </tr>
          <tr>
            <td>When</td>
            <td>During development</td>
            <td>Before deployment to each market</td>
          </tr>
          <tr>
            <td>Examples</td>
            <td>Extract hardcoded strings, use Unicode, support date formatters</td>
            <td>Translate UI text, adjust date formats, change currency symbols</td>
          </tr>
        </table>

        <h3>Key Concepts</h3>
        <ul>
          <li><strong>Locale Codes:</strong> Language-COUNTRY format (en-US, es-ES, ar-SA)</li>
          <li><strong>Text Direction:</strong> LTR (Left-to-Right) vs RTL (Right-to-Left)</li>
          <li><strong>Pluralization:</strong> Different languages have different plural rules</li>
          <li><strong>Date/Time Formatting:</strong> Varies significantly by locale</li>
          <li><strong>Number Formatting:</strong> Decimal and thousands separators differ</li>
          <li><strong>Currency:</strong> Symbol position and formatting vary</li>
        </ul>

        <h3>When to Implement i18n</h3>
        <p><strong>Early in the project:</strong></p>
        <ul>
          <li>Easier to extract strings from the start than retrofit later</li>
          <li>Architectural decisions (database schema, API design) are affected</li>
          <li>Testing with pseudo-localization catches layout issues early</li>
        </ul>

        <h3>Real-World Examples</h3>
        <p>Apps with excellent i18n/l10n:</p>
        <ul>
          <li><strong>Airbnb:</strong> 60+ languages, RTL support, locale-aware pricing</li>
          <li><strong>WhatsApp:</strong> 100+ languages, automatic language detection</li>
          <li><strong>Duolingo:</strong> 40+ UI languages, culturally adapted content</li>
          <li><strong>Netflix:</strong> 30+ languages, subtitle/audio localization</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1200,
          language: 'typescript',
          title: 'Locale Interface Definition',
          code: `/**
 * Locale code format: language-COUNTRY
 * Examples:
 * - en-US: English (United States)
 * - es-ES: Spanish (Spain)
 * - es-MX: Spanish (Mexico)
 * - fr-FR: French (France)
 * - ar-SA: Arabic (Saudi Arabia)
 * - zh-CN: Chinese (Simplified, China)
 * - zh-TW: Chinese (Traditional, Taiwan)
 *
 * 💡 INTERVIEW: Always use BCP 47 language tags (ISO 639-1 + ISO 3166-1)
 */
export interface Locale {
  code: string;           // 'en-US'
  language: string;       // 'en'
  country?: string;       // 'US'
  name: string;           // 'English (United States)'
  nativeName: string;     // 'English (United States)'
  direction: 'ltr' | 'rtl'; // Text direction
  flag?: string;          // Flag emoji or URL
}

export interface SupportedLanguage {
  code: string;           // ISO 639-1 code (en, es, fr)
  locale: string;         // Full locale (en-US, es-ES)
  name: string;           // English name
  nativeName: string;     // Native name (Español, Français)
  direction: 'ltr' | 'rtl';
  flag: string;           // Flag emoji
  enabled: boolean;       // Is this language available?
}`,
          description: 'TypeScript interfaces for locale and language management',
          copyable: true,
        },
        {
          id: 1201,
          language: 'typescript',
          title: 'Text Direction Examples',
          code: `/**
 * Text Direction Handling
 *
 * LTR (Left-to-Right): Most languages
 * - English, Spanish, French, German, Chinese, Japanese, etc.
 *
 * RTL (Right-to-Left): Middle Eastern languages
 * - Arabic, Hebrew, Persian, Urdu
 *
 * Bidirectional: Mixed LTR/RTL in same text
 * - Arabic text with English numbers/names
 *
 * 💡 INTERVIEW: RTL requires:
 * - Mirror layouts (flexbox direction)
 * - Flip icons (arrows, chevrons)
 * - Adjust text alignment
 * - Use logical CSS properties (start/end vs left/right)
 */

// Detect if language is RTL
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

function isRTL(languageCode: string): boolean {
  return RTL_LANGUAGES.includes(languageCode);
}

// Apply direction to document
function setTextDirection(direction: 'ltr' | 'rtl'): void {
  document.dir = direction;
  document.documentElement.lang = direction;

  // Update body class for styling
  document.body.classList.remove('ltr', 'rtl');
  document.body.classList.add(direction);
}

// Example usage
const currentLang = 'ar';
if (isRTL(currentLang)) {
  setTextDirection('rtl');
}`,
          description: 'Handling text direction for RTL languages',
          copyable: true,
        },
      ],
      interviewTips: [
        'i18n = architecture/code preparation, l10n = actual translation/adaptation',
        'RTL languages: Arabic, Hebrew, Persian, Urdu - require mirrored layouts',
        'Use BCP 47 language tags (ISO 639-1 for language + ISO 3166-1 for country)',
        'Pluralization differs by language: English has 2 forms, Arabic has 6',
        'Always use Unicode (UTF-8) to support all character sets',
      ],
    },
    {
      id: 121,
      title: 'ngx-translate Setup',
      content: `
        <h2>Setting Up ngx-translate</h2>
        <p>ngx-translate is the most popular i18n library for Angular, with 4.5k+ GitHub stars and millions of downloads. It provides a simple API for managing translations.</p>

        <h3>Installation</h3>
        <p>Install the core package and HTTP loader:</p>
        <pre><code>npm install @ngx-translate/core @ngx-translate/http-loader</code></pre>

        <h3>How ngx-translate Works</h3>
        <ol>
          <li><strong>Translation Files:</strong> JSON files stored in assets/i18n/</li>
          <li><strong>Loader:</strong> Fetches translation files via HTTP</li>
          <li><strong>TranslateService:</strong> Main service for managing translations</li>
          <li><strong>TranslatePipe:</strong> Pipe for templates ({{ 'key' | translate }})</li>
          <li><strong>TranslateDirective:</strong> Directive for elements ([translate]="key")</li>
        </ol>

        <h3>Configuration Options</h3>
        <ul>
          <li><strong>defaultLanguage:</strong> Fallback language if translation not found</li>
          <li><strong>useDefaultLang:</strong> Whether to use default language as fallback</li>
          <li><strong>isolate:</strong> Isolate service instance per module</li>
          <li><strong>extend:</strong> Extend existing translations</li>
        </ul>

        <h3>Custom Loaders</h3>
        <p>You can create custom loaders to load translations from:</p>
        <ul>
          <li>Remote API/database</li>
          <li>IndexedDB for offline support</li>
          <li>Bundled with the app (webpack)</li>
          <li>Multiple sources merged together</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1210,
          language: 'bash',
          title: 'Installation Command',
          code: `# Install ngx-translate core and HTTP loader
npm install @ngx-translate/core @ngx-translate/http-loader

# Optional: Install formatting libraries
npm install date-fns @formatjs/intl`,
          description: 'Install required packages for internationalization',
          copyable: true,
        },
        {
          id: 1211,
          language: 'typescript',
          title: 'Basic Configuration',
          code: `// src/app/app.config.ts

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * HTTP Loader Factory
 * Loads translation files from assets/i18n/{lang}.json
 *
 * 💡 INTERVIEW: Custom loaders can load from:
 * - HTTP endpoints (remote server)
 * - IndexedDB (offline support)
 * - WebSQL or LocalStorage
 * - Bundled with the app (for critical strings)
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    './assets/i18n/',  // Base path
    '.json'            // File extension
  );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),

    // Import TranslateModule with loader
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    ),

    // ... other providers
  ],
};`,
          description: 'Configure ngx-translate in standalone Angular app',
          copyable: true,
        },
        {
          id: 1212,
          language: 'typescript',
          title: 'Custom Translation Loader',
          code: `// src/app/core/services/i18n/translation-loader.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Custom Translation Loader
 *
 * Features:
 * - Load from multiple sources
 * - Merge translation files
 * - Cache translations
 * - Fallback to default language
 * - Support for namespaces
 */
@Injectable({ providedIn: 'root' })
export class CustomTranslationLoader implements TranslateLoader {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) {}

  /**
   * Load translation file for given language
   * Supports namespace loading: 'en', 'en:chapters', 'en:demo'
   */
  getTranslation(lang: string): Observable<any> {
    // Parse language and namespace
    const [language, namespace] = lang.split(':');
    const cacheKey = lang;

    // Check cache first
    if (this.cache.has(cacheKey)) {
      return of(this.cache.get(cacheKey));
    }

    // Determine file path
    const basePath = namespace
      ? \`./assets/i18n/modules/\${namespace}.\${language}.json\`
      : \`./assets/i18n/\${language}.json\`;

    // Load translation file
    return this.http.get(basePath).pipe(
      map((translations: any) => {
        this.cache.set(cacheKey, translations);
        return translations;
      }),
      catchError((error) => {
        console.error(\`Failed to load translations for \${lang}:\`, error);
        // Fallback to default language
        if (language !== 'en') {
          return this.getTranslation('en');
        }
        return of({});
      })
    );
  }

  /**
   * Clear translation cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}`,
          description: 'Advanced custom loader with caching and namespace support',
          copyable: true,
        },
      ],
      interviewTips: [
        'ngx-translate is the most popular Angular i18n library (4.5k+ stars)',
        'Translation files are JSON - easy to manage and version control',
        'HTTP Loader loads translations lazily - better initial load time',
        'Custom loaders enable loading from APIs, databases, or offline storage',
        'TranslateService is singleton by default - shared across entire app',
      ],
    },
    {
      id: 122,
      title: 'Translation File Structure',
      content: `
        <h2>Organizing Translation Files</h2>
        <p>Well-structured translation files are crucial for maintainability. Follow these best practices:</p>

        <h3>File Organization</h3>
        <pre><code>src/assets/i18n/
├── en.json          (English - default)
├── es.json          (Spanish)
├── fr.json          (French)
├── de.json          (German)
├── ar.json          (Arabic - RTL)
├── zh.json          (Chinese)
└── modules/         (Lazy-loaded)
    ├── chapters.en.json
    ├── chapters.es.json
    ├── demo.en.json
    └── demo.es.json</code></pre>

        <h3>Naming Conventions</h3>
        <ul>
          <li><strong>Nested keys:</strong> Use dot notation (app.title, navigation.home)</li>
          <li><strong>Descriptive names:</strong> actions.save, messages.success, errors.network</li>
          <li><strong>Avoid abbreviations:</strong> Use "navigation" not "nav"</li>
          <li><strong>Consistent casing:</strong> camelCase for keys</li>
        </ul>

        <h3>Parameter Interpolation</h3>
        <p>Use double curly braces for dynamic values:</p>
        <pre><code>"welcome": "Welcome, {{name}}!"
"itemsCount": "{{count}} items selected"
"duration": "Duration: {{minutes}} minutes"</code></pre>

        <h3>Pluralization (ICU Format)</h3>
        <p>Different languages have different plural rules:</p>
        <ul>
          <li><strong>English:</strong> 2 forms (one, other)</li>
          <li><strong>Polish:</strong> 3 forms (one, few, many)</li>
          <li><strong>Arabic:</strong> 6 forms (zero, one, two, few, many, other)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1220,
          language: 'typescript',
          title: 'English Translation File (en.json)',
          code: `{
  "app": {
    "title": "Ionic Workflow",
    "description": "Learn Ionic by building Ionic apps",
    "version": "Version {{version}}"
  },

  "navigation": {
    "chapters": "Chapters",
    "demo": "Demo",
    "progress": "Progress",
    "settings": "Settings",
    "logout": "Logout"
  },

  "chapters": {
    "title": "Learning Chapters",
    "completed": "{{count}} completed",

    "completion": {
      "zero": "No chapters completed",
      "one": "{{count}} chapter completed",
      "other": "{{count}} chapters completed"
    },

    "details": {
      "duration": "Duration: {{minutes}} minutes",
      "category": "Category: {{category}}",
      "sections": "{{count}} sections"
    }
  },

  "actions": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "confirm": "Confirm"
  },

  "messages": {
    "success": "Success!",
    "error": "An error occurred",
    "loading": "Loading...",
    "noData": "No data available"
  },

  "validation": {
    "required": "This field is required",
    "email": "Please enter a valid email",
    "minLength": "Minimum length is {{min}} characters",
    "maxLength": "Maximum length is {{max}} characters"
  },

  "errors": {
    "network": "Network error. Please check your connection.",
    "server": "Server error. Please try again later.",
    "notFound": "Resource not found",
    "unauthorized": "You are not authorized"
  }
}`,
          description: 'Complete English translation file with nested structure',
          copyable: true,
        },
        {
          id: 1221,
          language: 'typescript',
          title: 'Spanish Translation (es.json)',
          code: `{
  "app": {
    "title": "Ionic Workflow",
    "description": "Aprende Ionic construyendo aplicaciones Ionic",
    "version": "Versión {{version}}"
  },

  "navigation": {
    "chapters": "Capítulos",
    "demo": "Demo",
    "progress": "Progreso",
    "settings": "Configuración",
    "logout": "Cerrar sesión"
  },

  "chapters": {
    "title": "Capítulos de Aprendizaje",
    "completed": "{{count}} completados",

    "completion": {
      "zero": "Ningún capítulo completado",
      "one": "{{count}} capítulo completado",
      "other": "{{count}} capítulos completados"
    },

    "details": {
      "duration": "Duración: {{minutes}} minutos",
      "category": "Categoría: {{category}}",
      "sections": "{{count}} secciones"
    }
  },

  "actions": {
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "confirm": "Confirmar"
  },

  "messages": {
    "success": "¡Éxito!",
    "error": "Ocurrió un error",
    "loading": "Cargando...",
    "noData": "No hay datos disponibles"
  },

  "validation": {
    "required": "Este campo es obligatorio",
    "email": "Por favor, introduzca un correo electrónico válido",
    "minLength": "La longitud mínima es de {{min}} caracteres",
    "maxLength": "La longitud máxima es de {{max}} caracteres"
  }
}`,
          description: 'Spanish translation with proper pluralization',
          copyable: true,
        },
        {
          id: 1222,
          language: 'typescript',
          title: 'Arabic Translation (ar.json) - RTL Example',
          code: `{
  "app": {
    "title": "Ionic Workflow",
    "description": "تعلم Ionic من خلال بناء تطبيقات Ionic",
    "version": "الإصدار {{version}}"
  },

  "navigation": {
    "chapters": "الفصول",
    "demo": "العرض التوضيحي",
    "progress": "التقدم",
    "settings": "الإعدادات",
    "logout": "تسجيل الخروج"
  },

  "chapters": {
    "title": "فصول التعلم",
    "completed": "{{count}} مكتمل",

    "completion": {
      "zero": "لم يتم إكمال أي فصول",
      "one": "تم إكمال فصل واحد",
      "two": "تم إكمال فصلين",
      "few": "تم إكمال {{count}} فصول",
      "many": "تم إكمال {{count}} فصلاً",
      "other": "تم إكمال {{count}} فصل"
    }
  },

  "actions": {
    "save": "حفظ",
    "cancel": "إلغاء",
    "delete": "حذف",
    "confirm": "تأكيد"
  },

  "messages": {
    "success": "نجاح!",
    "error": "حدث خطأ",
    "loading": "جاري التحميل...",
    "noData": "لا توجد بيانات متاحة"
  }
}`,
          description: 'Arabic translation with 6 plural forms (RTL language)',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use nested keys for better organization (app.title vs appTitle)',
        'Keep translation files in version control (Git)',
        'Arabic has 6 plural forms: zero, one, two, few, many, other',
        'Use descriptive keys that indicate context (errors.network vs error1)',
        'Separate static UI text from dynamic content (database)',
      ],
    },
    {
      id: 123,
      title: 'i18n Service Implementation',
      content: `
        <h2>Building the i18n Service</h2>
        <p>Create a dedicated service to centralize all internationalization logic. This provides a clean API and decouples from ngx-translate.</p>

        <h3>Service Responsibilities</h3>
        <ul>
          <li><strong>Language Management:</strong> Get/set current language, detect browser language</li>
          <li><strong>Translation:</strong> Wrapper methods for translate.instant() and translate.get()</li>
          <li><strong>Direction:</strong> Manage LTR/RTL text direction</li>
          <li><strong>Persistence:</strong> Save language preference to localStorage</li>
          <li><strong>Observables:</strong> Reactive streams for language changes</li>
        </ul>

        <h3>Language Detection Priority</h3>
        <ol>
          <li><strong>User's previous selection</strong> (localStorage)</li>
          <li><strong>Browser language</strong> (navigator.language)</li>
          <li><strong>Device language</strong> (Capacitor API)</li>
          <li><strong>Default language</strong> (fallback)</li>
        </ol>

        <h3>Benefits of Service Abstraction</h3>
        <ul>
          <li>Easy to switch libraries (from ngx-translate to another)</li>
          <li>Add custom logic (logging, analytics)</li>
          <li>Consistent API across the app</li>
          <li>Handle edge cases (RTL, missing translations)</li>
          <li>Testable with mock services</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1230,
          language: 'typescript',
          title: 'Main i18n Service',
          code: `// src/app/core/services/i18n/i18n.service.ts

import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Main i18n Service
 *
 * Centralized i18n management
 *
 * 💡 INTERVIEW: Wrap third-party libraries in your own service to:
 * - Decouple from specific library
 * - Add custom logic
 * - Provide consistent API
 * - Make testing easier
 */
@Injectable({
  providedIn: 'root',
})
export class I18nService {
  private readonly supportedLanguages = [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'es', name: 'Español', direction: 'ltr' },
    { code: 'ar', name: 'العربية', direction: 'rtl' },
  ];

  private readonly defaultLanguage = 'en';

  private currentLanguageSubject = new BehaviorSubject<string>('en');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private directionSubject = new BehaviorSubject<'ltr' | 'rtl'>('ltr');
  public direction$ = this.directionSubject.asObservable();

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  /**
   * Initialize language on app startup
   */
  private initializeLanguage(): void {
    this.translate.setDefaultLang(this.defaultLanguage);
    const preferredLang = this.detectPreferredLanguage();
    this.setLanguage(preferredLang);
  }

  /**
   * Detect user's preferred language
   */
  private detectPreferredLanguage(): string {
    // 1. Check localStorage
    const stored = localStorage.getItem('preferred_language');
    if (stored && this.isLanguageSupported(stored)) {
      return stored;
    }

    // 2. Check browser language
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && this.isLanguageSupported(browserLang)) {
      return browserLang;
    }

    // 3. Default
    return this.defaultLanguage;
  }

  /**
   * Set current language
   */
  public async setLanguage(langCode: string): Promise<void> {
    if (!this.isLanguageSupported(langCode)) {
      langCode = this.defaultLanguage;
    }

    const language = this.supportedLanguages.find(l => l.code === langCode)!;

    // Update observables
    this.currentLanguageSubject.next(langCode);
    this.directionSubject.next(language.direction);

    // Update document
    document.dir = language.direction;
    document.documentElement.lang = langCode;
    document.body.classList.remove('ltr', 'rtl');
    document.body.classList.add(language.direction);

    // Save preference
    localStorage.setItem('preferred_language', langCode);

    // Load translations
    await this.translate.use(langCode).toPromise();
  }

  /**
   * Get current language
   */
  public getCurrentLanguage(): string {
    return this.translate.currentLang || this.defaultLanguage;
  }

  /**
   * Check if language is supported
   */
  private isLanguageSupported(langCode: string): boolean {
    return this.supportedLanguages.some(lang => lang.code === langCode);
  }

  /**
   * Translate a key
   */
  public translate(key: string, params?: any): string {
    return this.translate.instant(key, params);
  }

  /**
   * Check if current language is RTL
   */
  public isRTL(): boolean {
    return this.directionSubject.value === 'rtl';
  }
}`,
          description: 'Complete i18n service with language management',
          copyable: true,
        },
        {
          id: 1231,
          language: 'typescript',
          title: 'Locale Service for Formatting',
          code: `// src/app/core/services/i18n/locale.service.ts

import { Injectable } from '@angular/core';
import { I18nService } from './i18n.service';

/**
 * Locale Service
 *
 * Handles locale-specific formatting using native Intl API
 *
 * 💡 INTERVIEW: Intl API is built into modern browsers
 * No need for moment.js for basic formatting
 */
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  constructor(private i18n: I18nService) {}

  /**
   * Get current locale code
   */
  private getCurrentLocale(): string {
    return this.i18n.getCurrentLanguage() + '-US';
  }

  /**
   * Format date according to current locale
   */
  public formatDate(
    date: Date | string | number,
    options?: Intl.DateTimeFormatOptions
  ): string {
    const dateObj = typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

    const locale = this.getCurrentLocale();
    const formatter = new Intl.DateTimeFormat(locale, options);
    return formatter.format(dateObj);
  }

  /**
   * Format number according to current locale
   */
  public formatNumber(
    value: number,
    options?: Intl.NumberFormatOptions
  ): string {
    const locale = this.getCurrentLocale();
    const formatter = new Intl.NumberFormat(locale, options);
    return formatter.format(value);
  }

  /**
   * Format currency
   */
  public formatCurrency(value: number, currency: string = 'USD'): string {
    const locale = this.getCurrentLocale();
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    });
    return formatter.format(value);
  }

  /**
   * Format relative time (e.g., "2 hours ago")
   */
  public formatRelativeTime(date: Date | string | number): string {
    const dateObj = typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;

    const now = new Date();
    const diffMs = now.getTime() - dateObj.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    const locale = this.getCurrentLocale();
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

    if (diffMinutes < 60) {
      return rtf.format(-diffMinutes, 'minute');
    } else if (diffHours < 24) {
      return rtf.format(-diffHours, 'hour');
    } else {
      return rtf.format(-diffDays, 'day');
    }
  }
}`,
          description: 'Service for locale-aware date/number/currency formatting',
          copyable: true,
        },
      ],
      interviewTips: [
        'Wrap ngx-translate in your own service for better abstraction',
        'Language detection order: localStorage > browser > device > default',
        'Use BehaviorSubject for reactive language changes',
        'Store language preference in localStorage for persistence',
        'Intl API provides native formatting - no external libraries needed',
      ],
    },
    {
      id: 124,
      title: 'Language Selector Component',
      content: `
        <h2>Creating the Language Selector</h2>
        <p>Build a user-friendly component for language switching with these features:</p>

        <h3>Design Considerations</h3>
        <ul>
          <li><strong>Native names:</strong> Show language names in their native script (Español, not Spanish)</li>
          <li><strong>Flags:</strong> Visual recognition with flag emojis or icons</li>
          <li><strong>Current indicator:</strong> Clearly show which language is active</li>
          <li><strong>Mobile-friendly:</strong> Use modal or action sheet on mobile</li>
          <li><strong>Instant updates:</strong> Apply changes immediately (no page reload)</li>
        </ul>

        <h3>UI Patterns</h3>
        <ul>
          <li><strong>Dropdown:</strong> Good for desktop, 3-10 languages</li>
          <li><strong>Modal:</strong> Better for mobile, thumb-friendly</li>
          <li><strong>Flags row:</strong> Quick visual selection, limited space</li>
          <li><strong>Settings page:</strong> Part of user preferences</li>
        </ul>

        <h3>Accessibility</h3>
        <ul>
          <li>Use proper ARIA labels</li>
          <li>Keyboard navigation support</li>
          <li>Screen reader announcements</li>
          <li>High contrast indicators</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1240,
          language: 'typescript',
          title: 'Language Selector Component',
          code: `// src/app/shared/components/language-selector/language-selector.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { I18nService } from '@app/core/services/i18n/i18n.service';
import { Observable } from 'rxjs';

/**
 * Language Selector Component
 *
 * 💡 INTERVIEW: For better UX:
 * - Show language names in native script
 * - Add flag icons for visual recognition
 * - Show current language indicator
 * - Use modal on mobile (better thumb zone)
 */
@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class LanguageSelectorComponent implements OnInit {
  availableLanguages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
  ];

  currentLanguage$: Observable<string>;
  currentLanguageCode: string = '';

  constructor(private i18n: I18nService) {
    this.currentLanguage$ = this.i18n.currentLanguage$;
  }

  ngOnInit() {
    this.currentLanguageCode = this.i18n.getCurrentLanguage();
  }

  /**
   * Change language
   */
  async changeLanguage(langCode: string) {
    if (langCode === this.currentLanguageCode) {
      return;
    }

    try {
      await this.i18n.setLanguage(langCode);
      this.currentLanguageCode = langCode;
      console.log(\`Language changed to \${langCode}\`);
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  }
}`,
          description: 'Reusable language selector component',
          copyable: true,
        },
        {
          id: 1241,
          language: 'html',
          title: 'Language Selector Template',
          code: `<!-- src/app/shared/components/language-selector/language-selector.component.html -->

<!-- Dropdown version (desktop) -->
<ion-item>
  <ion-label>{{ 'settings.language' | translate }}</ion-label>
  <ion-select
    [value]="currentLanguageCode"
    (ionChange)="changeLanguage($event.detail.value)"
    interface="popover"
  >
    <ion-select-option
      *ngFor="let lang of availableLanguages"
      [value]="lang.code"
    >
      {{ lang.flag }} {{ lang.name }}
    </ion-select-option>
  </ion-select>
</ion-item>

<!-- Button version (mobile) -->
<ion-button expand="block" id="language-selector">
  <ion-icon name="language" slot="start"></ion-icon>
  {{ (currentLanguage$ | async) }}
</ion-button>

<!-- Popover menu -->
<ion-popover trigger="language-selector">
  <ng-template>
    <ion-list>
      <ion-item
        *ngFor="let lang of availableLanguages"
        button
        (click)="changeLanguage(lang.code)"
        [class.selected]="lang.code === currentLanguageCode"
      >
        <ion-label>
          {{ lang.flag }} {{ lang.name }}
        </ion-label>
        <ion-icon
          *ngIf="lang.code === currentLanguageCode"
          name="checkmark"
          slot="end"
          color="primary"
        ></ion-icon>
      </ion-item>
    </ion-list>
  </ng-template>
</ion-popover>`,
          description: 'Template with dropdown and popover options',
          copyable: true,
        },
        {
          id: 1242,
          language: 'scss',
          title: 'Language Selector Styles',
          code: `// src/app/shared/components/language-selector/language-selector.component.scss

:host {
  display: block;
}

ion-select {
  max-width: 200px;
}

.selected {
  --background: var(--ion-color-light);
  font-weight: 600;
}

ion-item {
  --padding-start: 16px;
  --padding-end: 16px;

  &:hover {
    --background: var(--ion-color-light);
  }
}`,
          description: 'Styles for language selector',
          copyable: true,
        },
      ],
      interviewTips: [
        'Show language names in native script (Español, not Spanish)',
        'Use modals on mobile for better thumb zone access',
        'Add visual indicators (flags) for faster recognition',
        'Apply language change immediately without page reload',
        'Store preference in localStorage + backend for logged-in users',
      ],
    },
    {
      id: 125,
      title: 'RTL Support',
      content: `
        <h2>Right-to-Left (RTL) Language Support</h2>
        <p>RTL languages like Arabic and Hebrew require special layout considerations. The entire UI needs to be mirrored.</p>

        <h3>RTL Languages</h3>
        <ul>
          <li><strong>Arabic (ar):</strong> 300+ million speakers</li>
          <li><strong>Hebrew (he):</strong> 9+ million speakers</li>
          <li><strong>Persian (fa):</strong> 70+ million speakers</li>
          <li><strong>Urdu (ur):</strong> 60+ million speakers</li>
        </ul>

        <h3>What Needs to Change</h3>
        <ul>
          <li><strong>Text direction:</strong> Right to left</li>
          <li><strong>Layout flow:</strong> Reverse flex/grid direction</li>
          <li><strong>Icons:</strong> Flip arrows, chevrons, back buttons</li>
          <li><strong>Text alignment:</strong> Right-aligned by default</li>
          <li><strong>Margins/Paddings:</strong> Swap left/right</li>
        </ul>

        <h3>Logical CSS Properties</h3>
        <p>Use logical properties instead of physical:</p>
        <table>
          <tr>
            <th>Physical (Old)</th>
            <th>Logical (New)</th>
            <th>Benefit</th>
          </tr>
          <tr>
            <td>margin-left</td>
            <td>margin-inline-start</td>
            <td>Auto-flips in RTL</td>
          </tr>
          <tr>
            <td>margin-right</td>
            <td>margin-inline-end</td>
            <td>Auto-flips in RTL</td>
          </tr>
          <tr>
            <td>padding-left</td>
            <td>padding-inline-start</td>
            <td>Auto-flips in RTL</td>
          </tr>
          <tr>
            <td>text-align: left</td>
            <td>text-align: start</td>
            <td>Auto-flips in RTL</td>
          </tr>
        </table>

        <h3>Testing RTL</h3>
        <ul>
          <li>Test with actual RTL language (Arabic, Hebrew)</li>
          <li>Check all pages and components</li>
          <li>Verify icon flipping</li>
          <li>Test forms and inputs</li>
          <li>Check scrollbars and navigation</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1250,
          language: 'scss',
          title: 'RTL Styles with Logical Properties',
          code: `// src/styles/rtl.scss

/**
 * RTL (Right-to-Left) Styles
 *
 * Use logical CSS properties instead of physical
 *
 * 💡 INTERVIEW: Logical properties automatically flip in RTL
 * Browser support: All modern browsers
 */

// Apply RTL to entire app
[dir='rtl'] {
  direction: rtl;
  text-align: start; // Aligns to right in RTL
}

[dir='ltr'] {
  direction: ltr;
  text-align: start; // Aligns to left in LTR
}

// Margins and Paddings - use logical properties
.margin-start-8 {
  margin-inline-start: 8px; // margin-left in LTR, margin-right in RTL
}

.margin-end-8 {
  margin-inline-end: 8px; // margin-right in LTR, margin-left in RTL
}

.padding-start-16 {
  padding-inline-start: 16px;
}

.padding-end-16 {
  padding-inline-end: 16px;
}

// Text alignment
.text-start {
  text-align: start; // left in LTR, right in RTL
}

.text-end {
  text-align: end; // right in LTR, left in RTL
}

// Borders
.border-start {
  border-inline-start: 1px solid var(--ion-color-medium);
}

.border-end {
  border-inline-end: 1px solid var(--ion-color-medium);
}

// Icons that need flipping in RTL
[dir='rtl'] {
  .flip-rtl,
  ion-icon[name*='arrow'],
  ion-icon[name*='chevron'],
  ion-icon[name*='caret'] {
    transform: scaleX(-1);
  }
}

// Flex direction
[dir='rtl'] {
  .flex-row {
    flex-direction: row-reverse;
  }
}

// List styles
[dir='rtl'] {
  ul, ol {
    padding-inline-start: 40px;
    padding-inline-end: 0;
  }
}`,
          description: 'Complete RTL styles using logical CSS properties',
          copyable: true,
        },
        {
          id: 1251,
          language: 'typescript',
          title: 'RTL Directive',
          code: `// src/app/core/directives/rtl.directive.ts

import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { I18nService } from '@app/core/services/i18n/i18n.service';
import { Subject, takeUntil } from 'rxjs';

/**
 * RTL Directive
 *
 * Automatically applies RTL classes based on current language
 *
 * Usage: <div appRtl>Content</div>
 *
 * 💡 INTERVIEW: RTL requires:
 * - Mirror layouts
 * - Flip icons
 * - Use logical properties
 * - Test with real RTL languages
 */
@Directive({
  selector: '[appRtl]',
  standalone: true,
})
export class RtlDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private i18n: I18nService
  ) {}

  ngOnInit() {
    this.i18n.direction$.pipe(takeUntil(this.destroy$)).subscribe((dir) => {
      this.updateDirection(dir);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateDirection(direction: 'ltr' | 'rtl') {
    const element = this.el.nativeElement;
    element.classList.remove('ltr', 'rtl');
    element.classList.add(direction);
    element.setAttribute('dir', direction);
  }
}`,
          description: 'Directive to automatically apply RTL/LTR classes',
          copyable: true,
        },
        {
          id: 1252,
          language: 'typescript',
          title: 'RTL Helper Service',
          code: `// src/app/core/services/i18n/rtl.service.ts

import { Injectable } from '@angular/core';
import { I18nService } from './i18n.service';

/**
 * RTL Helper Service
 *
 * Utilities for RTL layout adjustments
 */
@Injectable({
  providedIn: 'root',
})
export class RtlService {
  constructor(private i18n: I18nService) {}

  /**
   * Check if current language is RTL
   */
  isRTL(): boolean {
    return this.i18n.isRTL();
  }

  /**
   * Get flex direction for RTL
   */
  getFlexDirection(base: 'row' | 'column'): string {
    if (base === 'column') {
      return 'column';
    }
    return this.isRTL() ? 'row-reverse' : 'row';
  }

  /**
   * Get transform for flipping icons in RTL
   */
  getIconFlip(): string {
    return this.isRTL() ? 'scaleX(-1)' : 'none';
  }

  /**
   * Get text align for start
   */
  getTextAlignStart(): string {
    return this.isRTL() ? 'right' : 'left';
  }

  /**
   * Get text align for end
   */
  getTextAlignEnd(): string {
    return this.isRTL() ? 'left' : 'right';
  }
}`,
          description: 'Helper service for RTL layout calculations',
          copyable: true,
        },
      ],
      interviewTips: [
        'RTL languages: Arabic, Hebrew, Persian, Urdu',
        'Use logical CSS properties (margin-inline-start vs margin-left)',
        'Flip directional icons (arrows, chevrons) with transform: scaleX(-1)',
        'Test with actual RTL languages, not just CSS flipping',
        'Bidirectional text: Arabic with English numbers needs special handling',
      ],
    },
    {
      id: 126,
      title: 'Custom Pipes & Formatting',
      content: `
        <h2>Locale-Aware Formatting Pipes</h2>
        <p>Create custom pipes for formatting dates, numbers, and currency according to the current locale.</p>

        <h3>Why Custom Pipes?</h3>
        <ul>
          <li><strong>Automatic updates:</strong> When language changes, pipes re-run</li>
          <li><strong>Consistent formatting:</strong> Same format across entire app</li>
          <li><strong>Easy to test:</strong> Pure functions</li>
          <li><strong>Performance:</strong> Angular caches pure pipe results</li>
          <li><strong>Template-friendly:</strong> Clean syntax in templates</li>
        </ul>

        <h3>Intl API</h3>
        <p>The Intl object provides language-sensitive formatting:</p>
        <ul>
          <li><strong>Intl.DateTimeFormat:</strong> Format dates/times</li>
          <li><strong>Intl.NumberFormat:</strong> Format numbers/currency/percent</li>
          <li><strong>Intl.RelativeTimeFormat:</strong> Format relative time (2 hours ago)</li>
          <li><strong>Intl.Collator:</strong> String comparison and sorting</li>
        </ul>

        <h3>Date Formatting Examples</h3>
        <table>
          <tr>
            <th>Locale</th>
            <th>Short Date</th>
            <th>Long Date</th>
          </tr>
          <tr>
            <td>en-US</td>
            <td>12/31/2025</td>
            <td>December 31, 2025</td>
          </tr>
          <tr>
            <td>en-GB</td>
            <td>31/12/2025</td>
            <td>31 December 2025</td>
          </tr>
          <tr>
            <td>de-DE</td>
            <td>31.12.2025</td>
            <td>31. Dezember 2025</td>
          </tr>
          <tr>
            <td>ja-JP</td>
            <td>2025/12/31</td>
            <td>2025年12月31日</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1260,
          language: 'typescript',
          title: 'Localized Date Pipe',
          code: `// src/app/shared/pipes/localized-date.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@app/core/services/i18n/locale.service';

/**
 * Localized Date Pipe
 *
 * Usage:
 * {{ date | localizedDate }}              // Auto format
 * {{ date | localizedDate:'short' }}      // 12/31/2025
 * {{ date | localizedDate:'long' }}       // December 31, 2025
 * {{ date | localizedDate:'time' }}       // 3:30 PM
 * {{ date | localizedDate:'relative' }}   // 2 hours ago
 *
 * 💡 INTERVIEW: Pure pipes are cached by Angular for performance
 * Set pure: false to react to language changes
 */
@Pipe({
  name: 'localizedDate',
  standalone: true,
  pure: false, // Impure to react to language changes
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private locale: LocaleService) {}

  transform(
    value: Date | string | number | null | undefined,
    format: 'short' | 'long' | 'time' | 'dateTime' | 'relative' = 'short'
  ): string {
    if (!value) return '';

    switch (format) {
      case 'short':
        return this.locale.formatDateShort(value);
      case 'long':
        return this.locale.formatDateLong(value);
      case 'time':
        return this.locale.formatTime(value);
      case 'dateTime':
        return this.locale.formatDateTime(value);
      case 'relative':
        return this.locale.formatRelativeTime(value);
      default:
        return this.locale.formatDateShort(value);
    }
  }
}`,
          description: 'Pipe for locale-aware date formatting',
          copyable: true,
        },
        {
          id: 1261,
          language: 'typescript',
          title: 'Localized Number Pipe',
          code: `// src/app/shared/pipes/localized-number.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@app/core/services/i18n/locale.service';

/**
 * Localized Number Pipe
 *
 * Usage:
 * {{ 1234.56 | localizedNumber }}         // 1,234.56 (en) or 1.234,56 (de)
 * {{ 1234.56 | localizedNumber:3 }}       // 1,234.560 (3 decimals)
 * {{ 0.75 | localizedNumber:'percent' }}  // 75%
 *
 * 💡 INTERVIEW: Number formatting differs:
 * - Decimal separator: . vs ,
 * - Thousands separator: , vs . vs space
 */
@Pipe({
  name: 'localizedNumber',
  standalone: true,
  pure: false,
})
export class LocalizedNumberPipe implements PipeTransform {
  constructor(private locale: LocaleService) {}

  transform(
    value: number | null | undefined,
    format: number | 'percent' = 2
  ): string {
    if (value === null || value === undefined) return '';

    if (format === 'percent') {
      return this.locale.formatPercent(value);
    }

    return this.locale.formatDecimal(value, format as number);
  }
}`,
          description: 'Pipe for locale-aware number formatting',
          copyable: true,
        },
        {
          id: 1262,
          language: 'typescript',
          title: 'Localized Currency Pipe',
          code: `// src/app/shared/pipes/localized-currency.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { LocaleService } from '@app/core/services/i18n/locale.service';

/**
 * Localized Currency Pipe
 *
 * Usage:
 * {{ 100 | localizedCurrency }}           // $100.00 (en-US)
 * {{ 100 | localizedCurrency:'EUR' }}     // €100.00 or 100,00 €
 * {{ 100 | localizedCurrency:'JPY' }}     // ¥100 (no decimals)
 *
 * 💡 INTERVIEW: Currency considerations:
 * - Symbol position: $100 vs 100€
 * - Decimal places: 2 for USD/EUR, 0 for JPY
 * - Thousands separator varies by locale
 */
@Pipe({
  name: 'localizedCurrency',
  standalone: true,
  pure: false,
})
export class LocalizedCurrencyPipe implements PipeTransform {
  constructor(private locale: LocaleService) {}

  transform(
    value: number | null | undefined,
    currency: string = 'USD'
  ): string {
    if (value === null || value === undefined) return '';
    return this.locale.formatCurrency(value, currency);
  }
}`,
          description: 'Pipe for locale-aware currency formatting',
          copyable: true,
        },
        {
          id: 1263,
          language: 'html',
          title: 'Using Localization Pipes in Templates',
          code: `<!-- Using custom localization pipes -->

<!-- Date formatting -->
<p>Short: {{ currentDate | localizedDate:'short' }}</p>
<!-- en-US: 12/31/2025 -->
<!-- es-ES: 31/12/2025 -->

<p>Long: {{ currentDate | localizedDate:'long' }}</p>
<!-- en-US: December 31, 2025 -->
<!-- es-ES: 31 de diciembre de 2025 -->

<p>Relative: {{ createdAt | localizedDate:'relative' }}</p>
<!-- en: 2 hours ago -->
<!-- es: hace 2 horas -->

<!-- Number formatting -->
<p>{{ 1234567.89 | localizedNumber }}</p>
<!-- en-US: 1,234,567.89 -->
<!-- de-DE: 1.234.567,89 -->
<!-- fr-FR: 1 234 567,89 -->

<!-- Currency formatting -->
<p>{{ 1234.56 | localizedCurrency:'USD' }}</p>
<!-- en-US: $1,234.56 -->
<!-- de-DE: 1.234,56 $ -->

<p>{{ 1234.56 | localizedCurrency:'EUR' }}</p>
<!-- en-US: €1,234.56 -->
<!-- de-DE: 1.234,56 € -->
<!-- es-ES: 1.234,56 € -->

<!-- Percentage -->
<p>{{ 0.75 | localizedNumber:'percent' }}</p>
<!-- All locales: 75% (position may vary) -->`,
          description: 'Examples of using localization pipes in templates',
          copyable: true,
        },
      ],
      interviewTips: [
        'Use Intl API (built-in) instead of external libraries like moment.js',
        'Set pipes as pure: false to react to language changes',
        'Number formatting differs: 1,234.56 (US) vs 1.234,56 (DE) vs 1 234,56 (FR)',
        'Currency: JPY has 0 decimals, USD/EUR have 2',
        'RelativeTimeFormat for "2 hours ago" style formatting',
      ],
    },
    {
      id: 127,
      title: 'NgRx Integration',
      content: `
        <h2>Managing i18n State with NgRx</h2>
        <p>Integrate internationalization with NgRx for centralized state management, time-travel debugging, and side effects handling.</p>

        <h3>Why Use NgRx for i18n?</h3>
        <ul>
          <li><strong>Centralized state:</strong> Single source of truth for current language</li>
          <li><strong>Time-travel debugging:</strong> Track language changes over time</li>
          <li><strong>Side effects:</strong> Load translations, analytics, API calls</li>
          <li><strong>Persistence:</strong> Combine with localStorage sync</li>
          <li><strong>Testing:</strong> Easy to test actions and reducers</li>
        </ul>

        <h3>State Structure</h3>
        <pre><code>{
  currentLanguage: 'en',
  defaultLanguage: 'en',
  direction: 'ltr',
  loading: false,
  error: null,
  translations: {
    en: { ... },
    es: { ... }
  },
  loadedNamespaces: []
}</code></pre>

        <h3>Effects Use Cases</h3>
        <ul>
          <li><strong>Load translations:</strong> Fetch from API/files</li>
          <li><strong>Persist preference:</strong> Save to localStorage</li>
          <li><strong>Analytics tracking:</strong> Track language changes</li>
          <li><strong>API calls:</strong> Update user preferences on server</li>
          <li><strong>Navigation:</strong> Redirect after language change</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1270,
          language: 'typescript',
          title: 'i18n Actions',
          code: `// src/app/features/i18n-demo/store/i18n.actions.ts

import { createAction, props } from '@ngrx/store';

/**
 * i18n Actions
 *
 * 💡 INTERVIEW: Why use NgRx for i18n?
 * - Centralized state
 * - Time-travel debugging
 * - Side effects (analytics, API)
 * - Persistence
 */

// Initialize language
export const initLanguage = createAction('[i18n] Init Language');

// Set language
export const setLanguage = createAction(
  '[i18n] Set Language',
  props<{ languageCode: string }>()
);

export const setLanguageSuccess = createAction(
  '[i18n] Set Language Success',
  props<{ languageCode: string; direction: 'ltr' | 'rtl' }>()
);

export const setLanguageFailure = createAction(
  '[i18n] Set Language Failure',
  props<{ error: string }>()
);

// Load translations
export const loadTranslations = createAction(
  '[i18n] Load Translations',
  props<{ languageCode: string }>()
);

export const loadTranslationsSuccess = createAction(
  '[i18n] Load Translations Success',
  props<{ languageCode: string; translations: any }>()
);

export const loadTranslationsFailure = createAction(
  '[i18n] Load Translations Failure',
  props<{ error: string }>()
);

// Clear cache
export const clearTranslationsCache = createAction(
  '[i18n] Clear Translations Cache'
);`,
          description: 'Actions for managing i18n state',
          copyable: true,
        },
        {
          id: 1271,
          language: 'typescript',
          title: 'i18n Reducer',
          code: `// src/app/features/i18n-demo/store/i18n.reducer.ts

import { createReducer, on } from '@ngrx/store';
import * as I18nActions from './i18n.actions';

export interface I18nState {
  currentLanguage: string;
  defaultLanguage: string;
  direction: 'ltr' | 'rtl';
  loading: boolean;
  error: string | null;
  translations: Record<string, any>;
}

export const initialState: I18nState = {
  currentLanguage: 'en',
  defaultLanguage: 'en',
  direction: 'ltr',
  loading: false,
  error: null,
  translations: {},
};

export const i18nReducer = createReducer(
  initialState,

  // Set language
  on(I18nActions.setLanguage, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(I18nActions.setLanguageSuccess, (state, { languageCode, direction }) => ({
    ...state,
    currentLanguage: languageCode,
    direction,
    loading: false,
    error: null,
  })),

  on(I18nActions.setLanguageFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load translations
  on(I18nActions.loadTranslations, (state) => ({
    ...state,
    loading: true,
  })),

  on(I18nActions.loadTranslationsSuccess, (state, { languageCode, translations }) => ({
    ...state,
    translations: {
      ...state.translations,
      [languageCode]: translations,
    },
    loading: false,
  })),

  // Clear cache
  on(I18nActions.clearTranslationsCache, (state) => ({
    ...state,
    translations: {},
  }))
);`,
          description: 'Reducer for i18n state management',
          copyable: true,
        },
        {
          id: 1272,
          language: 'typescript',
          title: 'i18n Selectors',
          code: `// src/app/features/i18n-demo/store/i18n.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I18nState } from './i18n.reducer';

/**
 * Feature selector
 */
export const selectI18nState = createFeatureSelector<I18nState>('i18n');

/**
 * Current language
 */
export const selectCurrentLanguage = createSelector(
  selectI18nState,
  (state) => state.currentLanguage
);

/**
 * Text direction
 */
export const selectDirection = createSelector(
  selectI18nState,
  (state) => state.direction
);

/**
 * Is RTL
 */
export const selectIsRTL = createSelector(
  selectDirection,
  (direction) => direction === 'rtl'
);

/**
 * Loading state
 */
export const selectLoading = createSelector(
  selectI18nState,
  (state) => state.loading
);

/**
 * Error state
 */
export const selectError = createSelector(
  selectI18nState,
  (state) => state.error
);

/**
 * All translations
 */
export const selectTranslations = createSelector(
  selectI18nState,
  (state) => state.translations
);`,
          description: 'Selectors for accessing i18n state',
          copyable: true,
        },
        {
          id: 1273,
          language: 'typescript',
          title: 'i18n Effects',
          code: `// src/app/features/i18n-demo/store/i18n.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { I18nService } from '@app/core/services/i18n/i18n.service';
import * as I18nActions from './i18n.actions';

/**
 * i18n Effects
 *
 * 💡 INTERVIEW: Effects are ideal for:
 * - Async operations (loading translations)
 * - API calls (save user preference)
 * - Analytics tracking
 * - Local storage updates
 */
@Injectable()
export class I18nEffects {
  /**
   * Initialize language on app startup
   */
  initLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(I18nActions.initLanguage),
      switchMap(() => {
        const currentLang = this.i18n.getCurrentLanguage();
        const direction = this.i18n.getDirection();
        return of(I18nActions.setLanguageSuccess({ languageCode: currentLang, direction }));
      })
    )
  );

  /**
   * Set language
   */
  setLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(I18nActions.setLanguage),
      switchMap(({ languageCode }) =>
        from(this.i18n.setLanguage(languageCode)).pipe(
          map(() => {
            const direction = this.i18n.getDirection();
            return I18nActions.setLanguageSuccess({ languageCode, direction });
          }),
          catchError((error) =>
            of(I18nActions.setLanguageFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Track language changes (analytics)
   */
  trackLanguageChange$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(I18nActions.setLanguageSuccess),
        tap(({ languageCode }) => {
          console.log(\`Language changed to: \${languageCode}\`);
          // Track in analytics
          // this.analytics.track('language_changed', { language: languageCode });
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private i18n: I18nService
  ) {}
}`,
          description: 'Effects for handling i18n side effects',
          copyable: true,
        },
      ],
      interviewTips: [
        'NgRx provides centralized i18n state management',
        'Effects handle side effects: API calls, analytics, persistence',
        'Selectors enable efficient state access with memoization',
        'Actions provide clear intent and enable time-travel debugging',
        'Combine with localStorage sync for persistence',
      ],
    },
    {
      id: 128,
      title: 'Demo Page & Best Practices',
      content: `
        <h2>i18n Demo Page</h2>
        <p>Create an interactive demo page showcasing all internationalization features:</p>

        <h3>Demo Features</h3>
        <ul>
          <li><strong>Language Switcher:</strong> Dropdown with instant updates</li>
          <li><strong>Basic Translation:</strong> Simple key-value translations</li>
          <li><strong>Parameters:</strong> Dynamic value interpolation</li>
          <li><strong>Pluralization:</strong> ICU format with different counts</li>
          <li><strong>Date Formatting:</strong> Short, long, time, relative formats</li>
          <li><strong>Number Formatting:</strong> Decimals, thousands separators</li>
          <li><strong>Currency:</strong> Multiple currencies (USD, EUR, JPY)</li>
          <li><strong>RTL Demo:</strong> Layout changes when switching to Arabic</li>
        </ul>

        <h3>Best Practices</h3>
        <ul>
          <li><strong>Never hardcode strings:</strong> Extract all user-facing text</li>
          <li><strong>Use descriptive keys:</strong> errors.network vs error1</li>
          <li><strong>Provide context:</strong> Comments in translation files</li>
          <li><strong>Test with pseudo-localization:</strong> Find hardcoded strings</li>
          <li><strong>Use translation memory:</strong> Reuse common phrases</li>
          <li><strong>Version control:</strong> Track translation changes in Git</li>
          <li><strong>Collaborate with translators:</strong> Use tools like Lokalise</li>
          <li><strong>Support dynamic content:</strong> Database content translations</li>
        </ul>

        <h3>Common Pitfalls</h3>
        <ul>
          <li>Hardcoding strings (even temporarily)</li>
          <li>String concatenation instead of parameters</li>
          <li>Not testing with actual languages (especially RTL)</li>
          <li>Forgetting to translate error messages</li>
          <li>Not handling missing translations gracefully</li>
          <li>Using physical CSS properties (left/right) instead of logical</li>
        </ul>

        <h3>Performance Tips</h3>
        <ul>
          <li>Lazy load translations by route</li>
          <li>Cache translations in memory</li>
          <li>Use AOT compilation for production</li>
          <li>Minimize translation file size</li>
          <li>Use pure pipes where possible</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1280,
          language: 'typescript',
          title: 'i18n Demo Page Component',
          code: `// src/app/features/i18n-demo/pages/i18n-demo/i18n-demo.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { I18nService } from '@app/core/services/i18n/i18n.service';
import { LocaleService } from '@app/core/services/i18n/locale.service';
import { LanguageSelectorComponent } from '@app/shared/components/language-selector/language-selector.component';
import { LocalizedDatePipe } from '@app/shared/pipes/localized-date.pipe';
import { LocalizedNumberPipe } from '@app/shared/pipes/localized-number.pipe';
import { LocalizedCurrencyPipe } from '@app/shared/pipes/localized-currency.pipe';
import * as I18nSelectors from '../../store/i18n.selectors';
import * as I18nActions from '../../store/i18n.actions';

/**
 * i18n Demo Page
 *
 * Demonstrates:
 * - Language switching
 * - Translation with parameters
 * - Pluralization
 * - Date/number/currency formatting
 * - RTL support
 */
@Component({
  selector: 'app-i18n-demo',
  templateUrl: './i18n-demo.page.html',
  styleUrls: ['./i18n-demo.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    LanguageSelectorComponent,
    LocalizedDatePipe,
    LocalizedNumberPipe,
    LocalizedCurrencyPipe,
  ],
})
export class I18nDemoPage implements OnInit {
  currentLanguage$: Observable<string>;
  direction$: Observable<'ltr' | 'rtl'>;
  isRTL$: Observable<boolean>;

  // Demo data
  currentDate = new Date();
  sampleNumber = 1234567.89;
  sampleCurrency = 1234.56;
  chapterCounts = [0, 1, 2, 5, 10, 20];
  currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY'];
  selectedCurrency = 'USD';

  constructor(
    private i18n: I18nService,
    private locale: LocaleService,
    private store: Store
  ) {
    this.currentLanguage$ = this.store.select(I18nSelectors.selectCurrentLanguage);
    this.direction$ = this.store.select(I18nSelectors.selectDirection);
    this.isRTL$ = this.store.select(I18nSelectors.selectIsRTL);
  }

  ngOnInit() {
    this.store.dispatch(I18nActions.initLanguage());
  }

  getPluralizedChapters(count: number): string {
    return this.i18n.translate('chapters.completion.other', { count });
  }

  getRelativeTime(hoursAgo: number): string {
    const date = new Date();
    date.setHours(date.getHours() - hoursAgo);
    return this.locale.formatRelativeTime(date);
  }
}`,
          description: 'Demo page component showcasing all i18n features',
          copyable: true,
        },
        {
          id: 1281,
          language: 'html',
          title: 'i18n Demo Template',
          code: `<!-- src/app/features/i18n-demo/pages/i18n-demo/i18n-demo.page.html -->

<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button defaultHref="/home"></ion-back-button>
    </ion-buttons>
    <ion-title>{{ 'app.title' | translate }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <div class="demo-container">

    <!-- Language Selector -->
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{ 'settings.selectLanguage' | translate }}</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <app-language-selector></app-language-selector>
        <div class="info">
          <p><strong>{{ 'settings.language' | translate }}:</strong> {{ currentLanguage$ | async }}</p>
          <p><strong>Direction:</strong> {{ direction$ | async }}</p>
        </div>
      </ion-card-content>
    </ion-card>

    <!-- Pluralization Demo -->
    <ion-card>
      <ion-card-header>
        <ion-card-title>Pluralization</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item *ngFor="let count of chapterCounts">
            <ion-label>
              <h3>{{ getPluralizedChapters(count) }}</h3>
              <p>Count: {{ count }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <!-- Date Formatting -->
    <ion-card>
      <ion-card-header>
        <ion-card-title>Date Formatting</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item>
            <ion-label>
              <h3>{{ currentDate | localizedDate:'short' }}</h3>
              <p>Short format</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h3>{{ currentDate | localizedDate:'long' }}</h3>
              <p>Long format</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h3>{{ getRelativeTime(2) }}</h3>
              <p>2 hours ago (relative)</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

    <!-- Number & Currency -->
    <ion-card>
      <ion-card-header>
        <ion-card-title>Number & Currency</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-list>
          <ion-item>
            <ion-label>
              <h3>{{ sampleNumber | localizedNumber }}</h3>
              <p>Number formatting</p>
            </ion-label>
          </ion-item>
          <ion-item *ngFor="let curr of currencies">
            <ion-label>
              <h3>{{ sampleCurrency | localizedCurrency:curr }}</h3>
              <p>{{ curr }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>
    </ion-card>

  </div>
</ion-content>`,
          description: 'Demo page template with all i18n examples',
          copyable: true,
        },
      ],
      interviewTips: [
        'Never hardcode user-facing strings - always use translation keys',
        'Test with pseudo-localization to find hardcoded strings',
        'Use descriptive translation keys that provide context',
        'Version control translation files and track changes',
        'Lazy load translations by route for better performance',
        'Provide fallbacks for missing translations',
        'Test with actual RTL languages (Arabic, Hebrew)',
      ],
    },
  ],
};
