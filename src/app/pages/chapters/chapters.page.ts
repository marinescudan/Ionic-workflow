import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
  IonBadge,
  IonButton,
  IonButtons,
  IonProgressBar,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  rocket,
  apps,
  navigate,
  create,
  layers,
  checkmarkCircle,
  play,
  code
} from 'ionicons/icons';
import { ChaptersService } from '@app/services/chapters/chapters.service';
import { Chapter } from '@app/models/chapter.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.page.html',
  styleUrls: ['./chapters.page.scss'],
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
    IonCardSubtitle,
    IonCardContent,
    IonIcon,
    IonBadge,
    IonButton,
    IonButtons,
    IonProgressBar,
    IonChip,
    IonLabel,
    RouterLink,
  ],
})
export class ChaptersPage implements OnInit, OnDestroy {
  chapters: Chapter[] = [];
  progress = { completed: 0, total: 0, percentage: 0 };

  // For memory leak prevention
  private destroy$ = new Subject<void>();

  constructor(
    private chaptersService: ChaptersService,
    private router: Router
  ) {
    // Register ionicons
    addIcons({ rocket, apps, navigate, create, layers, checkmarkCircle, play, code });
  }

  ngOnInit() {
    // Subscribe to chapters
    this.chaptersService.chapters$
      .pipe(takeUntil(this.destroy$)) // Auto-unsubscribe on destroy
      .subscribe(chapters => {
        this.chapters = chapters;
        this.progress = this.chaptersService.getProgress();
      });
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }

  openChapter(chapter: Chapter) {
    this.router.navigate(['/chapters', chapter.id]);
  }

  openDemo(event: Event, chapter: Chapter) {
    event.stopPropagation(); // Prevent card click
    this.router.navigate(['/demo', chapter.id]);
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      foundation: 'primary',
      components: 'secondary',
      navigation: 'tertiary',
      state: 'success',
      advanced: 'warning',
    };
    return colors[category] || 'medium';
  }
}
