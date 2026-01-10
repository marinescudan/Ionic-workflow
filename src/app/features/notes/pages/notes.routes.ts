import { Routes } from '@angular/router';

export const NOTES_ROUTES: Routes = [
  {
    path: 'notes',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./notes-list/notes-list.page')
            .then(m => m.NotesListPage),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('./note-form/note-form.page')
            .then(m => m.NoteFormPage),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./note-detail/note-detail.page')
            .then(m => m.NoteDetailPage),
      },
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./note-form/note-form.page')
            .then(m => m.NoteFormPage),
      },
    ],
  }
];