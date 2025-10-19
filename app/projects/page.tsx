import Link from 'next/link';
import { loadAllProjects, loadAllTechnologies } from '@/lib/contentLoader';
import { getTechIcon } from '@/components/Icons';

export const dynamic = 'force-static';
export const dynamicParams = false;

export default async function ProjectsPage() {
  const projects = loadAllProjects();
  const techs = loadAllTechnologies();
  const techMap = new Map(techs.map((t) => [t.slug, t] as const));
  return (
    <main className='container mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold mb-8'>Projects</h1>
      <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {projects.map((prj) => (
          <Link
            key={prj.slug}
            href={`/projects/${prj.slug}`}
            className='block p-6 border rounded-lg hover:shadow-lg transition-shadow'>
            <article>
              <h2 className='text-2xl font-semibold'>{prj.name}</h2>
              <p className='text-gray-600 mt-2'>{prj.description}</p>
              {prj.technologySlugs?.length ? (
                <div className='flex flex-wrap gap-2 mt-3'>
                  {prj.technologySlugs.map((slug) => (
                    <span
                      key={slug}
                      className='inline-flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded'>
                      <span className='inline-block align-middle'>
                        {getTechIcon(techMap.get(slug)?.name || slug, 12)}
                      </span>
                      <span>{techMap.get(slug)?.name || slug}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
