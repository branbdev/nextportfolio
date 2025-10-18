import { loadAllPosts, loadPostBySlug } from '@/lib/contentLoader';
import { loadAllTechnologies } from '@/lib/contentLoader';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';
import { mdxComponents } from '../../../mdx-components';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

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
    <article className='container mx-auto px-4 py-12 max-w-4xl'>
      <header className='mb-12'>
        {post.publishedAt && (
          <time className='text-sm text-gray-500'>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        )}

        <h1 className='text-4xl font-bold mt-2 mb-4'>{post.title}</h1>

        {post.summary && (
          <p className='text-xl text-gray-600'>{post.summary}</p>
        )}

        {postTechnologies.length > 0 && (
          <div className='flex flex-wrap gap-3 mt-6'>
            {postTechnologies.map((tech) => (
              <span
                key={tech!.slug}
                className='flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm'>
                {tech!.logo && (
                  <Image
                    src={tech!.logo}
                    alt={`${tech!.name} logo`}
                    width={16}
                    height={16}
                    className='w-4 h-4'
                    loading='lazy'
                  />
                )}
                <span>{tech!.name}</span>
              </span>
            ))}
          </div>
        )}
      </header>

      <div className='prose prose-lg max-w-none'>{compiled}</div>

      <footer className='mt-12 pt-8 border-t'>
        <Link href='/blog' className='text-blue-600 hover:underline'>
          ← Back to all posts
        </Link>
      </footer>
    </article>
  );
}
