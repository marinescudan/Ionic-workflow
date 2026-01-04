import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel,
  // IonBadge,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  chevronBack,
  checkmarkCircle,
  playCircle,
  alertCircle
} from 'ionicons/icons';
import { ChaptersService } from '@services/chapters/chapters.service';
import { Chapter, Section } from '@app/models/chapter.model';
import { CodeSnippetComponent } from '@components/code-snippet/code-snippet.component';
import { ProgressService } from '@services/progress/progress.service';

@Component({
  selector: 'app-chapter-detail',
  templateUrl: './chapter-detail.page.html',
  styleUrls: ['./chapter-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonLabel,
    // IonBadge,
    CodeSnippetComponent,
  ],
})
export class ChapterDetailPage implements OnInit {
  chapter?: Chapter;
  chapterId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private chaptersService: ChaptersService,
    private sanitizer: DomSanitizer,
    private progressService: ProgressService,
    private toastController: ToastController
  ) {
    addIcons({ chevronBack, checkmarkCircle, playCircle, alertCircle });
  }

  ngOnInit() {
    // Get chapter ID from route parameter
    this.route.params.subscribe(params => {
      this.chapterId = +params['id']; // + converts string to number
      this.loadChapter();
    });
  }

  loadChapter() {
    if (this.chapterId) {
      this.chapter = this.chaptersService.getChapterById(this.chapterId);
    }
  }

  // Sanitize HTML content for safe rendering
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(1, html) || ''; // 1 = SecurityContext.HTML
  }

  markComplete() {
    if (this.chapterId) {
      this.chaptersService.markChapterComplete(this.chapterId);
      this.loadChapter(); // Reload to show updated state
    }
  }

  openDemo() {
    if (this.chapter?.hasDemo) {
      this.router.navigate(['/demo', this.chapterId]);
    }
  }

  goBack() {
    this.router.navigate(['/chapters']);
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

  // Add bookmark to section
  addBookmark(section: Section) {
    if (this.chapter) {
      const bookmarkId = this.progressService.addBookmark({
        chapterId: this.chapter.id,
        sectionId: section.id,
        sectionTitle: section.title,
        chapterTitle: this.chapter.title,
      });

      section.bookmarked = true;
      section.bookmarkId = bookmarkId;

      this.showToast('Bookmark added!', 'success');
    }
  }

  // Remove bookmark
  removeBookmark(section: Section) {
    if (section.bookmarkId) {
      this.progressService.removeBookmark(section.bookmarkId);
      section.bookmarked = false;
      section.bookmarkId = undefined;

      this.showToast('Bookmark removed', 'success');
    }
  }

  // Check if section is bookmarked
  isSectionBookmarked(section: Section): boolean {
    if (!this.chapter) return false;
    const bookmarks = this.progressService.getChapterBookmarks(this.chapter.id);
    const bookmark = bookmarks.find(b => b.sectionId === section.id);

    if (bookmark) {
      section.bookmarked = true;
      section.bookmarkId = bookmark.id;
      return true;
    }

    return false;
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
