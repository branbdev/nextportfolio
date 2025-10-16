import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  Post,
  PostFrontmatter,
  Project,
  ProjectFrontmatter,
  Technology,
  TechnologyFrontmatter,
} from '../types/content';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_ROOT, 'posts');
const PROJECTS_DIR = path.join(CONTENT_ROOT, 'projects', '[project-slug]');
const TECHNOLOGIES_DIR = path.join(
  CONTENT_ROOT,
  'technologies',
  '[technology-slug]'
);

function readSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs: string[] = [];

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.mdx')) {
      // Direct MDX files (e.g., technology.mdx)
      slugs.push(entry.name.replace(/\.mdx$/, ''));
    } else if (entry.isDirectory()) {
      // Directory with index.mdx (e.g., post-slug/index.mdx)
      const indexPath = path.join(dir, entry.name, 'index.mdx');
      if (fs.existsSync(indexPath)) {
        slugs.push(entry.name);
      }
    }
  }

  return slugs;
}

function readMdx<TFrontmatter extends object>(dir: string, slug: string) {
  // Try directory structure first (slug/index.mdx)
  const indexPath = path.join(dir, slug, 'index.mdx');
  const directPath = path.join(dir, `${slug}.mdx`);

  const filePath = fs.existsSync(indexPath) ? indexPath : directPath;

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { frontmatter: data as TFrontmatter, content };
}

export function loadAllTechnologies(): Technology[] {
  return readSlugs(TECHNOLOGIES_DIR).map((slug) => {
    const { frontmatter } = readMdx<TechnologyFrontmatter>(
      TECHNOLOGIES_DIR,
      slug
    );
    return {
      slug,
      name: frontmatter.name,
      logo: frontmatter.logo,
    } satisfies Technology;
  });
}

export function loadTechnologyBySlug(slug: string): Technology | null {
  const filePath = path.join(TECHNOLOGIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter } = readMdx<TechnologyFrontmatter>(
    TECHNOLOGIES_DIR,
    slug
  );
  return { slug, name: frontmatter.name, logo: frontmatter.logo };
}

export function loadAllPosts({ includeContent = false } = {}): Post[] {
  return readSlugs(POSTS_DIR).map((slug) => {
    const { frontmatter, content } = readMdx<PostFrontmatter>(POSTS_DIR, slug);
    return {
      slug,
      title: frontmatter.title,
      publishedAt: frontmatter.publishedAt,
      summary: frontmatter.summary,
      technologySlugs: frontmatter.technologies || [],
      content: includeContent ? content : undefined,
    } satisfies Post;
  });
}

export function loadPostBySlug(
  slug: string,
  { includeContent = false } = {}
): Post | null {
  const indexPath = path.join(POSTS_DIR, slug, 'index.mdx');
  const directPath = path.join(POSTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(indexPath) && !fs.existsSync(directPath)) return null;

  const { frontmatter, content } = readMdx<PostFrontmatter>(POSTS_DIR, slug);
  return {
    slug,
    title: frontmatter.title,
    publishedAt: frontmatter.publishedAt,
    summary: frontmatter.summary,
    technologySlugs: frontmatter.technologies || [],
    content: includeContent ? content : undefined,
  };
}

export function loadAllProjects({ includeContent = false } = {}): Project[] {
  return readSlugs(PROJECTS_DIR).map((slug) => {
    const { frontmatter, content } = readMdx<ProjectFrontmatter>(
      PROJECTS_DIR,
      slug
    );
    return {
      slug,
      name: frontmatter.name,
      description: frontmatter.description,
      repositoryUrl: frontmatter.repositoryUrl,
      liveUrl: frontmatter.liveUrl,
      technologySlugs: frontmatter.technologies || [],
      image: frontmatter.image,
      content: includeContent ? content : undefined,
    } satisfies Project;
  });
}

export function loadProjectBySlug(
  slug: string,
  { includeContent = false } = {}
): Project | null {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const { frontmatter, content } = readMdx<ProjectFrontmatter>(
    PROJECTS_DIR,
    slug
  );
  return {
    slug,
    name: frontmatter.name,
    description: frontmatter.description,
    repositoryUrl: frontmatter.repositoryUrl,
    liveUrl: frontmatter.liveUrl,
    technologySlugs: frontmatter.technologies || [],
    image: frontmatter.image,
    content: includeContent ? content : undefined,
  };
}

export function ensureContentScaffold() {
  // Best-effort to ensure folders exist; no file creation here to avoid side-effects
  [CONTENT_ROOT, POSTS_DIR, PROJECTS_DIR, TECHNOLOGIES_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}
