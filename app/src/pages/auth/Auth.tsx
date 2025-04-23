import * as React from 'react';
import { Route, Link, Routes, useNavigate, Navigate } from 'react-router-dom';
import { Form, Formik, Field } from 'formik';
import { useMutation } from '@apollo/client';
import { useAuthContext } from '../../context/AuthProvider';
import { graphql } from '../../gql';

function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <div style={{ width: '100%', maxWidth: 500 }}>{children}</div>
    </div>
  );
}

const AuthForm = ({
  onSubmit,
  children,
  variant = 'sign-up',
}: {
  onSubmit: (values: any) => void;
  children: React.ReactNode;
  variant?: 'sign-in' | 'sign-up';
}) => (
  <Formik initialValues={{ name: '', email: '', password: '' }} onSubmit={onSubmit}>
    <Form className="form-signin">
      {variant === 'sign-up' ? (
        <div className="mb-3" style={{ paddingBottom: 5 }}>
          <div className="mb-3" style={{ paddingBottom: 5 }}>
            <label htmlFor="inputName">Name</label>
            <Field name="name" type="text" id="inputName" className="form-control" required />
          </div>
        </div>
      ) : null}

      <div className="mb-3" style={{ paddingBottom: 5 }}>
        <label htmlFor="inputEmail">Email address</label>
        <Field
          name="email"
          type="email"
          id="inputEmail"
          className="form-control"
          required
          autoFocus
        />
      </div>

      <div className="mb-3" style={{ paddingBottom: 5 }}>
        <label htmlFor="inputPassword">Password</label>
        <Field
          name="password"
          type="password"
          id="inputPassword"
          className="form-control"
          required
        />
      </div>

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        {children}
      </button>
    </Form>
  </Formik>
);

const signUpMutation = graphql(`
  mutation signUpUser($email: String!, $password: String!, $name: String!) {
    signUp(credentials: { email: $email, password: $password, name: $name }) {
      user {
        id
        email
        name
        role
      }
    }
  }
`);

function SignUpForm() {
  const navigate = useNavigate();
  const [signUpUser] = useMutation(signUpMutation);
  const [error, setError] = React.useState('');

  const authContext = useAuthContext();

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      const { data } = await signUpUser({ variables: values });

      const signUp = data?.signUp;

      if (!signUp) return;
      if (!signUp.user) return;

      authContext.setAuthInfo({ userData: signUp.user });
      navigate('/conference');
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        setError(error.message);
      }
    }
  };

  return (
    <FormLayout>
      <span>
        <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        <h6>
          Already have an account? <Link to={`/auth/sign-in`}>Sign In</Link>
        </h6>
      </span>
      <AuthForm onSubmit={handleSubmit}>Sign up</AuthForm>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </FormLayout>
  );
}

const signInMutation = graphql(`
  mutation signInUser($email: String!, $password: String!) {
    signIn(credentials: { email: $email, password: $password }) {
      user {
        id
        email
        role
      }
    }
  }
`);

function SignInForm() {
  const [signInUser] = useMutation(signInMutation);
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const authContext = useAuthContext();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const { data } = await signInUser({ variables: values });

      const signIn = data?.signIn;

      if (!signIn) return;
      if (!signIn.user) return;

      authContext.setAuthInfo({ userData: { ...signIn.user, role: signIn.user.role } });
      navigate('/conference');
    } catch (error) {
      if (error instanceof Error) {
        console.log('error', error);
        setError(error.message);
      }
    }
  };

  return (
    <FormLayout>
      <span>
        <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
        <h6>
          Need an account? <Link to={`/auth/sign-up`}>Sign Up</Link>
        </h6>
      </span>
      <AuthForm onSubmit={handleSubmit} variant="sign-in">
        Sign in
      </AuthForm>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </FormLayout>
  );
}

export function Auth() {
  return (
    <Routes>
      <Route path={`/sign-in`} element={<SignInForm />} />

      <Route path={`/sign-up`} element={<SignUpForm />} />

      <Route path={``} element={<Navigate to={`sign-in`} />} />
    </Routes>
  );
}
