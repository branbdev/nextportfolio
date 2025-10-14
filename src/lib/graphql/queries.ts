import { gql } from 'graphql-tag';

// Blog post queries
export const GET_ALL_BLOG_POSTS = gql`
  query GetAllBlogPosts($limit: Int, $offset: Int) {
    blogPosts(limit: $limit, offset: $offset) {
      slug
      title
      excerpt
      date
      author
      tags
      coverImage
    }
    totalBlogPosts
  }
`;

export const GET_BLOG_POST_BY_SLUG = gql`
  query GetBlogPostBySlug($slug: String!) {
    blogPost(slug: $slug) {
      slug
      content
      frontMatter {
        title
        date
        excerpt
        author
        tags
        coverImage
      }
    }
  }
`;

export const GET_LATEST_BLOG_POSTS = gql`
  query GetLatestBlogPosts($count: Int) {
    latestBlogPosts(count: $count) {
      slug
      title
      excerpt
      date
      author
      tags
      coverImage
    }
  }
`;

// Portfolio queries
export const GET_ALL_PORTFOLIO_ITEMS = gql`
  query GetAllPortfolioItems {
    portfolioItems {
      id
      title
      tags
      image
      description
      liveUrl
      codeUrl
    }
  }
`;

export const GET_PORTFOLIO_ITEM_BY_ID = gql`
  query GetPortfolioItemById($id: Int!) {
    portfolioItem(id: $id) {
      id
      title
      tags
      image
      description
      liveUrl
      codeUrl
    }
  }
`;

// Tag related queries
export const GET_ALL_TAGS = gql`
  query GetAllTags {
    tags
  }
`;

export const GET_CONTENT_BY_TAG = gql`
  query GetContentByTag($tag: String!) {
    contentByTag(tag: $tag) {
      blogPosts {
        slug
        title
        excerpt
        date
        author
        tags
      }
      portfolioItems {
        id
        title
        tags
        image
        description
        liveUrl
        codeUrl
      }
    }
  }
`;

// Related content query
export const GET_RELATED_CONTENT = gql`
  query GetRelatedContent($tags: [String!]!, $currentSlug: String) {
    relatedContent(tags: $tags, currentSlug: $currentSlug) {
      blogPosts {
        slug
        title
        excerpt
        date
        author
        tags
      }
      portfolioItems {
        id
        title
        tags
        image
        description
        liveUrl
        codeUrl
      }
    }
  }
`;
