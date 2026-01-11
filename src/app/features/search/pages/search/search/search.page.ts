import { Component, inject, signal, OnDestroy } from '@angular/core';
import { Subject, takeUntil, switchMap, debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-searchbar
          [debounce]="300"
          (ionInput)="onSearchChange($event)"
          placeholder="Search..."
        ></ion-searchbar>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      @if (searching()) {
        <ion-spinner></ion-spinner>
      }

      <ion-list>
        @for (result of results(); track result.id) {
          <ion-item>{{ result.title }}</ion-item>
        }
      </ion-list>
    </ion-content>
  `,
  standalone: true,
})
export class SearchPage implements OnDestroy {
  private searchService = inject(SearchService);
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  results = signal<any[]>([]);
  searching = signal(false);

  constructor() {
    // Set up search with debounce and cancellation
    this.searchSubject
      .pipe(
        debounceTime(300),           // Wait 300ms after last keystroke
        distinctUntilChanged(),       // Ignore if same as previous
        switchMap((query) => {
          // switchMap cancels previous request when new one starts
          this.searching.set(true);
          return this.searchService.search(query);
        }),
        takeUntil(this.destroy$)      // Cleanup on destroy
      )
      .subscribe({
        next: (results) => {
          this.results.set(results);
          this.searching.set(false);
        },
        error: () => {
          this.searching.set(false);
        },
      });
  }

  onSearchChange(event: any) {
    const query = event.target.value;
    this.searchSubject.next(query);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
