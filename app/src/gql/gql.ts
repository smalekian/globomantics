/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation signOutUser {\n    signOut {\n      user {\n        id\n        email\n      }\n    }\n  }\n": types.SignOutUserDocument,
    "\n  query users {\n    users {\n      id\n      email\n      favorites {\n        id\n        title\n      }\n      speaker {\n        id\n        name\n        featured\n      }\n    }\n  }\n": types.UsersDocument,
    "\n  mutation markFeatured($speakerId: ID!, $featured: Boolean!) {\n    markFeatured(speakerId: $speakerId, featured: $featured) {\n      id\n      name\n      featured\n      user {\n        id\n      }\n    }\n  }\n": types.MarkFeaturedDocument,
    "\n  mutation signUpUser($email: String!, $password: String!, $name: String!) {\n    signUp(credentials: { email: $email, password: $password, name: $name }) {\n      user {\n        id\n        email\n        name\n        role\n      }\n    }\n  }\n": types.SignUpUserDocument,
    "\n  mutation signInUser($email: String!, $password: String!) {\n    signIn(credentials: { email: $email, password: $password }) {\n      user {\n        id\n        email\n        role\n      }\n    }\n  }\n": types.SignInUserDocument,
    "\n  query speakers {\n    speakers {\n      id\n      bio\n      name\n      sessions {\n        id\n        title\n      }\n    }\n  }\n": types.SpeakersDocument,
    "\n  query speakerById($id: ID!) {\n    speakerById(id: $id) {\n      id\n      bio\n      name\n      sessions {\n        id\n        title\n      }\n    }\n  }\n": types.SpeakerByIdDocument,
    "\n  mutation createSession($session: SessionInput!) {\n    createSession(session: $session) {\n      id\n      title\n    }\n  }\n": types.CreateSessionDocument,
    "\n  query sessionInfo($id: ID!) {\n    sessionById(id: $id) {\n      id\n      ...SessionInfo\n    }\n    user: me {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n": types.SessionInfoDocument,
    "\n  mutation ToggleFavorite($sessionId: ID!) {\n    toggleFavoriteSession(sessionId: $sessionId) {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n": types.ToggleFavoriteDocument,
    "\n  fragment SessionInfo on Session {\n    id\n    title\n    day\n    room\n    level\n    speakers {\n      id\n      name\n    }\n  }\n": types.SessionInfoFragmentDoc,
    "\n  query SessionsList {\n    sessions {\n      id\n      ...SessionInfo\n    }\n    user: me {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n": types.SessionsListDocument,
    "\n  mutation userInfo {\n    userInfo {\n      user {\n        id\n        email\n        role\n      }\n    }\n  }\n": types.UserInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signOutUser {\n    signOut {\n      user {\n        id\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation signOutUser {\n    signOut {\n      user {\n        id\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query users {\n    users {\n      id\n      email\n      favorites {\n        id\n        title\n      }\n      speaker {\n        id\n        name\n        featured\n      }\n    }\n  }\n"): (typeof documents)["\n  query users {\n    users {\n      id\n      email\n      favorites {\n        id\n        title\n      }\n      speaker {\n        id\n        name\n        featured\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation markFeatured($speakerId: ID!, $featured: Boolean!) {\n    markFeatured(speakerId: $speakerId, featured: $featured) {\n      id\n      name\n      featured\n      user {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation markFeatured($speakerId: ID!, $featured: Boolean!) {\n    markFeatured(speakerId: $speakerId, featured: $featured) {\n      id\n      name\n      featured\n      user {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signUpUser($email: String!, $password: String!, $name: String!) {\n    signUp(credentials: { email: $email, password: $password, name: $name }) {\n      user {\n        id\n        email\n        name\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation signUpUser($email: String!, $password: String!, $name: String!) {\n    signUp(credentials: { email: $email, password: $password, name: $name }) {\n      user {\n        id\n        email\n        name\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation signInUser($email: String!, $password: String!) {\n    signIn(credentials: { email: $email, password: $password }) {\n      user {\n        id\n        email\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation signInUser($email: String!, $password: String!) {\n    signIn(credentials: { email: $email, password: $password }) {\n      user {\n        id\n        email\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query speakers {\n    speakers {\n      id\n      bio\n      name\n      sessions {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query speakers {\n    speakers {\n      id\n      bio\n      name\n      sessions {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query speakerById($id: ID!) {\n    speakerById(id: $id) {\n      id\n      bio\n      name\n      sessions {\n        id\n        title\n      }\n    }\n  }\n"): (typeof documents)["\n  query speakerById($id: ID!) {\n    speakerById(id: $id) {\n      id\n      bio\n      name\n      sessions {\n        id\n        title\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createSession($session: SessionInput!) {\n    createSession(session: $session) {\n      id\n      title\n    }\n  }\n"): (typeof documents)["\n  mutation createSession($session: SessionInput!) {\n    createSession(session: $session) {\n      id\n      title\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query sessionInfo($id: ID!) {\n    sessionById(id: $id) {\n      id\n      ...SessionInfo\n    }\n    user: me {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query sessionInfo($id: ID!) {\n    sessionById(id: $id) {\n      id\n      ...SessionInfo\n    }\n    user: me {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleFavorite($sessionId: ID!) {\n    toggleFavoriteSession(sessionId: $sessionId) {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ToggleFavorite($sessionId: ID!) {\n    toggleFavoriteSession(sessionId: $sessionId) {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment SessionInfo on Session {\n    id\n    title\n    day\n    room\n    level\n    speakers {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  fragment SessionInfo on Session {\n    id\n    title\n    day\n    room\n    level\n    speakers {\n      id\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SessionsList {\n    sessions {\n      id\n      ...SessionInfo\n    }\n    user: me {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query SessionsList {\n    sessions {\n      id\n      ...SessionInfo\n    }\n    user: me {\n      id\n      favorites {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation userInfo {\n    userInfo {\n      user {\n        id\n        email\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation userInfo {\n    userInfo {\n      user {\n        id\n        email\n        role\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;