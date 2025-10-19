import { loadAllPosts, loadPostBySlug } from '@/lib/contentLoader';
import { loadAllTechnologies } from '@/lib/contentLoader';
import { notFound } from 'next/navigation';
// Opt into full static generation for performance and SEO
export const dynamic = 'force-static';
export const dynamicParams = false;

import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';
import { mdxComponents } from '../../../mdx-components';
import RelatedContent from '@/components/RelatedContent';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import styles from './PostStyles.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths at build time
export async function generateStaticParams() {
  const posts = loadAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = loadPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.summary || post.title,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = loadPostBySlug(slug, { includeContent: true });
  const technologies = loadAllTechnologies();

  if (!post) {
    notFound();
  }

  // Enrich with technology data if needed
  const postTechnologies = post.technologySlugs
    ? post.technologySlugs
        .map((slug) => technologies.find((t) => t.slug === slug))
        .filter(Boolean)
    : [];

  // Compile MDX to React Server Components
  let compiled: React.ReactNode = null;
  if (post.content) {
    try {
      // Some authored MDX may include ESM export blocks (e.g., `export const metadata = {...}`)
      // which are not supported by next-mdx-remote's compiler. Strip them before compiling.
      const stripMDXExports = (src: string): string =>
        src
          // Remove export const <name> = { ... };
          .replace(/export\s+const\s+\w+\s*=\s*{[\s\S]*?};?\s*/g, '')
          // Remove any remaining bare export statements
          .replace(/^export\s+\{[^}]*\};?\s*$/gm, '')
          .replace(/^export\s+default\s+[^;]+;?\s*$/gm, '')
          .trim();

      const source = stripMDXExports(post.content);
      const mdx = await compileMDX<{ title?: string }>({
        source,
        options: {
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
          },
        },
        components: { ...mdxComponents },
      });
      compiled = mdx.content;
    } catch (err) {
      // Graceful fallback: render raw content in a pre block to avoid build failures
      compiled = (
        <div>
          <p>Note: MDX rendering encountered an issue; showing raw content.</p>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{post.content}</pre>
        </div>
      );
    }
  }

  return (
    <article
      className={`container mx-auto px-6 py-16 max-w-4xl ${styles.page} ${styles.leftOffset}`}>
      <header className={`mb-16 ${styles.decor}`}>
        {/* Decorative header with optional cover image */}
        {post.coverImage && (
          <div className='relative mb-8 overflow-hidden rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-lg'>
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10' />
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || post.title}
              width={1600}
              height={900}
              className='w-full h-72 md:h-96 object-cover'
              priority
            />
            <div className='absolute bottom-0 left-0 right-0 p-8 z-20'>
              <h1 className='text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg'>
                {post.title}
              </h1>
            </div>
          </div>
        )}
        {post.publishedAt && (
          <time className='text-sm text-gray-500 block mb-4'>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}

        {!post.coverImage && (
          <h1 className='text-5xl font-bold mt-2 mb-6 text-center leading-tight'>
            {post.title}
          </h1>
        )}

        {post.summary && (
          <p className='text-xl md:text-2xl text-gray-600 text-center max-w-2xl mx-auto leading-relaxed'>
            {post.summary}
          </p>
        )}

        {(post.readingTime || post.difficulty || post.canonicalUrl) && (
          <div className='mt-6 flex flex-wrap gap-5 justify-center text-sm text-gray-500'>
            {post.readingTime && <span>⏱ {post.readingTime}</span>}
            {post.difficulty && <span>🎯 {post.difficulty}</span>}
            {post.canonicalUrl && (
              <a
                href={post.canonicalUrl}
                className='underline underline-offset-2'
                target='_blank'
                rel='noopener noreferrer'>
                Canonical
              </a>
            )}
          </div>
        )}

        {postTechnologies.length > 0 && (
          <div className='flex flex-wrap justify-center gap-4 mt-8'>
            {postTechnologies.map((tech) => (
              <span
                key={tech!.slug}
                className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-sm ${styles.chip}`}>
                {tech!.logo && (
                  <Image
                    src={tech!.logo}
                    alt={`${tech!.name} logo`}
                    width={20}
                    height={20}
                    className='w-5 h-5'
                    loading='lazy'
                  />
                )}
                <span className='font-medium'>{tech!.name}</span>
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Stylish minimalist background card with paper-like texture */}
      <div className={`prose prose-lg max-w-none ${styles.paperCard}`}>
        {compiled}
      </div>

      <RelatedContent
        item={{
          slug: post.slug,
          title: post.title,
          summary: post.summary,
          technologySlugs: post.technologySlugs,
        }}
      />

      <footer className='mt-16 pt-10 border-t'>
        <Link href='/blog' className='text-blue-600 hover:underline text-lg'>
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
