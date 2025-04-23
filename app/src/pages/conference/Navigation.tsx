import { Link, useResolvedPath } from 'react-router-dom';

function NavigationLink(props: { to: string; label: string }) {
  return (
    <Link
      style={{
        fontSize: 56,
        border: 'solid 1px white',
        borderRadius: 20,
        margin: 20,
        padding: 20,
        textAlign: 'center',
        backgroundColor: '#0D1424',
        textTransform: 'capitalize',
      }}
      to={props.to}
    >
      {props.label.toLowerCase()}
    </Link>
  );
}

export function Navigation() {
  const url = useResolvedPath('').pathname;

  return (
    <section className="banner">
      <img src="images/banner3.png" alt="" />
      <div className="col-md-12" style={{ position: 'absolute', top: 50 }}>
        <div className="container jumboContainer">
          <div
            className="col-md-8 middle"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <NavigationLink to={`speakers`} label="View Speakers" />
            <NavigationLink to={`sessions`} label="View sessions" />
            <NavigationLink to={`about`} label="About us" />
          </div>
        </div>
      </div>
    </section>
  );
}
