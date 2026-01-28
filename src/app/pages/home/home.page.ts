import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  rocketOutline,
  playCircleOutline,
  checkmarkCircle,
  schoolOutline,
  codeWorkingOutline,
  globeOutline,
  trendingUpOutline
} from 'ionicons/icons';
import {
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonChip,
  IonLabel,
  IonItem,
  IonList,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonChip,
    IonLabel,
    IonItem,
    IonList,
  ],
})
export class HomePage {
  features = [
    {
      icon: '📚',
      title: '31 Comprehensive Chapters',
      description: 'From basics to advanced AI integration',
    },
    {
      icon: '🚀',
      title: 'Hands-on Learning',
      description: 'Interactive demos and real-world examples',
    },
    {
      icon: '📱',
      title: 'Cross-Platform Development',
      description: 'Build for iOS, Android, and Web',
    },
    {
      icon: '⚡',
      title: 'Modern Tech Stack',
      description: 'Angular 21, Ionic 8, NgRx, and more',
    },
  ];

  targetAudience = [
    'Frontend developers wanting to build mobile apps',
    'Mobile developers exploring Ionic framework',
    'Angular developers expanding to cross-platform',
    'Students learning modern app development',
    'Teams building enterprise mobile solutions',
  ];

  techStack = [
    { name: 'Angular 21', color: 'danger' },
    { name: 'Ionic 8', color: 'primary' },
    { name: 'TypeScript', color: 'secondary' },
    { name: 'NgRx', color: 'tertiary' },
    { name: 'GraphQL', color: 'success' },
    { name: 'WebRTC', color: 'warning' },
    { name: 'Capacitor', color: 'danger' },
    { name: 'AI Integration', color: 'dark' },
  ];

  stats = [
    { number: '31', label: 'Comprehensive Chapters' },
    { number: '100+', label: 'Code Examples' },
    { number: '15+', label: 'Real-world Projects' },
    { number: '24/7', label: 'Learn at Your Pace' },
  ];

  constructor(private router: Router) {
    addIcons({
      rocketOutline,
      playCircleOutline,
      checkmarkCircle,
      schoolOutline,
      codeWorkingOutline,
      globeOutline,
      trendingUpOutline
    });
  }

  startLearning() {
    this.router.navigate(['/chapters']);
  }
}