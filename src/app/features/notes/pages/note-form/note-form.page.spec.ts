import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { NoteFormPage } from './note-form.page';

describe('NoteFormPage', () => {
  let component: NoteFormPage;
  let fixture: ComponentFixture<NoteFormPage>;

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
      imports: [NoteFormPage],
      providers: [
        provideRouter([]),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
