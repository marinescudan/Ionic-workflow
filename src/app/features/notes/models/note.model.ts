export interface Note {
  id: string;
  title: string;
  content: string;
  category: 'personal' | 'work' | 'ideas';
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteDto {
  title: string;
  content: string;
  category: Note['category'];
}

export interface UpdateNoteDto {
  id: string;
  title?: string;
  content?: string;
  category?: Note['category'];
  pinned?: boolean;
}
