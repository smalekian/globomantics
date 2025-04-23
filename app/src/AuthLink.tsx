import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthProvider';
import { useMutation } from '@apollo/client';
import { graphql } from './gql';

const signOutMutation = graphql(/* GraphQL */ `
  mutation signOutUser {
    signOut {
      user {
        id
        email
      }
    }
  }
`);

export const AuthLink = ({ children }: { children: React.ReactNode }) => {
  const [signOutUser] = useMutation(signOutMutation);
  const { isAuthenticated, setAuthInfo } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutUser();
    setAuthInfo({ userData: null });
    navigate('/auth/sign-in');
  };

  return isAuthenticated ? (
    <Link onClick={handleSignOut} to="#">
      Sign Out
    </Link>
  ) : (
    <Link to="/auth/sign-in">{children}</Link>
  );
};
