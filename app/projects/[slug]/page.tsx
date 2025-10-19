import Image from 'next/image';
import Link from 'next/link';
import {
  loadAllProjects,
  loadProjectBySlug,
  loadAllTechnologies,
} from '@/lib/contentLoader';
import { IconExternal, IconGithub, IconBookOpen } from '@/components/Icons';

type Params = { slug: string };

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const projects = loadAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage(props: { params: Promise<Params> }) {
  const { slug } = await props.params;
  const project = loadProjectBySlug(slug, { includeContent: true });
  const techs = loadAllTechnologies();

  if (!project) {
    return <div>Project not found.</div>;
  }

  const projectTechs = project.technologySlugs
    .map((s) => techs.find((t) => t.slug === s))
    .filter(Boolean);

  return (
    <article className='container mx-auto px-4 py-12 max-w-4xl'>
      <header className='mb-8'>
        <h1 className='text-4xl font-bold'>{project.name}</h1>
        <p className='mt-3 text-gray-600'>{project.description}</p>
        {projectTechs.length > 0 && (
          <div className='flex flex-wrap gap-2 mt-4'>
            {projectTechs.map((t) => (
              <span
                key={t!.slug}
                className='px-2 py-1 text-xs bg-gray-100 rounded'>
                {t!.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {project.image && (
        <div className='mb-8'>
          <Image
            src={project.image}
            alt={`${project.name} cover`}
            width={1200}
            height={630}
            className='w-full h-auto object-cover'
          />
        </div>
      )}

      <footer className='mt-12 pt-8 border-t'>
        <Link href='/projects' className='text-blue-600 hover:underline'>
          ← Back to all projects
        </Link>
        <div className='mt-4 flex flex-wrap gap-3'>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800'>
              <IconExternal size={18} /> Live Demo
            </a>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800'>
              <IconGithub size={18} /> Source Code
            </a>
          )}
          {project.blogPostSlug && (
            <Link
              href={`/blog/${project.blogPostSlug}`}
              className='inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 dark:border-zinc-700 dark:hover:bg-zinc-800'>
              <IconBookOpen size={18} /> Related Blog Post
            </Link>
          )}
        </div>
      </footer>
    </article>
  );
}
