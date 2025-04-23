import { useQuery } from '@apollo/client';
import './style-sessions.css';
import { Link, useParams } from 'react-router-dom';
import { SpeakerByIdQuery, SpeakerByIdQueryVariables, SpeakersQuery } from '../../gql/graphql';
import { graphql } from '../../gql';

const SPEAKERS = graphql(`
  query speakers {
    speakers {
      id
      bio
      name
      sessions {
        id
        title
      }
    }
  }
`);

const SPEAKER_BY_ID = graphql(`
  query speakerById($id: ID!) {
    speakerById(id: $id) {
      id
      bio
      name
      sessions {
        id
        title
      }
    }
  }
`);

const SpeakerList = () => {
  const { loading, error, data } = useQuery(SPEAKERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data?.speakers?.map((speaker) => {
    if (!speaker) return null;

    const { id, name, bio, sessions } = speaker;
    return (
      <div key={id} className="col-xs-12 col-sm-6 col-md-6" style={{ padding: 5 }}>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">{name}</h3>
          </div>
          <div className="panel-body">
            <h5>{bio}</h5>
          </div>
          <div className="panel-footer">
            {sessions?.map((session) => {
              if (!session) return null;

              return (
                <span key={session.id} style={{ padding: 2 }}>
                  <Link
                    className="btn btn-default btn-lg"
                    to={`/conference/sessions/${session.id}`}
                  >
                    View "{session.title}"
                  </Link>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    );
  });
};

const SpeakerDetails = () => {
  const { speaker_id } = useParams<{ speaker_id: string }>();
  const { loading, error, data } = useQuery(SPEAKER_BY_ID, {
    variables: { id: speaker_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const speaker = data?.speakerById;
  if (!speaker) {
    return <div>No speaker.</div>;
  }

  const { id, name, bio, sessions } = speaker;

  return (
    <div key={id} className="col-xs-12" style={{ padding: 5 }}>
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{name}</h3>
        </div>
        <div className="panel-body">
          <h5>{bio}</h5>
        </div>
        <div className="panel-footer">
          {sessions?.map((session) => {
            if (!session) return null;

            return (
              <span key={session.id} style={{ padding: 5 }}>
                <Link className="btn btn-default btn-lg" to={`/conference/sessions/${session.id}`}>
                  View "{session.title}"
                </Link>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export function Speaker() {
  return (
    <>
      <div className="container">
        <div className="row">
          <SpeakerDetails />
        </div>
      </div>
    </>
  );
}

export function Speakers() {
  return (
    <>
      <div className="container">
        <div className="row">
          <SpeakerList />
        </div>
      </div>
    </>
  );
}
