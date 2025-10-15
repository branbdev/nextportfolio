// Shared TypeScript types for content frontmatter and domain models

export type Slug = string;

// Technology content (from /content/technologies/*.mdx)
export interface TechnologyFrontmatter {
  name: string;
  logo?: string; // path or URL to logo image
}

export interface Technology {
  slug: Slug;
  name: string;
  logo?: string;
}

// Post content (from /content/posts/*.mdx)
export interface PostFrontmatter {
  title: string;
  publishedAt: string; // ISO date
  summary: string;
  technologies: Slug[]; // technology slugs
}

export interface Post {
  slug: Slug;
  title: string;
  publishedAt: string;
  summary: string;
  technologySlugs: Slug[];
  content?: string; // raw MDX content if needed
}

// Project content (from /content/projects/*.mdx)
export interface ProjectFrontmatter {
  name: string;
  description: string;
  repositoryUrl?: string;
  liveUrl?: string;
  technologies: Slug[];
  image?: string;
}

export interface Project {
  slug: Slug;
  name: string;
  description: string;
  repositoryUrl?: string;
  liveUrl?: string;
  technologySlugs: Slug[];
  image?: string;
  content?: string;
}
