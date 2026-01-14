// src/app/services/chapters/data/chapter-18.data.ts

import { Chapter } from '@app/models/chapter.model';

export const CHAPTER_18_DATA: Chapter = {
  id: 18,
  title: 'Testing Strategies',
  description: 'Master unit tests, integration tests, and E2E testing with Jasmine and Cypress',
  icon: 'flask-outline',
  category: 'advanced',
  completed: false,
  hasDemo: true,
  sections: [
    {
      id: 180,
      title: 'Testing Fundamentals',
      content: `
        <h2>The Testing Pyramid</h2>
        <p>The testing pyramid guides test distribution for optimal coverage and speed:</p>

        <pre>
         /\\          E2E Tests (10%)
        /  \\         - Slow, brittle, expensive
       /    \\        - Full user flows
      /------\\       - UI + API + Database
     / Integ. \\      Integration Tests (20%)
    /   Tests  \\     - Medium speed, moderate cost
   /------------\\    - Multiple components
  /   Unit Tests \\   Unit Tests (70%)
 /________________\\  - Fast, cheap, stable
                     - Pure functions
        </pre>

        <h3>Why This Distribution?</h3>
        <ul>
          <li><strong>70% Unit Tests:</strong> Fast feedback, cheap to maintain, isolate bugs</li>
          <li><strong>20% Integration Tests:</strong> Verify components work together</li>
          <li><strong>10% E2E Tests:</strong> Validate critical user journeys</li>
        </ul>

        <h3>Test Types Comparison</h3>
        <table>
          <tr>
            <th>Type</th>
            <th>Speed</th>
            <th>Cost</th>
            <th>Stability</th>
            <th>Scope</th>
          </tr>
          <tr>
            <td>Unit</td>
            <td>Fast (&lt;1ms)</td>
            <td>Low</td>
            <td>Stable</td>
            <td>Single function/class</td>
          </tr>
          <tr>
            <td>Integration</td>
            <td>Medium (10-100ms)</td>
            <td>Medium</td>
            <td>Moderate</td>
            <td>Multiple units</td>
          </tr>
          <tr>
            <td>E2E</td>
            <td>Slow (1-10s)</td>
            <td>High</td>
            <td>Flaky</td>
            <td>Complete user flow</td>
          </tr>
        </table>

        <h3>AAA Pattern</h3>
        <p>Structure tests for readability:</p>
        <ol>
          <li><strong>Arrange:</strong> Set up test data and dependencies</li>
          <li><strong>Act:</strong> Execute the code under test</li>
          <li><strong>Assert:</strong> Verify the expected outcome</li>
        </ol>

        <h3>Code Coverage Targets</h3>
        <ul>
          <li><strong>70-80%</strong> overall coverage</li>
          <li><strong>90%+</strong> for business logic</li>
          <li><strong>60%+</strong> for UI components</li>
          <li>Quality over quantity - 100% coverage doesn't mean bug-free</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1800,
          language: 'typescript',
          title: 'AAA Pattern Example',
          copyable: true,
          code: `describe('ChaptersService', () => {
  it('should return chapters sorted by id', () => {
    // Arrange
    const service = new ChaptersService();
    const unsortedChapters = [
      { id: 3, title: 'Chapter 3' },
      { id: 1, title: 'Chapter 1' },
      { id: 2, title: 'Chapter 2' }
    ];

    // Act
    const result = service.sortChapters(unsortedChapters);

    // Assert
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });
});

/*
💡 INTERVIEW: Testing Pyramid

Q: What is the testing pyramid?
A: Distribution guide for tests:
   - 70% Unit (fast, isolated, cheap)
   - 20% Integration (medium, multiple units)
   - 10% E2E (slow, full user flows)

Q: Why not 100% unit tests?
A: Miss integration bugs. Balance provides:
   - Fast feedback from units
   - Integration confidence
   - E2E for critical paths

Q: What is code coverage?
A: Measures code executed by tests:
   - Line coverage (% of lines)
   - Branch coverage (% of if/else)
   - Function coverage (% of functions)
   Target: 70-80% overall

Q: What is TDD?
A: Test-Driven Development:
   1. Red - Write failing test
   2. Green - Write minimum code to pass
   3. Refactor - Improve code quality
   Benefits: Better design, complete coverage
*/`
        }
      ]
    },
    {
      id: 181,
      title: 'Unit Testing Services',
      content: `
        <h2>Testing Angular Services</h2>
        <p>Unit tests for services focus on isolated business logic with mocked dependencies.</p>

        <h3>Service Testing Checklist</h3>
        <ul>
          <li><strong>Mock dependencies:</strong> Use jasmine.createSpyObj for services</li>
          <li><strong>Test HTTP calls:</strong> Use HttpClientTestingModule</li>
          <li><strong>Test observables:</strong> Use subscribe + done or toPromise</li>
          <li><strong>Test error handling:</strong> Simulate API errors</li>
          <li><strong>Test side effects:</strong> Verify method calls on dependencies</li>
        </ul>

        <h3>HttpClientTestingModule</h3>
        <p>Mock HTTP requests without real network calls:</p>
        <ol>
          <li>Import HttpClientTestingModule</li>
          <li>Inject HttpTestingController</li>
          <li>Call service method</li>
          <li>Expect HTTP request with httpMock.expectOne()</li>
          <li>Flush mock response</li>
          <li>Verify with httpMock.verify()</li>
        </ol>

        <h3>Mocking Strategies</h3>
        <table>
          <tr>
            <th>Strategy</th>
            <th>When to Use</th>
            <th>Example</th>
          </tr>
          <tr>
            <td>Spy</td>
            <td>Track method calls</td>
            <td>spyOn(service, 'method')</td>
          </tr>
          <tr>
            <td>Stub</td>
            <td>Return predetermined values</td>
            <td>jasmine.createSpyObj</td>
          </tr>
          <tr>
            <td>Mock</td>
            <td>Pre-programmed expectations</td>
            <td>Custom mock class</td>
          </tr>
        </table>
      `,
      codeSnippets: [
        {
          id: 1801,
          language: 'typescript',
          title: 'Testing HTTP Service',
          copyable: true,
          code: `import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChaptersService } from './chapters.service';

describe('ChaptersService', () => {
  let service: ChaptersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChaptersService]
    });

    service = TestBed.inject(ChaptersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should return chapters from API', (done) => {
    const mockChapters = [
      { id: 1, title: 'Getting Started' },
      { id: 2, title: 'Components' }
    ];

    service.getChapters().subscribe(chapters => {
      expect(chapters.length).toBe(2);
      expect(chapters[0].id).toBe(1);
      done();
    });

    const req = httpMock.expectOne('/api/chapters');
    expect(req.request.method).toBe('GET');
    req.flush(mockChapters);
  });

  it('should handle HTTP errors', (done) => {
    service.getChapters().subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
        done();
      }
    });

    const req = httpMock.expectOne('/api/chapters');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});

