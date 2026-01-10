
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { Note, CreateNoteDto, UpdateNoteDto } from '../models/note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private baseUrl = '/api/notes';

  // For demo: Mock data (replace with real API calls)
  private mockNotes: Note[] = [
    {
      id: '1',
      title: 'Welcome to NgRx',
      content: 'Learn state management with NgRx - the Redux pattern for Angular.',
      category: 'work',
      pinned: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Shopping List',
      content: 'Milk, Bread, Eggs, Coffee',
      category: 'personal',
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'App Ideas',
      content: 'Build a habit tracker with gamification',
      category: 'ideas',
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  getAll(): Observable<Note[]> {
    // Real: return this.http.get<Note[]>(this.baseUrl);
    return of([...this.mockNotes]).pipe(delay(500));
  }

  getById(id: string): Observable<Note | undefined> {
    // Real: return this.http.get<Note>(`${this.baseUrl}/${id}`);
    const note = this.mockNotes.find(n => n.id === id);
    return of(note).pipe(delay(300));
  }

  create(dto: CreateNoteDto): Observable<Note> {
    // Real: return this.http.post<Note>(this.baseUrl, dto);
    const newNote: Note = {
      ...dto,
      id: Date.now().toString(),
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.mockNotes.push(newNote);
    return of(newNote).pipe(delay(300));
  }

  update(dto: UpdateNoteDto): Observable<Note> {
    // Real: return this.http.patch<Note>(`${this.baseUrl}/${dto.id}`, dto);
    const index = this.mockNotes.findIndex(n => n.id === dto.id);
    if (index >= 0) {
      this.mockNotes[index] = {
        ...this.mockNotes[index],
        ...dto,
        updatedAt: new Date().toISOString(),
      };
      return of(this.mockNotes[index]).pipe(delay(300));
    }
    throw new Error('Note not found');
  }

  delete(id: string): Observable<void> {
    // Real: return this.http.delete<void>(`${this.baseUrl}/${id}`);
    this.mockNotes = this.mockNotes.filter(n => n.id !== id);
    return of(undefined).pipe(delay(300));
  }
}
