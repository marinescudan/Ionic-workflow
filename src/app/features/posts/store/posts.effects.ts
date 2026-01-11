import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap, exhaustMap, concatMap } from 'rxjs/operators';
import { PostsService } from '../services/posts.service';
import { PostsActions } from './posts.actions';

@Injectable()
export class PostsEffects {
  private actions$ = inject(Actions);
  private postsService = inject(PostsService);

  /**
   * Load all posts (switchMap - cancels previous)
   */
  loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap(() =>
        this.postsService.getAll().pipe(
          map((posts) => PostsActions.loadPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.loadPostsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Load single post (switchMap - cancels previous)
   */
  loadPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.loadPost),
      switchMap(({ id }) =>
        this.postsService.getById(id).pipe(
          map((post) => PostsActions.loadPostSuccess({ post })),
          catchError((error) =>
            of(PostsActions.loadPostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Create post (exhaustMap - ignore new while processing)
   */
  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.createPost),
      exhaustMap(({ post }) =>
        this.postsService.create(post).pipe(
          map((createdPost) => PostsActions.createPostSuccess({ post: createdPost })),
          catchError((error) =>
            of(PostsActions.createPostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Update post (concatMap - process in order)
   */
  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.updatePost),
      concatMap(({ post }) =>
        this.postsService.update(post.id, post).pipe(
          map((updatedPost) => PostsActions.updatePostSuccess({ post: updatedPost })),
          catchError((error) =>
            of(PostsActions.updatePostFailure({ error: error.message }))
          )
        )
      )
    )
  );

  /**
   * Delete post (concatMap - process in order)
   */
  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.deletePost),
      concatMap(({ id }) =>
        this.postsService.delete(id).pipe(
          map(() => PostsActions.deletePostSuccess({ id })),
          catchError((error) =>
            of(PostsActions.deletePostFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
