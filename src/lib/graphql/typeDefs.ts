import { gql } from 'graphql-tag';

export const typeDefs = gql`
  scalar DateTime

  type Technology {
    slug: ID!
    name: String!
    logo: String
    relatedPosts: [Post!]!
    relatedProjects: [Project!]!
  }

  type Post {
    slug: ID!
    title: String!
    publishedAt: String!
    summary: String!
    technologies: [Technology!]!
  }

  type Project {
    slug: ID!
    name: String!
    description: String!
    repositoryUrl: String
    liveUrl: String
    technologies: [Technology!]!
  }

  type Query {
    technologies: [Technology!]!
    technology(slug: ID!): Technology

    posts: [Post!]!
    post(slug: ID!): Post

    projects: [Project!]!
    project(slug: ID!): Project

    # For RelatedContent component
    relatedByTechnologies(technologySlugs: [ID!]!, excludeSlug: ID, type: String): RelatedResult!
  }

  type RelatedResult {
    posts: [Post!]!
    projects: [Project!]!
  }
`;
