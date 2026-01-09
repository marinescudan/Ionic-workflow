import { Component, Input, inject } from '@angular/core';

import { IonProgressBar, IonText, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { ValidationService } from '@services/validation/validation.service';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [IonProgressBar, IonText, IonIcon],
  template: `
    @if (password) {
      <div class="strength-container">
        <div class="strength-bar">
          <ion-progress-bar
            [value]="strengthPercent"
            [color]="strengthInfo.color"
          ></ion-progress-bar>
          <span class="strength-label" [style.color]="'var(--ion-color-' + strengthInfo.color + ')'">
            {{ strengthInfo.label }}
          </span>
        </div>

        @if (showRequirements) {
          <div class="requirements">
            <div class="requirement" [class.met]="hasUppercase">
              <ion-icon [name]="hasUppercase ? 'checkmark-circle' : 'close-circle'"></ion-icon>
              <span>Uppercase letter</span>
            </div>
            <div class="requirement" [class.met]="hasLowercase">
              <ion-icon [name]="hasLowercase ? 'checkmark-circle' : 'close-circle'"></ion-icon>
              <span>Lowercase letter</span>
            </div>
            <div class="requirement" [class.met]="hasNumber">
              <ion-icon [name]="hasNumber ? 'checkmark-circle' : 'close-circle'"></ion-icon>
              <span>Number</span>
            </div>
            <div class="requirement" [class.met]="hasSpecial">
              <ion-icon [name]="hasSpecial ? 'checkmark-circle' : 'close-circle'"></ion-icon>
              <span>Special character</span>
            </div>
            <div class="requirement" [class.met]="hasMinLength">
              <ion-icon [name]="hasMinLength ? 'checkmark-circle' : 'close-circle'"></ion-icon>
              <span>At least 8 characters</span>
            </div>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .strength-container {
      padding: 8px 16px;
    }

    .strength-bar {
      display: flex;
      align-items: center;
      gap: 12px;

      ion-progress-bar {
        flex: 1;
        height: 6px;
        border-radius: 3px;
      }

      .strength-label {
        font-size: 12px;
        font-weight: 600;
        min-width: 50px;
      }
    }

    .requirements {
      margin-top: 12px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 6px;
    }

    .requirement {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--ion-color-danger);

      ion-icon {
        font-size: 14px;
      }

      &.met {
        color: var(--ion-color-success);
      }
    }
  `]
})
export class PasswordStrengthComponent {
  @Input() password = '';
  @Input() showRequirements = true;

  private validationService = inject(ValidationService);

  constructor() {
    addIcons({ checkmarkCircle, closeCircle });
  }

  get strengthPercent(): number {
    return this.validationService.getPasswordStrength(this.password) / 100;
  }

  get strengthInfo() {
    return this.validationService.getPasswordStrengthLabel(this.password);
  }

  get hasUppercase(): boolean { return /[A-Z]/.test(this.password); }
  get hasLowercase(): boolean { return /[a-z]/.test(this.password); }
  get hasNumber(): boolean { return /\d/.test(this.password); }
  get hasSpecial(): boolean { return /[!@#$%^&*(),.?":{}|<>]/.test(this.password); }
  get hasMinLength(): boolean { return this.password.length >= 8; }
}
