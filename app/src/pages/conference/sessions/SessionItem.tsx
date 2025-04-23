import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthProvider';
import { FragmentType, graphql, useFragment } from '../../../gql';

const toggleFavoritesMutationDocument = graphql(/* GraphQL */ `
  mutation ToggleFavorite($sessionId: ID!) {
    toggleFavoriteSession(sessionId: $sessionId) {
      id
      favorites {
        id
      }
    }
  }
`);

export const SessionFragment = graphql(/* GraphQL */ `
  fragment SessionInfo on Session {
    id
    title
    day
    room
    level
    speakers {
      id
      name
    }
  }
`);

export function SessionItem(props: {
  session: FragmentType<typeof SessionFragment>;
  favorite: boolean;
}) {
  const session = useFragment(SessionFragment, props.session);
  const favorite = props.favorite;

  const { isAuthenticated } = useAuthContext();
  const [toggle] = useMutation(toggleFavoritesMutationDocument, {
    variables: { sessionId: session.id },
  });

  const markFavorite = async () => {
    await toggle();
  };

  const { id, title, day, room, level, speakers = [] } = session;
  return (
    <div key={id} className="col-xs-12 col-sm-6" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">
          <h5>{`Day: ${day}`}</h5>
          {room ? <h5>{`Room Number: ${room}`}</h5> : null}
          {level ? <h5>{`Level: ${level}`}</h5> : null}
        </div>
        <div className="panel-footer">
          {isAuthenticated && (
            <span style={{ padding: 2 }}>
              <button type="button" className="btn btn-default btn-lg" onClick={markFavorite}>
                <i
                  className={`fa ${favorite ? 'fa-star' : 'fa-star-o'}`}
                  aria-hidden="true"
                  style={{
                    color: favorite ? 'gold' : undefined,
                  }}
                ></i>{' '}
                Favorite
              </button>
            </span>
          )}
          {speakers ? (
            speakers.map((speaker) => {
              if (!speaker) return null;
              return (
                <span key={speaker.id} style={{ padding: 2 }}>
                  <Link
                    className="btn btn-default btn-lg"
                    to={`/conference/speakers/${speaker.id}`}
                  >
                    View {speaker.name}'s Profile
                  </Link>
                </span>
              );
            })
          ) : (
            <div>No speakers found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
