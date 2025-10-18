'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BlogPost } from '../lib/taxonomies';
import { IconExternal } from './Icons';
import styles from '@/styles/components/LatestArticles.module.css';

const LatestArticles: React.FC = () => {
  // State for articles and loading
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fallback to direct API call
        const response = await fetch('/api/blog-posts?limit=3');
        const data = await response.json();

        if (data.success && data.posts && Array.isArray(data.posts)) {
          setArticles(data.posts);
        } else {
          // Hardcoded fallback if all else fails
          setArticles([
            {
              slug: 'getting-started-with-nextjs',
              title: 'Getting Started with Next.js',
              excerpt:
                'Next.js is a powerful React framework that helps you build fast and SEO-friendly web applications.',
              date: '2025-10-01',
              author: 'Brandon Bowen',
              tags: ['React', 'Next.js', 'JavaScript'],
            },
            {
              slug: 'typescript-best-practices',
              title: 'TypeScript Best Practices for React Applications',
              excerpt:
                'Learn how to effectively use TypeScript in your React applications to create more maintainable and bug-free code.',
              date: '2025-10-05',
              author: 'Brandon Bowen',
              tags: ['TypeScript', 'React', 'JavaScript'],
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Set fallback data
        setArticles([
          {
            slug: 'getting-started-with-nextjs',
            title: 'Getting Started with Next.js',
            excerpt:
              'Next.js is a powerful React framework that helps you build fast and SEO-friendly web applications.',
            date: '2025-10-01',
            author: 'Brandon Bowen',
            tags: ['React', 'Next.js', 'JavaScript'],
          },
          {
            slug: 'typescript-best-practices',
            title: 'TypeScript Best Practices for React Applications',
            excerpt:
              'Learn how to effectively use TypeScript in your React applications to create more maintainable and bug-free code.',
            date: '2025-10-05',
            author: 'Brandon Bowen',
            tags: ['TypeScript', 'React', 'JavaScript'],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className={styles.section} id='latest-articles'>
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.subtitle}>From The Blog</h3>
          <h3 className={styles.title}>Latest Articles</h3>
        </div>
        <div className={styles.blogList}>
          {loading ? (
            <p className={styles.loading}>Loading latest articles...</p>
          ) : articles.length > 0 ? (
            <div className={styles.blogItems}>
              {articles.map((article, index) => (
                <div key={index} className={styles.blogItem}>
                  <span className={styles.blogDate}>
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <h3 className={styles.blogTitle}>
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className={styles.blogExcerpt}>{article.excerpt}</p>
                  <div className={styles.blogTags}>
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className={styles.blogTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/blog/${article.slug}`}
                    className={styles.readMore}>
                    Read More <IconExternal size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noPosts}>
              <p>No articles found. Check back soon!</p>
              <Link href='/blog' className={styles.blogLink}>
                View Blog
              </Link>
            </div>
          )}
        </div>
        {articles.length > 0 && (
          <div className={styles.viewAll}>
            <Link href='/blog' className={styles.blogLink}>
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
