import { DocumentNode } from 'graphql';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import * as ApolloCore from '@apollo/client/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: string; }
  Upload: { input: File; output: File; }
};

export type Bookmark = {
  __typename: 'Bookmark';
  chapterId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  note?: Maybe<Scalars['String']['output']>;
  sectionId: Scalars['String']['output'];
};

export type BookmarkInput = {
  chapterId: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  sectionId: Scalars['String']['input'];
};

export type Chapter = {
  __typename: 'Chapter';
  bookmarks: Array<Bookmark>;
  category: ChapterCategory;
  completed: Scalars['Boolean']['output'];
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  hasDemo: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  progress?: Maybe<Progress>;
  sections: Array<Section>;
  title: Scalars['String']['output'];
};

export enum ChapterCategory {
  Advanced = 'ADVANCED',
  Essentials = 'ESSENTIALS',
  Expert = 'EXPERT',
  Fundamentals = 'FUNDAMENTALS',
  Intermediate = 'INTERMEDIATE'
}

export type ChapterConnection = {
  __typename: 'ChapterConnection';
  edges: Array<ChapterEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type ChapterEdge = {
  __typename: 'ChapterEdge';
  cursor: Scalars['String']['output'];
  node: Chapter;
};

export enum CodeLanguage {
  Bash = 'BASH',
  Graphql = 'GRAPHQL',
  Html = 'HTML',
  Scss = 'SCSS',
  Typescript = 'TYPESCRIPT'
}

export type CodeSnippet = {
  __typename: 'CodeSnippet';
  code: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  language: CodeLanguage;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
  completeChapter: Chapter;
  completeMultipleChapters: Array<Chapter>;
  createBookmark: Bookmark;
  deleteBookmark: Scalars['Boolean']['output'];
  updateBookmark: Bookmark;
  updateProgress: Progress;
  uploadFile: Scalars['String']['output'];
};


export type MutationCompleteChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCompleteMultipleChaptersArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type MutationCreateBookmarkArgs = {
  input: BookmarkInput;
};


export type MutationDeleteBookmarkArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateBookmarkArgs = {
  id: Scalars['ID']['input'];
  note: Scalars['String']['input'];
};


export type MutationUpdateProgressArgs = {
  chapterId: Scalars['ID']['input'];
  percentage: Scalars['Float']['input'];
  timeSpent?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type PageInfo = {
  __typename: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Progress = {
  __typename: 'Progress';
  chapterId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  lastAccessed: Scalars['DateTime']['output'];
  percentage: Scalars['Float']['output'];
  timeSpent: Scalars['Int']['output'];
};

export type Query = {
  __typename: 'Query';
  bookmarks: Array<Bookmark>;
  chapter?: Maybe<Chapter>;
  chapters: Array<Chapter>;
  paginatedChapters: ChapterConnection;
  progress?: Maybe<Progress>;
  searchChapters: Array<Chapter>;
};


export type QueryBookmarksArgs = {
  chapterId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryChapterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChaptersArgs = {
  category?: InputMaybe<ChapterCategory>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPaginatedChaptersArgs = {
  limit?: Scalars['Int']['input'];
  offset?: Scalars['Int']['input'];
};


export type QueryProgressArgs = {
  chapterId: Scalars['ID']['input'];
};


export type QuerySearchChaptersArgs = {
  query: Scalars['String']['input'];
};

export type Section = {
  __typename: 'Section';
  codeSnippets: Array<CodeSnippet>;
  content: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type Subscription = {
  __typename: 'Subscription';
  allProgressUpdates: Progress;
  chapterCompleted: Chapter;
  progressUpdated: Progress;
};


export type SubscriptionProgressUpdatedArgs = {
  chapterId: Scalars['ID']['input'];
};

export type ChapterBasicFieldsFragment = { __typename: 'Chapter', id: string, title: string, description?: string | null, category: ChapterCategory, completed: boolean, hasDemo: boolean };

export type ChapterWithProgressFragment = { __typename: 'Chapter', completedAt?: string | null, id: string, title: string, description?: string | null, category: ChapterCategory, completed: boolean, hasDemo: boolean, progress?: { __typename: 'Progress', id: string, percentage: number, timeSpent: number, lastAccessed: string } | null };

export type ChapterFullDetailsFragment = { __typename: 'Chapter', completedAt?: string | null, id: string, title: string, description?: string | null, category: ChapterCategory, completed: boolean, hasDemo: boolean, sections: Array<{ __typename: 'Section', id: string, title: string, content: string, codeSnippets: Array<{ __typename: 'CodeSnippet', id: string, language: CodeLanguage, code: string, title: string, description?: string | null }> }>, bookmarks: Array<{ __typename: 'Bookmark', id: string, sectionId: string, note?: string | null, createdAt: string }>, progress?: { __typename: 'Progress', id: string, percentage: number, timeSpent: number, lastAccessed: string } | null };

export type CompleteChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CompleteChapterMutation = { __typename: 'Mutation', completeChapter: { __typename: 'Chapter', id: string, title: string, completed: boolean, completedAt?: string | null, progress?: { __typename: 'Progress', percentage: number } | null } };

export type UpdateProgressMutationVariables = Exact<{
  chapterId: Scalars['ID']['input'];
  percentage: Scalars['Float']['input'];
  timeSpent?: InputMaybe<Scalars['Int']['input']>;
}>;


export type UpdateProgressMutation = { __typename: 'Mutation', updateProgress: { __typename: 'Progress', id: string, chapterId: string, percentage: number, timeSpent: number, lastAccessed: string } };

export type CreateBookmarkMutationVariables = Exact<{
  input: BookmarkInput;
}>;


export type CreateBookmarkMutation = { __typename: 'Mutation', createBookmark: { __typename: 'Bookmark', id: string, chapterId: string, sectionId: string, note?: string | null, createdAt: string } };

export type UpdateBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  note: Scalars['String']['input'];
}>;


export type UpdateBookmarkMutation = { __typename: 'Mutation', updateBookmark: { __typename: 'Bookmark', id: string, note?: string | null } };

export type DeleteBookmarkMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteBookmarkMutation = { __typename: 'Mutation', deleteBookmark: boolean };

export type CompleteMultipleChaptersMutationVariables = Exact<{
  ids: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type CompleteMultipleChaptersMutation = { __typename: 'Mutation', completeMultipleChapters: Array<{ __typename: 'Chapter', id: string, title: string, completed: boolean, completedAt?: string | null }> };

export type GetChaptersQueryVariables = Exact<{
  category?: InputMaybe<ChapterCategory>;
  completed?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type GetChaptersQuery = { __typename: 'Query', chapters: Array<{ __typename: 'Chapter', id: string, title: string, description?: string | null, category: ChapterCategory, completed: boolean, completedAt?: string | null, hasDemo: boolean }> };

export type GetChapterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetChapterQuery = { __typename: 'Query', chapter?: { __typename: 'Chapter', id: string, title: string, description?: string | null, category: ChapterCategory, completed: boolean, completedAt?: string | null, hasDemo: boolean, sections: Array<{ __typename: 'Section', id: string, title: string, content: string, codeSnippets: Array<{ __typename: 'CodeSnippet', id: string, language: CodeLanguage, code: string, title: string, description?: string | null }> }>, progress?: { __typename: 'Progress', id: string, percentage: number, timeSpent: number, lastAccessed: string } | null, bookmarks: Array<{ __typename: 'Bookmark', id: string, sectionId: string, note?: string | null, createdAt: string }> } | null };

export type SearchChaptersQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchChaptersQuery = { __typename: 'Query', searchChapters: Array<{ __typename: 'Chapter', id: string, title: string, description?: string | null, category: ChapterCategory, completed: boolean }> };

export type PaginatedChaptersQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type PaginatedChaptersQuery = { __typename: 'Query', paginatedChapters: { __typename: 'ChapterConnection', totalCount: number, edges: Array<{ __typename: 'ChapterEdge', cursor: string, node: { __typename: 'Chapter', id: string, title: string, category: ChapterCategory, completed: boolean } }>, pageInfo: { __typename: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type OnChapterCompletedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnChapterCompletedSubscription = { __typename: 'Subscription', chapterCompleted: { __typename: 'Chapter', id: string, title: string, completed: boolean, completedAt?: string | null } };

export type OnProgressUpdatedSubscriptionVariables = Exact<{
  chapterId: Scalars['ID']['input'];
}>;


export type OnProgressUpdatedSubscription = { __typename: 'Subscription', progressUpdated: { __typename: 'Progress', id: string, chapterId: string, percentage: number, timeSpent: number, lastAccessed: string } };

export type OnAllProgressUpdatesSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnAllProgressUpdatesSubscription = { __typename: 'Subscription', allProgressUpdates: { __typename: 'Progress', id: string, chapterId: string, percentage: number, timeSpent: number, lastAccessed: string } };

export const ChapterBasicFieldsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChapterBasicFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"hasDemo"}}]}}]} as unknown as DocumentNode;
export const ChapterWithProgressFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChapterWithProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChapterBasicFields"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"lastAccessed"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChapterBasicFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"hasDemo"}}]}}]} as unknown as DocumentNode;
export const ChapterFullDetailsFragment = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChapterFullDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChapterWithProgress"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"codeSnippets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChapterBasicFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"hasDemo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ChapterWithProgress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Chapter"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ChapterBasicFields"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"lastAccessed"}}]}}]}}]} as unknown as DocumentNode;
export const CompleteChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeChapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"percentage"}}]}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class CompleteChapterGQL extends Apollo.Mutation<CompleteChapterMutation, CompleteChapterMutationVariables> {
    override document = CompleteChapterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateProgressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateProgress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"percentage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeSpent"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateProgress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}}},{"kind":"Argument","name":{"kind":"Name","value":"percentage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"percentage"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeSpent"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeSpent"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterId"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"lastAccessed"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateProgressGQL extends Apollo.Mutation<UpdateProgressMutation, UpdateProgressMutationVariables> {
    override document = UpdateProgressDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarkInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterId"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBookmarkGQL extends Apollo.Mutation<CreateBookmarkMutation, CreateBookmarkMutationVariables> {
    override document = CreateBookmarkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"note"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"note"},"value":{"kind":"Variable","name":{"kind":"Name","value":"note"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"note"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBookmarkGQL extends Apollo.Mutation<UpdateBookmarkMutation, UpdateBookmarkMutationVariables> {
    override document = UpdateBookmarkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteBookmark"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteBookmarkGQL extends Apollo.Mutation<DeleteBookmarkMutation, DeleteBookmarkMutationVariables> {
    override document = DeleteBookmarkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CompleteMultipleChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompleteMultipleChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completeMultipleChapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class CompleteMultipleChaptersGQL extends Apollo.Mutation<CompleteMultipleChaptersMutation, CompleteMultipleChaptersMutationVariables> {
    override document = CompleteMultipleChaptersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ChapterCategory"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"completed"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"completed"},"value":{"kind":"Variable","name":{"kind":"Name","value":"completed"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasDemo"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class GetChaptersGQL extends Apollo.Query<GetChaptersQuery, GetChaptersQueryVariables> {
    override document = GetChaptersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetChapterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetChapter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasDemo"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"codeSnippets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"progress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"lastAccessed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sectionId"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class GetChapterGQL extends Apollo.Query<GetChapterQuery, GetChapterQueryVariables> {
    override document = GetChapterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SearchChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchChapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class SearchChaptersGQL extends Apollo.Query<SearchChaptersQuery, SearchChaptersQueryVariables> {
    override document = SearchChaptersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PaginatedChaptersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaginatedChapters"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"paginatedChapters"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class PaginatedChaptersGQL extends Apollo.Query<PaginatedChaptersQuery, PaginatedChaptersQueryVariables> {
    override document = PaginatedChaptersDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OnChapterCompletedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnChapterCompleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"chapterCompleted"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"completed"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class OnChapterCompletedGQL extends Apollo.Subscription<OnChapterCompletedSubscription, OnChapterCompletedSubscriptionVariables> {
    override document = OnChapterCompletedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OnProgressUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnProgressUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"progressUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"chapterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"chapterId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterId"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"lastAccessed"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class OnProgressUpdatedGQL extends Apollo.Subscription<OnProgressUpdatedSubscription, OnProgressUpdatedSubscriptionVariables> {
    override document = OnProgressUpdatedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const OnAllProgressUpdatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnAllProgressUpdates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allProgressUpdates"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"chapterId"}},{"kind":"Field","name":{"kind":"Name","value":"percentage"}},{"kind":"Field","name":{"kind":"Name","value":"timeSpent"}},{"kind":"Field","name":{"kind":"Name","value":"lastAccessed"}}]}}]}}]} as unknown as DocumentNode;

  @Injectable({
    providedIn: 'root'
  })
  export class OnAllProgressUpdatesGQL extends Apollo.Subscription<OnAllProgressUpdatesSubscription, OnAllProgressUpdatesSubscriptionVariables> {
    override document = OnAllProgressUpdatesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  interface WatchQueryOptionsAlone<V extends ApolloCore.OperationVariables> {
    fetchPolicy?: ApolloCore.WatchQueryFetchPolicy;
    errorPolicy?: ApolloCore.ErrorPolicy;
    context?: any;
    pollInterval?: number;
  }

  interface QueryOptionsAlone<V extends ApolloCore.OperationVariables> {
    fetchPolicy?: ApolloCore.FetchPolicy;
    errorPolicy?: ApolloCore.ErrorPolicy;
    context?: any;
  }

  interface MutationOptionsAlone<T, V extends ApolloCore.OperationVariables> {
    fetchPolicy?: ApolloCore.MutationFetchPolicy;
    errorPolicy?: ApolloCore.ErrorPolicy;
    context?: any;
    optimisticResponse?: T;
  }

  interface SubscriptionOptionsAlone<V extends ApolloCore.OperationVariables> {
    fetchPolicy?: ApolloCore.FetchPolicy;
    errorPolicy?: ApolloCore.ErrorPolicy;
    context?: any;
  }

  @Injectable()
  export class GQL {
    constructor(
      private completeChapterGql: CompleteChapterGQL,
      private updateProgressGql: UpdateProgressGQL,
      private createBookmarkGql: CreateBookmarkGQL,
      private updateBookmarkGql: UpdateBookmarkGQL,
      private deleteBookmarkGql: DeleteBookmarkGQL,
      private completeMultipleChaptersGql: CompleteMultipleChaptersGQL,
      private getChaptersGql: GetChaptersGQL,
      private getChapterGql: GetChapterGQL,
      private searchChaptersGql: SearchChaptersGQL,
      private paginatedChaptersGql: PaginatedChaptersGQL,
      private onChapterCompletedGql: OnChapterCompletedGQL,
      private onProgressUpdatedGql: OnProgressUpdatedGQL,
      private onAllProgressUpdatesGql: OnAllProgressUpdatesGQL
    ) {}
      
    completeChapter(variables: CompleteChapterMutationVariables, options?: MutationOptionsAlone<CompleteChapterMutation, CompleteChapterMutationVariables>) {
      return this.completeChapterGql.mutate({ ...options, variables })
    }

    updateProgress(variables: UpdateProgressMutationVariables, options?: MutationOptionsAlone<UpdateProgressMutation, UpdateProgressMutationVariables>) {
      return this.updateProgressGql.mutate({ ...options, variables })
    }

    createBookmark(variables: CreateBookmarkMutationVariables, options?: MutationOptionsAlone<CreateBookmarkMutation, CreateBookmarkMutationVariables>) {
      return this.createBookmarkGql.mutate({ ...options, variables })
    }

    updateBookmark(variables: UpdateBookmarkMutationVariables, options?: MutationOptionsAlone<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>) {
      return this.updateBookmarkGql.mutate({ ...options, variables })
    }
    
    deleteBookmark(variables: DeleteBookmarkMutationVariables, options?: MutationOptionsAlone<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>) {
      return this.deleteBookmarkGql.mutate({ ...options, variables })
    }

    completeMultipleChapters(variables: CompleteMultipleChaptersMutationVariables, options?: MutationOptionsAlone<CompleteMultipleChaptersMutation, CompleteMultipleChaptersMutationVariables>) {
      return this.completeMultipleChaptersGql.mutate({ ...options, variables })
    }

    getChapters(variables?: GetChaptersQueryVariables, options?: QueryOptionsAlone<GetChaptersQueryVariables>) {
      return this.getChaptersGql.fetch({ ...options, variables })
    }

    getChaptersWatch(variables?: GetChaptersQueryVariables, options?: WatchQueryOptionsAlone<GetChaptersQueryVariables>) {
      return this.getChaptersGql.watch({ ...options, variables })
    }

    getChapter(variables: GetChapterQueryVariables, options?: QueryOptionsAlone<GetChapterQueryVariables>) {
      return this.getChapterGql.fetch({ ...options, variables })
    }

    getChapterWatch(variables: GetChapterQueryVariables, options?: WatchQueryOptionsAlone<GetChapterQueryVariables>) {
      return this.getChapterGql.watch({ ...options, variables })
    }
    
    searchChapters(variables: SearchChaptersQueryVariables, options?: QueryOptionsAlone<SearchChaptersQueryVariables>) {
      return this.searchChaptersGql.fetch({ ...options, variables })
    }

    searchChaptersWatch(variables: SearchChaptersQueryVariables, options?: WatchQueryOptionsAlone<SearchChaptersQueryVariables>) {
      return this.searchChaptersGql.watch({ ...options, variables })
    }

    paginatedChapters(variables: PaginatedChaptersQueryVariables, options?: QueryOptionsAlone<PaginatedChaptersQueryVariables>) {
      return this.paginatedChaptersGql.fetch({ ...options, variables })
    }

    paginatedChaptersWatch(variables: PaginatedChaptersQueryVariables, options?: WatchQueryOptionsAlone<PaginatedChaptersQueryVariables>) {
      return this.paginatedChaptersGql.watch({ ...options, variables })
    }

    onChapterCompleted(variables?: OnChapterCompletedSubscriptionVariables, options?: SubscriptionOptionsAlone<OnChapterCompletedSubscriptionVariables>) {
      return this.onChapterCompletedGql.subscribe({ ...options, variables })
    }

    onProgressUpdated(variables: OnProgressUpdatedSubscriptionVariables, options?: SubscriptionOptionsAlone<OnProgressUpdatedSubscriptionVariables>) {
      return this.onProgressUpdatedGql.subscribe({ ...options, variables })
    }

    onAllProgressUpdates(variables?: OnAllProgressUpdatesSubscriptionVariables, options?: SubscriptionOptionsAlone<OnAllProgressUpdatesSubscriptionVariables>) {
      return this.onAllProgressUpdatesGql.subscribe({ ...options, variables })
    }
  }