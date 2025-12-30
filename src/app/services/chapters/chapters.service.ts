import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chapter } from '../../models/chapter.model';
import { CHAPTERS_DATA } from './chapters.constants';

@Injectable({
  providedIn: 'root', // Singleton (one instance app-wide)
})
export class ChaptersService {
  // BehaviorSubject holds current chapters and emits to subscribers
  private chaptersSubject = new BehaviorSubject<Chapter[]>([]);

  // Expose as Observable (read-only from outside)
  public chapters$: Observable<Chapter[]> = this.chaptersSubject.asObservable();

  constructor() {
    this.loadChapters();
  }

  private loadChapters(): void {
    // Load from constants (later: replace with API call)
    this.chaptersSubject.next(CHAPTERS_DATA);
    this.loadProgress(); // Load saved progress from localStorage
  }

  getChapterById(id: number): Chapter | undefined {
    return this.chaptersSubject.value.find(c => c.id === id);
  }

  markChapterComplete(id: number): void {
    const updatedChapters = this.chaptersSubject.value.map(chapter =>
      chapter.id === id ? { ...chapter, completed: true } : chapter
    );
    this.chaptersSubject.next(updatedChapters);
    this.saveProgress(); // Persist to localStorage
  }

  getProgress(): { completed: number; total: number; percentage: number } {
    const chapters = this.chaptersSubject.value;
    const completed = chapters.filter(c => c.completed).length;
    const total = chapters.length;
    return {
      completed,
      total,
      percentage: total > 0 ? (completed / total) * 100 : 0,
    };
  }

  private saveProgress(): void {
    const completedIds = this.chaptersSubject.value
      .filter(c => c.completed)
      .map(c => c.id);
    localStorage.setItem('ionic-workflow-progress', JSON.stringify(completedIds));
  }

  private loadProgress(): void {
    const saved = localStorage.getItem('ionic-workflow-progress');
    if (saved) {
      const completedIds: number[] = JSON.parse(saved);
      const chapters = this.chaptersSubject.value.map(chapter => ({
        ...chapter,
        completed: completedIds.includes(chapter.id),
      }));
      this.chaptersSubject.next(chapters);
    }
  }
}
