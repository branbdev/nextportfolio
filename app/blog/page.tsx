import { loadAllPosts, loadAllTechnologies } from '@/lib/contentLoader';
import Link from 'next/link';
import type { Metadata } from 'next';
import BlogIndex from '@/components/BlogIndex';
import styles from './BlogIndexStyles.module.css';

export const metadata: Metadata = {
  title: 'Blog | My Portfolio',
  description:
    'Technical articles and tutorials on web development, architecture, and performance optimization.',
};

export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function BlogPage() {
  const posts = loadAllPosts();
  const technologies = loadAllTechnologies();

  // Sort by published date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });

  const featured = sortedPosts.filter((p) => p.featured);

  return (
    <div className='container mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold mb-8'>Blog</h1>
      <p className='text-lg text-gray-600 mb-12'>
        Technical articles on modern web development, architecture patterns, and
        performance optimization.
      </p>

      {featured.length > 0 && (
        <section className='mb-16'>
          <h2 className='text-2xl font-semibold mb-6'>Featured</h2>
          <div className='grid gap-8 md:grid-cols-2'>
            {featured.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`block p-8 border rounded-2xl ${styles.paper}`}>
                <article>
                  <h3 className='text-2xl font-bold mb-3'>{post.title}</h3>
                  {post.summary && (
                    <p className='text-gray-600 dark:text-zinc-400 leading-relaxed'>
                      {post.summary}
                    </p>
                  )}
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}

      <BlogIndex posts={sortedPosts} technologies={technologies} />
    </div>
  );
}