/*
💡 INTERVIEW: Testing HTTP Services

Q: How to test services with HTTP calls?
A: Use HttpClientTestingModule:
   - Import HttpClientTestingModule
   - Inject HttpTestingController
   - expectOne() to catch request
   - flush() to return mock data
   - verify() to check no pending requests

Q: Why not use real HTTP?
A: Mocking benefits:
   - Fast (no network)
   - Reliable (no flaky tests)
   - Control (test errors easily)
   - Isolation (no external dependencies)
*/`
        },
        {
          id: 1802,
          language: 'typescript',
          title: 'Mocking Dependencies',
          copyable: true,
          code: `import { TestBed } from '@angular/core/testing';
import { SyncService } from './sync.service';
import { NetworkService } from '../network/network.service';
import { DatabaseService } from '../database/database.service';
import { of, throwError } from 'rxjs';

describe('SyncService', () => {
  let service: SyncService;
  let networkSpy: jasmine.SpyObj<NetworkService>;
  let dbSpy: jasmine.SpyObj<DatabaseService>;

  beforeEach(() => {
    const networkMock = jasmine.createSpyObj('NetworkService',
      ['isOnline'],
      { isOnline$: of(true) }
    );
    const dbMock = jasmine.createSpyObj('DatabaseService',
      ['query', 'execute']
    );

    TestBed.configureTestingModule({
      providers: [
        SyncService,
        { provide: NetworkService, useValue: networkMock },
        { provide: DatabaseService, useValue: dbMock }
      ]
    });

    service = TestBed.inject(SyncService);
    networkSpy = TestBed.inject(NetworkService) as jasmine.SpyObj<NetworkService>;
    dbSpy = TestBed.inject(DatabaseService) as jasmine.SpyObj<DatabaseService>;
  });

  it('should sync when online', async () => {
    networkSpy.isOnline = true;
    dbSpy.query.and.returnValue(of([]));

    await service.syncAll();

    expect(dbSpy.query).toHaveBeenCalled();
  });

  it('should not sync when offline', async () => {
    networkSpy.isOnline = false;

    await service.syncAll();

    expect(dbSpy.query).not.toHaveBeenCalled();
  });
});

/*
💡 INTERVIEW: Mocking Dependencies

Q: Why mock dependencies?
A: Isolation:
   - Test only unit under test
   - Fast (no real calls)
   - Control (deterministic)
   - Reliable (no flaky tests)

Q: Spy vs Stub vs Mock?
A:
   - Spy: Tracks calls, can delegate
   - Stub: Returns predetermined values
   - Mock: Pre-programmed expectations
*/`
        }
      ]
    },
    {
      id: 182,
      title: 'Unit Testing Components',
      content: `
        <h2>Testing Angular Components</h2>
        <p>Component tests verify UI rendering, user interactions, and integration with services.</p>

        <h3>Component Testing Tools</h3>
        <ul>
          <li><strong>TestBed:</strong> Angular testing module for component setup</li>
          <li><strong>ComponentFixture:</strong> Test harness for component</li>
          <li><strong>DebugElement:</strong> Angular's debug wrapper for DOM</li>
          <li><strong>By:</strong> Platform-agnostic selectors</li>
        </ul>

        <h3>Testing Checklist</h3>
        <ul>
          <li>Component creation</li>
          <li>@Input properties rendering</li>
          <li>@Output events emitted</li>
          <li>User interactions (click, type)</li>
          <li>Conditional rendering (*ngIf)</li>
          <li>List rendering (*ngFor)</li>
          <li>Service integration</li>
          <li>Loading/error states</li>
        </ul>

        <h3>Smart vs Presentational Components</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>Smart (Container)</th>
            <th>Presentational (Dumb)</th>
          </tr>
          <tr>
            <td>Purpose</td>
            <td>Business logic, data fetching</td>
            <td>UI rendering only</td>
          </tr>
          <tr>
            <td>Dependencies</td>
            <td>Services, store</td>
            <td>None (only @Input/@Output)</td>
          </tr>
          <tr>
            <td>Testing</td>
            <td>Mock services</td>
            <td>Test in isolation</td>
          </tr>
          <tr>
            <td>Example</td>
            <td>ChaptersPage</td>
            <td>ChapterCardComponent</td>
          </tr>
        </table>

        <h3>fixture vs component vs nativeElement</h3>
        <ul>
          <li><strong>fixture:</strong> ComponentFixture&lt;T&gt; - Test harness</li>
          <li><strong>component:</strong> T - Component instance</li>
          <li><strong>nativeElement:</strong> HTMLElement - Real DOM</li>
          <li><strong>debugElement:</strong> DebugElement - Angular wrapper (preferred)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1803,
          language: 'typescript',
          title: 'Testing Presentational Component',
          copyable: true,
          code: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterCardComponent } from './chapter-card.component';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('ChapterCardComponent', () => {
  let component: ChapterCardComponent;
  let fixture: ComponentFixture<ChapterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChapterCardComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChapterCardComponent);
    component = fixture.componentInstance;
  });

  it('should display chapter title', () => {
    component.chapter = {
      id: 1,
      title: 'Getting Started',
      description: 'Learn Ionic',
      icon: 'rocket-outline',
      category: 'beginner',
      completed: false,
      hasDemo: true,
      sections: []
    };

    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('.chapter-title');
    expect(title.textContent).toContain('Getting Started');
  });

  it('should emit chapterClick when clicked', () => {
    component.chapter = { id: 1, title: 'Test', /* ... */ };
    fixture.detectChanges();

    spyOn(component.chapterClick, 'emit');

    const card = fixture.debugElement.query(By.css('ion-card'));
    card.nativeElement.click();

    expect(component.chapterClick.emit).toHaveBeenCalledWith(component.chapter);
  });

  it('should show completed badge when completed', () => {
    component.chapter = { id: 1, completed: true, /* ... */ };
    fixture.detectChanges();

    const badge = fixture.debugElement.query(By.css('.completed-badge'));
    expect(badge).toBeTruthy();
  });
});

