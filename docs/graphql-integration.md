# GraphQL Integration with Next.js Blog

This document outlines the GraphQL implementation for our Next.js blog and portfolio project.

## Architecture

We've implemented a GraphQL API using Apollo Server to provide a flexible data layer for our blog and portfolio components. This allows for more efficient data fetching and reduces over-fetching of data.

### Key Components

1. **Apollo Server**: Set up as a Next.js API route (`/api/graphql`)
2. **Apollo Client**: Configured for both server-side and client-side data fetching
3. **GraphQL Schemas**: Define the structure of our data
4. **Resolvers**: Connect GraphQL queries to our data sources

## GraphQL Schema

Our GraphQL schema includes:

- Blog posts with title, excerpt, date, author, tags, and content
- Portfolio items with title, description, technologies, links
- Tags for both blog posts and portfolio items
- Cross-references between blog posts and portfolio items

## Usage in Components

### LatestArticles Component

The `LatestArticles` component now uses Apollo Client to fetch the latest blog posts:

```tsx
const { loading, error, data } = useQuery(GET_LATEST_BLOG_POSTS, {
  variables: { count: 3 },
});

const articles = data?.latestBlogPosts || [];
```

### Blog Pages

Blog pages use GraphQL for data fetching with SSG:

```tsx
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const apolloClient = initializeApollo();
  
  // Fetch blog post data
  const { data } = await apolloClient.query({
    query: GET_BLOG_POST_BY_SLUG,
    variables: { slug },
  });
  
  // Additional code...
};
```

## Fallback Mechanism

We've implemented a fallback mechanism that uses direct function calls when GraphQL queries fail:

```tsx
// Example from LatestArticles.tsx
onError: () => {
  setFallbackLoading(true);
  // Fallback to direct function call
  const fetchArticles = async () => {
    try {
      const posts = await Promise.resolve(getLatestBlogPosts(3));
      setFallbackArticles(posts);
    } catch (err) {
      console.error('Error fetching blog posts fallback:', err);
      setFallbackArticles([]);
    } finally {
      setFallbackLoading(false);
    }
  };
  fetchArticles();
}
```

## Testing GraphQL API

A test page has been created at `/test-graphql` to verify the GraphQL API is working correctly.

## Future Enhancements

1. Add caching for improved performance
2. Implement pagination for blog listings
3. Add filtering by multiple tags
4. Add sorting options for blog posts and portfolio items

## References

- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Next.js with Apollo](https://github.com/vercel/next.js/tree/canary/examples/with-apollo)