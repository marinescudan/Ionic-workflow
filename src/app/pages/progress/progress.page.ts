import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonProgressBar,
  IonChip,
  IonActionSheet,
  AlertController,
  ToastController,
  IonNote,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  statsChart,
  download,
  cloudUpload,
  trash,
  bookmark,
  time,
  flame,
  checkmarkCircle,
  close,
  arrowForward,
} from 'ionicons/icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ChaptersService } from '@services/chapters/chapters.service';
import { ProgressService } from '@services/progress/progress.service';
import { Chapter } from '@app/models/chapter.model';
import { ProgressStats, Bookmark, CategoryProgress } from '@app/models/progress.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
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
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
    IonProgressBar,
    IonChip,
    IonActionSheet,
    IonNote,
    IonGrid,
    IonRow,
    IonCol,
  ],
})
export class ProgressPage implements OnInit, OnDestroy {
  stats?: ProgressStats;
  categoryProgress: CategoryProgress[] = [];
  completedChapters: Chapter[] = [];
  bookmarks: Bookmark[] = [];
  chapters: Chapter[] = [];

  showActions = false;

  private destroy$ = new Subject<void>();

  constructor(
    private chaptersService: ChaptersService,
    private progressService: ProgressService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      statsChart,
      download,
      cloudUpload,
      trash,
      bookmark,
      time,
      flame,
      checkmarkCircle,
      close,
      arrowForward,
    });
  }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadData() {
    this.chaptersService.chapters$.pipe(takeUntil(this.destroy$)).subscribe(chapters => {
      this.chapters = chapters;
      this.stats = this.progressService.getStats(chapters);
      this.categoryProgress = this.progressService.getCategoryProgress(chapters);
      this.completedChapters = chapters.filter(c => c.completed);
    });

    this.progressService.progress$.pipe(takeUntil(this.destroy$)).subscribe(progress => {
      this.bookmarks = progress.bookmarks;
    });
  }

  // === EXPORT / IMPORT ===

  exportProgress() {
    try {
      const json = this.progressService.exportProgress();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ionic-workflow-progress-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      this.showToast('Progress exported successfully!', 'success');
    } catch (error) {
      console.error('Export failed:', error);
      this.showToast('Export failed. Please try again.', 'danger');
    }
  }

  async importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      try {
        const text = await file.text();

        // Ask merge or replace
        const alert = await this.alertController.create({
          header: 'Import Progress',
          message: 'Do you want to merge with existing progress or replace it?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
            },
            {
              text: 'Replace',
              handler: () => {
                this.performImport(text, false);
              },
            },
            {
              text: 'Merge',
              handler: () => {
                this.performImport(text, true);
              },
            },
          ],
        });

        await alert.present();
      } catch (error) {
        console.error('Import failed:', error);
        this.showToast('Failed to read file', 'danger');
      }
    };

    input.click();
  }

  private performImport(json: string, merge: boolean) {
    const success = this.progressService.importProgress(json, merge);
    if (success) {
      this.loadData();
      this.showToast(
        `Progress ${merge ? 'merged' : 'imported'} successfully!`,
        'success'
      );
    } else {
      this.showToast('Invalid progress data', 'danger');
    }
  }

  // === RESET ===

  async confirmReset() {
    const alert = await this.alertController.create({
      header: 'Reset All Progress',
      message:
        'This will delete all your progress, bookmarks, and time tracking. This action cannot be undone!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset Everything',
          role: 'destructive',
          handler: () => {
            this.progressService.resetProgress();
            this.loadData();
            this.showToast('All progress has been reset', 'warning');
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmClearBookmarks() {
    const alert = await this.alertController.create({
      header: 'Clear Bookmarks',
      message: 'Remove all bookmarks? This cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Clear',
          role: 'destructive',
          handler: () => {
            this.progressService.clearBookmarks();
            this.showToast('Bookmarks cleared', 'success');
          },
        },
      ],
    });

    await alert.present();
  }

  // === NAVIGATION ===

  openChapter(chapter: Chapter) {
    this.router.navigate(['/chapters', chapter.id]);
  }

  goToBookmark(bookmark: Bookmark) {
    this.router.navigate(['/chapters', bookmark.chapterId]);
    // Could add scroll to section logic
  }

  removeBookmark(bookmark: Bookmark, event: Event) {
    event.stopPropagation();
    this.progressService.removeBookmark(bookmark.id);
    this.showToast('Bookmark removed', 'success');
  }

  // === UI HELPERS ===

  formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
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

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color,
    });
    await toast.present();
  }
}
