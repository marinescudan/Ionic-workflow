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
  IonButton,
  IonButtons,
  IonProgressBar,
  IonChip,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  rocketOutline,
  gridOutline,
  constructOutline,
  analyticsOutline,
  gitNetworkOutline,
  navigateOutline,
  createOutline,
  layersOutline,
  cloudOutline,
  flashOutline,
  cameraOutline,
  musicalNotesOutline,
  serverOutline,
  cloudOfflineOutline,
  checkmarkDoneOutline,
  checkmarkCircle,
  play,
  code,
  statsChart,
} from 'ionicons/icons';
import { ChaptersService } from '@app/services/chapters/chapters.service';
import { Chapter } from '@app/models/chapter.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  getCategoryChipClass,
  getCategoryColorConfig,
} from '@constants/category-colors.constants';

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
    // Register ionicons - chapter icons (outline variants)
    addIcons({
      rocketOutline,
      gridOutline,
      constructOutline,
      analyticsOutline,
      gitNetworkOutline,
      navigateOutline,
      createOutline,
      layersOutline,
      cloudOutline,
      flashOutline,
      cameraOutline,
      musicalNotesOutline,
      serverOutline,
      cloudOfflineOutline,
      checkmarkDoneOutline,
      // UI icons
      checkmarkCircle,
      play,
      code,
      statsChart,
    });
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

  getCategoryChipClass(category: string): string {
    return getCategoryChipClass(category);
  }

  getCategoryIconStyle(category: string): { [key: string]: string } {
    const config = getCategoryColorConfig(category);
    return { color: `var(${config.cssVar})` };
  }
}
