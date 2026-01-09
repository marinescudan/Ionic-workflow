import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, interval } from 'rxjs';
import { StorageService } from '@services/storage/storage.service';
import {
  ProgressData,
  Bookmark,
  TimeTracking,
  LearningStreak,
  ProgressStats,
  CategoryProgress,
  WeeklyGoal,
  WeeklyGoalStats,
  Achievement,
  EarnedAchievement,
} from '@app/models/progress.model';
import { Chapter } from '@app/models/chapter.model';
import { ACHIEVEMENTS } from './data/achievements.constants';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private readonly PROGRESS_KEY = 'progress-data';
  private readonly SESSION_INTERVAL = 60000; // 1 minute

  private progressSubject = new BehaviorSubject<ProgressData>(this.getDefaultProgress());
  public progress$: Observable<ProgressData> = this.progressSubject.asObservable();

  // Emits newly earned achievements for notifications
  private achievementEarnedSubject = new Subject<Achievement>();
  public achievementEarned$: Observable<Achievement> = this.achievementEarnedSubject.asObservable();

  private sessionTimerSubscription?: any;
  private chapters: Chapter[] = []; // Cache for achievement checks

  constructor(private storage: StorageService) {
    this.loadProgress();
    this.startSessionTimer();
  }

  // Initialize default progress data
  private getDefaultProgress(): ProgressData {
    return {
      completedChapters: [],
      bookmarks: [],
      timeTracking: {
        totalMinutes: 0,
        dailyLog: {},
      },
      streak: {
        current: 0,
        longest: 0,
        lastActivityDate: '',
        activeDays: [],
      },
      earnedAchievements: [],
      lastUpdated: new Date().toISOString(),
      version: 1,
    };
  }

  // Load from storage
  private loadProgress(): void {
    const saved = this.storage.get<ProgressData>(this.PROGRESS_KEY);
    if (saved) {
      this.progressSubject.next(saved);
      this.updateStreak(); // Recalculate streak on load
    }
  }

  // Save to storage
  private saveProgress(): void {
    const data = this.progressSubject.value;
    data.lastUpdated = new Date().toISOString();
    this.storage.set(this.PROGRESS_KEY, data);
  }

  // Get current progress data
  getProgressData(): ProgressData {
    return this.progressSubject.value;
  }

  // Mark chapter as complete
  markChapterComplete(chapterId: number): void {
    const data = this.progressSubject.value;
    if (!data.completedChapters.includes(chapterId)) {
      data.completedChapters.push(chapterId);
      this.recordActivity();
      this.trackWeeklyGoalCompletion(chapterId);
      this.progressSubject.next(data);
      this.saveProgress();
      this.checkAchievements(); // Check for new achievements
    }
  }

  // Unmark chapter (for review)
  unmarkChapterComplete(chapterId: number): void {
    const data = this.progressSubject.value;
    data.completedChapters = data.completedChapters.filter(id => id !== chapterId);
    this.progressSubject.next(data);
    this.saveProgress();
  }

  // Check if chapter is complete
  isChapterComplete(chapterId: number): boolean {
    return this.progressSubject.value.completedChapters.includes(chapterId);
  }

  // === BOOKMARKS ===

  // Add bookmark
  addBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): string {
    const data = this.progressSubject.value;
    const newBookmark: Bookmark = {
      ...bookmark,
      id: this.generateUUID(),
      createdAt: new Date().toISOString(),
    };
    data.bookmarks.push(newBookmark);
    this.progressSubject.next(data);
    this.saveProgress();
    this.checkAchievements(); // Check for new achievements
    return newBookmark.id;
  }

  // Remove bookmark
  removeBookmark(bookmarkId: string): void {
    const data = this.progressSubject.value;
    data.bookmarks = data.bookmarks.filter(b => b.id !== bookmarkId);
    this.progressSubject.next(data);
    this.saveProgress();
  }

  // Get bookmarks for chapter
  getChapterBookmarks(chapterId: number): Bookmark[] {
    return this.progressSubject.value.bookmarks.filter(b => b.chapterId === chapterId);
  }

  // Get all bookmarks
  getAllBookmarks(): Bookmark[] {
    return this.progressSubject.value.bookmarks;
  }

  // Update bookmark note
  updateBookmarkNote(bookmarkId: string, note: string): void {
    const data = this.progressSubject.value;
    const bookmark = data.bookmarks.find(b => b.id === bookmarkId);
    if (bookmark) {
      bookmark.note = note;
      this.progressSubject.next(data);
      this.saveProgress();
    }
  }

  // === TIME TRACKING ===

  // Start session timer
  private startSessionTimer(): void {
    const data = this.progressSubject.value;
    data.timeTracking.sessionStart = new Date().toISOString();
    this.progressSubject.next(data);
    this.saveProgress();

    // Update every minute
    this.sessionTimerSubscription = interval(this.SESSION_INTERVAL).subscribe(() => {
      this.incrementSessionTime();
    });
  }

  // Increment time by 1 minute
  private incrementSessionTime(): void {
    const data = this.progressSubject.value;
    const today = this.getTodayKey();

    data.timeTracking.totalMinutes += 1;
    data.timeTracking.dailyLog[today] = (data.timeTracking.dailyLog[today] || 0) + 1;

    this.recordActivity(); // Update streak
    this.progressSubject.next(data);
    this.saveProgress();
  }

  // Get today's learning time
  getTodayMinutes(): number {
    const today = this.getTodayKey();
    return this.progressSubject.value.timeTracking.dailyLog[today] || 0;
  }

  // Get this week's learning time
  getWeekMinutes(): number {
    const weekDates = this.getLastNDays(7);
    const dailyLog = this.progressSubject.value.timeTracking.dailyLog;
    return weekDates.reduce((total, date) => total + (dailyLog[date] || 0), 0);
  }

  // === STREAK CALCULATION ===

  // Record activity for today
  private recordActivity(): void {
    const data = this.progressSubject.value;
    const today = this.getTodayKey();

    // Add to active days if not already present
    if (!data.streak.activeDays.includes(today)) {
      data.streak.activeDays.push(today);
      data.streak.activeDays.sort(); // Keep chronological
    }

    data.streak.lastActivityDate = today;
    this.updateStreak();
  }

  // Calculate current streak
  private updateStreak(): void {
    const data = this.progressSubject.value;
    const sortedDays = [...data.streak.activeDays].sort().reverse(); // Newest first

    if (sortedDays.length === 0) {
      data.streak.current = 0;
      data.streak.longest = 0;
      return;
    }

    // Calculate current streak (from today backward)
    let current = 0;
    const today = this.getTodayKey();
    let checkDate = new Date(today);

    while (sortedDays.includes(this.formatDate(checkDate))) {
      current++;
      checkDate.setDate(checkDate.getDate() - 1);
    }

    data.streak.current = current;

    // Calculate longest streak
    let longest = 0;
    let tempStreak = 1;

    for (let i = 0; i < sortedDays.length - 1; i++) {
      const date1 = new Date(sortedDays[i]);
      const date2 = new Date(sortedDays[i + 1]);
      const diffDays = Math.floor((date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
      } else {
        longest = Math.max(longest, tempStreak);
        tempStreak = 1;
      }
    }
    longest = Math.max(longest, tempStreak);

    data.streak.longest = Math.max(longest, data.streak.longest);
    this.progressSubject.next(data);
    this.saveProgress();
  }

  // === STATISTICS ===

  // Get comprehensive statistics
  getStats(chapters: Chapter[]): ProgressStats {
    const data = this.progressSubject.value;
    const totalChapters = chapters.length;
    const completedChapters = data.completedChapters.length;

    return {
      totalChapters,
      completedChapters,
      completionPercentage: totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0,
      totalTimeMinutes: data.timeTracking.totalMinutes,
      averageTimePerChapter:
        completedChapters > 0 ? data.timeTracking.totalMinutes / completedChapters : 0,
      currentStreak: data.streak.current,
      longestStreak: data.streak.longest,
      todayMinutes: this.getTodayMinutes(),
      weekMinutes: this.getWeekMinutes(),
    };
  }

  // Get progress by category
  getCategoryProgress(chapters: Chapter[]): CategoryProgress[] {
    const data = this.progressSubject.value;
    const categories = new Map<string, { total: number; completed: number }>();

    chapters.forEach(chapter => {
      const cat = chapter.category;
      if (!categories.has(cat)) {
        categories.set(cat, { total: 0, completed: 0 });
      }
      const stats = categories.get(cat)!;
      stats.total++;
      if (data.completedChapters.includes(chapter.id)) {
        stats.completed++;
      }
    });

    return Array.from(categories.entries()).map(([category, stats]) => ({
      category,
      total: stats.total,
      completed: stats.completed,
      percentage: stats.total > 0 ? (stats.completed / stats.total) * 100 : 0,
    }));
  }

  // === EXPORT / IMPORT ===

  // Export progress as JSON
  exportProgress(): string {
    const data = this.progressSubject.value;
    return JSON.stringify(data, null, 2);
  }

  // Import progress from JSON
  importProgress(json: string, merge: boolean = false): boolean {
    try {
      const imported = JSON.parse(json) as ProgressData;

      // Validate structure
      if (!this.validateProgressData(imported)) {
        throw new Error('Invalid progress data structure');
      }

      if (merge) {
        // Merge with existing data
        const current = this.progressSubject.value;
        imported.completedChapters = [
          ...new Set([...current.completedChapters, ...imported.completedChapters]),
        ];
        imported.bookmarks = [...current.bookmarks, ...imported.bookmarks];
        imported.timeTracking.totalMinutes += current.timeTracking.totalMinutes;
        imported.streak.activeDays = [
          ...new Set([...current.streak.activeDays, ...imported.streak.activeDays]),
        ];
      }

      this.progressSubject.next(imported);
      this.updateStreak(); // Recalculate
      this.saveProgress();
      return true;
    } catch (error) {
      console.error('Import failed:', error);
      return false;
    }
  }

  // Validate imported data
  private validateProgressData(data: any): data is ProgressData {
    return (
      data &&
      Array.isArray(data.completedChapters) &&
      Array.isArray(data.bookmarks) &&
      data.timeTracking &&
      typeof data.timeTracking.totalMinutes === 'number' &&
      data.streak &&
      typeof data.streak.current === 'number'
    );
  }

  // === RESET ===

  // Reset all progress
  resetProgress(): void {
    this.progressSubject.next(this.getDefaultProgress());
    this.saveProgress();
  }

  // Clear bookmarks only
  clearBookmarks(): void {
    const data = this.progressSubject.value;
    data.bookmarks = [];
    this.progressSubject.next(data);
    this.saveProgress();
  }

  // === WEEKLY GOALS ===

  setWeeklyGoal(targetChapters: number): void {
    const data = this.progressSubject.value;
    const weekStart = this.getWeekStart();

    data.weeklyGoal = {
      targetChapters,
      weekStart,
      completedThisWeek: [],
    };

    this.progressSubject.next(data);
    this.saveProgress();
  }

  getWeeklyGoalStats(): WeeklyGoalStats | null {
    const data = this.progressSubject.value;

    if (!data.weeklyGoal) {
      return null;
    }

    const currentWeekStart = this.getWeekStart();
    const isNewWeek = data.weeklyGoal.weekStart !== currentWeekStart;

    // If it's a new week, reset the tracking
    if (isNewWeek) {
      this.resetWeeklyGoalForNewWeek();
      return this.getWeeklyGoalStats();
    }

    const completed = data.weeklyGoal.completedThisWeek.length;
    const target = data.weeklyGoal.targetChapters;

    return {
      target,
      completed,
      percentage: target > 0 ? Math.min((completed / target) * 100, 100) : 0,
      weekStart: data.weeklyGoal.weekStart,
      daysRemaining: this.getDaysRemainingInWeek(),
    };
  }

  hasWeeklyGoal(): boolean {
    return !!this.progressSubject.value.weeklyGoal;
  }

  clearWeeklyGoal(): void {
    const data = this.progressSubject.value;
    data.weeklyGoal = undefined;
    this.progressSubject.next(data);
    this.saveProgress();
  }

  private resetWeeklyGoalForNewWeek(): void {
    const data = this.progressSubject.value;

    if (data.weeklyGoal) {
      data.weeklyGoal = {
        targetChapters: data.weeklyGoal.targetChapters,
        weekStart: this.getWeekStart(),
        completedThisWeek: [],
      };
      this.progressSubject.next(data);
      this.saveProgress();
    }
  }

  private trackWeeklyGoalCompletion(chapterId: number): void {
    const data = this.progressSubject.value;

    if (data.weeklyGoal) {
      const currentWeekStart = this.getWeekStart();

      if (data.weeklyGoal.weekStart !== currentWeekStart) {
        this.resetWeeklyGoalForNewWeek();
      }

      if (!data.weeklyGoal.completedThisWeek.includes(chapterId)) {
        data.weeklyGoal.completedThisWeek.push(chapterId);
        this.progressSubject.next(data);
        this.saveProgress();
      }
    }
  }

  private getWeekStart(): string {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    return this.formatDate(monday);
  }

  private getDaysRemainingInWeek(): number {
    const now = new Date();
    const dayOfWeek = now.getDay();
    return dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  }

  // === ACHIEVEMENTS ===

  // Set chapters for achievement checking
  setChaptersForAchievements(chapters: Chapter[]): void {
    this.chapters = chapters;
    this.checkAchievements(); // Check on initial load
  }

  // Get all available achievements with earned status
  getAllAchievements(): (Achievement & { earned: boolean; earnedAt?: string })[] {
    const data = this.progressSubject.value;
    const earnedIds = new Set(data.earnedAchievements.map(a => a.id));

    return ACHIEVEMENTS.map(achievement => {
      const earned = data.earnedAchievements.find(a => a.id === achievement.id);
      return {
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        color: achievement.color,
        earned: earnedIds.has(achievement.id),
        earnedAt: earned?.earnedAt,
      };
    });
  }

  // Get only earned achievements
  getEarnedAchievements(): (Achievement & { earnedAt: string })[] {
    const data = this.progressSubject.value;

    return data.earnedAchievements.map(earned => {
      const achievement = ACHIEVEMENTS.find(a => a.id === earned.id);
      return {
        id: earned.id,
        name: achievement?.name || 'Unknown',
        description: achievement?.description || '',
        icon: achievement?.icon || 'trophy',
        color: achievement?.color || 'medium',
        earnedAt: earned.earnedAt,
      };
    });
  }

  // Check and award new achievements
  checkAchievements(): void {
    const data = this.progressSubject.value;
    const earnedIds = new Set(data.earnedAchievements.map(a => a.id));
    let hasNewAchievements = false;

    for (const achievement of ACHIEVEMENTS) {
      // Skip if already earned
      if (earnedIds.has(achievement.id)) continue;

      // Check condition
      if (achievement.condition(data, this.chapters)) {
        // Award achievement
        data.earnedAchievements.push({
          id: achievement.id,
          earnedAt: new Date().toISOString(),
        });
        hasNewAchievements = true;

        // Emit notification
        this.achievementEarnedSubject.next({
          id: achievement.id,
          name: achievement.name,
          description: achievement.description,
          icon: achievement.icon,
          color: achievement.color,
        });
      }
    }

    if (hasNewAchievements) {
      this.progressSubject.next(data);
      this.saveProgress();
    }
  }

  // === UTILITY ===

  private getTodayKey(): string {
    return this.formatDate(new Date());
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  }

  private getLastNDays(n: number): string[] {
    const days: string[] = [];
    for (let i = 0; i < n; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(this.formatDate(date));
    }
    return days;
  }

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Cleanup on service destroy
  ngOnDestroy(): void {
    if (this.sessionTimerSubscription) {
      this.sessionTimerSubscription.unsubscribe();
    }
  }
}
