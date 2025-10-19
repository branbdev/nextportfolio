import contentGraph from '../../public/content-graph.json';
import Link from 'next/link';
import { IconBookOpen, IconExternal, IconArrowRight } from './Icons';

type PostLike = {
  __typename?: 'Post';
  slug: string;
  title?: string;
  summary?: string;
  publishedAt?: string;
  technologies?: { slug: string; name: string }[];
  technologySlugs?: string[]; // from content loader shapes
};

type ProjectLike = {
  __typename?: 'Project';
  slug: string;
  name?: string;
  description?: string;
  technologies?: { slug: string; name: string }[];
  technologySlugs?: string[];
};

interface Props {
  item: PostLike | ProjectLike;
}

export default async function RelatedContent({ item }: Props) {
  const technologySlugs = (item.technologies?.map((t) => t.slug) ??
    item.technologySlugs ??
    []) as string[];

  // Compute related items from static content graph at build time (SSG)
  const posts = (contentGraph.posts || [])
    .filter((p) => p.slug !== item.slug)
    .filter((p) =>
      p.technologySlugs?.some((s: string) => technologySlugs.includes(s))
    );

  const projects = (contentGraph.projects || [])
    .filter((prj) => prj.slug !== (item as any).slug)
    .filter((prj) =>
      prj.technologies?.some((t: any) => technologySlugs.includes(t.slug))
    );

  if (!posts.length && !projects.length) return null;

  return (
    <aside className='mt-16 border-t pt-10'>
      <h3 className='text-3xl font-semibold mb-7 flex items-center gap-3'>
        <IconBookOpen size={24} /> Related content
      </h3>

      <div className='grid gap-6 sm:grid-cols-2'>
        {posts.map((p) => (
          <Link
            key={`post-${p.slug}`}
            href={`/blog/${p.slug}`}
            className='group rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 hover:shadow-lg transition-all relative overflow-hidden focus-visible:outline focus-visible:outline-3 focus-visible:outline-indigo-500 focus-visible:outline-offset-4'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <div className='text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2'>
                  Post
                </div>
                <div className='text-lg font-bold leading-snug'>{p.title}</div>
              </div>
              <IconArrowRight
                className='opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0'
                size={20}
              />
            </div>
          </Link>
        ))}

        {projects.map((prj) => (
          <Link
            key={`project-${prj.slug}`}
            href={`/projects/${prj.slug}`}
            className='group rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-6 hover:shadow-lg transition-all relative overflow-hidden focus-visible:outline focus-visible:outline-3 focus-visible:outline-indigo-500 focus-visible:outline-offset-4'>
            <div className='flex items-start justify-between gap-4'>
              <div className='flex-1'>
                <div className='text-xs uppercase tracking-wider text-gray-500 font-semibold mb-2'>
                  Project
                </div>
                <div className='text-lg font-bold leading-snug'>{prj.name}</div>
              </div>
              <IconExternal
                className='opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all flex-shrink-0'
                size={20}
              />
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
