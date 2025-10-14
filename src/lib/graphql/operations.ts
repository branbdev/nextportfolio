import { gql } from 'graphql-tag';

export const GET_TECHNOLOGY_BY_SLUG = gql`
  query TechnologyBySlug($slug: ID!) {
    technology(slug: $slug) {
      slug
      name
      logo
      relatedPosts {
        slug
        title
        summary
        publishedAt
        technologies { slug name }
      }
      relatedProjects {
        slug
        name
        description
        repositoryUrl
        liveUrl
        technologies { slug name }
      }
    }
  }
`;

export const GET_ALL_TECHNOLOGIES = gql`
  query AllTechnologies {
    technologies { slug name logo }
  }
`;

export const GET_RELATED_BY_TECHNOLOGIES = gql`
  query RelatedByTechnologies($technologySlugs: [ID!]!, $excludeSlug: ID, $type: String) {
    relatedByTechnologies(technologySlugs: $technologySlugs, excludeSlug: $excludeSlug, type: $type) {
      posts { slug title summary publishedAt technologies { slug name } }
      projects { slug name description repositoryUrl liveUrl technologies { slug name } }
    }
  }
`;