/*
💡 INTERVIEW: Component Testing

Q: What is TestBed?
A: Angular's testing module:
   - Configures dependencies
   - Creates component instances
   - Provides DI
   - Compiles components

Q: fixture vs component?
A:
   - fixture: Test harness (ComponentFixture)
   - component: Component instance
   - fixture.detectChanges() triggers change detection
   - fixture.nativeElement: Real DOM

Q: debugElement vs nativeElement?
A:
   - debugElement: Angular wrapper (platform-agnostic)
   - nativeElement: Real DOM element
   - Use debugElement with By.css() (preferred)
*/`
        },
        {
          id: 1804,
          language: 'typescript',
          title: 'Testing Smart Component',
          copyable: true,
          code: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaptersPage } from './chapters.page';
import { ChaptersService } from '@app/services/chapters/chapters.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ChaptersPage', () => {
  let component: ChaptersPage;
  let fixture: ComponentFixture<ChaptersPage>;
  let serviceSpy: jasmine.SpyObj<ChaptersService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const chaptersSpy = jasmine.createSpyObj('ChaptersService', ['getChapters']);
    const routeSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ChaptersPage],
      providers: [
        { provide: ChaptersService, useValue: chaptersSpy },
        { provide: Router, useValue: routeSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ChaptersPage);
    component = fixture.componentInstance;
    serviceSpy = TestBed.inject(ChaptersService) as jasmine.SpyObj<ChaptersService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should load chapters on init', () => {
    const mockChapters = [{ id: 1, title: 'Test' }];
    serviceSpy.getChapters.and.returnValue(of(mockChapters));

    component.ngOnInit();

    expect(serviceSpy.getChapters).toHaveBeenCalled();
    expect(component.chapters.length).toBe(1);
  });

  it('should handle errors', () => {
    serviceSpy.getChapters.and.returnValue(
      throwError(() => new Error('Failed'))
    );
    spyOn(console, 'error');

    component.ngOnInit();

    expect(component.error).toBe('Failed');
    expect(console.error).toHaveBeenCalled();
  });

  it('should navigate on chapter click', () => {
    component.onChapterClick({ id: 1, /* ... */ });

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/chapters', 1]);
  });
});

/*
💡 INTERVIEW: Testing Smart Components

Q: Smart vs Presentational?
A:
   Smart (Container):
   - Business logic
   - Service calls
   - State management

   Presentational (Dumb):
   - UI rendering
   - @Input/@Output only
   - Reusable

Q: NO_ERRORS_SCHEMA?
A: Ignores unknown elements:
   - Use when testing parent without children
   - Prevents "unknown element" errors
   - Alternative: Declare child components
*/`
        }
      ]
    },
    {
      id: 183,
      title: 'Testing NgRx',
      content: `
        <h2>Testing State Management</h2>
        <p>NgRx components (actions, reducers, effects, selectors) require specific testing approaches.</p>

        <h3>Testing NgRx Components</h3>
        <table>
          <tr>
            <th>Component</th>
            <th>Difficulty</th>
            <th>Approach</th>
          </tr>
          <tr>
            <td>Reducers</td>
            <td>Easy</td>
            <td>Pure functions - test directly</td>
          </tr>
          <tr>
            <td>Selectors</td>
            <td>Easy</td>
            <td>Test .projector function</td>
          </tr>
          <tr>
            <td>Actions</td>
            <td>Very Easy</td>
            <td>Usually don't test (just objects)</td>
          </tr>
          <tr>
            <td>Effects</td>
            <td>Medium</td>
            <td>Marble testing or subscribe</td>
          </tr>
        </table>

        <h3>Reducer Testing</h3>
        <ul>
          <li>Test initial state</li>
          <li>Test unknown actions return unchanged state</li>
          <li>Test each action transforms state correctly</li>
          <li>Verify state immutability (no mutations)</li>
          <li>Test edge cases (empty, null)</li>
        </ul>

        <h3>Effects Testing</h3>
        <ul>
          <li><strong>Marble Testing:</strong> Visual Observable timeline</li>
          <li><strong>Standard Testing:</strong> subscribe + done callback</li>
          <li>Test success scenarios</li>
          <li>Test error scenarios</li>
          <li>Verify dispatched actions</li>
        </ul>

        <h3>Marble Diagram Syntax</h3>
        <pre>
'-'  = 10ms time passing
'a'  = emit value 'a'
'|'  = complete
'#'  = error
'()'  = synchronous grouping
        </pre>

        <p>Example: <code>'-a-b-c|'</code> = emit a, b, c then complete</p>
      `,
      codeSnippets: [
        {
          id: 1805,
          language: 'typescript',
          title: 'Testing Reducers',
          copyable: true,
          code: `import { chaptersReducer, initialState } from './chapters.reducer';
import * as ChaptersActions from './chapters.actions';

describe('ChaptersReducer', () => {
  const mockChapters = [
    { id: 1, title: 'Getting Started' },
    { id: 2, title: 'Components' }
  ];

  it('should return initial state', () => {
    const action = { type: 'Unknown' };
    const result = chaptersReducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should set loading on loadChapters', () => {
    const action = ChaptersActions.loadChapters();
    const result = chaptersReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBe(null);
  });

  it('should set chapters on success', () => {
    const action = ChaptersActions.loadChaptersSuccess({ chapters: mockChapters });
    const state = { ...initialState, loading: true };

    const result = chaptersReducer(state, action);

    expect(result.loading).toBe(false);
    expect(result.chapters.length).toBe(2);
    expect(result.error).toBe(null);
  });

  it('should set error on failure', () => {
    const error = 'Failed to load';
    const action = ChaptersActions.loadChaptersFailure({ error });
    const state = { ...initialState, loading: true };

    const result = chaptersReducer(state, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe(error);
  });

  it('should update chapter completed status', () => {
    const state = { ...initialState, chapters: mockChapters };
    const action = ChaptersActions.updateChapter({
      id: 1,
      changes: { completed: true }
    });

    const result = chaptersReducer(state, action);

    const updated = result.chapters.find(c => c.id === 1);
    expect(updated?.completed).toBe(true);
  });
});

/*
💡 INTERVIEW: Testing Reducers

Q: Why are reducers easy to test?
A: Pure functions:
   - No side effects
   - Deterministic (same input → same output)
   - No dependencies
   - Simple: state + action → new state

Q: What to test?
A:
   - Initial state
   - Unknown actions (should return state)
   - Each action transforms correctly
   - State immutability
   - Edge cases

Q: How to verify immutability?
A: Check new state !== old state:
   const result = reducer(state, action);
   expect(result).not.toBe(state);
   expect(result).toEqual(expected);
*/`
        },
        {
          id: 1806,
          language: 'typescript',
          title: 'Testing Effects',
          copyable: true,
          code: `import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ChaptersEffects } from './chapters.effects';
import { ChaptersService } from '@app/services/chapters/chapters.service';
import * as ChaptersActions from './chapters.actions';

describe('ChaptersEffects', () => {
  let actions$: Observable<any>;
  let effects: ChaptersEffects;
  let serviceSpy: jasmine.SpyObj<ChaptersService>;

  const mockChapters = [{ id: 1, title: 'Test' }];

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ChaptersService', ['getChapters']);

    TestBed.configureTestingModule({
      providers: [
        ChaptersEffects,
        provideMockActions(() => actions$),
        { provide: ChaptersService, useValue: spy }
      ]
    });

    effects = TestBed.inject(ChaptersEffects);
    serviceSpy = TestBed.inject(ChaptersService) as jasmine.SpyObj<ChaptersService>;
  });

  it('should return loadChaptersSuccess on success', (done) => {
    const action = ChaptersActions.loadChapters();
    serviceSpy.getChapters.and.returnValue(of(mockChapters));

    actions$ = of(action);

    effects.loadChapters$.subscribe(result => {
      expect(result).toEqual(
        ChaptersActions.loadChaptersSuccess({ chapters: mockChapters })
      );
      expect(serviceSpy.getChapters).toHaveBeenCalled();
      done();
    });
  });

  it('should return loadChaptersFailure on error', (done) => {
    const action = ChaptersActions.loadChapters();
    const error = new Error('Failed');

    serviceSpy.getChapters.and.returnValue(
      throwError(() => error)
    );
    actions$ = of(action);

    effects.loadChapters$.subscribe(result => {
      expect(result).toEqual(
        ChaptersActions.loadChaptersFailure({ error: error.message })
      );
      done();
    });
  });
});

/*
💡 INTERVIEW: Testing Effects

Q: What are NgRx Effects?
A: Side effect handlers:
   - Listen for actions
   - Perform side effects (HTTP, etc.)
   - Dispatch new actions
   Example: loadChapters → HTTP → success/failure

Q: How to test effects?
A: Two approaches:
   1. Marble testing (visual Observable timeline)
   2. Standard testing (subscribe + done)

Q: What is provideMockActions?
A: Provides actions$ observable:
   - From @ngrx/effects/testing
   - Pass Observable to it
   - Actions trigger effects

Q: Test what in effects?
A:
   - Service method called
   - Correct actions dispatched
   - Error handling
   - Action transformations
*/`
        },
        {
          id: 1807,
          language: 'typescript',
          title: 'Testing Selectors',
          copyable: true,
          code: `import * as fromChapters from './chapters.reducer';
import * as ChaptersSelectors from './chapters.selectors';

describe('Chapters Selectors', () => {
  const mockChapters = [
    { id: 1, title: 'Getting Started', category: 'beginner', completed: false },
    { id: 2, title: 'Components', category: 'intermediate', completed: true },
    { id: 3, title: 'SQLite', category: 'expert', completed: false }
  ];

  const state: fromChapters.ChaptersState = {
    chapters: mockChapters,
    loading: false,
    error: null
  };

  it('should select all chapters', () => {
    const result = ChaptersSelectors.selectAllChapters.projector(state);

    expect(result.length).toBe(3);
    expect(result).toEqual(mockChapters);
  });

  it('should select loading state', () => {
    const result = ChaptersSelectors.selectChaptersLoading.projector(state);

    expect(result).toBe(false);
  });

  it('should select completed chapters', () => {
    const result = ChaptersSelectors.selectCompletedChapters.projector(mockChapters);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(2);
  });

  it('should select beginner chapters', () => {
    const result = ChaptersSelectors.selectBeginnerChapters.projector(mockChapters);

    expect(result.length).toBe(1);
    expect(result[0].category).toBe('beginner');
  });

  it('should select chapter by id', () => {
    const factory = ChaptersSelectors.selectChapterById(2);
    const result = factory.projector(mockChapters);

    expect(result?.id).toBe(2);
    expect(result?.title).toBe('Components');
  });

  it('should return undefined for non-existent id', () => {
    const factory = ChaptersSelectors.selectChapterById(999);
    const result = factory.projector(mockChapters);

    expect(result).toBeUndefined();
  });

  it('should calculate completion percentage', () => {
    const result = ChaptersSelectors.selectCompletionPercentage.projector(mockChapters);

    expect(result).toBe(33); // 1 of 3 = 33%
  });
});

/*
💡 INTERVIEW: Testing Selectors

Q: Why test selectors?
A: Contain logic:
   - Filtering, sorting, transformation
   - Computed properties
   - Critical for UI rendering

Q: How to test selectors?
A: Call .projector directly:
   const result = selector.projector(state);
   - No need for real store
   - Test pure function
   - Fast and simple

Q: What is .projector?
A: The actual selector function:
   - Created with createSelector
   - Memoized by default
   - Recomputes when inputs change

Q: Should you test memoization?
A: Usually no:
   - Implementation detail
   - Trust framework
   - Only test custom logic
*/`
        }
      ]
    },
    {
      id: 184,
      title: 'Integration Testing',
      content: `
        <h2>Testing Component Integration</h2>
        <p>Integration tests verify multiple units working together with some real dependencies.</p>

        <h3>Integration Test Scope</h3>
        <ul>
          <li><strong>Component + Service:</strong> Real service, mocked HTTP</li>
          <li><strong>Multiple Components:</strong> Parent and children working together</li>
          <li><strong>Routing:</strong> Navigation between pages</li>
          <li><strong>Forms:</strong> Validation and submission end-to-end</li>
          <li><strong>State Flow:</strong> Action → Effect → Reducer → Selector → Component</li>
        </ul>

        <h3>Integration vs Unit</h3>
        <table>
          <tr>
            <th>Aspect</th>
            <th>Unit Test</th>
            <th>Integration Test</th>
          </tr>
          <tr>
            <td>Scope</td>
            <td>Single unit</td>
            <td>Multiple units</td>
          </tr>
          <tr>
            <td>Dependencies</td>
            <td>All mocked</td>
            <td>Some real</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>Very fast</td>
            <td>Medium</td>
          </tr>
          <tr>
            <td>Purpose</td>
            <td>Isolate bugs</td>
            <td>Verify integration</td>
          </tr>
        </table>

        <h3>Testing Routing</h3>
        <p>Use RouterTestingModule with fakeAsync:</p>
        <ol>
          <li>Import RouterTestingModule.withRoutes()</li>
          <li>Inject Router and Location</li>
          <li>Use fakeAsync + tick() for navigation</li>
          <li>Verify location.path()</li>
        </ol>

        <h3>fakeAsync vs async</h3>
        <ul>
          <li><strong>fakeAsync:</strong> Synchronous simulation, tick() advances time</li>
          <li><strong>async:</strong> Real async, fixture.whenStable() waits</li>
          <li>Use fakeAsync for routing, timers</li>
          <li>Use async for promises, HTTP</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1808,
          language: 'typescript',
          title: 'Component + Service Integration',
          copyable: true,
          code: `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChaptersPage } from '@app/pages/chapters/chapters.page';
