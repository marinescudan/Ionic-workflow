import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, postsAdapter } from './posts.reducer';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

// Entity adapter provides these selectors
const { selectAll, selectEntities, selectIds, selectTotal } =
  postsAdapter.getSelectors(selectPostsState);

export const selectAllPosts = selectAll;
export const selectPostEntities = selectEntities;
export const selectPostIds = selectIds;
export const selectTotalPosts = selectTotal;

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state) => state.loading
);

export const selectPostsError = createSelector(
  selectPostsState,
  (state) => state.error
);

export const selectSelectedPostId = createSelector(
  selectPostsState,
  (state) => state.selectedPostId
);

export const selectSelectedPost = createSelector(
  selectPostEntities,
  selectSelectedPostId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : null)
);

// Custom selector: posts by user
export const selectPostsByUser = (userId: number) =>
  createSelector(selectAllPosts, (posts) =>
    posts.filter((post) => post.userId === userId)
  );
