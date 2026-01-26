import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonChip,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { I18nService } from '@app/core/services/i18n/i18n.service';
import { LocaleService } from '@app/core/services/i18n/locale.service';
import { LanguageSelectorComponent } from '@app/components/language-selector/language-selector.component';
import { LocalizedDatePipe } from '@app/pipes/localized-date.pipe';
import { LocalizedNumberPipe } from '@app/pipes/localized-number.pipe';
import { LocalizedCurrencyPipe } from '@app/pipes/localized-currency.pipe';

import { I18nActions } from '../../store/i18n.actions';
import {
  selectCurrentLanguage,
  selectDirection,
  selectIsRTL,
  selectLanguageInfo,
} from '../../store/i18n.selectors';

@Component({
  selector: 'app-i18n-demo',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonChip,
    IonButtons,
    IonBackButton,
    TranslateModule,
    LanguageSelectorComponent,
    LocalizedDatePipe,
    LocalizedNumberPipe,
    LocalizedCurrencyPipe,
  ],
  templateUrl: './i18n-demo.page.html',
  styleUrls: ['./i18n-demo.page.scss'],
})
export class I18nDemoPage implements OnInit {
  private readonly store = inject(Store);
  private readonly i18nService = inject(I18nService);
  private readonly localeService = inject(LocaleService);

  // Service observables (direct from i18nService)
  currentLanguage$ = this.i18nService.currentLanguage$;
  direction$ = this.i18nService.direction$;

  // Computed observables
  isRTL$ = this.i18nService.currentLanguage$.pipe(
    map(() => this.i18nService.isRTL())
  );

  languageInfo$ = this.i18nService.currentLanguage$.pipe(
    map(() => this.i18nService.getCurrentLanguageConfig())
  );

  // Demo data
  demoData = {
    userName: 'John',
    appName: 'Ionic Workflow',

    // Date examples
    today: new Date(),
    yesterday: new Date(Date.now() - 24 * 60 * 60 * 1000),
    twoHoursAgo: new Date(Date.now() - 2 * 60 * 60 * 1000),
    nextWeek: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

    // Number examples
    largeNumber: 1234567.89,
    smallNumber: 0.12345,
    percentage: 0.856,

    // Pluralization examples
    userCounts: [0, 1, 2, 5, 10, 20],
    itemCounts: [0, 1, 2, 5, 10, 20],

    // Currency examples
    currencies: [
      { code: 'USD', amount: 1234.56, name: 'US Dollar' },
      { code: 'EUR', amount: 1234.56, name: 'Euro' },
      { code: 'GBP', amount: 1234.56, name: 'British Pound' },
      { code: 'JPY', amount: 123456, name: 'Japanese Yen' },
      { code: 'CNY', amount: 1234.56, name: 'Chinese Yuan' },
    ],
  };

  ngOnInit(): void {
    // Initialize language in store
    this.store.dispatch(I18nActions.initLanguage());
  }

  /**
   * Get plural translation key based on count
   */
  getPluralKey(baseKey: string, count: number): string {
    if (count === 0) return `${baseKey}.zero`;
    if (count === 1) return `${baseKey}.one`;
    return `${baseKey}.other`;
  }

  /**
   * Format number using LocaleService directly
   */
  formatNumber(value: number): string {
    return this.localeService.formatNumber(value);
  }

  /**
   * Format percentage using LocaleService
   */
  formatPercent(value: number): string {
    return this.localeService.formatPercent(value);
  }

  /**
   * Get translation using I18nService
   */
  translate(key: string, params?: any): string {
    return this.i18nService.translate(key, params);
  }
}

/*
💡 INTERVIEW: I18n Demo Page Implementation

Component Architecture:
1. **Standalone Component**
   - Self-contained with all imports
   - Can be lazy-loaded
   - Follows Angular 14+ best practices

2. **Store Integration**
   - Dispatch initLanguage on component init
   - Select language state via selectors
   - Reactive updates via observables

3. **Multiple I18n Approaches**
   - TranslateModule (ngx-translate) for string translations
   - LocaleService for date/number formatting
   - Custom pipes for template formatting
   - Direct service calls in component

4. **Comprehensive Demo**
   - Language selection
   - Basic translations with parameters
   - Pluralization (0, 1, 2+)
   - Date formatting (all formats)
   - Number formatting
   - Currency formatting (multiple currencies)
   - RTL layout demonstration

Common Interview Questions:

Q: Why inject both Store and I18nService?
A: Store manages state (current language, direction), I18nService
   provides translation methods. Separation of concerns.

Q: Why use TranslateModule AND custom pipes?
A: TranslateModule handles string translations. Custom pipes handle
   date/number formatting with locale awareness. Different concerns.

Q: How do you handle missing translations?
A: ngx-translate returns the key itself. We could add a
   MissingTranslationHandler to log missing keys or show placeholders.

Q: Why are userCounts and itemCounts arrays?
A: To demo pluralization with different counts. Shows how translations
   change based on quantity (0, 1, 2, many).

Q: How would you optimize for many date/number formats?
A: Current implementation uses impure pipes with caching. For extreme
   cases, use ChangeDetectionStrategy.OnPush and avoid impure pipes.

Testing Strategy:
- Mock Store with initial state
- Mock I18nService and LocaleService
- Test that language changes trigger updates
- Verify translations with different locales
- Test RTL layout changes

Production Considerations:
- Add error boundaries for failed translations
- Implement loading states for translation file loads
- Add analytics to track language usage
- Consider lazy-loading translation files by feature
- Implement translation key validation in CI/CD
*/
