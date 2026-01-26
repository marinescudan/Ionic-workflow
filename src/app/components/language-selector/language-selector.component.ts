import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonList,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonIcon,
} from '@ionic/angular/standalone';
import { I18nService } from '@app/core/services/i18n/i18n.service';
import { SupportedLanguage, Locale } from '@app/core/services/i18n/i18n.model';
import { checkmarkCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    IonList,
    IonItem,
    IonLabel,
    IonRadio,
    IonRadioGroup,
    IonIcon,
  ],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent {
  private readonly i18nService = inject(I18nService);

  supportedLanguages: SupportedLanguage[] = [];
  currentLanguage: Locale = 'en';

  constructor() {
    addIcons({ checkmarkCircle });
    this.loadLanguages();
  }

  private loadLanguages(): void {
    this.supportedLanguages = this.i18nService.getSupportedLanguages();
    this.currentLanguage = this.i18nService.getCurrentLanguage();

    // Subscribe to language changes
    this.i18nService.currentLanguage$.subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  async onLanguageChange(event: any): Promise<void> {
    const selectedLanguage = event.detail.value as Locale;
    if (selectedLanguage && selectedLanguage !== this.currentLanguage) {
      await this.i18nService.setLanguage(selectedLanguage);
    }
  }

  isCurrentLanguage(code: Locale): boolean {
    return code === this.currentLanguage;
  }
}

/*
💡 INTERVIEW: Language Selector Component

Design Decisions:
1. **Standalone Component**
   - Self-contained with all imports
   - Can be used anywhere in the app
   - Follows Angular 14+ best practices

2. **Radio Group Pattern**
   - Clear visual indication of current selection
   - Single selection enforced by radio group
   - Standard UI pattern users understand

3. **Native Names**
   - Display languages in their native script
   - Improves accessibility and user experience
   - Users can always find their language

4. **Reactive Updates**
   - Subscribes to language changes
   - Updates UI when language changes elsewhere
   - Ensures consistent state across app

Common Interview Questions:
Q: Why use radio buttons instead of a dropdown?
A: Better mobile UX - radio buttons are easier to tap and see all options.
   Dropdowns can be problematic on mobile, especially with custom styling.

Q: How would you handle 20+ languages?
A: Use a searchable list or group by region. Consider virtual scrolling
   for performance with many items.

Q: Should this component trigger navigation/routing?
A: No. Keep it focused on language selection. Let parent components
   handle navigation if needed (separation of concerns).

Q: How do you test language switching?
A: Mock I18nService, simulate radio change events, verify setLanguage
   called with correct code. Test that UI updates on language change.
*/
