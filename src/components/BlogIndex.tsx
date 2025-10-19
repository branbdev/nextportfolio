'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../app/blog/BlogIndexStyles.module.css';

type PostItem = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  technologySlugs: string[];
  coverImage?: string;
};

type TechnologyItem = {
  slug: string;
  name: string;
  logo?: string;
};

interface BlogIndexProps {
  posts: PostItem[];
  technologies: TechnologyItem[];
}

export default function BlogIndex({ posts, technologies }: BlogIndexProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize from URL params
  const [sortOrder, setSortOrder] = React.useState<'newest' | 'oldest'>(() => {
    const sort = searchParams?.get('sort');
    return sort === 'oldest' ? 'oldest' : 'newest';
  });

  // Multi-select tech filter (set of slugs) from URL
  const [techFilters, setTechFilters] = React.useState<Set<string>>(() => {
    const tech = searchParams?.getAll('tech') || [];
    return new Set(tech);
  });

  // Sync state to URL
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (sortOrder !== 'newest') params.set('sort', sortOrder);
    techFilters.forEach((slug) => params.append('tech', slug));
    const newUrl = params.toString() ? `?${params.toString()}` : '/blog';
    router.replace(newUrl, { scroll: false });
  }, [sortOrder, techFilters, router]);

  const sorted = React.useMemo(() => {
    const arr = [...posts];
    arr.sort((a, b) => {
      const da = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const db = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return sortOrder === 'newest' ? db - da : da - db;
    });
    return arr;
  }, [posts, sortOrder]);

  const filtered = React.useMemo(() => {
    if (!techFilters.size) return sorted;
    return sorted.filter((p) =>
      Array.from(techFilters).every((slug) => p.technologySlugs?.includes(slug))
    );
  }, [sorted, techFilters]);

  const toggleTech = (slug: string) => {
    setTechFilters((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <section className={styles.wrap}>
      <div
        className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 ${styles.decor}`}>
        <div className='flex flex-wrap gap-2'>
          {technologies.map((t) => {
            const active = techFilters.has(t.slug);
            return (
              <button
                key={t.slug}
                type='button'
                className={`${styles.chip} ${active ? styles.chipActive : ''}`}
                aria-pressed={active}
                onClick={() => toggleTech(t.slug)}>
                {t.name}
              </button>
            );
          })}
        </div>

        <div>
          <label htmlFor='sortOrder' className='block text-sm text-gray-600'>
            Sort by Date
          </label>
          <select
            id='sortOrder'
            className='mt-1 border rounded-md px-3 py-2 bg-white dark:bg-zinc-900'
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as 'newest' | 'oldest')
            }>
            <option value='newest'>Newest → Oldest</option>
            <option value='oldest'>Oldest → Newest</option>
          </select>
        </div>
      </div>

      <div className='grid gap-10 md:grid-cols-2 lg:grid-cols-3'>
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`block border rounded-xl overflow-hidden ${styles.paper}`}>
            <article>
              {post.coverImage && (
                <div className='relative h-48 w-full'>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                </div>
              )}
              <div className='p-6'>
                {post.publishedAt && (
                  <time className='text-sm text-gray-500'>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
                <h3 className='text-xl font-bold mt-2 mb-2'>{post.title}</h3>
                {post.summary && (
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {post.summary}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
