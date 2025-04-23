import { useQuery } from '@apollo/client';
import { SessionItem } from './SessionItem';
import { graphql } from '../../../gql';

const sessionsQueryDocument = graphql(/* GraphQL */ `
  query SessionsList {
    sessions {
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

export function SessionList() {
  const { loading, error, data } = useQuery(sessionsQueryDocument);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data?.sessions?.map((session) => {
    if (!session) return null;

    const favorite =
      data.user?.favorites?.map((favorite) => favorite.id).includes(session.id) ?? false;

    return <SessionItem key={session.id} session={session} favorite={favorite} />;
  });
}
