import { graphql } from '../../../gql';

export const CREATE_SESSION = graphql(`
  mutation createSession($session: SessionInput!) {
    createSession(session: $session) {
      id
      title
    }
  }
`);