import { ChaptersService } from '@app/services/chapters/chapters.service';
import { IonicModule } from '@ionic/angular';
import { By } from '@angular/platform-browser';

describe('Chapter Flow Integration', () => {
  let component: ChaptersPage;
  let fixture: ComponentFixture<ChaptersPage>;
  let httpMock: HttpTestingController;

  const mockChapters = [
    { id: 1, title: 'Getting Started' },
    { id: 2, title: 'Components' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChaptersPage],
      imports: [
        IonicModule.forRoot(),
        HttpClientTestingModule
      ],
      providers: [ChaptersService]
    }).compileComponents();

    fixture = TestBed.createComponent(ChaptersPage);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load and display chapters from API', async () => {
    component.ngOnInit();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/chapters');
    expect(req.request.method).toBe('GET');
    req.flush(mockChapters);

    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('app-chapter-card'));
    expect(cards.length).toBe(2);
    expect(component.chapters.length).toBe(2);
  });

  it('should show loading spinner while fetching', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('ion-spinner'));
    expect(spinner).toBeTruthy();

    const req = httpMock.expectOne('/api/chapters');
    req.flush(mockChapters);
    fixture.detectChanges();

    const spinnerAfter = fixture.debugElement.query(By.css('ion-spinner'));
    expect(spinnerAfter).toBeFalsy();
  });

  it('should display error on API failure', async () => {
    component.ngOnInit();
    fixture.detectChanges();

    const req = httpMock.expectOne('/api/chapters');
    req.flush('Error', { status: 500, statusText: 'Server Error' });

    await fixture.whenStable();
    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error-message'));
    expect(error).toBeTruthy();
  });
});

