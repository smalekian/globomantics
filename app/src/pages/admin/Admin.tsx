import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
import { graphql } from '../../gql';

const USERS = graphql(`
  query users {
    users {
      id
      email
      favorites {
        id
        title
      }
      speaker {
        id
        name
        featured
      }
    }
  }
`);

const MARK_SPEAKER_FEATURED = graphql(`
  mutation markFeatured($speakerId: ID!, $featured: Boolean!) {
    markFeatured(speakerId: $speakerId, featured: $featured) {
      id
      name
      featured
      user {
        id
      }
    }
  }
`);

const UserList = () => {
  const { loading, error, data } = useQuery(USERS);
  const [markFeatured] = useMutation(MARK_SPEAKER_FEATURED);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) {
    return <p>No data to show.</p>;
  }

  if (!data.users) {
    return <p>No users to show.</p>;
  }

  return data.users.map((user) => {
    if (!user) {
      return null;
    }

    const { id, email, favorites, speaker } = user;

    return (
      <div key={id} className="col-xs-12 col-sm-6 col-md-6" style={{ padding: 5 }}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{email}</h3>
          </div>
          {speaker ? (
            <div className="panel-body">
              <label key={speaker.id}>
                <input
                  type="checkbox"
                  checked={!!speaker.featured}
                  onChange={() => {
                    markFeatured({
                      variables: {
                        speakerId: speaker.id,
                        featured: !speaker.featured,
                      },
                    });
                  }}
                />{' '}
                {speaker.name} Featured Speaker?
              </label>
            </div>
          ) : null}
          <div className="panel-footer">
            {favorites
              ? favorites.map((session) => (
                  <span key={session.id} style={{ padding: 2 }}>
                    <Link
                      className="btn btn-default btn-lg"
                      to={`/conference/sessions/${session.id}`}
                    >
                      View "{session.title}"
                    </Link>
                  </span>
                ))
              : null}
          </div>
        </div>
      </div>
    );
  });
};

export default function Admin() {
  const { isAdmin } = useAuthContext();

  return isAdmin ? (
    <>
      <div className="container">
        <div className="row">
          <UserList />
        </div>
      </div>
    </>
  ) : (
    <div>
      <h1>Not Authorized</h1>
      <p>You are not authorized to view this page.</p>
    </div>
  );
}
