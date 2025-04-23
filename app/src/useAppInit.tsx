import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useAuthContext } from './context/AuthProvider';
import { graphql } from './gql';

const userInfoMutation = graphql(`
  mutation userInfo {
    userInfo {
      user {
        id
        email
        role
      }
    }
  }
`);

export const useAppInit = () => {
  const [getUserInfo, { loading }] = useMutation(userInfoMutation);
  const { setAuthInfo } = useAuthContext();

  useEffect(() => {
    const handleSession = async () => {
      try {
        const { data } = await getUserInfo();

        const userInfo = data?.userInfo;

        if (!userInfo) return;
        if (!userInfo.user) return;
        if (!userInfo.user.role) return;

        setAuthInfo({ userData: { ...userInfo.user, role: userInfo.user.role } });
      } catch (error) {
        console.log('error', error);
      }
    };

    handleSession();
  }, [setAuthInfo, getUserInfo]);

  return [loading] as const;
};
