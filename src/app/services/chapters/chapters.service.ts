
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chapter } from '@app/models/chapter.model';
import { CHAPTERS_DATA } from './chapters.constants';
import { ProgressService } from '@services/progress/progress.service'; // NEW

@Injectable({
  providedIn: 'root',
})
export class ChaptersService {
  private chaptersSubject = new BehaviorSubject<Chapter[]>([]);
  public chapters$: Observable<Chapter[]> = this.chaptersSubject.asObservable();

  constructor(private progressService: ProgressService) { // NEW
    this.loadChapters();
  }

  private loadChapters(): void {
    this.chaptersSubject.next(CHAPTERS_DATA);
    this.syncWithProgress(); // NEW
  }

  // Sync chapter completion state with ProgressService
  private syncWithProgress(): void {
    const chapters = this.chaptersSubject.value;
    const updatedChapters = chapters.map(chapter => ({
      ...chapter,
      completed: this.progressService.isChapterComplete(chapter.id),
    }));
    this.chaptersSubject.next(updatedChapters);
  }

  getChapterById(id: number): Chapter | undefined {
    return this.chaptersSubject.value.find(c => c.id === id);
  }

  markChapterComplete(id: number): void {
    this.progressService.markChapterComplete(id); // Use ProgressService
    this.syncWithProgress(); // Update UI
  }

  unmarkChapterComplete(id: number): void {
    this.progressService.unmarkChapterComplete(id);
    this.syncWithProgress();
  }

  getProgress(): { completed: number; total: number; percentage: number } {
    const chapters = this.chaptersSubject.value;
    const stats = this.progressService.getStats(chapters);
    return {
      completed: stats.completedChapters,
      total: stats.totalChapters,
      percentage: stats.completionPercentage,
    };
  }
}
