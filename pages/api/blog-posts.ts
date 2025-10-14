import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBlogPosts, getBlogPostBySlug } from '../../src/lib/mdx';

// API endpoint to serve blog posts without GraphQL
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug } = req.query;

    // Get a single blog post by slug
    if (slug && typeof slug === 'string') {
      const post = getBlogPostBySlug(slug);

      if (!post) {
        return res.status(404).json({
          success: false,
          error: `Blog post with slug "${slug}" not found`,
        });
      }

      return res.status(200).json({
        success: true,
        post,
      });
    }

    // Get all blog posts (with optional limit)
    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const allPosts = getAllBlogPosts();
    const posts = limit ? allPosts.slice(0, limit) : allPosts;

    // Extract unique tags for filtering
    const allTags = posts.flatMap((post) => post.tags);
    const tags = [...new Set(allTags)].sort();

    return res.status(200).json({
      success: true,
      posts,
      tags,
      count: posts.length,
    });
  } catch (error) {
    console.error('Error in blog-posts API:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack:
        process.env.NODE_ENV === 'development' && error instanceof Error
          ? error.stack
          : undefined,
    });
  }
}
