import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { getAllBlogPosts, getBlogPostBySlug } from '../../src/lib/mdx';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get blog directory path
    const blogPath = path.resolve(process.cwd(), 'content', 'blog');

    // Check if blog directory exists
    const blogExists = fs.existsSync(blogPath);

    // List directories in blog folder
    const dirs = blogExists
      ? fs.readdirSync(blogPath).filter((dir) => {
          const stats = fs.statSync(path.join(blogPath, dir));
          return stats.isDirectory();
        })
      : [];

    // Check if specific blog post exists
    const testPostPath = path.join(
      blogPath,
      'getting-started-with-nextjs',
      'index.mdx'
    );
    const testPostExists = fs.existsSync(testPostPath);

    // Try to read test post content
    let testPostContent: string | null = null;
    if (testPostExists) {
      testPostContent =
        fs.readFileSync(testPostPath, 'utf8').substring(0, 200) + '...'; // Just the beginning
    }

    // Test the MDX utility functions
    let mdxUtilityResults = {};
    try {
      const allPosts = getAllBlogPosts();
      const samplePost =
        allPosts.length > 0 ? getBlogPostBySlug(allPosts[0].slug) : null;

      mdxUtilityResults = {
        allPostsCount: allPosts.length,
        allPostsFirst:
          allPosts.length > 0
            ? {
                slug: allPosts[0].slug,
                title: allPosts[0].title,
                excerpt: allPosts[0].excerpt?.substring(0, 100) + '...',
              }
            : null,
        samplePostExists: !!samplePost,
        samplePostContentLength: samplePost?.content?.length,
      };
    } catch (mdxError) {
      mdxUtilityResults = {
        error: mdxError instanceof Error ? mdxError.message : 'Unknown error',
        stack:
          process.env.NODE_ENV === 'development' && mdxError instanceof Error
            ? mdxError.stack
            : undefined,
      };
    }

    return res.status(200).json({
      success: true,
      cwd: process.cwd(),
      blogPath,
      blogExists,
      dirs,
      testPostPath,
      testPostExists,
      testPostContent,
      mdxUtilityResults,
      env: process.env.NODE_ENV,
    });
  } catch (error) {
    console.error('Error in test-mdx API:', error);
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
