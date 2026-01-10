import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap, mergeMap, switchMap } from 'rxjs/operators';
import { NotesActions } from './notes.actions';
import { NotesService } from '../services/notes.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable()
export class NotesEffects {
  private readonly actions$ = inject(Actions);
  private readonly notesService = inject(NotesService);
  private readonly toastCtrl = inject(ToastController);
  private readonly router = inject(Router);

  // ========== Load Notes ==========
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

  // ========== Add Note ==========
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

  // ========== Update Note ==========
  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNote),
      mergeMap(({ note }) =>
        this.notesService.update(note).pipe(
          map(updatedNote => NotesActions.updateNoteSuccess({ note: updatedNote })),
          catchError(error =>
            of(NotesActions.updateNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ========== Delete Note ==========
  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNote),
      exhaustMap(({ id }) =>
        this.notesService.delete(id).pipe(
          map(() => NotesActions.deleteNoteSuccess({ id })),
          catchError(error =>
            of(NotesActions.deleteNoteFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // ========== Success Toasts (dispatch: false) ==========
  addNoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNoteSuccess),
      tap(async ({ note }) => {
        const toast = await this.toastCtrl.create({
          message: `"${note.title}" created successfully`,
          duration: 2000,
          color: 'success',
          position: 'bottom',
        });
        await toast.present();
      })
    ),
    { dispatch: false }
  );

  updateNoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.updateNoteSuccess),
      tap(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Note updated',
          duration: 1500,
          color: 'success',
        });
        await toast.present();
      })
    ),
    { dispatch: false }
  );

  deleteNoteSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      tap(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Note deleted',
          duration: 2000,
          color: 'warning',
        });
        await toast.present();
      })
    ),
    { dispatch: false }
  );

  // ========== Error Handling ==========
  handleErrors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        NotesActions.loadNotesFailure,
        NotesActions.addNoteFailure,
        NotesActions.updateNoteFailure,
        NotesActions.deleteNoteFailure
      ),
      tap(async ({ error }) => {
        const toast = await this.toastCtrl.create({
          message: `Error: ${error}`,
          duration: 3000,
          color: 'danger',
          buttons: [{ text: 'Dismiss', role: 'cancel' }],
        });
        await toast.present();
      })
    ),
    { dispatch: false }
  );

  // ========== Navigation ==========
  navigateAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.addNoteSuccess),
      tap(({ note }) => {
        this.router.navigate(['/notes', note.id]);
      })
    ),
    { dispatch: false }
  );

  navigateAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NotesActions.deleteNoteSuccess),
      tap(() => {
        this.router.navigate(['/notes']);
      })
    ),
    { dispatch: false }
  );
}