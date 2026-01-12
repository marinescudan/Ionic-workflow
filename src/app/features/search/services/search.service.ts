import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { ChaptersService } from '@services/chapters/chapters.service';

/**
 * Search Result Interface
 * Represents a searchable item in the app (chapter or section)
 */
export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'chapter' | 'section';
  chapterId?: number;
  sectionId?: number;
}

/**
 * Search Service
 *
 * Searches through chapters and sections for matching content
 * Used by the search page with debounceTime and distinctUntilChanged
 *
 * Pattern from Lesson 9: HTTP & API Integration
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private chaptersService: ChaptersService) {}

  /**
   * Search for chapters and sections matching the query
   *
   * @param query Search term
   * @returns Observable of search results
   *
   * 💡 INTERVIEW: Observable pattern allows:
   * - Automatic cancellation with switchMap
   * - Debouncing to reduce requests
   * - Lazy execution (only when subscribed)
   */
  search(query: string): Observable<SearchResult[]> {
    // Return empty results for empty query
    if (!query || query.trim().length === 0) {
      return of([]);
    }

    const searchTerm = query.toLowerCase().trim();
    const results: SearchResult[] = [];

    // Get all chapters
    const chapters = this.chaptersService['chaptersSubject'].value;

    // Search through chapters
    chapters.forEach(chapter => {
      // Search chapter title and description
      if (
        chapter.title.toLowerCase().includes(searchTerm) ||
        chapter.description.toLowerCase().includes(searchTerm)
      ) {
        results.push({
          id: `chapter-${chapter.id}`,
          title: chapter.title,
          description: chapter.description,
          type: 'chapter',
          chapterId: chapter.id
        });
      }

      // Search through sections
      if (chapter.sections) {
        chapter.sections.forEach(section => {
          if (
            section.title.toLowerCase().includes(searchTerm) ||
            (section.content && section.content.toLowerCase().includes(searchTerm))
          ) {
            results.push({
              id: `section-${section.id}`,
              title: `${chapter.title} > ${section.title}`,
              description: this.extractDescription(section.content),
              type: 'section',
              chapterId: chapter.id,
              sectionId: section.id
            });
          }
        });
      }
    });

    // Simulate network delay (remove in production or use real API)
    return of(results).pipe(delay(300));
  }

  /**
   * Extract a short description from HTML content
   * Takes first 150 characters of text content
   */
  private extractDescription(htmlContent?: string): string {
    if (!htmlContent) return '';

    // Remove HTML tags and get plain text
    const div = document.createElement('div');
    div.innerHTML = htmlContent;
    const text = div.textContent || div.innerText || '';

    // Return first 150 characters
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  }
}

/**
 * 💡 INTERVIEW TIPS:
 *
 * Q: Why return Observable instead of Promise?
 * A: Observables support:
 * - Cancellation (important for search with switchMap)
 * - Multiple values over time
 * - Composition with RxJS operators
 * - Lazy execution
 *
 * Q: How does search cancellation work?
 * A: In search.page.ts, switchMap() automatically unsubscribes from
 *    previous search when user types new character, cancelling old request
 *
 * Q: Why debounce search?
 * A: Prevents excessive API calls as user types. Wait 300ms after
 *    last keystroke before executing search.
 *
 * Q: What's distinctUntilChanged for?
 * A: Prevents duplicate searches if user types same term twice
 */
