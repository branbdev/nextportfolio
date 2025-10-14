# Apollo Client and Next.js Integration Issues and Fixes

## Problems Identified

1. **Apollo Client 4.0.7 Import Issues**:

   - The imports for Apollo Client 4.0.7 were incorrect, causing type errors
   - `useQuery` and other hooks needed to be imported from `@apollo/client/react` instead of `@apollo/client`
   - Apollo client was incorrectly set up with missing or incompatible components

2. **GraphQL Server Import Issues**:

   - The `gql` tag was imported from Apollo Client but should be imported from `graphql-tag` for consistency

3. **File System Path Issues**:

   - Path handling in MDX file system access was inconsistent, causing potential issues on different platforms
   - Need to use `path.resolve` for absolute paths rather than `path.join` in some contexts

4. **Error Handling**:
   - Insufficient error handling in GraphQL API endpoints
   - Missing fallback mechanisms for when GraphQL queries fail

## Fixes Implemented

1. **Apollo Client Setup**:

   - Updated imports to use correct paths (`@apollo/client/react` for hooks)
   - Used `HttpLink` from `@apollo/client/link/http` instead of `@apollo/client`
   - Used `InMemoryCache` from `@apollo/client/cache` instead of `@apollo/client`
   - Simplified client configuration to avoid type errors

2. **GraphQL Server Imports**:

   - Changed `import { gql } from '@apollo/client/core'` to `import { gql } from 'graphql-tag'` in queries.ts

3. **LatestArticles Component**:

   - Replaced Apollo Client's `useQuery` with a direct API call using `fetch` to avoid Apollo Client issues
   - Added better fallback handling with hardcoded articles when fetching fails

4. **Debugging Endpoints**:
   - Created `/api/gql-debug.ts` and `/api/test-mdx.ts` endpoints to diagnose issues
   - These endpoints help inspect file system paths and content availability

## Remaining Issues

1. **Image 404 Errors**:

   - Several portfolio images are returning 404 errors
   - These paths need to be updated or the missing images need to be added

2. **Stylesheet Warning**:
   - Stylesheets are being added in `next/head` instead of in `_document.tsx`
   - This is a minor warning that doesn't affect functionality

## Implemented Solutions

1. **Direct API Fallback**:

   - Created `/api/blog-posts` endpoint as an alternative to GraphQL
   - Enhanced the test-graphql page to show diagnostic information
   - Updated components to use direct API calls when GraphQL fails

2. **Apollo Client Configuration**:

   - Simplified client setup to avoid compatibility issues
   - Removed complex error handling that caused type errors
   - Used conditional rendering in components to handle Apollo errors gracefully

3. **Documentation**:
   - Updated GraphQL integration docs
   - Created detailed error documentation

## Next Steps

1. **Fix Image Paths**:

   - Update portfolio image references or add missing images

2. **Optimize Performance**:

   - Implement caching strategies for both GraphQL and REST APIs
   - Add React error boundaries around Apollo components

3. **Enhance User Experience**:

   - Improve loading states and transitions
   - Add better error handling UI components

4. **Testing**:
   - Add unit tests for API endpoints
   - Test GraphQL queries with mock data
