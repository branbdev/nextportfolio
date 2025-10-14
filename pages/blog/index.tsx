import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { BlogPost } from '../../src/lib/taxonomies';
import { getAllBlogPosts } from '../../src/lib/mdx';
import styles from '../../styles/components/BlogList.module.css';
import { useQuery } from '@apollo/client/react';
import {
  GET_ALL_BLOG_POSTS,
  GET_ALL_TAGS,
} from '../../src/lib/graphql/queries';
import { initializeApollo } from '../../src/lib/graphql/client';

interface BlogIndexProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogIndex({ posts, tags }: BlogIndexProps) {
  const [selectedTag, setSelectedTag] = React.useState<string>('');
  const [filteredPosts, setFilteredPosts] = React.useState<BlogPost[]>(posts);

  React.useEffect(() => {
    if (selectedTag) {
      setFilteredPosts(posts.filter((post) => post.tags.includes(selectedTag)));
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedTag, posts]);

  return (
    <>
      <Head>
        <title>Blog | Brandon Bowen - Full-Stack Software Engineer</title>
        <meta
          name='description'
          content='Technical articles about web development, .NET, React, and more by Brandon Bowen.'
        />
      </Head>

      <div className='resumo_fn_section blog_section'>
        <div className='container'>
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>My Blog</h3>
            <h3 className='title'>Latest Articles & Thoughts</h3>
          </div>

          {tags.length > 0 && (
            <div className={styles.tagFilter}>
              <span className={styles.tagLabel}>Filter by tag:</span>
              <div className={styles.tagList}>
                <button
                  className={`${styles.tag} ${
                    selectedTag === '' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedTag('')}>
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`${styles.tag} ${
                      selectedTag === tag ? styles.active : ''
                    }`}
                    onClick={() => setSelectedTag(tag)}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.blogGrid}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <article key={post.slug} className={styles.blogCard}>
                  <div className={styles.blogCardInner}>
                    <div className={styles.blogMeta}>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>

                    <h2 className={styles.blogTitle}>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className={styles.blogExcerpt}>{post.excerpt}</p>

                    <div className={styles.blogTags}>
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className={styles.blogTag}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedTag(tag);
                          }}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className={styles.readMore}>
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.noPosts}>
                <p>No articles found with the selected tag.</p>
                <button
                  className={styles.resetButton}
                  onClick={() => setSelectedTag('')}>
                  Show all articles
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Using Apollo client for SSG
  const apolloClient = initializeApollo();

  // Fetch data with Apollo client
  await apolloClient.query({
    query: GET_ALL_BLOG_POSTS,
  });

  // Fallback to direct function call if needed
  const posts = getAllBlogPosts();

  // Extract unique tags
  const allTags = posts.flatMap((post) => post.tags);
  const tags = [...new Set(allTags)].sort();

  return {
    props: {
      posts,
      tags,
      initialApolloState: apolloClient.cache.extract(),
    },
    // Revalidate every hour
    revalidate: 3600,
  };
};
