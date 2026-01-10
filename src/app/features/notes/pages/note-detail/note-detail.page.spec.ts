import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { NoteDetailPage } from './note-detail.page';

describe('NoteDetailPage', () => {
  let component: NoteDetailPage;
  let fixture: ComponentFixture<NoteDetailPage>;

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
      imports: [NoteDetailPage],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
