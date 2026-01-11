import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from '../models/post.model';
import { PostsActions } from './posts.actions';

export interface PostsState extends EntityState<Post> {
  loading: boolean;
  error: string | null;
  selectedPostId: number | null;
}

export const postsAdapter = createEntityAdapter<Post>({
  selectId: (post: Post) => post.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState: PostsState = postsAdapter.getInitialState({
  loading: false,
  error: null,
  selectedPostId: null,
});

export const postsReducer = createReducer(
  initialState,

  // Load Posts
  on(PostsActions.loadPosts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.loadPostsSuccess, (state, { posts }) =>
    postsAdapter.setAll(posts, {
      ...state,
      loading: false,
    })
  ),
  on(PostsActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Load Single Post
  on(PostsActions.loadPost, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.loadPostSuccess, (state, { post }) =>
    postsAdapter.upsertOne(post, {
      ...state,
      loading: false,
      selectedPostId: post.id,
    })
  ),
  on(PostsActions.loadPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Create Post
  on(PostsActions.createPost, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(PostsActions.createPostSuccess, (state, { post }) =>
    postsAdapter.addOne(post, {
      ...state,
      loading: false,
    })
  ),
  on(PostsActions.createPostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Update Post
  on(PostsActions.updatePost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.updatePostSuccess, (state, { post }) =>
    postsAdapter.updateOne(
      { id: post.id, changes: post },
      { ...state, loading: false }
    )
  ),
  on(PostsActions.updatePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Delete Post
  on(PostsActions.deletePost, (state) => ({
    ...state,
    loading: true,
  })),
  on(PostsActions.deletePostSuccess, (state, { id }) =>
    postsAdapter.removeOne(id, {
      ...state,
      loading: false,
    })
  ),
  on(PostsActions.deletePostFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