/*
💡 INTERVIEW: Integration Testing

Q: What is integration testing?
A: Testing multiple units together:
   - Component + Service + HTTP
   - Multiple components
   - Real dependencies (not all mocked)
   - Verify system behavior

Q: Integration vs Unit?
A: Scope and dependencies:
   Unit: Single unit, all mocked
   Integration: Multiple units, some real
   Unit is faster, integration verifies integration points

Q: What to test?
A:
   - Data flow (component → service → HTTP → component)
   - User interactions (click → service → UI update)
   - Error handling (API error → UI shows error)
   - State management flow

Q: When integration vs E2E?
A:
   Integration: Angular components together, faster
   E2E: Full user flows, real browser, critical paths
*/`
        },
        {
          id: 1809,
          language: 'typescript',
          title: 'Testing Routing & Navigation',
          copyable: true,
          code: `import { Location } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { HomePage } from '@app/pages/home/home.page';
import { ChaptersPage } from '@app/pages/chapters/chapters.page';

describe('Navigation Integration', () => {
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage, ChaptersPage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: '', component: HomePage },
          { path: 'chapters', component: ChaptersPage },
          { path: 'chapters/:id', component: ChapterDetailPage }
        ])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to chapters page', fakeAsync(() => {
    router.navigate(['/chapters']);
    tick();

    expect(location.path()).toBe('/chapters');
  }));

  it('should navigate to chapter detail', fakeAsync(() => {
    router.navigate(['/chapters', 1]);
    tick();

    expect(location.path()).toBe('/chapters/1');
  }));

  it('should navigate back', fakeAsync(() => {
    router.navigate(['/chapters']);
    tick();
    router.navigate(['/chapters', 1]);
    tick();

    location.back();
    tick();

    expect(location.path()).toBe('/chapters');
  }));
});

