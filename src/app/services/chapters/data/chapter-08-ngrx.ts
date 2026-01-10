// src/app/services/chapters/data/chapter-08-ngrx.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_08_DATA: Chapter = {
  id: 8,
  title: 'NgRx State Management',
  description: 'Enterprise-scale state with actions, reducers, and effects',
  icon: 'layers-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 80,
      title: 'Why NgRx?',
      content: `
        <h2>State Management Challenges</h2>
        <p>As applications grow, managing state becomes complex. NgRx provides a predictable state container.</p>

        <h3>Common Problems NgRx Solves</h3>
        <ul>
          <li><strong>Shared State:</strong> Multiple components need the same data</li>
          <li><strong>State Synchronization:</strong> Keeping UI in sync with data changes</li>
          <li><strong>Predictability:</strong> Understanding how and when state changes</li>
          <li><strong>Debugging:</strong> Time-travel debugging with Redux DevTools</li>
          <li><strong>Testing:</strong> Pure functions are easy to test</li>
        </ul>

        <h3>When to Use NgRx</h3>
        <table>
          <tr>
            <th>Use NgRx When</th>
            <th>Maybe Skip NgRx When</th>
          </tr>
          <tr>
            <td>Large team working on same codebase</td>
            <td>Small app with simple state</td>
          </tr>
          <tr>
            <td>Complex state interactions</td>
            <td>State is mostly local to components</td>
          </tr>
          <tr>
            <td>Need for time-travel debugging</td>
            <td>Quick prototype or MVP</td>
          </tr>
          <tr>
            <td>Strict unidirectional data flow</td>
            <td>Team unfamiliar with Redux patterns</td>
          </tr>
        </table>

        <h3>NgRx vs Alternatives</h3>
        <ul>
          <li><strong>Services with BehaviorSubject:</strong> Simpler, less boilerplate</li>
          <li><strong>Signals:</strong> New Angular reactivity (Angular 16+)</li>
          <li><strong>NGXS:</strong> Less boilerplate than NgRx</li>
          <li><strong>Akita:</strong> Entity-based state management</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 800,
          language: 'typescript',
          title: 'State Management with Services (Before NgRx)',
          code: `// Simple approach with BehaviorSubject
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface AppState {
  notes: Note[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class NoteService {
  private state$ = new BehaviorSubject<AppState>({
    notes: [],
    loading: false,
    error: null
  });

  // Expose as readonly Observable
  readonly notes$ = this.state$.pipe(
    map(state => state.notes)
  );
  readonly loading$ = this.state$.pipe(
    map(state => state.loading)
  );

  loadNotes(): void {
    // Problem: Where did this state change come from?
    // Hard to track in large applications
    this.state$.next({
      ...this.state$.value,
      loading: true
    });

    this.http.get<Note[]>('/api/notes').subscribe({
      next: (notes) => {
        this.state$.next({
          notes,
          loading: false,
          error: null
        });
      },
      error: (err) => {
        this.state$.next({
          ...this.state$.value,
          loading: false,
          error: err.message
        });
      }
    });
  }
}`,
          description: 'Services work for simple cases but become hard to track',
          copyable: true,
        },
        {
          id: 801,
          language: 'typescript',
          title: 'NgRx Core Concepts Overview',
          code: `// NgRx follows the Redux pattern:
//
// ┌─────────────────────────────────────────────────┐
// │                    STORE                         │
// │  (Single source of truth for app state)         │
// └─────────────────────────────────────────────────┘
//        ▲                              │
//        │ Reducers                     │ Selectors
//        │ (pure functions)             │ (derive data)
//        │                              ▼
// ┌──────────────┐              ┌──────────────┐
// │   ACTIONS    │              │  COMPONENTS  │
// │  (events)    │◄─────────────│   (UI)       │
// └──────────────┘  dispatch()  └──────────────┘
//        │
//        ▼
// ┌──────────────┐
// │   EFFECTS    │
// │ (side effects│
// │  async ops)  │
// └──────────────┘

// 1. ACTIONS: Describe what happened
// 2. REDUCERS: How state changes in response
// 3. SELECTORS: How to extract data from state
// 4. EFFECTS: Handle side effects (API calls)
// 5. STORE: Holds the state tree`,
          description: 'NgRx data flow follows a unidirectional pattern',
          copyable: true,
        },
      ],
      interviewTips: [
        'NgRx is based on Redux pattern with RxJS',
        'Single source of truth: one store for entire app',
        'State is immutable - never mutate directly',
        'Unidirectional data flow makes debugging easier',
      ],
    },
    {
      id: 81,
      title: 'Setting Up NgRx',
      content: `
        <h2>Installing NgRx</h2>
        <p>NgRx is modular - install only what you need.</p>

        <h3>NgRx Packages</h3>
        <ul>
          <li><strong>@ngrx/store:</strong> Core state management</li>
          <li><strong>@ngrx/effects:</strong> Side effect handling</li>
          <li><strong>@ngrx/entity:</strong> Entity collection management</li>
          <li><strong>@ngrx/store-devtools:</strong> Redux DevTools integration</li>
          <li><strong>@ngrx/router-store:</strong> Connect Angular Router to store</li>
        </ul>

        <h3>Project Structure</h3>
        <p>Organize NgRx code by feature for scalability:</p>
        <pre>
src/app/
├── store/                    # Root store config
│   ├── app.state.ts         # Root state interface
│   └── app.reducer.ts       # Root reducer
└── features/
    └── notes/
        └── store/
            ├── notes.actions.ts
            ├── notes.reducer.ts
            ├── notes.selectors.ts
            └── notes.effects.ts
        </pre>
      `,
      codeSnippets: [
        {
          id: 802,
          language: 'bash',
          title: 'Install NgRx Packages',
          code: `# Install core packages
npm install @ngrx/store @ngrx/effects @ngrx/entity

# Install dev tools (development only)
npm install @ngrx/store-devtools --save-dev

# Optional: Router integration
npm install @ngrx/router-store

# Or use Angular CLI schematics
ng add @ngrx/store
ng add @ngrx/effects
ng add @ngrx/store-devtools`,
          copyable: true,
        },
        {
          id: 803,
          language: 'typescript',
          title: 'Configure Store in app.config.ts',
          code: `// app.config.ts
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Import feature reducers and effects
import { notesReducer } from './features/notes/store/notes.reducer';
import { NotesEffects } from './features/notes/store/notes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    // Provide NgRx Store with feature reducers
    provideStore({
      notes: notesReducer,
      // Add more feature reducers here
    }),

    // Provide Effects
    provideEffects([
      NotesEffects,
      // Add more effects classes here
    ]),

    // DevTools (only in development)
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict to log-only in production
      autoPause: true, // Pause on route changes
      trace: false, // Log stack trace for actions
      traceLimit: 75,
    }),
  ],
};`,
          description: 'Modern standalone configuration using provider functions',
          copyable: true,
        },
        {
          id: 804,
          language: 'typescript',
          title: 'Define App State Interface',
          code: `// store/app.state.ts
import { NotesState } from '../features/notes/store/notes.reducer';

// Root state interface
export interface AppState {
  notes: NotesState;
  // Add more feature states here
  // auth: AuthState;
  // settings: SettingsState;
}

// Useful for typing selectors
export const selectNotesState = (state: AppState) => state.notes;`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Use provideStore() and provideEffects() for standalone apps',
        'DevTools should only be enabled in development',
        'Organize by feature for scalability',
        'Define a root AppState interface for type safety',
      ],
    },
    {
      id: 82,
      title: 'Actions',
      content: `
        <h2>Defining Actions</h2>
        <p>Actions are events that describe something that happened in the application.</p>

        <h3>Action Anatomy</h3>
        <ul>
          <li><strong>Type:</strong> Unique string identifier (e.g., "[Notes] Load Notes")</li>
          <li><strong>Payload (optional):</strong> Data associated with the action</li>
        </ul>

        <h3>Naming Convention</h3>
        <p>Use the format: <code>[Source] Event Description</code></p>
        <ul>
          <li><strong>[Source]:</strong> Where the action originated (Feature name, API, etc.)</li>
          <li><strong>Event:</strong> What happened (Load, Add, Update, Delete, etc.)</li>
        </ul>

        <h3>Action Groups</h3>
        <p>Group related actions together using createActionGroup (NgRx 14+).</p>
      `,
      codeSnippets: [
        {
          id: 805,
          language: 'typescript',
          title: 'Creating Actions with createAction',
          code: `// features/notes/store/notes.actions.ts
import { createAction, props } from '@ngrx/store';
import { Note } from '../models/note.model';

// Action naming: [Source] Event Description

// Load Notes
export const loadNotes = createAction(
  '[Notes Page] Load Notes'
);

export const loadNotesSuccess = createAction(
  '[Notes API] Load Notes Success',
  props<{ notes: Note[] }>()
);

export const loadNotesFailure = createAction(
  '[Notes API] Load Notes Failure',
  props<{ error: string }>()
);

// Add Note
export const addNote = createAction(
  '[Notes Page] Add Note',
  props<{ note: Omit<Note, 'id'> }>()
);

export const addNoteSuccess = createAction(
  '[Notes API] Add Note Success',
  props<{ note: Note }>()
);

export const addNoteFailure = createAction(
  '[Notes API] Add Note Failure',
  props<{ error: string }>()
);

// Update Note
export const updateNote = createAction(
  '[Notes Page] Update Note',
  props<{ note: Note }>()
);

// Delete Note
export const deleteNote = createAction(
  '[Notes Page] Delete Note',
  props<{ id: string }>()
);

// Select Note
export const selectNote = createAction(
  '[Notes Page] Select Note',
  props<{ id: string | null }>()
);`,
          copyable: true,
        },
        {
          id: 806,
          language: 'typescript',
          title: 'Using createActionGroup (NgRx 14+)',
          code: `// Cleaner approach with action groups
import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Note } from '../models/note.model';

// Group all Notes actions together
export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    // Load
    'Load Notes': emptyProps(),
    'Load Notes Success': props<{ notes: Note[] }>(),
    'Load Notes Failure': props<{ error: string }>(),

    // CRUD
    'Add Note': props<{ note: Omit<Note, 'id'> }>(),
    'Add Note Success': props<{ note: Note }>(),
    'Update Note': props<{ note: Note }>(),
    'Delete Note': props<{ id: string }>(),

    // Selection
    'Select Note': props<{ id: string | null }>(),
    'Clear Selection': emptyProps(),
  },
});

// Usage in component:
// this.store.dispatch(NotesActions.loadNotes());
// this.store.dispatch(NotesActions.addNote({ note: newNote }));

// Action types are auto-generated:
// "[Notes] Load Notes"
// "[Notes] Add Note Success"
// etc.`,
          description: 'createActionGroup reduces boilerplate for related actions',
          copyable: true,
        },
        {
          id: 807,
          language: 'typescript',
          title: 'Dispatching Actions in Components',
          code: `import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { NotesActions } from './store/notes.actions';
import { Note } from './models/note.model';

@Component({
  selector: 'app-notes',
  template: \`
    <ion-button (click)="loadNotes()">
      Load Notes
    </ion-button>

    <ion-button (click)="addNote()">
      Add Note
    </ion-button>
  \`
})
export class NotesPageComponent {
  private store = inject(Store);

  loadNotes(): void {
    // Dispatch action - no payload
    this.store.dispatch(NotesActions.loadNotes());
  }

  addNote(): void {
    const newNote: Omit<Note, 'id'> = {
      title: 'New Note',
      content: 'Note content...',
      createdAt: new Date().toISOString()
    };

    // Dispatch action with payload
    this.store.dispatch(NotesActions.addNote({ note: newNote }));
  }

  selectNote(id: string): void {
    this.store.dispatch(NotesActions.selectNote({ id }));
  }

  deleteNote(id: string): void {
    this.store.dispatch(NotesActions.deleteNote({ id }));
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Actions are plain objects with type and optional payload',
        'Use past tense for success/failure (happened, not happening)',
        'createActionGroup reduces boilerplate significantly',
        'props<T>() provides type-safe payloads',
      ],
    },
    {
      id: 83,
      title: 'Reducers',
      content: `
        <h2>Creating Reducers</h2>
        <p>Reducers are pure functions that take current state and an action, and return new state.</p>

        <h3>Reducer Rules</h3>
        <ul>
          <li><strong>Pure Function:</strong> Same input = same output, no side effects</li>
          <li><strong>Immutable:</strong> Never mutate state directly, return new objects</li>
          <li><strong>Synchronous:</strong> No async operations (use Effects for that)</li>
          <li><strong>Default Case:</strong> Return current state for unknown actions</li>
        </ul>

        <h3>State Shape</h3>
        <p>Design state to be normalized and minimal:</p>
        <ul>
          <li>Store entities by ID in a dictionary/map</li>
          <li>Keep an array of IDs for ordering</li>
          <li>Avoid nested or duplicated data</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 808,
          language: 'typescript',
          title: 'Define Feature State',
          code: `// features/notes/store/notes.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { NotesActions } from './notes.actions';
import { Note } from '../models/note.model';

// Define the shape of this feature's state
export interface NotesState {
  notes: Note[];
  selectedNoteId: string | null;
  loading: boolean;
  error: string | null;
}

// Initial state
export const initialState: NotesState = {
  notes: [],
  selectedNoteId: null,
  loading: false,
  error: null,
};`,
          copyable: true,
        },
        {
          id: 809,
          language: 'typescript',
          title: 'Creating a Reducer with createReducer',
          code: `// features/notes/store/notes.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { NotesActions } from './notes.actions';

export const notesReducer = createReducer(
  initialState,

  // Load Notes
  on(NotesActions.loadNotes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(NotesActions.loadNotesSuccess, (state, { notes }) => ({
    ...state,
    notes,
    loading: false,
  })),

  on(NotesActions.loadNotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Note
  on(NotesActions.addNoteSuccess, (state, { note }) => ({
    ...state,
    notes: [...state.notes, note],
  })),

  // Update Note
  on(NotesActions.updateNote, (state, { note }) => ({
    ...state,
    notes: state.notes.map(n =>
      n.id === note.id ? note : n
    ),
  })),

  // Delete Note
  on(NotesActions.deleteNote, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(n => n.id !== id),
    // Clear selection if deleted note was selected
    selectedNoteId: state.selectedNoteId === id
      ? null
      : state.selectedNoteId,
  })),

  // Selection
  on(NotesActions.selectNote, (state, { id }) => ({
    ...state,
    selectedNoteId: id,
  })),

  on(NotesActions.clearSelection, (state) => ({
    ...state,
    selectedNoteId: null,
  }))
);`,
          description: 'Reducers handle state transitions immutably',
          copyable: true,
        },
        {
          id: 810,
          language: 'typescript',
          title: 'Combining Multiple on() Handlers',
          code: `// You can handle multiple actions with one handler
import { createReducer, on } from '@ngrx/store';

export const notesReducer = createReducer(
  initialState,

  // Multiple actions can trigger same state change
  on(
    NotesActions.loadNotes,
    NotesActions.addNote,
    NotesActions.updateNote,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    })
  ),

  // Reset error on any success
  on(
    NotesActions.loadNotesSuccess,
    NotesActions.addNoteSuccess,
    (state, action) => {
      // Access payload based on action type
      if ('notes' in action) {
        return { ...state, notes: action.notes, loading: false };
      }
      if ('note' in action) {
        return {
          ...state,
          notes: [...state.notes, action.note],
          loading: false
        };
      }
      return { ...state, loading: false };
    }
  ),

  // Handle any failure
  on(
    NotesActions.loadNotesFailure,
    NotesActions.addNoteFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Reducers must be pure functions - no side effects',
        'Always return new state objects (spread operator)',
        'Use on() to handle specific actions',
        'Multiple actions can share the same handler',
      ],
    },
    {
      id: 84,
      title: 'Selectors',
      content: `
        <h2>Selecting State with Selectors</h2>
        <p>Selectors are pure functions that extract and derive data from the store.</p>

        <h3>Selector Benefits</h3>
        <ul>
          <li><strong>Memoization:</strong> Cached results, recalculates only when input changes</li>
          <li><strong>Composition:</strong> Build complex selectors from simple ones</li>
          <li><strong>Encapsulation:</strong> Components don't need to know state shape</li>
          <li><strong>Reusability:</strong> Share selectors across components</li>
        </ul>

        <h3>Types of Selectors</h3>
        <ul>
          <li><strong>Feature Selector:</strong> Select a slice of root state</li>
          <li><strong>Simple Selector:</strong> Select a property from feature state</li>
          <li><strong>Derived Selector:</strong> Compute values from multiple selectors</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 811,
          language: 'typescript',
          title: 'Creating Selectors',
          code: `// features/notes/store/notes.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NotesState } from './notes.reducer';

// Feature selector - selects the 'notes' slice of state
export const selectNotesState = createFeatureSelector<NotesState>('notes');

// Simple selectors - select properties from feature state
export const selectAllNotes = createSelector(
  selectNotesState,
  (state) => state.notes
);

export const selectNotesLoading = createSelector(
  selectNotesState,
  (state) => state.loading
);

export const selectNotesError = createSelector(
  selectNotesState,
  (state) => state.error
);

export const selectSelectedNoteId = createSelector(
  selectNotesState,
  (state) => state.selectedNoteId
);

// Derived selector - compute value from other selectors
export const selectSelectedNote = createSelector(
  selectAllNotes,
  selectSelectedNoteId,
  (notes, selectedId) =>
    selectedId ? notes.find(n => n.id === selectedId) : null
);

// Count selector
export const selectNotesCount = createSelector(
  selectAllNotes,
  (notes) => notes.length
);

// Filter selectors
export const selectRecentNotes = createSelector(
  selectAllNotes,
  (notes) => {
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return notes.filter(n =>
      new Date(n.createdAt).getTime() > oneWeekAgo
    );
  }
);`,
          copyable: true,
        },
        {
          id: 812,
          language: 'typescript',
          title: 'Parameterized Selectors',
          code: `// Selectors with parameters
import { createSelector } from '@ngrx/store';

// Method 1: Factory function
export const selectNoteById = (noteId: string) =>
  createSelector(
    selectAllNotes,
    (notes) => notes.find(n => n.id === noteId)
  );

// Usage: this.store.select(selectNoteById('123'))

// Method 2: Props selector (older pattern)
export const selectNoteByIdWithProps = createSelector(
  selectAllNotes,
  (notes: Note[], props: { id: string }) =>
    notes.find(n => n.id === props.id)
);

// Usage: this.store.select(selectNoteByIdWithProps, { id: '123' })

// Method 3: Search/filter selector
export const selectNotesBySearch = (searchTerm: string) =>
  createSelector(
    selectAllNotes,
    (notes) => {
      if (!searchTerm) return notes;
      const term = searchTerm.toLowerCase();
      return notes.filter(n =>
        n.title.toLowerCase().includes(term) ||
        n.content.toLowerCase().includes(term)
      );
    }
  );

// Method 4: Selector with multiple params
export const selectNotesByCategory = (category: string, limit?: number) =>
  createSelector(
    selectAllNotes,
    (notes) => {
      const filtered = notes.filter(n => n.category === category);
      return limit ? filtered.slice(0, limit) : filtered;
    }
  );`,
          copyable: true,
        },
        {
          id: 813,
          language: 'typescript',
          title: 'Using Selectors in Components',
          code: `import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import {
  selectAllNotes,
  selectNotesLoading,
  selectNotesError,
  selectSelectedNote,
  selectNoteById,
  selectNotesCount
} from './store/notes.selectors';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [AsyncPipe, IonList, IonItem, IonSpinner],
  template: \`
    <!-- Loading state -->
    @if (loading$ | async) {
      <ion-spinner></ion-spinner>
    }

    <!-- Error state -->
    @if (error$ | async; as error) {
      <ion-text color="danger">{{ error }}</ion-text>
    }

    <!-- Notes count -->
    <p>Total: {{ notesCount$ | async }} notes</p>

    <!-- Notes list -->
    <ion-list>
      @for (note of notes$ | async; track note.id) {
        <ion-item
          [class.selected]="note.id === (selectedNote$ | async)?.id"
          (click)="selectNote(note.id)"
        >
          <ion-label>{{ note.title }}</ion-label>
        </ion-item>
      }
    </ion-list>

    <!-- Selected note details -->
    @if (selectedNote$ | async; as note) {
      <div class="note-detail">
        <h2>{{ note.title }}</h2>
        <p>{{ note.content }}</p>
      </div>
    }
  \`
})
export class NotesPageComponent {
  private store = inject(Store);

  // Select observables from store
  notes$ = this.store.select(selectAllNotes);
  loading$ = this.store.select(selectNotesLoading);
  error$ = this.store.select(selectNotesError);
  selectedNote$ = this.store.select(selectSelectedNote);
  notesCount$ = this.store.select(selectNotesCount);

  // Parameterized selector
  getNoteById(id: string) {
    return this.store.select(selectNoteById(id));
  }

  selectNote(id: string): void {
    this.store.dispatch(NotesActions.selectNote({ id }));
  }
}`,
          description: 'Use async pipe to auto-subscribe and unsubscribe',
          copyable: true,
        },
      ],
      interviewTips: [
        'Selectors are memoized - they cache results',
        'Use createFeatureSelector for the top-level feature state',
        'Compose selectors from smaller selectors',
        'Always use async pipe in templates for automatic cleanup',
      ],
    },
    {
      id: 85,
      title: 'Effects',
      content: `
        <h2>Handling Side Effects</h2>
        <p>Effects handle async operations and side effects outside the reducer.</p>

        <h3>What Belongs in Effects</h3>
        <ul>
          <li><strong>API Calls:</strong> HTTP requests to backend</li>
          <li><strong>Navigation:</strong> Router navigation after actions</li>
          <li><strong>Local Storage:</strong> Reading/writing to storage</li>
          <li><strong>Toasts/Alerts:</strong> Showing notifications</li>
          <li><strong>Analytics:</strong> Tracking events</li>
        </ul>

        <h3>Effect Flow</h3>
        <ol>
          <li>Component dispatches action</li>
          <li>Effect listens for that action</li>
          <li>Effect performs side effect (API call)</li>
          <li>Effect dispatches success/failure action</li>
          <li>Reducer handles result</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 814,
          language: 'typescript',
          title: 'Creating Effects',
          code: `// features/notes/store/notes.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { NotesActions } from './notes.actions';
import { NotesService } from '../services/notes.service';
import { ToastController } from '@ionic/angular';

@Injectable()
export class NotesEffects {
  private actions$ = inject(Actions);
  private notesService = inject(NotesService);
  private toastCtrl = inject(ToastController);

  // Load Notes Effect
  loadNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNotes),
      exhaustMap(() =>
        this.notesService.getAll().pipe(
          map(notes => NotesActions.loadNotesSuccess({ notes })),
          catchError(error =>
            of(NotesActions.loadNotesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Add Note Effect
  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNote),
      exhaustMap(({ note }) =>
        this.notesService.create(note).pipe(
          map(createdNote => NotesActions.addNoteSuccess({ note: createdNote })),
          catchError(error =>
            of(NotesActions.addNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Show success toast (no dispatch - side effect only)
  addNoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNoteSuccess),
      tap(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Note added successfully',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      })
    ),
    { dispatch: false } // Don't dispatch any action
  );

  // Show error toast
  handleError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotesActions.loadNotesFailure,
        NotesActions.addNoteFailure
      ),
      tap(async ({ error }) => {
        const toast = await this.toastCtrl.create({
          message: error,
          duration: 3000,
          color: 'danger'
        });
        await toast.present();
      })
    ),
    { dispatch: false }
  );
}`,
          description: 'Effects handle async operations and side effects',
          copyable: true,
        },
        {
          id: 815,
          language: 'typescript',
          title: 'Effect Operators Explained',
          code: `import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  switchMap,    // Cancel previous, use latest
  mergeMap,     // Handle all concurrently
  exhaustMap,   // Ignore while processing
  concatMap     // Queue and process in order
} from 'rxjs/operators';

@Injectable()
export class NotesEffects {
  private actions$ = inject(Actions);

  // switchMap: Cancel previous request when new one arrives
  // Use for: Search, where only latest matters
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.search),
      switchMap(({ query }) =>
        this.notesService.search(query).pipe(
          map(results => NotesActions.searchSuccess({ results })),
          catchError(error => of(NotesActions.searchFailure({ error })))
        )
      )
    )
  );

  // exhaustMap: Ignore new requests while one is in progress
  // Use for: Form submissions, prevents double-submit
  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNote),
      exhaustMap(({ note }) =>
        this.notesService.create(note).pipe(
          map(result => NotesActions.addNoteSuccess({ note: result })),
          catchError(error => of(NotesActions.addNoteFailure({ error })))
        )
      )
    )
  );

  // mergeMap: Handle all requests concurrently
  // Use for: Independent operations that can run in parallel
  loadNoteDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNoteDetails),
      mergeMap(({ id }) =>
        this.notesService.getById(id).pipe(
          map(note => NotesActions.loadNoteDetailsSuccess({ note })),
          catchError(error => of(NotesActions.loadNoteDetailsFailure({ error })))
        )
      )
    )
  );

  // concatMap: Queue requests, process in order
  // Use for: Order-dependent operations
  syncNotes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.syncNote),
      concatMap(({ note }) =>
        this.notesService.sync(note).pipe(
          map(() => NotesActions.syncNoteSuccess({ note })),
          catchError(error => of(NotesActions.syncNoteFailure({ error })))
        )
      )
    )
  );
}`,
          copyable: true,
        },
        {
          id: 816,
          language: 'typescript',
          title: 'Navigation and Router Effects',
          code: `import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { NotesActions } from './notes.actions';

