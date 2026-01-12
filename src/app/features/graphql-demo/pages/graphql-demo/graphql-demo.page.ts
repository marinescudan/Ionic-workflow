import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Subject, takeUntil } from 'rxjs';
import { ChaptersGqlService } from '../../services/chapters-gql.service';
import { ProgressGqlService } from '../../services/progress-gql.service';
import { BookmarksGqlService } from '../../services/bookmarks-gql.service';
import { CacheService } from '../../../../core/services/graphql/cache.service';
import {
  Chapter,
  ChapterCategory,
  Progress,
  Bookmark,
} from '../../../../graphql/generated/types';

@Component({
  selector: 'app-graphql-demo',
  templateUrl: './graphql-demo.page.html',
  styleUrls: ['./graphql-demo.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class GraphqlDemoPage implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data
  chapters: Chapter[] = [];
  selectedChapter: Chapter | null = null;
  progressUpdates: Progress[] = [];
  chapterCompletions: Chapter[] = [];
  searchResults: Chapter[] = [];

  // UI State
  loading = false;
  activeTab: 'queries' | 'mutations' | 'subscriptions' | 'cache' = 'queries';
  searchQuery = '';

  // Cache inspection
  cacheSize = 0;
  cacheData: any = null;

  // Subscriptions active status
  progressSubActive = false;
  completionSubActive = false;

  constructor(
    private chaptersGql: ChaptersGqlService,
    private progressGql: ProgressGqlService,
    private bookmarksGql: BookmarksGqlService,
    private cacheService: CacheService
  ) {}

  ngOnInit() {
    this.loadChapters();
    this.updateCacheInfo();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * QUERIES TAB
   */

  loadChapters(category?: ChapterCategory) {
    this.loading = true;
    this.chaptersGql
      .getChapters(category)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (chapters) => {
          this.chapters = chapters;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading chapters:', error);
          this.loading = false;
        },
      });
  }

  loadChapter(id: string) {
    this.loading = true;
    this.chaptersGql
      .getChapter(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (chapter) => {
          this.selectedChapter = chapter;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading chapter:', error);
          this.loading = false;
        },
      });
  }

  searchChapters() {
    if (!this.searchQuery.trim()) {
      this.searchResults = [];
      return;
    }

    this.loading = true;
    this.chaptersGql
      .searchChapters(this.searchQuery)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (results) => {
          this.searchResults = results;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error searching chapters:', error);
          this.loading = false;
        },
      });
  }

  /**
   * MUTATIONS TAB
   */

  completeChapter(id: string) {
    this.chaptersGql
      .completeChapter(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (chapter) => {
          console.log('Chapter completed:', chapter);
          this.loadChapters(); // Refresh list
        },
        error: (error) => {
          console.error('Error completing chapter:', error);
        },
      });
  }

  updateProgress(chapterId: string, percentage: number | { lower: number; upper: number }) {
    // Handle RangeValue type (ion-range can return either number or {lower, upper})
    const value = typeof percentage === 'number' ? percentage : percentage.upper;

    this.progressGql
      .updateProgress(chapterId, value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (progress) => {
          console.log('Progress updated:', progress);
        },
        error: (error) => {
          console.error('Error updating progress:', error);
        },
      });
  }

  createBookmark(chapterId: string, sectionId: string, note: string) {
    this.bookmarksGql
      .createBookmark({ chapterId, sectionId, note })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (bookmark) => {
          console.log('Bookmark created:', bookmark);
        },
        error: (error) => {
          console.error('Error creating bookmark:', error);
        },
      });
  }

  /**
   * SUBSCRIPTIONS TAB
   */

  subscribeToProgressUpdates(chapterId?: string) {
    this.progressSubActive = true;
    const subscription = chapterId
      ? this.progressGql.onProgressUpdated(chapterId)
      : this.progressGql.onAllProgressUpdates();

    subscription.pipe(takeUntil(this.destroy$)).subscribe({
      next: (progress) => {
        console.log('Progress update received:', progress);
        this.progressUpdates.unshift(progress);
        if (this.progressUpdates.length > 10) {
          this.progressUpdates.pop();
        }
      },
      error: (error) => {
        console.error('Progress subscription error:', error);
        this.progressSubActive = false;
      },
    });
  }

  subscribeToChapterCompletions() {
    this.completionSubActive = true;
    this.chaptersGql
      .onChapterCompleted()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (chapter) => {
          console.log('Chapter completion received:', chapter);
          this.chapterCompletions.unshift(chapter);
          if (this.chapterCompletions.length > 10) {
            this.chapterCompletions.pop();
          }
        },
        error: (error) => {
          console.error('Completion subscription error:', error);
          this.completionSubActive = false;
        },
      });
  }

  /**
   * CACHE TAB
   */

  updateCacheInfo() {
    this.cacheSize = this.cacheService.getCacheSize();
    this.cacheData = this.cacheService.extractCacheData();
  }

  clearCache() {
    this.cacheService.clearCache();
    this.updateCacheInfo();
    this.loadChapters(); // Reload data
  }

  inspectChapterCache(id: string) {
    const chapter = this.chaptersGql.readChapterFromCache(id);
    console.log('Chapter in cache:', chapter);
    return chapter;
  }

  /**
   * TAB SWITCHING
   */

  switchTab(tab: 'queries' | 'mutations' | 'subscriptions' | 'cache') {
    this.activeTab = tab;
  }
}
