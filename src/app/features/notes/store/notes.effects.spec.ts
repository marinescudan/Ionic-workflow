import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { NotesEffects } from './notes.effects';
import { NotesActions } from './notes.actions';
import { NotesService } from '../services/notes.service';
import { ToastController } from '@ionic/angular';
import { Note } from '../models/note.model';

describe('NotesEffects', () => {
  let effects: NotesEffects;
  let actions$: Observable<any>;
  let notesService: jasmine.SpyObj<NotesService>;
  let toastCtrl: jasmine.SpyObj<ToastController>;

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
    const notesServiceSpy = jasmine.createSpyObj('NotesService', [
      'getAll',
      'create',
      'update',
      'delete',
    ]);
    const toastCtrlSpy = jasmine.createSpyObj('ToastController', ['create']);
    toastCtrlSpy.create.and.returnValue(
      Promise.resolve({ present: () => Promise.resolve() } as any)
    );

    TestBed.configureTestingModule({
      providers: [
        NotesEffects,
        provideMockActions(() => actions$),
        { provide: NotesService, useValue: notesServiceSpy },
        { provide: ToastController, useValue: toastCtrlSpy },
      ],
    });

    effects = TestBed.inject(NotesEffects);
    notesService = TestBed.inject(NotesService) as jasmine.SpyObj<NotesService>;
    toastCtrl = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
  });

  describe('loadNotes$', () => {
    it('should return loadNotesSuccess on successful load', (done) => {
      const notes = [mockNote];
      notesService.getAll.and.returnValue(of(notes));
      actions$ = of(NotesActions.loadNotes());

      effects.loadNotes$.subscribe((action) => {
        expect(action).toEqual(NotesActions.loadNotesSuccess({ notes }));
        done();
      });
    });

    it('should return loadNotesFailure on error', (done) => {
      const error = new Error('API Error');
      notesService.getAll.and.returnValue(throwError(() => error));
      actions$ = of(NotesActions.loadNotes());

      effects.loadNotes$.subscribe((action) => {
        expect(action).toEqual(
          NotesActions.loadNotesFailure({ error: 'API Error' })
        );
        done();
      });
    });
  });

  describe('addNote$', () => {
    it('should return addNoteSuccess on successful creation', (done) => {
      const newNote = { title: 'New', content: 'Content', category: 'work' as const };
      notesService.create.and.returnValue(of(mockNote));
      actions$ = of(NotesActions.addNote({ note: newNote }));

      effects.addNote$.subscribe((action) => {
        expect(action).toEqual(NotesActions.addNoteSuccess({ note: mockNote }));
        done();
      });
    });
  });

  describe('deleteNote$', () => {
    it('should return deleteNoteSuccess on successful deletion', (done) => {
      notesService.delete.and.returnValue(of(undefined));
      actions$ = of(NotesActions.deleteNote({ id: '1' }));

      effects.deleteNote$.subscribe((action) => {
        expect(action).toEqual(NotesActions.deleteNoteSuccess({ id: '1' }));
        done();
      });
    });
  });
});
