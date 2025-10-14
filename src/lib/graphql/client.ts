import { ApolloClient } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { InMemoryCache } from '@apollo/client/cache';
import { useMemo } from 'react';

// Global instance
let apolloClient: any | undefined;

const createApolloClient = () => {
  // HTTP link for API requests
  const httpLink = new HttpLink({
    uri: '/api/graphql', // GraphQL server endpoint
    credentials: 'same-origin',
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    },
  });
};

export function initializeApollo(
  initialState: Record<string, any> | null = null
) {
  try {
    const _apolloClient = apolloClient ?? createApolloClient();

    // If page has Next.js data fetching methods that use Apollo Client,
    // the initial state gets hydrated here
    if (initialState && typeof initialState === 'object') {
      // Get existing cache, loaded during client side data fetching
      const existingCache = _apolloClient.extract();

      // Restore the cache using the data passed from
      // getStaticProps/getServerSideProps combined with the existing cached data
      _apolloClient.cache.restore({
        ...(existingCache as object),
        ...(initialState as object),
      });
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;

    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
  } catch (error) {
    console.error('Error initializing Apollo client:', error);
    // Return a minimal Apollo client that won't break the app
    return createApolloClient();
  }
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
