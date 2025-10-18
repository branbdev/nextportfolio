// Import Node.js modules conditionally to avoid client-side errors
import { BlogPost } from './taxonomies';
import { portfolioData } from '../components/portfolioData';

// This makes the file work with Next.js SSG
export const IS_SERVER = typeof window === 'undefined';

// Import server-only modules conditionally
let fs: any;
let path: any;
let matter: any;

if (IS_SERVER) {
  fs = require('fs');
  path = require('path');
  matter = require('gray-matter');
}

// Configuration for MDX content directories
// Using path.resolve to ensure we get the absolute path correctly
const BLOG_PATH = IS_SERVER
  ? path.resolve(process.cwd(), 'content', 'blog')
  : '';
const PROJECT_PATH = IS_SERVER
  ? path.resolve(process.cwd(), 'content', 'projects')
  : '';

// Log paths during initialization to help with debugging
if (IS_SERVER) {
  console.log('Blog content path:', BLOG_PATH);
  console.log('Project content path:', PROJECT_PATH);
  console.log('Current working directory:', process.cwd());
}

// Interface for MDX front matter
export interface MDXFrontMatter {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  tags: string[];
  coverImage?: string;
}

// Get all MDX files from a directory
const getMDXFiles = (dir: string): string[] => {
  if (!IS_SERVER || !fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir).filter((file) => {
    // Skip the [slug] template directories
    if (file === '[blog-slug]' || file === '[project-slug]') {
      return false;
    }

    const stats = fs.statSync(path.join(dir, file));
    return stats.isDirectory();
  });
};

// Get MDX data from a specific file
const getMDXData = (
  dir: string,
  slug: string
): { content: string; frontMatter: MDXFrontMatter } | null => {
  if (!IS_SERVER) {
    return null;
  }

  try {
    const mdxPath = path.resolve(dir, slug, 'index.mdx');

    // Check if file exists
    if (!fs.existsSync(mdxPath)) {
      console.error(`MDX file does not exist: ${mdxPath}`);
      return null;
    }

    // Debug info
    console.log(`Reading MDX file: ${mdxPath}`);

    const source = fs.readFileSync(mdxPath, 'utf8');
    const { content, data } = matter(source);

    // Validate frontmatter has required fields
    const frontMatter = data as MDXFrontMatter;
    if (!frontMatter.title || !frontMatter.date) {
      console.warn(`MDX file ${slug} has incomplete frontmatter:`, frontMatter);
    }

    return {
      content,
      frontMatter,
    };
  } catch (err) {
    console.error(`Error reading MDX file: ${slug} in directory ${dir}`, err);
    return null;
  }
};

// Get all blog posts
export const getAllBlogPosts = (): BlogPost[] => {
  // If we're on the client side, return empty array
  if (!IS_SERVER) {
    return [];
  }

  const files = getMDXFiles(BLOG_PATH);

  const posts = files
    .map((slug) => {
      try {
        const mdx = getMDXData(BLOG_PATH, slug);
        if (!mdx) return null;
        const { frontMatter } = mdx;

        return {
          slug,
          title: frontMatter.title,
          excerpt: frontMatter.excerpt,
          date: frontMatter.date,
          author: frontMatter.author,
          tags: frontMatter.tags || [],
        };
      } catch (error) {
        console.error(`Error processing blog post ${slug}:`, error);
        return null;
      }
    })
    .filter(Boolean) as BlogPost[];

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

// Get a specific blog post by slug
export const getBlogPostBySlug = (slug: string) => {
  if (!IS_SERVER) {
    return null;
  }

  try {
    const mdx = getMDXData(BLOG_PATH, slug);
    if (!mdx) return null;
    const { content, frontMatter } = mdx;
    return { content, frontMatter, slug };
  } catch {
    return null;
  }
};

// Get latest blog posts (for homepage)
export const getLatestBlogPosts = (count: number = 3): BlogPost[] => {
  if (!IS_SERVER) {
    return [];
  }

  const posts = getAllBlogPosts();
  return posts.slice(0, count);
};

// Find related content (projects and blog posts) by tags
export const findRelatedContent = (tags: string[], currentSlug: string) => {
  // Get blog posts if we're on server side
  const blogPosts = IS_SERVER
    ? getAllBlogPosts()
        .filter((post) => post.slug !== currentSlug)
        .filter((post) => post.tags.some((tag) => tags.includes(tag)))
        .slice(0, 3)
    : [];

  // Portfolio data is available on both client and server
  const projects = portfolioData
    .filter((project) => project.tags.some((tag) => tags.includes(tag)))
    .slice(0, 3);

  return { blogPosts, projects };
};
