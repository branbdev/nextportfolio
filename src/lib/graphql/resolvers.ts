import {
  loadAllPosts,
  loadAllProjects,
  loadAllTechnologies,
  loadPostBySlug,
  loadProjectBySlug,
  loadTechnologyBySlug,
} from '../contentLoader';
import type { Post, Project, Technology } from '../../types/content';

export const resolvers = {
  Query: {
    technologies: () => loadAllTechnologies(),
    technology: (_: unknown, { slug }: { slug: string }) =>
      loadTechnologyBySlug(slug),

    posts: () => loadAllPosts(),
    post: (_: unknown, { slug }: { slug: string }) => loadPostBySlug(slug),

    projects: () => loadAllProjects(),
    project: (_: unknown, { slug }: { slug: string }) =>
      loadProjectBySlug(slug),

    relatedByTechnologies: (
      _: unknown,
      {
        technologySlugs,
        excludeSlug,
        type,
      }: { technologySlugs: string[]; excludeSlug?: string; type?: string }
    ) => {
      const posts = loadAllPosts().filter(
        (p) =>
          p.slug !== excludeSlug &&
          p.technologySlugs.some((t) => technologySlugs.includes(t))
      );
      const projects = loadAllProjects().filter(
        (prj) =>
          prj.slug !== excludeSlug &&
          prj.technologySlugs.some((t) => technologySlugs.includes(t))
      );
      return {
        posts: type && type !== 'post' ? [] : posts,
        projects: type && type !== 'project' ? [] : projects,
      };
    },
  },
  Technology: {
    relatedPosts: (tech: Technology) =>
      loadAllPosts().filter((p) => p.technologySlugs.includes(tech.slug)),
    relatedProjects: (tech: Technology) =>
      loadAllProjects().filter((prj) =>
        prj.technologySlugs.includes(tech.slug)
      ),
  },
  Post: {
    technologies: (post: Post) =>
      loadAllTechnologies().filter((t) =>
        post.technologySlugs.includes(t.slug)
      ),
  },
  Project: {
    technologies: (project: Project) =>
      loadAllTechnologies().filter((t) =>
        project.technologySlugs.includes(t.slug)
      ),
  },
};
