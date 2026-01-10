
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonList, IonItem, IonLabel, IonButton, IonIcon,
  IonSpinner, IonFab, IonFabButton, IonChip, IonBadge,
  IonRefresher, IonRefresherContent, IonItemSliding, IonItemOptions,
  IonItemOption, IonSegment, IonSegmentButton,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, pin, trash, create, checkmark, ellipsisVertical } from 'ionicons/icons';

import { NotesActions } from '../../store/notes.actions';
import {
  selectAllNotes,
  selectNotesLoading,
  selectNotesError,
  selectPinnedNotes,
  selectFilteredNotes,
  selectFilterCategory,
  selectNotesTotal,
} from '../../store/notes.selectors';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonList, IonItem, IonLabel, IonButton, IonIcon,
    IonSpinner, IonFab, IonFabButton, IonBadge,
    IonRefresher, IonRefresherContent, IonItemSliding, IonItemOptions,
    IonItemOption, IonSegment, IonSegmentButton,
  ],
  templateUrl: './notes-list.page.html',
  styleUrls: ['./notes-list.page.scss'],
})
export class NotesListPage implements OnInit {
  private store = inject(Store);
  private alertCtrl = inject(AlertController);

  // Selectors - observables from the store
  notes$ = this.store.select(selectFilteredNotes);
  pinnedNotes$ = this.store.select(selectPinnedNotes);
  loading$ = this.store.select(selectNotesLoading);
  error$ = this.store.select(selectNotesError);
  totalNotes$ = this.store.select(selectNotesTotal);
  filterCategory$ = this.store.select(selectFilterCategory);

  categories: Note['category'][] = ['personal', 'work', 'ideas'];

  constructor() {
    addIcons({ add, pin, trash, create, checkmark, ellipsisVertical });
  }

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.store.dispatch(NotesActions.loadNotes());
  }

  refresh(event: any): void {
    this.store.dispatch(NotesActions.loadNotes());
    setTimeout(() => event.target.complete(), 1000);
  }

  selectNote(id: string): void {
    this.store.dispatch(NotesActions.selectNote({ id }));
  }

  togglePin(event: Event, id: string): void {
    event.stopPropagation();
    this.store.dispatch(NotesActions.togglePin({ id }));
  }

  filterByCategory(category: string | number | null | undefined): void {
    if (category && this.categories.includes(category as Note['category'])) {
      this.store.dispatch(NotesActions.filterByCategory({ category: category as Note['category'] }));
    } else {
      this.store.dispatch(NotesActions.clearFilter());
    }
  }

  async confirmDelete(event: Event, note: Note): Promise<void> {
    event.stopPropagation();

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

  trackById(index: number, note: Note): string {
    return note.id;
  }
}
