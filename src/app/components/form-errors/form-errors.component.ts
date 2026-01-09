import { Component, Input, inject } from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alertCircle } from 'ionicons/icons';
import { ValidationService } from '@services/validation/validation.service';

@Component({
  selector: 'app-form-errors',
  standalone: true,
  imports: [IonText, IonIcon],
  template: `
    @if (shouldShow) {
      <div class="errors-container">
        @for (error of errors; track error) {
          <ion-text color="danger" class="error-item">
            <ion-icon name="alert-circle"></ion-icon>
            <span>{{ error }}</span>
          </ion-text>
        }
      </div>
    }
  `,
  styles: [`
    .errors-container {
      padding: 4px 16px 8px;
    }

    .error-item {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      font-size: 12px;
      line-height: 1.4;
      margin-bottom: 4px;

      ion-icon {
        font-size: 14px;
        margin-top: 2px;
        flex-shrink: 0;
      }
    }
  `]
})
export class FormErrorsComponent {
  @Input() control: AbstractControl | null = null;
  @Input() showWhen: 'touched' | 'dirty' | 'always' = 'touched';
  @Input() customMessages: Record<string, string> = {};

  private validationService = inject(ValidationService);

  constructor() {
    addIcons({ alertCircle });
  }

  get shouldShow(): boolean {
    if (!this.control || this.control.valid) return false;

    switch (this.showWhen) {
      case 'always':
        return true;
      case 'dirty':
        return this.control.dirty;
      case 'touched':
      default:
        return this.control.touched;
    }
  }

  get errors(): string[] {
    return this.validationService.getErrors(this.control, this.customMessages);
  }
}
