export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type ChangePasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  body: Scalars['String'];
};

export type CreateNotecardInput = {
  title: Scalars['String'];
  originalText: Scalars['String'];
  paraphrasedText: Scalars['String'];
  sourceId?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
};

export type CreateProjectInput = {
  name: Scalars['String'];
  description: Scalars['String'];
};

export type CreateSourceInput = {
  url?: Maybe<Scalars['String']>;
  citation: Scalars['String'];
  mediaType: Media;
};


export type LoginInput = {
  credentials: Scalars['String'];
  password: Scalars['String'];
};

export enum Media {
  Website = 'Website',
  Book = 'Book',
  Journal = 'Journal',
  Newspaper = 'Newspaper',
  Film = 'Film',
  Video = 'Video',
  Blog = 'Blog',
  Image = 'Image',
  Interview = 'Interview',
  Lecture = 'Lecture',
  Letter = 'Letter',
  Magazine = 'Magazine',
  Music = 'Music',
  Report = 'Report',
  Tv = 'TV'
}

export type ModelEntity = {
  __typename?: 'ModelEntity';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  login: User;
  register: User;
  createNotecard: Notecard;
  updateNotecard: Notecard;
  deleteNotecard: Scalars['Boolean'];
  createProject: Project;
  updateProject: Project;
  deleteProject: Scalars['Boolean'];
  createSource: Source;
  updateSource: Source;
  deleteSource: Scalars['Boolean'];
  addComment: Source;
  editComment: Source;
  deleteComment: Scalars['Boolean'];
  createTag: Tag;
  updateTag: Tag;
  deleteTag: Scalars['Boolean'];
};


export type MutationChangePasswordArgs = {
  input: ChangePasswordInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationCreateNotecardArgs = {
  input: CreateNotecardInput;
  projectId: Scalars['String'];
};


export type MutationUpdateNotecardArgs = {
  input: UpdateNotecardInput;
  notecardId: Scalars['String'];
};


export type MutationDeleteNotecardArgs = {
  notecardId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationUpdateProjectArgs = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  projectId: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationCreateSourceArgs = {
  input: CreateSourceInput;
  projectId: Scalars['String'];
};


export type MutationUpdateSourceArgs = {
  input: UpdateSourceInput;
  sourceId: Scalars['String'];
};


export type MutationDeleteSourceArgs = {
  sourceId: Scalars['String'];
};


export type MutationAddCommentArgs = {
  comment: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationEditCommentArgs = {
  updatedComment: Scalars['String'];
  commentId: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
  sourceId: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
  projectId: Scalars['String'];
};


export type MutationUpdateTagArgs = {
  name?: Maybe<Scalars['String']>;
  tagId: Scalars['String'];
};


export type MutationDeleteTagArgs = {
  tagId: Scalars['String'];
};

export type Notecard = {
  __typename?: 'Notecard';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title: Scalars['String'];
  originalText: Scalars['String'];
  paraphrasedText: Scalars['String'];
  remarks?: Maybe<Scalars['String']>;
  source?: Maybe<Source>;
  project: Project;
  tag?: Maybe<Tag>;
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
  user: User;
  sources: Array<Source>;
  notecards: Array<Notecard>;
  tags: Array<Tag>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  notecard: Notecard;
  notecards: Array<Notecard>;
  project: Project;
  projects: Array<Project>;
  source: Source;
  sources: Array<Source>;
  tag: Tag;
  tags: Array<Tag>;
};


export type QueryNotecardArgs = {
  notecardId: Scalars['String'];
};


export type QueryNotecardsArgs = {
  projectId: Scalars['String'];
};


export type QueryProjectArgs = {
  projectId: Scalars['String'];
};


export type QuerySourceArgs = {
  sourceId: Scalars['String'];
};


export type QuerySourcesArgs = {
  projectId: Scalars['String'];
};


export type QueryTagArgs = {
  tagId: Scalars['String'];
};


export type QueryTagsArgs = {
  projectId: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Source = {
  __typename?: 'Source';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
  citation: Scalars['String'];
  comments: Array<Comment>;
  mediaType: Media;
  project: Project;
  notecards?: Maybe<Array<Notecard>>;
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  notecards?: Maybe<Array<Notecard>>;
  project: Project;
};

export type UpdateNotecardInput = {
  title?: Maybe<Scalars['String']>;
  originalText?: Maybe<Scalars['String']>;
  paraphrasedText?: Maybe<Scalars['String']>;
  sourceId?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
};

export type UpdateSourceInput = {
  url?: Maybe<Scalars['String']>;
  citation?: Maybe<Scalars['String']>;
  mediaType?: Maybe<Media>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  projects: Array<Project>;
};
