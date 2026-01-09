import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { book, analytics, construct } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
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
    IonIcon,
  ],
})
export class HomePage {
  constructor(private router: Router) {
    addIcons({ book, analytics, construct });
  }

  navigateToChapters() {
    this.router.navigate(['/chapters']);
  }

  navigateToProgress() {
    this.router.navigate(['/progress']);
  }

  navigateToDemo() {
    this.router.navigate(['/demo', 2]);
  }
}
