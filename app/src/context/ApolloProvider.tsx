import React from 'react';
import {
  ApolloProvider as Provider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useAuthContext } from './AuthProvider';

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, authInfo } = useAuthContext();

  const token = isAuthenticated ? authInfo.token : undefined;
  const [client, setClient] = React.useState<ApolloClient<NormalizedCacheObject> | undefined>(
    undefined
  );

  React.useEffect(() => {
    const client = new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          User: {
            fields: {
              favorites: {
                merge(_ignored, incoming) {
                  return incoming;
                },
              },
            },
          },
        },
      }),
      link: new HttpLink({
        uri: '/graphql',
        headers: token ? { authorization: token } : undefined,
      }),
      credentials: 'same-origin',
    });
    setClient(client);
  }, [isAuthenticated]);

  return client ? <Provider client={client}>{children}</Provider> : null;
}
