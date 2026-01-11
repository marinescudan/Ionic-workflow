import { Component, OnInit, inject, signal } from '@angular/core';
import { PostsService, Post } from '../../services/posts.service';
import { catchError, finalize, of } from 'rxjs';
import {
  IonButton, IonContent,
  IonIcon,
  IonItem,
  IonHeader,
  IonLabel,
  IonList,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-posts-list',
  templateUrl: 'posts-list.page.html',
  styleUrls: ['posts-list.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonIcon,
    IonItem,
    IonHeader,
    IonLabel,
    IonList,
    IonSpinner,
    IonTitle,
    IonToolbar,
  ],
})
export class PostsListPage implements OnInit {
  private readonly postsService = inject(PostsService);

  // Signals for reactive state
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.loading.set(true);
    this.error.set(null);

    this.postsService
      .getAll()
      .pipe(
        catchError((err) => {
          // Handle error at component level
          this.error.set(err.message || 'Failed to load posts');
          return of([]); // Return empty array to continue stream
        }),
        finalize(() => {
          // Always runs (success or error)
          this.loading.set(false);
        })
      )
      .subscribe((posts) => {
        this.posts.set(posts);
      });
  }
}

