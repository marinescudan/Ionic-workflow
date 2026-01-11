import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsActions } from '../../store/posts.actions';
import {
  selectAllPosts,
  selectPostsLoading,
  selectPostsError,
} from '../../store/posts.selectors';

@Component({
  selector: 'app-posts-list',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Posts</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="onRefresh()">
            <ion-icon name="refresh"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      @if (loading$ | async) {
        <div class="spinner-container">
          <ion-spinner></ion-spinner>
        </div>
      } @else if (error$ | async; as error) {
        <div class="error-container">
          <p>{{ error }}</p>
          <ion-button (click)="onRefresh()">Retry</ion-button>
        </div>
      } @else {
        <ion-list>
          @for (post of posts$ | async; track post.id) {
            <ion-item [routerLink]="['/posts', post.id]">
              <ion-label>
                <h2>{{ post.title }}</h2>
                <p>{{ post.body }}</p>
              </ion-label>
            </ion-item>
          }
        </ion-list>
      }
    </ion-content>
  `,
  standalone: true,
})
export class PostsListPage implements OnInit {
  private store = inject(Store);

  // Observables from store
  posts$ = this.store.select(selectAllPosts);
  loading$ = this.store.select(selectPostsLoading);
  error$ = this.store.select(selectPostsError);

  ngOnInit() {
    // Dispatch action to load posts
    this.store.dispatch(PostsActions.loadPosts());
  }

  onRefresh() {
    this.store.dispatch(PostsActions.loadPosts());
  }

  onCreatePost() {
    const newPost = {
      title: 'New Post',
      body: 'Post content',
      userId: 1,
    };
    this.store.dispatch(PostsActions.createPost({ post: newPost }));
  }
}
