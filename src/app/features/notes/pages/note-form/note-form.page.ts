
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonButton, IonIcon, IonList, IonItem,
  IonInput, IonTextarea, IonSelect, IonSelectOption,
  IonToggle, IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { save, close } from 'ionicons/icons';

import { NotesActions } from '../../store/notes.actions';
import { selectNoteById, selectNotesLoading } from '../../store/notes.selectors';
import { Note, CreateNoteDto, UpdateNoteDto } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonButton, IonIcon, IonList, IonItem,
    IonInput, IonTextarea, IonSelect, IonSelectOption,
    IonToggle, IonNote,
  ],
  templateUrl: './note-form.page.html',
  styleUrls: ['./note-form.page.scss'],
})
export class NoteFormPage implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  loading$ = this.store.select(selectNotesLoading);

  noteForm: FormGroup;
  isEditMode = false;
  noteId: string | null = null;

  categories: Note['category'][] = ['personal', 'work', 'ideas'];

  constructor() {
    addIcons({ save, close });

    this.noteForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      category: ['personal' as Note['category'], Validators.required],
      pinned: [false],
    });
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');

    if (this.noteId) {
      this.isEditMode = true;
      this.store.select(selectNoteById(this.noteId)).subscribe(note => {
        if (note) {
          this.noteForm.patchValue({
            title: note.title,
            content: note.content,
            category: note.category,
            pinned: note.pinned,
          });
        }
      });
    }
  }

  get title() {
    return this.noteForm.get('title');
  }

  get content() {
    return this.noteForm.get('content');
  }

  get category() {
    return this.noteForm.get('category');
  }

  onSubmit(): void {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched();
      return;
    }

    const formValue = this.noteForm.value;

    if (this.isEditMode && this.noteId) {
      const updateDto: UpdateNoteDto = {
        id: this.noteId,
        title: formValue.title,
        content: formValue.content,
        category: formValue.category,
        pinned: formValue.pinned,
      };
      this.store.dispatch(NotesActions.updateNote({ note: updateDto }));
    } else {
      const createDto: CreateNoteDto = {
        title: formValue.title,
        content: formValue.content,
        category: formValue.category,
      };
      this.store.dispatch(NotesActions.addNote({ note: createDto }));
    }

    this.router.navigate(['/notes']);
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }

  getCategoryLabel(category: Note['category']): string {
    const labels: Record<Note['category'], string> = {
      personal: 'Personal',
      work: 'Work',
      ideas: 'Ideas',
    };
    return labels[category];
  }
}