@Injectable()
export class NotesEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  // Navigate after adding note
  navigateAfterAdd$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNoteSuccess),
      tap(({ note }) => {
        this.router.navigate(['/notes', note.id]);
      })
    ),
    { dispatch: false }
  );

  // Navigate to list after delete
  navigateAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      tap(() => {
        this.router.navigate(['/notes']);
      })
    ),
    { dispatch: false }
  );

  // Navigate on error (e.g., unauthorized)
  handleUnauthorized$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.loadNotesFailure),
      tap(({ error }) => {
        if (error.includes('401') || error.includes('Unauthorized')) {
          this.router.navigate(['/login']);
        }
      })
    ),
    { dispatch: false }
  );
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Effects are for side effects - API calls, navigation, storage',
        'Use exhaustMap for form submissions to prevent double-submit',
        'Use switchMap for search to cancel previous requests',
        '{ dispatch: false } for effects that dont dispatch new actions',
      ],
    },
    {
      id: 86,
      title: 'NgRx Entity',
      content: `
        <h2>Managing Collections with Entity</h2>
        <p>NgRx Entity provides utilities for managing collections of entities efficiently.</p>

        <h3>Entity Features</h3>
        <ul>
          <li><strong>Normalized State:</strong> Entities stored by ID in a dictionary</li>
          <li><strong>CRUD Operations:</strong> Built-in add, update, remove operations</li>
          <li><strong>Selectors:</strong> Pre-built selectors for common queries</li>
          <li><strong>Sorting:</strong> Optional sorting of entities</li>
        </ul>

        <h3>Entity State Shape</h3>
        <pre>
{
  ids: ['1', '2', '3'],      // Array of IDs (ordered)
  entities: {                 // Dictionary by ID
    '1': { id: '1', title: 'Note 1' },
    '2': { id: '2', title: 'Note 2' },
    '3': { id: '3', title: 'Note 3' }
  }
}
        </pre>
      `,
      codeSnippets: [
        {
          id: 817,
          language: 'typescript',
          title: 'Setting Up Entity Adapter',
          code: `// features/notes/store/notes.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NotesActions } from './notes.actions';
import { Note } from '../models/note.model';

// Extend EntityState for entity features
export interface NotesState extends EntityState<Note> {
  selectedNoteId: string | null;
  loading: boolean;
  error: string | null;
}

// Create adapter with optional config
export const notesAdapter: EntityAdapter<Note> = createEntityAdapter<Note>({
  // Custom ID selector (default is 'id')
  selectId: (note: Note) => note.id,

  // Sort by createdAt descending (newest first)
  sortComparer: (a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

// Initial state using adapter
export const initialState: NotesState = notesAdapter.getInitialState({
  selectedNoteId: null,
  loading: false,
  error: null,
});

// Create reducer using adapter methods
export const notesReducer = createReducer(
  initialState,

  // Load - replace all entities
  on(NotesActions.loadNotes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(NotesActions.loadNotesSuccess, (state, { notes }) =>
    notesAdapter.setAll(notes, {
      ...state,
      loading: false,
    })
  ),

  on(NotesActions.loadNotesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add one entity
  on(NotesActions.addNoteSuccess, (state, { note }) =>
    notesAdapter.addOne(note, state)
  ),

  // Update one entity
  on(NotesActions.updateNote, (state, { note }) =>
    notesAdapter.updateOne(
      { id: note.id, changes: note },
      state
    )
  ),

  // Remove one entity
  on(NotesActions.deleteNote, (state, { id }) =>
    notesAdapter.removeOne(id, {
      ...state,
      selectedNoteId: state.selectedNoteId === id
        ? null
        : state.selectedNoteId,
    })
  ),

  // Selection
  on(NotesActions.selectNote, (state, { id }) => ({
    ...state,
    selectedNoteId: id,
  }))
);`,
          copyable: true,
        },
        {
          id: 818,
          language: 'typescript',
          title: 'Entity Adapter Methods',
          code: `import { EntityAdapter } from '@ngrx/entity';

// All adapter methods return new state (immutable)

// Add operations
notesAdapter.addOne(note, state);        // Add single entity
notesAdapter.addMany(notes, state);      // Add multiple entities
notesAdapter.setAll(notes, state);       // Replace all entities
notesAdapter.setOne(note, state);        // Add or replace one

// Update operations
notesAdapter.updateOne(
  { id: '1', changes: { title: 'New Title' } },
  state
);
notesAdapter.updateMany(updates, state);  // Multiple updates
notesAdapter.upsertOne(note, state);      // Add or update
notesAdapter.upsertMany(notes, state);

// Remove operations
notesAdapter.removeOne(id, state);        // Remove by ID
notesAdapter.removeMany(ids, state);      // Remove multiple
notesAdapter.removeMany(                  // Remove by predicate
  predicate: (note) => note.archived,
  state
);
notesAdapter.removeAll(state);            // Clear all

// Map operations (transform all entities)
notesAdapter.map(
  (note) => ({ ...note, read: true }),
  state
);

// Conditional map
notesAdapter.mapOne(
  { id: '1', map: (note) => ({ ...note, pinned: true }) },
  state
);`,
          description: 'Entity adapter provides immutable CRUD operations',
          copyable: true,
        },
        {
          id: 819,
          language: 'typescript',
          title: 'Entity Selectors',
          code: `// features/notes/store/notes.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { notesAdapter, NotesState } from './notes.reducer';

// Feature selector
export const selectNotesState = createFeatureSelector<NotesState>('notes');

// Get built-in selectors from adapter
const {
  selectIds,      // Select array of IDs
  selectEntities, // Select entity dictionary
  selectAll,      // Select all entities as array
  selectTotal,    // Select count of entities
} = notesAdapter.getSelectors();

// Use adapter selectors with feature selector
export const selectAllNotes = createSelector(
  selectNotesState,
  selectAll
);

export const selectNotesIds = createSelector(
  selectNotesState,
  selectIds
);

export const selectNotesEntities = createSelector(
  selectNotesState,
  selectEntities
);

export const selectNotesTotal = createSelector(
  selectNotesState,
  selectTotal
);

// Custom selectors
export const selectNotesLoading = createSelector(
  selectNotesState,
  (state) => state.loading
);

export const selectSelectedNoteId = createSelector(
  selectNotesState,
  (state) => state.selectedNoteId
);

// Derived: Get selected note entity
export const selectSelectedNote = createSelector(
  selectNotesEntities,
  selectSelectedNoteId,
  (entities, selectedId) =>
    selectedId ? entities[selectedId] : null
);

// Parameterized: Get note by ID
export const selectNoteById = (id: string) =>
  createSelector(
    selectNotesEntities,
    (entities) => entities[id]
  );

// Filter: Get pinned notes
export const selectPinnedNotes = createSelector(
  selectAllNotes,
  (notes) => notes.filter(n => n.pinned)
);`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Entity stores normalized data - entities by ID + ID array',
        'sortComparer keeps entities sorted automatically',
        'Use setAll for complete replacement, addMany for additions',
        'Adapter selectors are memoized like regular selectors',
      ],
    },
    {
      id: 87,
      title: 'Complete NgRx Example',
      content: `
        <h2>Putting It All Together</h2>
        <p>A complete feature implementation with NgRx for a Notes app.</p>

        <h3>Feature Structure</h3>
        <pre>
features/notes/
├── models/
│   └── note.model.ts
├── services/
│   └── notes.service.ts
├── store/
│   ├── notes.actions.ts
│   ├── notes.reducer.ts
│   ├── notes.selectors.ts
│   └── notes.effects.ts
├── pages/
│   ├── notes-list/
│   └── note-detail/
└── notes.routes.ts
        </pre>

        <h3>Data Flow Example</h3>
        <ol>
          <li>User clicks "Add Note" button</li>
          <li>Component dispatches <code>addNote</code> action</li>
          <li>Effect catches action, calls API</li>
          <li>API returns new note</li>
          <li>Effect dispatches <code>addNoteSuccess</code></li>
          <li>Reducer adds note to state</li>
          <li>Selector emits updated list</li>
          <li>Component receives new list via async pipe</li>
        </ol>
      `,
      codeSnippets: [
        {
          id: 820,
          language: 'typescript',
          title: 'Note Model',
          code: `// features/notes/models/note.model.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'personal' | 'work' | 'ideas';
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  category: Note['category'];
}

export interface UpdateNoteDto {
  id: string;
  title?: string;
  content?: string;
  category?: Note['category'];
  pinned?: boolean;
}`,
          copyable: true,
        },
        {
          id: 821,
          language: 'typescript',
          title: 'Notes Service',
          code: `// features/notes/services/notes.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { Note, CreateNoteDto, UpdateNoteDto } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private baseUrl = '/api/notes';

  // For demo: Mock data
  private mockNotes: Note[] = [
    {
      id: '1',
      title: 'Welcome to NgRx',
      content: 'Learn state management with NgRx',
      category: 'work',
      pinned: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Shopping List',
      content: 'Milk, Bread, Eggs',
      category: 'personal',
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getAll(): Observable<Note[]> {
    // Real implementation:
    // return this.http.get<Note[]>(this.baseUrl);

    // Demo: Return mock data
    return of(this.mockNotes).pipe(delay(500));
  }

  getById(id: string): Observable<Note> {
    // return this.http.get<Note>(\`\${this.baseUrl}/\${id}\`);
    const note = this.mockNotes.find(n => n.id === id);
    return of(note!).pipe(delay(300));
  }

  create(dto: CreateNoteDto): Observable<Note> {
    // return this.http.post<Note>(this.baseUrl, dto);
    const newNote: Note = {
      ...dto,
      id: Date.now().toString(),
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.mockNotes.push(newNote);
    return of(newNote).pipe(delay(300));
  }

  update(dto: UpdateNoteDto): Observable<Note> {
    // return this.http.patch<Note>(\`\${this.baseUrl}/\${dto.id}\`, dto);
    const index = this.mockNotes.findIndex(n => n.id === dto.id);
    if (index >= 0) {
      this.mockNotes[index] = {
        ...this.mockNotes[index],
        ...dto,
        updatedAt: new Date().toISOString(),
      };
      return of(this.mockNotes[index]).pipe(delay(300));
    }
    throw new Error('Note not found');
  }

  delete(id: string): Observable<void> {
    // return this.http.delete<void>(\`\${this.baseUrl}/\${id}\`);
    this.mockNotes = this.mockNotes.filter(n => n.id !== id);
    return of(undefined).pipe(delay(300));
  }
}`,
          copyable: true,
        },
        {
          id: 822,
          language: 'typescript',
          title: 'Complete Actions File',
          code: `// features/notes/store/notes.actions.ts
import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Note, CreateNoteDto, UpdateNoteDto } from '../models/note.model';

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    // Load
    'Load Notes': emptyProps(),
    'Load Notes Success': props<{ notes: Note[] }>(),
    'Load Notes Failure': props<{ error: string }>(),

    // Create
    'Add Note': props<{ note: CreateNoteDto }>(),
    'Add Note Success': props<{ note: Note }>(),
    'Add Note Failure': props<{ error: string }>(),

    // Update
    'Update Note': props<{ note: UpdateNoteDto }>(),
    'Update Note Success': props<{ note: Note }>(),
    'Update Note Failure': props<{ error: string }>(),

    // Delete
    'Delete Note': props<{ id: string }>(),
    'Delete Note Success': props<{ id: string }>(),
    'Delete Note Failure': props<{ error: string }>(),

    // UI State
    'Select Note': props<{ id: string | null }>(),
    'Toggle Pin': props<{ id: string }>(),
    'Filter By Category': props<{ category: Note['category'] | null }>(),
  },
});`,
          copyable: true,
        },
        {
          id: 823,
          language: 'typescript',
          title: 'Notes List Page Component',
          code: `// features/notes/pages/notes-list/notes-list.page.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonSpinner, IonFab, IonFabButton, IonChip,
  IonBadge, IonRefresher, IonRefresherContent,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pin, trash, create } from 'ionicons/icons';

import { NotesActions } from '../../store/notes.actions';
import {
  selectAllNotes,
  selectNotesLoading,
  selectNotesError,
  selectPinnedNotes,
  selectSelectedNoteId
} from '../../store/notes.selectors';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonButton, IonIcon,
    IonSpinner, IonFab, IonFabButton, IonChip,
    IonBadge, IonRefresher, IonRefresherContent
  ],
  template: \`
    <ion-header>
      <ion-toolbar>
        <ion-title>My Notes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <!-- Pull to refresh -->
      <ion-refresher slot="fixed" (ionRefresh)="refresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <!-- Loading -->
      @if (loading$ | async) {
        <div class="loading-container">
          <ion-spinner></ion-spinner>
          <p>Loading notes...</p>
        </div>
      }

      <!-- Error -->
      @if (error$ | async; as error) {
        <div class="error-container">
          <p>{{ error }}</p>
          <ion-button (click)="loadNotes()">Retry</ion-button>
        </div>
      }

      <!-- Pinned Notes Section -->
      @if ((pinnedNotes$ | async)?.length) {
        <div class="section-header">
          <ion-icon name="pin"></ion-icon>
          <span>Pinned</span>
        </div>
        <ion-list>
          @for (note of pinnedNotes$ | async; track note.id) {
            <ion-item
              button
              [routerLink]="['/notes', note.id]"
              [class.selected]="note.id === (selectedId$ | async)"
            >
              <ion-badge slot="start" [color]="getCategoryColor(note.category)">
                {{ note.category }}
              </ion-badge>
              <ion-label>
                <h2>{{ note.title }}</h2>
                <p>{{ note.content | slice:0:50 }}...</p>
              </ion-label>
              <ion-button
                slot="end"
                fill="clear"
                (click)="deleteNote($event, note.id)"
              >
                <ion-icon name="trash" slot="icon-only"></ion-icon>
              </ion-button>
            </ion-item>
          }
        </ion-list>
      }

      <!-- All Notes Section -->
      <div class="section-header">
        <span>All Notes ({{ (notes$ | async)?.length }})</span>
      </div>
      <ion-list>
        @for (note of notes$ | async; track note.id) {
          <ion-item
            button
            [routerLink]="['/notes', note.id]"
            [class.selected]="note.id === (selectedId$ | async)"
          >
            <ion-badge slot="start" [color]="getCategoryColor(note.category)">
              {{ note.category }}
            </ion-badge>
            <ion-label>
              <h2>
                {{ note.title }}
                @if (note.pinned) {
                  <ion-icon name="pin" color="primary"></ion-icon>
                }
              </h2>
              <p>{{ note.content | slice:0:50 }}...</p>
            </ion-label>
            <ion-button
              slot="end"
              fill="clear"
              color="danger"
              (click)="deleteNote($event, note.id)"
            >
              <ion-icon name="trash" slot="icon-only"></ion-icon>
            </ion-button>
          </ion-item>
        } @empty {
          @if (!(loading$ | async)) {
            <ion-item>
              <ion-label class="ion-text-center">
                <p>No notes yet. Create your first note!</p>
              </ion-label>
            </ion-item>
          }
        }
      </ion-list>

      <!-- FAB to add new note -->
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button routerLink="/notes/new">
          <ion-icon name="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  \`,
  styles: [\`
    .loading-container, .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }
    .section-header {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      font-weight: 600;
      color: var(--ion-color-medium);
    }
    .selected {
      --background: var(--ion-color-light);
    }
  \`]
})
export class NotesListPage implements OnInit {
  private store = inject(Store);
  private alertCtrl = inject(AlertController);

  // Select state from store
  notes$ = this.store.select(selectAllNotes);
  pinnedNotes$ = this.store.select(selectPinnedNotes);
  loading$ = this.store.select(selectNotesLoading);
  error$ = this.store.select(selectNotesError);
  selectedId$ = this.store.select(selectSelectedNoteId);

  constructor() {
    addIcons({ add, pin, trash, create });
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.store.dispatch(NotesActions.loadNotes());
  }

  refresh(event: any): void {
    this.store.dispatch(NotesActions.loadNotes());
    // Complete the refresher after a delay
    setTimeout(() => event.target.complete(), 1000);
  }

  async deleteNote(event: Event, id: string): Promise<void> {
    event.stopPropagation();

    const alert = await this.alertCtrl.create({
      header: 'Delete Note',
      message: 'Are you sure you want to delete this note?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.store.dispatch(NotesActions.deleteNote({ id }));
          }
        }
      ]
    });
    await alert.present();
  }

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      personal: 'primary',
      work: 'tertiary',
      ideas: 'success'
    };
    return colors[category] || 'medium';
  }
}`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Organize NgRx by feature for scalability',
        'Use async pipe for automatic subscription management',
        'Keep components focused on dispatching actions and selecting state',
        'Effects handle all side effects - components stay pure',
      ],
    },
    {
      id: 88,
      title: 'Best Practices & Tips',
      content: `
        <h2>NgRx Best Practices</h2>
        <p>Guidelines for maintainable and efficient NgRx applications.</p>

        <h3>State Design</h3>
        <ul>
          <li>Keep state normalized (no nested/duplicated data)</li>
          <li>Store only serializable data (no functions, Date objects)</li>
          <li>Derive computed values with selectors, don't store them</li>
          <li>Keep UI state separate from domain state</li>
        </ul>

        <h3>Action Guidelines</h3>
        <ul>
          <li>Be descriptive: "[Source] Event Description"</li>
          <li>One action = one event (not multiple things)</li>
          <li>Use action groups for related actions</li>
          <li>Don't dispatch actions in reducers</li>
        </ul>

        <h3>Performance Tips</h3>
        <ul>
          <li>Use selectors with memoization</li>
          <li>Avoid large payloads in actions</li>
          <li>Use Entity adapter for collections</li>
          <li>Lazy load feature state with StoreModule.forFeature()</li>
        </ul>

        <h3>Testing</h3>
        <ul>
          <li>Reducers are pure functions - easy to test</li>
          <li>Mock the store in component tests</li>
          <li>Use provideMockStore and provideMockActions</li>
          <li>Test effects with marble testing</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 824,
          language: 'typescript',
          title: 'Testing Reducers',
          code: `// notes.reducer.spec.ts
import { notesReducer, initialState, NotesState } from './notes.reducer';
import { NotesActions } from './notes.actions';
import { Note } from '../models/note.model';

describe('Notes Reducer', () => {
  const mockNote: Note = {
    id: '1',
    title: 'Test Note',
    content: 'Test content',
    category: 'work',
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = { type: 'Unknown' } as any;
      const result = notesReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('loadNotes', () => {
    it('should set loading to true', () => {
      const action = NotesActions.loadNotes();
      const result = notesReducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadNotesSuccess', () => {
    it('should add notes and set loading to false', () => {
      const notes = [mockNote];
      const action = NotesActions.loadNotesSuccess({ notes });
      const result = notesReducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.entities['1']).toEqual(mockNote);
      expect(result.loading).toBe(false);
    });
  });

  describe('addNoteSuccess', () => {
    it('should add a new note', () => {
      const action = NotesActions.addNoteSuccess({ note: mockNote });
      const result = notesReducer(initialState, action);

      expect(result.ids).toContain('1');
      expect(result.entities['1']).toEqual(mockNote);
    });
  });

  describe('deleteNote', () => {
    it('should remove the note', () => {
      // First add a note
      const state: NotesState = {
        ...initialState,
        ids: ['1'],
        entities: { '1': mockNote },
      };

      const action = NotesActions.deleteNote({ id: '1' });
      const result = notesReducer(state, action);

      expect(result.ids).not.toContain('1');
      expect(result.entities['1']).toBeUndefined();
    });
  });
});`,
          copyable: true,
        },
        {
          id: 825,
          language: 'typescript',
          title: 'Testing Selectors',
          code: `// notes.selectors.spec.ts
import {
  selectAllNotes,
  selectNotesLoading,
  selectSelectedNote,
  selectPinnedNotes
} from './notes.selectors';
import { NotesState } from './notes.reducer';

describe('Notes Selectors', () => {
  const mockState: { notes: NotesState } = {
    notes: {
      ids: ['1', '2'],
      entities: {
        '1': {
          id: '1',
          title: 'Note 1',
          content: 'Content 1',
          category: 'work',
          pinned: true,
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        '2': {
          id: '2',
          title: 'Note 2',
          content: 'Content 2',
          category: 'personal',
          pinned: false,
          createdAt: '2024-01-02',
          updatedAt: '2024-01-02',
        },
      },
      selectedNoteId: '1',
      loading: false,
      error: null,
    },
  };

  describe('selectAllNotes', () => {
    it('should return all notes', () => {
      const result = selectAllNotes(mockState);
      expect(result.length).toBe(2);
    });
  });

  describe('selectNotesLoading', () => {
    it('should return loading state', () => {
      const result = selectNotesLoading(mockState);
      expect(result).toBe(false);
    });
  });

  describe('selectSelectedNote', () => {
    it('should return the selected note', () => {
      const result = selectSelectedNote(mockState);
      expect(result?.id).toBe('1');
      expect(result?.title).toBe('Note 1');
    });

    it('should return null if no selection', () => {
      const stateNoSelection = {
        notes: { ...mockState.notes, selectedNoteId: null }
      };
      const result = selectSelectedNote(stateNoSelection);
      expect(result).toBeNull();
    });
  });

  describe('selectPinnedNotes', () => {
    it('should return only pinned notes', () => {
      const result = selectPinnedNotes(mockState);
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('1');
    });
  });
});`,
          copyable: true,
        },
        {
          id: 826,
          language: 'typescript',
          title: 'Testing Effects',
          code: `// notes.effects.spec.ts
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { NotesEffects } from './notes.effects';
import { NotesActions } from './notes.actions';
import { NotesService } from '../services/notes.service';
import { Note } from '../models/note.model';

describe('NotesEffects', () => {
  let effects: NotesEffects;
  let actions$: Observable<any>;
  let notesService: jasmine.SpyObj<NotesService>;

  const mockNote: Note = {
    id: '1',
    title: 'Test',
    content: 'Content',
    category: 'work',
    pinned: false,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('NotesService', ['getAll', 'create']);

    TestBed.configureTestingModule({
      providers: [
        NotesEffects,
        provideMockActions(() => actions$),
        { provide: NotesService, useValue: spy },
      ],
    });

    effects = TestBed.inject(NotesEffects);
    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
  });

  describe('loadNotes$', () => {
    it('should return loadNotesSuccess on success', (done) => {
      const notes = [mockNote];
      notesService.getAll.and.returnValue(of(notes));

      actions$ = of(NotesActions.loadNotes());

      effects.loadNotes$.subscribe(action => {
        expect(action).toEqual(NotesActions.loadNotesSuccess({ notes }));
        done();
      });
    });

    it('should return loadNotesFailure on error', (done) => {
      const error = new Error('API Error');
      notesService.getAll.and.returnValue(throwError(() => error));

      actions$ = of(NotesActions.loadNotes());

      effects.loadNotes$.subscribe(action => {
        expect(action).toEqual(
          NotesActions.loadNotesFailure({ error: 'API Error' })
        );
        done();
      });
    });
  });

  describe('addNote$', () => {
    it('should return addNoteSuccess on success', (done) => {
      const newNote = { title: 'New', content: 'Content', category: 'work' as const };
      notesService.create.and.returnValue(of(mockNote));

      actions$ = of(NotesActions.addNote({ note: newNote }));

      effects.addNote$.subscribe(action => {
        expect(action).toEqual(NotesActions.addNoteSuccess({ note: mockNote }));
        done();
      });
    });
  });
});`,
          copyable: true,
        },
        {
          id: 827,
          language: 'typescript',
          title: 'Testing Components with Store',
          code: `// notes-list.page.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NotesListPage } from './notes-list.page';
import { NotesActions } from '../../store/notes.actions';
import {
  selectAllNotes,
  selectNotesLoading,
  selectNotesError
} from '../../store/notes.selectors';

describe('NotesListPage', () => {
  let component: NotesListPage;
  let fixture: ComponentFixture<NotesListPage>;
  let store: MockStore;

  const initialState = {
    notes: {
      ids: [],
      entities: {},
      selectedNoteId: null,
      loading: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesListPage],
      providers: [
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NotesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadNotes on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy).toHaveBeenCalledWith(NotesActions.loadNotes());
  });

  it('should show loading spinner when loading', () => {
    // Override selector
    store.overrideSelector(selectNotesLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('ion-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display notes when loaded', () => {
    const mockNotes = [
      { id: '1', title: 'Note 1', content: 'Content 1' },
      { id: '2', title: 'Note 2', content: 'Content 2' },
    ];

    store.overrideSelector(selectAllNotes, mockNotes as any);
    store.overrideSelector(selectNotesLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('ion-item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should show error message when error occurs', () => {
    store.overrideSelector(selectNotesError, 'Failed to load');
    store.refreshState();
    fixture.detectChanges();

    const errorText = fixture.nativeElement.querySelector('.error-container');
    expect(errorText).toBeTruthy();
  });
});`,
          copyable: true,
        },
      ],
      interviewTips: [
        'Test reducers as pure functions with input/output',
        'Use provideMockStore for component testing',
        'Use provideMockActions for effects testing',
        'Override selectors to test different UI states',
      ],
    },
  ],
};
