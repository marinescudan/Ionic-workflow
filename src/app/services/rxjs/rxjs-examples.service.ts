import { Injectable } from '@angular/core';
import { RxJSPattern } from '@app/models/rxjs.model';

@Injectable({
  providedIn: 'root',
})
export class RxjsExamplesService {
  private patterns: RxJSPattern[] = [
    {
      id: 'search-debounce',
      name: 'Search with Debounce',
      description: 'Type-ahead search with debouncing',
      useCase: 'Search bars, autocomplete, live filtering',
      code: `import { fromEvent } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap
} from 'rxjs/operators';

const searchInput = document.querySelector('input');

fromEvent(searchInput, 'input').pipe(
  map(event => event.target.value),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term))
).subscribe(results => {
  displayResults(results);
});`,
      explanation: `
1. **debounceTime(300)**: Wait 300ms after user stops typing
2. **distinctUntilChanged()**: Only search if term changed
3. **switchMap()**: Cancel previous search, use latest
4. Result: Efficient search with no duplicate requests
      `.trim(),
      avoidCommonMistake: '❌ Using map instead of switchMap returns Observable, not results',
    },
    {
      id: 'auto-unsubscribe',
      name: 'Auto-unsubscribe Pattern',
      description: 'Prevent memory leaks with takeUntil',
      useCase: 'All component subscriptions',
      code: `import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class MyComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      // Handle data
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}`,
      explanation: `
1. Create destroy$ Subject
2. Use takeUntil(this.destroy$) on all subscriptions
3. Complete destroy$ in ngOnDestroy
4. All subscriptions auto-cleanup
      `.trim(),
    },
    {
      id: 'combine-multiple',
      name: 'Combine Multiple Sources',
      description: 'Reactive ViewModel from multiple streams',
      useCase: 'Dashboard, profile page, complex views',
      code: `import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

viewModel$ = combineLatest([
  this.userService.user$,
  this.settingsService.settings$,
  this.notificationService.notifications$
]).pipe(
  map(([user, settings, notifications]) => ({
    user,
    settings,
    notifications,
    hasUnread: notifications.unread > 0
  }))
);

// Template
// <div *ngIf="viewModel$ | async as vm">
//   {{ vm.user.name }}
//   <badge *ngIf="vm.hasUnread">{{ vm.notifications.unread }}</badge>
// </div>`,
      explanation: `
1. combineLatest waits for all to emit once
2. Then emits on any change
3. map transforms into ViewModel
4. async pipe handles subscription
      `.trim(),
    },
    {
      id: 'retry-with-backoff',
      name: 'Retry with Exponential Backoff',
      description: 'Smart retry for failed HTTP requests',
      useCase: 'API calls, file uploads, network operations',
      code: `import { throwError, timer } from 'rxjs';
import { retryWhen, delayWhen, take, tap } from 'rxjs/operators';

this.http.get('/api/data').pipe(
  retryWhen(errors => errors.pipe(
    tap(err => console.log('Retrying...', err)),
    delayWhen((err, index) => {
      const delay = Math.min(1000 * Math.pow(2, index), 10000);
      return timer(delay);
    }),
    take(3)
  ))
).subscribe(data => console.log(data));`,
      explanation: `
1. Retry on error
2. Exponential backoff: 1s, 2s, 4s, 8s (max 10s)
3. Max 3 retries
4. Good for transient network errors
      `.trim(),
    },
    {
      id: 'loading-state',
      name: 'Loading State Management',
      description: 'Track loading for async operations',
      useCase: 'Buttons, spinners, progress indicators',
      code: `import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';

export class DataService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  fetchData() {
    this.loadingSubject.next(true);

    return this.http.get('/api/data').pipe(
      finalize(() => this.loadingSubject.next(false))
    );
  }
}

// Component
isLoading$ = this.dataService.loading$;

// Template
// <ion-spinner *ngIf="isLoading$ | async"></ion-spinner>`,
      explanation: `
1. BehaviorSubject tracks loading state
2. finalize() runs on complete or error
3. Always resets loading to false
4. async pipe displays spinner
      `.trim(),
    },
  ];

  constructor() {}

  getAllPatterns(): RxJSPattern[] {
    return this.patterns;
  }

  getPatternById(id: string): RxJSPattern | undefined {
    return this.patterns.find(p => p.id === id);
  }

  getPatternsByUseCase(useCase: string): RxJSPattern[] {
    return this.patterns.filter(p =>
      p.useCase.toLowerCase().includes(useCase.toLowerCase())
    );
  }
}
