import { NextApiRequest, NextApiResponse } from 'next';
import { loadAllPosts, loadPostBySlug } from '../../src/lib/contentLoader';

// API endpoint to serve blog posts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { slug, limit } = req.query;

    // Get a single blog post by slug
    if (slug && typeof slug === 'string') {
      const post = loadPostBySlug(slug);

      if (!post) {
        return res.status(404).json({
          success: false,
          error: `Blog post with slug "${slug}" not found`,
        });
      }

      return res.status(200).json({
        success: true,
        post: {
          slug: post.slug,
          title: post.title,
          excerpt: post.summary || '',
          date: post.publishedAt || new Date().toISOString(),
          author: 'Brandon Bowen',
          tags: post.technologySlugs || [],
        },
      });
    }

    // Get all blog posts
    const allPosts = loadAllPosts();

    // Sort by published date (newest first)
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });

    // Apply limit if provided
    const limitNum = limit ? parseInt(limit as string, 10) : undefined;
    const posts = limitNum ? sortedPosts.slice(0, limitNum) : sortedPosts;

    // Convert to expected format for LatestArticles component
    const formattedPosts = posts.map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.summary || '',
      date: post.publishedAt || new Date().toISOString(),
      author: 'Brandon Bowen',
      tags: post.technologySlugs || [],
    }));

    // Extract unique tags
    const allTags = formattedPosts.flatMap((post) => post.tags);
    const tags = [...new Set(allTags)].sort();

    return res.status(200).json({
      success: true,
      posts: formattedPosts,
      tags,
      count: formattedPosts.length,
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
