import { api } from './baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession?: Maybe<Session>;
  markFeatured?: Maybe<Speaker>;
  signIn: AuthPayload;
  signOut: SignOutPayload;
  signUp: AuthPayload;
  toggleFavoriteSession?: Maybe<User>;
  userInfo: UserInfoPayload;
};


export type MutationCreateSessionArgs = {
  session: SessionInput;
};


export type MutationMarkFeaturedArgs = {
  featured: Scalars['Boolean']['input'];
  speakerId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  credentials: SignIn;
};


export type MutationSignUpArgs = {
  credentials: SignUp;
};


export type MutationToggleFavoriteSessionArgs = {
  sessionId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  sessionById?: Maybe<Session>;
  sessions: Array<Session>;
  speakerById?: Maybe<Speaker>;
  speakers: Array<Speaker>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QuerySessionByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySessionsArgs = {
  day?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['String']['input']>;
  favorite?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  room?: InputMaybe<Scalars['String']['input']>;
  startsAt?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  track?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySpeakerByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Session = {
  __typename?: 'Session';
  day?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endsAt?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['String']['output']>;
  room?: Maybe<Scalars['String']['output']>;
  speakers: Array<Speaker>;
  startsAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** @deprecated Too many sessions do not fit into a single track, we will be migrating to a tags based system in the future... */
  track?: Maybe<Scalars['String']['output']>;
};

export type SessionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type SignIn = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  user?: Maybe<User>;
};

export type SignUp = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Speaker = {
  __typename?: 'Speaker';
  bio?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sessions?: Maybe<Array<Maybe<Session>>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  favorites?: Maybe<Array<Session>>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Role;
  speaker?: Maybe<Speaker>;
};

export type UserInfoPayload = {
  __typename?: 'UserInfoPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CreateSessionMutationVariables = Exact<{
  session: SessionInput;
}>;


export type CreateSessionMutation = { __typename?: 'Mutation', createSession?: { __typename?: 'Session', id: string, title: string, description?: string | null, format?: string | null, level?: string | null } | null };

export type FavoriteSessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type FavoriteSessionsQuery = { __typename?: 'Query', me?: { __typename?: 'User', favorites?: Array<{ __typename?: 'Session', id: string, title: string, description?: string | null, format?: string | null, level?: string | null }> | null } | null };

export type MarkSessionAsFavoriteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type MarkSessionAsFavoriteMutation = { __typename?: 'Mutation', toggleFavoriteSession?: { __typename?: 'User', id: string, name: string, favorites?: Array<{ __typename?: 'Session', id: string, title: string }> | null } | null };

export type MySessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type MySessionsQuery = { __typename?: 'Query', me?: { __typename?: 'User', name: string, email: string, speaker?: { __typename?: 'Speaker', id: string, name: string, sessions?: Array<{ __typename?: 'Session', id: string, title: string, description?: string | null, format?: string | null, level?: string | null } | null> | null } | null } | null };

export type SessionsQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionsQuery = { __typename?: 'Query', sessions: Array<{ __typename?: 'Session', id: string, title: string, description?: string | null, format?: string | null, level?: string | null }> };

export type SignInMutationVariables = Exact<{
  credentials: SignIn;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'AuthPayload', token?: string | null, user: { __typename?: 'User', id: string, email: string, name: string, role: Role } } };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename?: 'Mutation', signOut: { __typename?: 'SignOutPayload', user?: { __typename?: 'User', id: string, name: string } | null } };

export type SignUpMutationVariables = Exact<{
  credentials: SignUp;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'AuthPayload', token?: string | null, user: { __typename?: 'User', id: string, email: string, name: string, role: Role } } };

export type SpeakersQueryVariables = Exact<{ [key: string]: never; }>;


export type SpeakersQuery = { __typename?: 'Query', speakers: Array<{ __typename?: 'Speaker', id: string, name: string, bio?: string | null }> };

export type UserFavoritesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFavoritesQuery = { __typename?: 'Query', me?: { __typename?: 'User', favorites?: Array<{ __typename?: 'Session', id: string }> | null } | null };