/*
💡 INTERVIEW: Testing Routing

Q: How to test Angular routing?
A: Use RouterTestingModule:
   - Import with routes
   - Inject Router and Location
   - Use fakeAsync + tick()
   - Verify location.path()

Q: What is fakeAsync?
A: Synchronous async code:
   - tick() advances time
   - flush() completes all async
   - Makes tests faster
   - Deterministic

Q: fakeAsync vs async?
A:
   fakeAsync: Synchronous simulation, tick()
   async: Real async, fixture.whenStable()
   Prefer fakeAsync for routing

Q: How to test route guards?
A: Test guard directly:
   - Call canActivate()
   - Verify return value
   - Mock dependencies
   - Test redirect scenarios
*/`
        }
      ]
    },
    {
      id: 185,
      title: 'E2E Testing with Cypress',
      content: `
        <h2>End-to-End Testing</h2>
        <p>E2E tests validate complete user flows in a real browser environment.</p>

        <h3>Cypress vs Selenium</h3>
        <table>
          <tr>
            <th>Feature</th>
            <th>Cypress</th>
            <th>Selenium</th>
          </tr>
          <tr>
            <td>Architecture</td>
            <td>Runs in browser</td>
            <td>Runs outside browser</td>
          </tr>
          <tr>
            <td>Waiting</td>
            <td>Automatic</td>
            <td>Manual (explicit waits)</td>
          </tr>
          <tr>
            <td>Debugging</td>
            <td>Time travel, snapshots</td>
            <td>Limited</td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>Fast</td>
            <td>Slower</td>
          </tr>
          <tr>
            <td>DX</td>
            <td>Excellent</td>
            <td>Complex setup</td>
          </tr>
        </table>

        <h3>Cypress Best Practices</h3>
        <ul>
          <li><strong>Use data-testid:</strong> Stable selectors, not classes/ids</li>
          <li><strong>Intercept network:</strong> cy.intercept() to mock APIs</li>
          <li><strong>Custom commands:</strong> Reusable operations (login, etc.)</li>
          <li><strong>Fixtures:</strong> Consistent mock data</li>
          <li><strong>Avoid hardcoded waits:</strong> cy.wait() with aliases</li>
          <li><strong>One assertion per test:</strong> Focused tests</li>
        </ul>

        <h3>What to Test with E2E</h3>
        <ul>
          <li>Critical user journeys (happy path)</li>
          <li>Authentication flows</li>
          <li>Purchase/checkout flows</li>
          <li>Key features that must work</li>
          <li>NOT every edge case (use unit tests)</li>
        </ul>

        <h3>E2E Test Distribution</h3>
        <p>Follow the testing pyramid: Only 10% E2E tests</p>
        <ul>
          <li><strong>10-50 E2E tests</strong> for typical app</li>
          <li>Focus on critical paths</li>
          <li>Too many = slow CI/CD, flaky tests</li>
          <li>Balance coverage with speed</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1810,
          language: 'typescript',
          title: 'Cypress Configuration',
          copyable: true,
          code: `// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // implement node event listeners
    },
  },
});

// cypress/support/commands.ts
declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Chainable<JQuery<HTMLElement>>;
      login(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('getByTestId', (testId: string) => {
  return cy.get(\`[data-testid="\${testId}"]\`);
});

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('not.include', '/login');
});

/*
💡 INTERVIEW: Cypress Setup

Q: Why Cypress over Selenium?
A: Modern advantages:
   - Runs in browser (same run loop)
   - Automatic waiting (no explicit waits)
   - Time travel debugging
   - Real-time reloading
   - Better DX

Q: What is cy.intercept()?
A: Network intercepting:
   - Mock API responses
   - Modify requests/responses
   - Wait for requests
   - Test loading states
   - No external dependencies

Q: Custom commands?
A: Reusable operations:
   - DRY principle
   - Common actions (login, etc.)
   - Improved readability
   - Easier maintenance
*/`
        },
        {
          id: 1811,
          language: 'typescript',
          title: 'Cypress E2E Test Example',
          copyable: true,
          code: `// cypress/e2e/chapters.cy.ts

describe('Chapters Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/chapters', {
      fixture: 'chapters.json'
    }).as('getChapters');

    cy.visit('/chapters');
    cy.wait('@getChapters');
  });

  it('should display list of chapters', () => {
    cy.get('app-chapter-card').should('have.length', 2);
    cy.contains('Getting Started').should('be.visible');
    cy.contains('Components').should('be.visible');
  });

  it('should filter chapters by category', () => {
    cy.getByTestId('category-filter').click();
    cy.getByTestId('beginner-option').click();

    cy.get('app-chapter-card').should('have.length', 2);
  });

  it('should search chapters', () => {
    cy.get('input[placeholder="Search chapters"]').type('Getting');

    cy.get('app-chapter-card').should('have.length', 1);
    cy.contains('Getting Started').should('be.visible');
    cy.contains('Components').should('not.exist');
  });

  it('should navigate to chapter detail', () => {
    cy.contains('Getting Started').click();

    cy.url().should('include', '/chapters/1');
    cy.contains('Lesson 1: Getting Started').should('be.visible');
  });

  it('should mark chapter as completed', () => {
    cy.contains('Getting Started').click();
    cy.getByTestId('complete-button').click();

    cy.getByTestId('completed-badge').should('be.visible');
    cy.contains('Completed').should('be.visible');
  });
});

/*
💡 INTERVIEW: Cypress Best Practices

Q: What to test with E2E?
A: Critical user journeys:
   - Happy path (most common flow)
   - Authentication
   - Key features
   - NOT every edge case

Q: How many E2E tests?
A: Follow pyramid:
   - 10% of total tests
   - 10-50 tests for typical app
   - Focus on critical paths
   - Too many = slow, flaky

Q: Stable selectors?
A: Use data-testid:
   - Not CSS classes (change)
   - Not ids (conflict)
   - data-testid stable for testing
   - Example: [data-testid="submit-button"]

Q: Avoid flaky tests?
A:
   - No hardcoded cy.wait(1000)
   - Use cy.intercept() + wait aliases
   - Use data-testid
   - Isolate tests (no shared state)
   - Control network with mocks
*/`
        },
        {
          id: 1812,
          language: 'typescript',
          title: 'Testing Offline Scenarios',
          copyable: true,
          code: `// cypress/e2e/offline.cy.ts

describe('Offline Mode', () => {
  it('should show offline banner when network unavailable', () => {
    cy.intercept('GET', '/api/chapters', {
      forceNetworkError: true
    }).as('failedRequest');

    cy.visit('/chapters');
    cy.wait('@failedRequest');

    cy.getByTestId('offline-banner').should('be.visible');
    cy.contains('You\\'re offline').should('be.visible');
  });

  it('should load from cache when offline', () => {
    // First visit online
    cy.intercept('GET', '/api/chapters', {
      fixture: 'chapters.json'
    });
    cy.visit('/chapters');

    // Second visit offline
    cy.intercept('GET', '/api/chapters', {
      forceNetworkError: true
    });
    cy.reload();

    // Should show cached chapters
    cy.get('app-chapter-card').should('have.length', 2);
  });

  it('should sync when coming back online', () => {
    // Start offline
    cy.intercept('POST', '/api/todos', {
      forceNetworkError: true
    }).as('offlineCreate');

    cy.visit('/todos');
    cy.getByTestId('add-button').click();
    cy.get('input[name="title"]').type('Offline Todo');
    cy.get('button[type="submit"]').click();

    // Todo appears locally
    cy.contains('Offline Todo').should('be.visible');
    cy.getByTestId('sync-badge').should('contain', '1');

    // Come back online
    cy.intercept('POST', '/api/todos', {
      statusCode: 201,
      body: { id: 123, title: 'Offline Todo' }
    }).as('syncCreate');

    cy.window().then((win) => {
      win.dispatchEvent(new Event('online'));
    });

    cy.wait('@syncCreate');

    // Sync completed
    cy.getByTestId('sync-badge').should('not.exist');
    cy.getByTestId('sync-indicator').should('contain', 'Synced');
  });
});

/*
💡 INTERVIEW: Testing Offline

Q: How to simulate offline in Cypress?
A: Use forceNetworkError:
   cy.intercept('/api/chapters', {
     forceNetworkError: true
   });

Q: How to test sync when coming online?
A: Trigger online event:
   cy.window().then((win) => {
     win.dispatchEvent(new Event('online'));
   });

Q: Test cache behavior?
A:
   1. First visit: Load with successful API
   2. Second visit: Simulate offline
   3. Verify: Cached data displayed
   4. Assert: UI works offline
*/`
        }
      ]
    },
    {
      id: 186,
      title: 'Testing Best Practices',
      content: `
        <h2>Test Quality & Maintenance</h2>
        <p>Write maintainable, reliable tests that provide value.</p>

        <h3>Test Utilities</h3>
        <ul>
          <li><strong>Fixtures:</strong> Reusable test data</li>
          <li><strong>Helpers:</strong> Common test operations</li>
          <li><strong>Page Objects:</strong> Encapsulate page interactions</li>
          <li><strong>Custom Matchers:</strong> Domain-specific assertions</li>
          <li><strong>Mock Factories:</strong> Create test doubles</li>
        </ul>

        <h3>Code Coverage</h3>
        <table>
          <tr>
            <th>Metric</th>
            <th>Description</th>
            <th>Target</th>
          </tr>
          <tr>
            <td>Line</td>
            <td>% of lines executed</td>
            <td>70-80%</td>
          </tr>
          <tr>
            <td>Branch</td>
            <td>% of if/else branches</td>
            <td>70-80%</td>
          </tr>
          <tr>
            <td>Function</td>
            <td>% of functions called</td>
            <td>70-80%</td>
          </tr>
          <tr>
            <td>Statement</td>
            <td>% of statements executed</td>
            <td>70-80%</td>
          </tr>
        </table>

        <h3>CI/CD Integration</h3>
        <ul>
          <li><strong>Run all unit tests:</strong> Fast, always</li>
          <li><strong>Run integration tests:</strong> Medium speed, always</li>
          <li><strong>Run E2E selectively:</strong> Slow, main branch or nightly</li>
          <li><strong>Enforce coverage:</strong> Threshold gates</li>
          <li><strong>Upload artifacts:</strong> Coverage reports, screenshots</li>
        </ul>

        <h3>Test Quality Checklist</h3>
        <ul>
          <li>AAA pattern (Arrange-Act-Assert)</li>
          <li>Descriptive test names</li>
          <li>One assertion per test (or related)</li>
          <li>Tests isolated (no shared state)</li>
          <li>Fast execution (&lt;1s for unit)</li>
          <li>Deterministic (no flaky tests)</li>
          <li>Maintainable (DRY, helpers)</li>
        </ul>
      `,
      codeSnippets: [
        {
          id: 1813,
          language: 'typescript',
          title: 'Test Fixtures',
          copyable: true,
          code: `// src/app/testing/fixtures/chapter.fixtures.ts

import { Chapter } from '@app/models/chapter.model';

export class ChapterFixtures {
  static createChapter(overrides?: Partial<Chapter>): Chapter {
    return {
      id: 1,
      title: 'Test Chapter',
      description: 'Test description',
      icon: 'rocket-outline',
      category: 'beginner',
      completed: false,
      hasDemo: true,
      sections: [],
      ...overrides
    };
  }

  static createChapters(count: number): Chapter[] {
    return Array.from({ length: count }, (_, i) =>
      this.createChapter({
        id: i + 1,
        title: \`Chapter \${i + 1}\`
      })
    );
  }

  static createBeginnerChapter(): Chapter {
    return this.createChapter({
      category: 'beginner',
      title: 'Beginner Chapter'
    });
  }

  static createExpertChapter(): Chapter {
    return this.createChapter({
      category: 'expert',
      title: 'Expert Chapter',
      id: 16
    });
  }

  static createCompletedChapter(): Chapter {
    return this.createChapter({
      completed: true,
      title: 'Completed Chapter'
    });
  }
}

// Usage:
const chapter = ChapterFixtures.createChapter({ title: 'Custom' });
const chapters = ChapterFixtures.createChapters(5);
const expert = ChapterFixtures.createExpertChapter();

/*
💡 INTERVIEW: Test Fixtures

Q: What are test fixtures?
A: Reusable test data:
   - Consistent across tests
   - Easy object creation
   - Reduces duplication
   - More readable tests

Q: Factory vs Builder?
A:
   Factory (simpler):
   ChapterFixtures.createChapter({ title: 'New' })

   Builder (more flexible):
   new ChapterBuilder().withTitle('New').build()

   Use factory for simple objects

Q: Should fixtures be complete?
A: Provide sensible defaults:
   - All required fields
   - Allow overrides
   - Balance complete vs minimal
*/`
        },
        {
          id: 1814,
          language: 'typescript',
          title: 'Test Helper Utilities',
          copyable: true,
          code: `// src/app/testing/helpers/test-helpers.ts

import { ComponentFixture } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class TestHelpers {
  static findByCss<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

  static findAllByCss<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement[] {
    return fixture.debugElement.queryAll(By.css(selector));
  }

  static findByTestId<T>(
    fixture: ComponentFixture<T>,
    testId: string
  ): DebugElement {
    return this.findByCss(fixture, \`[data-testid="\${testId}"]\`);
  }

  static click<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): void {
    const element = this.findByCss(fixture, selector);
    element.nativeElement.click();
    fixture.detectChanges();
  }

  static setInputValue<T>(
    fixture: ComponentFixture<T>,
    selector: string,
    value: string
  ): void {
    const input = this.findByCss(fixture, selector).nativeElement;
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  static getText<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): string {
    return this.findByCss(fixture, selector).nativeElement.textContent.trim();
  }

  static exists<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): boolean {
    return this.findByCss(fixture, selector) !== null;
  }

  static async waitForAsync<T>(
    fixture: ComponentFixture<T>
  ): Promise<void> {
    await fixture.whenStable();
    fixture.detectChanges();
  }
}

// Usage:
TestHelpers.click(fixture, '.submit-button');
TestHelpers.setInputValue(fixture, 'input[name="email"]', 'test@test.com');
const text = TestHelpers.getText(fixture, '.title');

/*
💡 INTERVIEW: Test Helpers

Q: Why create test helpers?
A: DRY principle:
   - Reduce duplication
   - Consistent patterns
   - Easier refactoring
   - More readable tests

Q: What helpers are useful?
A:
   - Element queries (findByCss, findByTestId)
   - Interactions (click, type)
   - Async utilities (waitForAsync)
   - Mock factories
   - Fixture creators

Q: Page Object pattern?
A: Encapsulate page interactions:
   class ChaptersPageObject {
     get chapters() { return findAll('app-chapter-card'); }
     clickChapter(index: number) { ... }
   }
   Benefits: Tests read like user actions
*/`
        },
        {
          id: 1815,
          language: 'typescript',
          title: 'CI/CD Pipeline Configuration',
          copyable: true,
          code: `# .github/workflows/test.yml

name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run unit tests
      run: npm run test:ci

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run E2E tests
      run: npm run e2e:ci

    - name: Upload Cypress videos
      uses: actions/upload-artifact@v3
      if: failure()
      with:
        name: cypress-videos
        path: cypress/videos

/*
💡 INTERVIEW: CI/CD Testing

Q: Why run tests in CI/CD?
A: Automated quality gates:
   - Catch bugs before merge
   - Prevent regression
   - Fast feedback
   - Confidence in deployments

Q: What tests in CI?
A:
   - All unit tests (fast, always)
   - Integration tests (medium, always)
   - E2E tests (slow, main branch)
   - Linting and formatting

Q: Speed up CI tests?
A:
   - Parallel execution
   - Cache dependencies
   - Run E2E only on main
   - Matrix strategy
   - Fail fast

Q: Test artifacts?
A:
   - Coverage reports
   - Test results (JUnit XML)
   - E2E screenshots/videos
   - Store for debugging
*/`
        }
      ]
    }
  ]
};
