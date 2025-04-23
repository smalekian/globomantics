import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { SessionItem } from './SessionItem';
import { graphql } from '../../../gql';

export const SESSION_BY_ID = graphql(`
  query sessionInfo($id: ID!) {
    sessionById(id: $id) {
      id
      ...SessionInfo
    }
    user: me {
      id
      favorites {
        id
      }
    }
  }
`);

export function SessionDetails() {
  const { session_id } = useParams<{ session_id: string }>();
  // const { loading, error, data } = useSessionData(session_id);
  const { loading, error, data } = useQuery(SESSION_BY_ID, {
    variables: { id: session_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data === undefined) {
    return null;
  }

  const session = data.sessionById;

  if (!session) {
    return <div>No session found.</div>;
  }

  const favorites = data.user?.favorites ?? [];
  return (
    <SessionItem
      session={{
        ...session,
      }}
      favorite={favorites.map((favorite) => favorite.id).includes(session.id)}
    />
  );
}