export type SessionFragment = { __typename?: 'Session', id: string, title: string, description?: string | null, format?: string | null, level?: string | null };

export const SessionFragmentDoc = `
    fragment Session on Session {
  id
  title
  description
  format
  level
}
    `;
export const CreateSessionDocument = `
    mutation CreateSession($session: SessionInput!) {
  createSession(session: $session) {
    ...Session
  }
}
    ${SessionFragmentDoc}`;
export const FavoriteSessionsDocument = `
    query FavoriteSessions {
  me {
    favorites {
      ...Session
    }
  }
}
    ${SessionFragmentDoc}`;
export const MarkSessionAsFavoriteDocument = `
    mutation MarkSessionAsFavorite($id: ID!) {
  toggleFavoriteSession(sessionId: $id) {
    id
    name
    favorites {
      id
      title
    }
  }
}
    `;
export const MySessionsDocument = `
    query MySessions {
  me {
    name
    email
    speaker {
      id
      name
      sessions {
        ...Session
      }
    }
  }
}
    ${SessionFragmentDoc}`;
export const SessionsDocument = `
    query Sessions {
  sessions {
    ...Session
  }
}
    ${SessionFragmentDoc}`;
export const SignInDocument = `
    mutation SignIn($credentials: SignIn!) {
  signIn(credentials: $credentials) {
    token
    user {
      id
      email
      name
      role
    }
  }
}
    `;
export const SignOutDocument = `
    mutation SignOut {
  signOut {
    user {
      id
      name
    }
  }
}
    `;
export const SignUpDocument = `
    mutation SignUp($credentials: SignUp!) {
  signUp(credentials: $credentials) {
    token
    user {
      id
      email
      name
      role
    }
  }
}
    `;
export const SpeakersDocument = `
    query Speakers {
  speakers {
    id
    name
    bio
  }
}
    `;
export const UserFavoritesDocument = `
    query UserFavorites {
  me {
    favorites {
      id
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    CreateSession: build.mutation<CreateSessionMutation, CreateSessionMutationVariables>({
      query: (variables) => ({ document: CreateSessionDocument, variables })
    }),
    FavoriteSessions: build.query<FavoriteSessionsQuery, FavoriteSessionsQueryVariables | void>({
      query: (variables) => ({ document: FavoriteSessionsDocument, variables })
    }),
    MarkSessionAsFavorite: build.mutation<MarkSessionAsFavoriteMutation, MarkSessionAsFavoriteMutationVariables>({
      query: (variables) => ({ document: MarkSessionAsFavoriteDocument, variables })
    }),
    MySessions: build.query<MySessionsQuery, MySessionsQueryVariables | void>({
      query: (variables) => ({ document: MySessionsDocument, variables })
    }),
    Sessions: build.query<SessionsQuery, SessionsQueryVariables | void>({
      query: (variables) => ({ document: SessionsDocument, variables })
    }),
    SignIn: build.mutation<SignInMutation, SignInMutationVariables>({
      query: (variables) => ({ document: SignInDocument, variables })
    }),
    SignOut: build.mutation<SignOutMutation, SignOutMutationVariables | void>({
      query: (variables) => ({ document: SignOutDocument, variables })
    }),
    SignUp: build.mutation<SignUpMutation, SignUpMutationVariables>({
      query: (variables) => ({ document: SignUpDocument, variables })
    }),
    Speakers: build.query<SpeakersQuery, SpeakersQueryVariables | void>({
      query: (variables) => ({ document: SpeakersDocument, variables })
    }),
    UserFavorites: build.query<UserFavoritesQuery, UserFavoritesQueryVariables | void>({
      query: (variables) => ({ document: UserFavoritesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateSessionMutation, useFavoriteSessionsQuery, useLazyFavoriteSessionsQuery, useMarkSessionAsFavoriteMutation, useMySessionsQuery, useLazyMySessionsQuery, useSessionsQuery, useLazySessionsQuery, useSignInMutation, useSignOutMutation, useSignUpMutation, useSpeakersQuery, useLazySpeakersQuery, useUserFavoritesQuery, useLazyUserFavoritesQuery } = injectedRtkApi;

