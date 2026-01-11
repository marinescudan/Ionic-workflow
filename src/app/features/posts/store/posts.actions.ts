import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { Post, CreatePostDto, UpdatePostDto } from '../models/post.model';

export const PostsActions = createActionGroup({
  source: 'Posts',
  events: {
    // Load Posts
    'Load Posts': emptyProps(),
    'Load Posts Success': props<{ posts: Post[] }>(),
    'Load Posts Failure': props<{ error: string }>(),

    // Load Single Post
    'Load Post': props<{ id: number }>(),
    'Load Post Success': props<{ post: Post }>(),
    'Load Post Failure': props<{ error: string }>(),

    // Create Post
    'Create Post': props<{ post: CreatePostDto }>(),
    'Create Post Success': props<{ post: Post }>(),
    'Create Post Failure': props<{ error: string }>(),

    // Update Post
    'Update Post': props<{ post: UpdatePostDto }>(),
    'Update Post Success': props<{ post: Post }>(),
    'Update Post Failure': props<{ error: string }>(),

    // Delete Post
    'Delete Post': props<{ id: number }>(),
    'Delete Post Success': props<{ id: number }>(),
    'Delete Post Failure': props<{ error: string }>(),
  },
});