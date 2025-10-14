import { NextApiRequest, NextApiResponse } from 'next';
import { getAllBlogPosts, getLatestBlogPosts } from '../../src/lib/mdx';

// Debug endpoint to check GraphQL resolver functions directly
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get blog posts - if count query param is present, use getLatestBlogPosts
    const count = req.query.count
      ? parseInt(req.query.count as string, 10)
      : undefined;
    const blogPosts = count ? getLatestBlogPosts(count) : getAllBlogPosts();

    return res.status(200).json({
      success: true,
      blogPosts,
      count: blogPosts.length,
    });
  } catch (error) {
    console.error('Error in GraphQL debug API:', error);
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
