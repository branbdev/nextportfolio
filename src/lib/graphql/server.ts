import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getLatestBlogPosts,
  findRelatedContent,
} from '../mdx';
import { portfolioData } from '../../components/portfolioData';
import { extractTags, filterByTag } from '../taxonomies';

// GraphQL Type Definitions
const typeDefs = gql`
  type BlogPost {
    slug: String!
    title: String!
    excerpt: String!
    date: String!
    author: String!
    tags: [String!]!
  }

  type FrontMatter {
    title: String!
    date: String!
    excerpt: String!
    author: String!
    tags: [String!]!
    coverImage: String
  }

  type FullBlogPost {
    slug: String!
    content: String!
    frontMatter: FrontMatter!
  }

  type PortfolioItem {
    id: Int!
    title: String!
    tags: [String!]!
    image: String!
    description: String!
    liveUrl: String!
    codeUrl: String!
  }

  type ContentByTag {
    blogPosts: [BlogPost!]!
    portfolioItems: [PortfolioItem!]!
  }

  type RelatedContent {
    blogPosts: [BlogPost!]!
    portfolioItems: [PortfolioItem!]!
  }

  type Query {
    blogPosts(limit: Int, offset: Int): [BlogPost!]!
    totalBlogPosts: Int!
    blogPost(slug: String!): FullBlogPost
    latestBlogPosts(count: Int): [BlogPost!]!

    portfolioItems(limit: Int, offset: Int): [PortfolioItem!]!
    totalPortfolioItems: Int!
    portfolioItem(id: Int!): PortfolioItem

    tags: [String!]!
    contentByTag(tag: String!): ContentByTag!

    relatedContent(tags: [String!]!, currentSlug: String): RelatedContent!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    // Blog post resolvers
    blogPosts: (
      _: any,
      { limit, offset }: { limit?: number; offset?: number }
    ) => {
      const allPosts = getAllBlogPosts();
      if (limit !== undefined && offset !== undefined) {
        return allPosts.slice(offset, offset + limit);
      }
      return allPosts;
    },
    totalBlogPosts: () => getAllBlogPosts().length,
    blogPost: (_: any, { slug }: { slug: string }) => getBlogPostBySlug(slug),
    latestBlogPosts: (_: any, { count }: { count?: number }) =>
      getLatestBlogPosts(count),

    // Portfolio resolvers
    portfolioItems: (
      _: any,
      { limit, offset }: { limit?: number; offset?: number }
    ) => {
      if (limit !== undefined && offset !== undefined) {
        return portfolioData.slice(offset, offset + limit);
      }
      return portfolioData;
    },
    totalPortfolioItems: () => portfolioData.length,
    portfolioItem: (_: any, { id }: { id: number }) =>
      portfolioData.find((item) => item.id === id) || null,

    // Tag related resolvers
    tags: () => {
      const blogPosts = getAllBlogPosts();
      return extractTags([...blogPosts, ...portfolioData]);
    },
    contentByTag: (_: any, { tag }: { tag: string }) => {
      const blogPosts = filterByTag(getAllBlogPosts(), tag);
      const portfolioItems = filterByTag(portfolioData, tag);
      return { blogPosts, portfolioItems };
    },

    // Related content resolver
    relatedContent: (
      _: any,
      { tags, currentSlug }: { tags: string[]; currentSlug?: string }
    ) => {
      const { blogPosts, projects: portfolioItems } = findRelatedContent(
        tags,
        currentSlug || ''
      );
      return { blogPosts, portfolioItems };
    },
  },
};

// Create Apollo Server
export const createApolloServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};
