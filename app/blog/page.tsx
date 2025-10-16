import { loadAllPosts } from '@/lib/contentLoader';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | My Portfolio',
  description:
    'Technical articles and tutorials on web development, architecture, and performance optimization.',
};

export default async function BlogPage() {
  const posts = loadAllPosts();

  // Sort by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold mb-8'>Blog</h1>
      <p className='text-lg text-gray-600 mb-12'>
        Technical articles on modern web development, architecture patterns, and
        performance optimization.
      </p>

      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className='block p-6 border rounded-lg hover:shadow-lg transition-shadow'>
            <article>
              {post.publishedAt && (
                <time className='text-sm text-gray-500'>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}

              <h2 className='text-2xl font-bold mt-2 mb-3'>{post.title}</h2>

              {post.summary && (
                <p className='text-gray-600 mb-4'>{post.summary}</p>
              )}

              {post.technologySlugs && post.technologySlugs.length > 0 && (
                <div className='flex flex-wrap gap-2'>
                  {post.technologySlugs.map((tech) => (
                    <span
                      key={tech}
                      className='px-2 py-1 text-xs bg-gray-100 rounded'>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
