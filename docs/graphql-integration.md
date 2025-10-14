# GraphQL Integration with Next.js Blog

This document outlines the GraphQL implementation for our Next.js blog and portfolio project.

## Architecture

We've implemented a GraphQL API using Apollo Server to provide a flexible data layer for our blog and portfolio components. This allows for more efficient data fetching and reduces over-fetching of data.

### Key Components

1. **Apollo Server**: Set up as a Next.js API route (`/api/graphql`)
2. **Apollo Client**: Configured for both server-side and client-side data fetching
   - **Update**: Now using Apollo Client 4.0.7 with adjusted imports for compatibility
3. **GraphQL Schemas**: Define the structure of our data
4. **Resolvers**: Connect GraphQL queries to our data sources
5. **Fallback API Routes**: Added direct API endpoints as alternatives to GraphQL

## GraphQL Schema

Our GraphQL schema includes:

- Blog posts with title, excerpt, date, author, tags, and content
- Portfolio items with title, description, technologies, links
- Tags for both blog posts and portfolio items
- Cross-references between blog posts and portfolio items

## Usage in Components

### LatestArticles Component

The `LatestArticles` component now uses a direct API call instead of Apollo Client:

```tsx
// Fetch data on component mount
useEffect(() => {
  const fetchArticles = async () => {
    try {
      // Direct API call instead of GraphQL
      const response = await fetch('/api/blog-posts?limit=3');
      const data = await response.json();

      if (data.success && data.posts && Array.isArray(data.posts)) {
        setArticles(data.posts);
      } else {
        // Fallback to hardcoded data
        setArticles([...fallbackArticleData]);
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setArticles([...fallbackArticleData]);
    } finally {
      setLoading(false);
    }
  };

  fetchArticles();
}, []);
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

## Direct API Endpoints

We've implemented direct API endpoints that serve as alternatives to GraphQL:

```typescript
// Example from /pages/api/blog-posts.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get all blog posts (with optional limit)
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const allPosts = getAllBlogPosts();
    const posts = limit ? allPosts.slice(0, limit) : allPosts;

    return res.status(200).json({
      success: true,
      posts,
      count: posts.length,
    });
  } catch (error) {
    console.error('Error in blog-posts API:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
```

## Debugging Tools

We've created several debugging endpoints to help troubleshoot issues:

1. `/api/test-mdx`: Provides comprehensive diagnostics about the MDX content
2. `/api/gql-debug`: Tests GraphQL resolver functions directly

## Apollo Client 4.0 Compatibility

The transition to Apollo Client 4.0 required several changes:

1. Updated import paths:

   - `HttpLink` from `@apollo/client/link/http`
   - `InMemoryCache` from `@apollo/client/cache`
   - React hooks from `@apollo/client/react`

2. Simplified client creation to avoid type errors

3. Fixed GraphQL tag imports with `graphql-tag`

## Future Enhancements

1. Add caching for improved performance
2. Implement pagination for blog listings
3. Add filtering by multiple tags
4. Add sorting options for blog posts and portfolio items
5. Implement proper Apollo error handling when compatibility issues are resolved
6. Add React Error Boundaries around Apollo components

## References

- [Apollo Client 4.0 Documentation](https://www.apollographql.com/docs/react/)
- [Apollo Server 5.0 Documentation](https://www.apollographql.com/docs/apollo-server/)
- [Next.js with Apollo](https://github.com/vercel/next.js/tree/canary/examples/with-apollo)
