import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
// replaced rehype-highlight with rehype-pretty-code
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import Link from 'next/link';
import Layout from '../../src/layouts/Layout';
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  findRelatedContent,
} from '../../src/lib/mdx';
import { MDXFrontMatter } from '../../src/lib/mdx';
import { PortfolioItem } from '../../src/components/portfolioData';
import { BlogPost } from '../../src/lib/taxonomies';
import { getTechIcon } from '../../src/components/Icons';
import styles from '../../styles/components/BlogPost.module.css';
import { initializeApollo } from '../../src/lib/graphql/client';
import {
  GET_BLOG_POST_BY_SLUG,
  GET_RELATED_CONTENT,
} from '../../src/lib/graphql/queries';

interface BlogPostPageProps {
  source: MDXRemoteSerializeResult;
  frontMatter: MDXFrontMatter;
  slug: string;
  relatedPosts: BlogPost[];
  relatedProjects: PortfolioItem[];
}

export default function BlogPostPage({
  source,
  frontMatter,
  slug,
  relatedPosts,
  relatedProjects,
}: BlogPostPageProps) {
  // State for reading progress bar
  const [readingProgress, setReadingProgress] = React.useState(0);

  // Track scroll position for reading progress
  React.useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setReadingProgress(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    window.addEventListener('scroll', updateReadingProgress);

    return () => {
      window.removeEventListener('scroll', updateReadingProgress);
    };
  }, []);

  return (
    <Layout>
      <Head>
        <title>
          {frontMatter.title} | Brandon Bowen - Full-Stack Software Engineer
        </title>
        <meta name='description' content={frontMatter.excerpt} />
      </Head>

      {/* Reading Progress Bar */}
      <div className={styles.progressContainer}>
        <div
          className={styles.progressBar}
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <article className={`resumo_fn_section ${styles.blogPost}`}>
        <div className='container'>
          {/* Post Header */}
          <header className={styles.postHeader}>
            <div className={styles.meta}>
              <time dateTime={frontMatter.date}>
                {new Date(frontMatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className={styles.author}>By {frontMatter.author}</span>
            </div>

            <h1 className={styles.title}>{frontMatter.title}</h1>

            <p className={styles.excerpt}>{frontMatter.excerpt}</p>

            <div className={styles.tags}>
              {frontMatter.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className={styles.tag}>
                  {getTechIcon(tag, 16)}
                  <span>{tag}</span>
                </Link>
              ))}
            </div>

            {frontMatter.coverImage && (
              <div className={styles.coverImage}>
                <img src={frontMatter.coverImage} alt={frontMatter.title} />
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className={styles.content}>
            <MDXRemote {...source} />
          </div>

          {/* Author Bio */}
          <div className={styles.authorBio}>
            <img
              src='/img/thumb/square.jpg'
              alt='Author'
              className={styles.authorImage}
            />
            <div>
              <h3>{frontMatter.author}</h3>
              <p>
                Full-Stack Software Engineer specializing in .NET, React, and
                modern web development.
              </p>
            </div>
          </div>

          {/* Related Content */}
          <aside className={styles.relatedContent}>
            <h2 className={styles.relatedTitle}>Related Content</h2>

            {/* Related Blog Posts */}
            {relatedPosts.length > 0 && (
              <div className={styles.relatedSection}>
                <h3>Blog Posts</h3>
                <div className={styles.relatedGrid}>
                  {relatedPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className={styles.relatedCard}>
                      <h4>{post.title}</h4>
                      <p>{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Projects */}
            {relatedProjects.length > 0 && (
              <div className={styles.relatedSection}>
                <h3>Projects</h3>
                <div className={styles.relatedGrid}>
                  {relatedProjects.map((project) => (
                    <div
                      key={project.id}
                      className={styles.relatedCard}
                      onClick={() => {
                        // Scroll to portfolio section and trigger modal
                        document
                          .getElementById('portfolio')
                          ?.scrollIntoView({ behavior: 'smooth' });
                        // You would need to implement a way to open the specific portfolio modal
                      }}>
                      <h4>{project.title}</h4>
                      <p>{project.description.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Back to blog */}
          <div className={styles.backToList}>
            <Link href='/blog'>← Back to all articles</Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllBlogPosts();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const apolloClient = initializeApollo();

  try {
    // Try to fetch from GraphQL first
    const { data } = await apolloClient.query({
      query: GET_BLOG_POST_BY_SLUG,
      variables: { slug },
    });

    if (data?.blogPost) {
      // Get related content
      const relatedData = await apolloClient.query({
        query: GET_RELATED_CONTENT,
        variables: {
          tags: data.blogPost.frontMatter.tags,
          currentSlug: slug,
        },
      });

      // Serialize the MDX content from GraphQL
      const mdxSource = await serialize(data.blogPost.content, {
        mdxOptions: {
          rehypePlugins: [
            [rehypePrettyCode, { theme: 'github-dark' }],
            rehypeSlug,
          ],
        },
      });

      return {
        props: {
          source: mdxSource,
          frontMatter: data.blogPost.frontMatter,
          slug,
          relatedPosts: relatedData?.data?.relatedContent?.blogPosts || [],
          relatedProjects:
            relatedData?.data?.relatedContent?.portfolioItems || [],
          initialApolloState: apolloClient.cache.extract(),
        },
        revalidate: 3600, // Revalidate every hour
      };
    }
  } catch (error) {
    console.error('Error fetching data from GraphQL:', error);
    // Fallback to direct function calls
  }

  // Fallback to direct function call
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  // Serialize the MDX content
  const mdxSource = await serialize(post.content, {
    mdxOptions: {
      rehypePlugins: [
        [rehypePrettyCode, { theme: 'github-dark' }], // Syntax highlighting
        rehypeSlug, // Add IDs to headings
      ],
    },
  });

  // Find related content based on tags
  const { blogPosts, projects } = findRelatedContent(
    post.frontMatter.tags,
    slug
  );

  return {
    props: {
      source: mdxSource,
      frontMatter: post.frontMatter,
      slug,
      relatedPosts: blogPosts,
      relatedProjects: projects,
      initialApolloState: apolloClient.cache.extract(),
    },
    revalidate: 3600, // Revalidate every hour
  };
};
