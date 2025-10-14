import React from 'react';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { initializeApollo } from '../src/lib/graphql/client';
import GraphQLTest from '../src/components/GraphQLTest';
import { GET_LATEST_BLOG_POSTS } from '../src/lib/graphql/queries';

export default function TestPage() {
  return (
    <>
      <Head>
        <title>GraphQL API Test | Brandon Bowen</title>
        <meta name='description' content='Testing GraphQL API connections' />
        <meta name='robots' content='noindex' />
      </Head>

      <GraphQLTest />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  try {
    // Pre-populate cache for SSG
    await apolloClient.query({
      query: GET_LATEST_BLOG_POSTS,
      variables: { count: 3 },
    });
  } catch (error) {
    console.error('Error prefetching data:', error);
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 60, // Regenerate page every minute for testing
  };
};
