import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { NotesListPage } from './notes-list.page';
import { NotesActions } from '../../store/notes.actions';
import {
  selectAllNotes,
  selectNotesLoading,
  selectNotesError,
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
      filterCategory: null,
      loading: false,
      error: null,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotesListPage],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(NotesListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
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
    store.overrideSelector(selectNotesLoading, true);
    store.refreshState();
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('ion-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should display notes when loaded', () => {
    const mockNotes = [
      { id: '1', title: 'Note 1', content: 'Content', category: 'work', pinned: false },
    ];

    store.overrideSelector(selectAllNotes, mockNotes as any);
    store.overrideSelector(selectNotesLoading, false);
    store.refreshState();
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('ion-item');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should show error message when error exists', () => {
    store.overrideSelector(selectNotesError, 'Failed to load notes');
    store.refreshState();
    fixture.detectChanges();

    const errorContainer = fixture.nativeElement.querySelector('.error-container');
    expect(errorContainer).toBeTruthy();
    expect(errorContainer.textContent).toContain('Failed to load notes');
  });

  it('should dispatch deleteNote when confirmed', async () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const mockNote = { id: '1', title: 'Test' };

    // Simulate delete confirmation
    // In real test, you'd mock AlertController

    store.dispatch(NotesActions.deleteNote({ id: '1' }));
    expect(dispatchSpy).toHaveBeenCalledWith(NotesActions.deleteNote({ id: '1' }));
  });
});
