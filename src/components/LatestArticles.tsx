'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BlogPost } from '../lib/taxonomies';
import { getLatestBlogPosts } from '../lib/mdx';
import { IconExternal } from './Icons';
import { GET_LATEST_BLOG_POSTS } from '../lib/graphql/queries';

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
    <div className='resumo_fn_section' id='latest-articles'>
      <div className='container'>
        <div className='resumo_fn_main_title'>
          <h3 className='subtitle'>From The Blog</h3>
          <h3 className='title'>Latest Articles</h3>
        </div>
        <div className='blog_list'>
          {loading ? (
            <p>Loading latest articles...</p>
          ) : articles.length > 0 ? (
            <div className='blog_list_items'>
              {articles.map((article, index) => (
                <div key={index} className='blog_item'>
                  <span className='blog_date'>
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                  <h3 className='blog_title'>
                    <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className='blog_excerpt'>{article.excerpt}</p>
                  <div className='blog_tags'>
                    {article.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span key={tagIndex} className='blog_tag'>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/blog/${article.slug}`} className='read_more'>
                    Read More <IconExternal size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className='no_posts'>
              <p>No articles found. Check back soon!</p>
              <Link href='/blog' className='blog_link'>
                View Blog
              </Link>
            </div>
          )}
        </div>
        {articles.length > 0 && (
          <div className='blog_view_all'>
            <Link href='/blog' className='blog_link'>
              View All Articles
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestArticles;
