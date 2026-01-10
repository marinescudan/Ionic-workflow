
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonButton, IonIcon, IonChip, IonLabel,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pin, pinOutline, trash, create, arrowBack } from 'ionicons/icons';

import { NotesActions } from '../../store/notes.actions';
import { selectNoteById, selectNotesLoading } from '../../store/notes.selectors';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-detail',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonButton, IonIcon, IonChip, IonLabel,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  ],
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertCtrl = inject(AlertController);

  note$ = this.store.select(selectNoteById(''));
  loading$ = this.store.select(selectNotesLoading);

  constructor() {
    addIcons({ pin, pinOutline, trash, create, arrowBack });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note$ = this.store.select(selectNoteById(id));
      this.store.dispatch(NotesActions.selectNote({ id }));
    }
  }

  togglePin(note: Note): void {
    this.store.dispatch(NotesActions.togglePin({ id: note.id }));
  }

  editNote(note: Note): void {
    this.router.navigate(['/notes/edit', note.id]);
  }

  async confirmDelete(note: Note): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Delete Note',
      message: `Are you sure you want to delete "${note.title}"?`,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.store.dispatch(NotesActions.deleteNote({ id: note.id }));
            this.router.navigate(['/notes']);
          },
        },
      ],
    });
    await alert.present();
  }

  getCategoryColor(category: Note['category']): string {
    const colors: Record<Note['category'], string> = {
      personal: 'primary',
      work: 'tertiary',
      ideas: 'success',
    };
    return colors[category];
  }

  goBack(): void {
    this.router.navigate(['/notes']);
  }
}
