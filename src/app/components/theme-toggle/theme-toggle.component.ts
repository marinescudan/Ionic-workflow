import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonToggle, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <ion-item lines="none" class="theme-toggle-item">
      <ion-icon
        [name]="isDarkMode ? 'moon-outline' : 'sunny-outline'"
        slot="start">
      </ion-icon>
      <ion-label>{{ isDarkMode ? 'Dark' : 'Light' }} Mode</ion-label>
      <ion-toggle
        slot="end"
        [(ngModel)]="isDarkMode"
        (ionChange)="toggleTheme()">
      </ion-toggle>
    </ion-item>
  `,
  styles: [`
    .theme-toggle-item {
      --background: transparent;
      --padding-start: 0;
      --padding-end: 0;

      ion-icon {
        font-size: 20px;
        margin-right: 8px;
      }
    }
  `],
  imports: [CommonModule, FormsModule, IonToggle, IonItem, IonLabel, IonIcon],
  standalone: true
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  constructor() {
    addIcons({ moonOutline, sunnyOutline });
  }

  ngOnInit() {
    // Check if user prefers dark mode
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme();
  }

  toggleTheme() {
    this.applyTheme();
    // Store preference
    localStorage.setItem('preferredTheme', this.isDarkMode ? 'dark' : 'light');
  }

  private applyTheme() {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}