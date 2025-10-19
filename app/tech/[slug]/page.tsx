import Image from 'next/image';
import {
  loadAllTechnologies,
  loadAllPosts,
  loadAllProjects,
  loadTechnologyBySlug,
} from '@/lib/contentLoader';

type Params = { slug: string };

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const techs = loadAllTechnologies();
  return techs.map((t) => ({ slug: t.slug }));
}

export default async function TechnologyPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;

  const tech = loadTechnologyBySlug(slug);
  if (!tech) {
    return <div>Technology not found.</div>;
  }

  const allPosts = loadAllPosts();
  const allProjects = loadAllProjects();

  const relatedPosts = allPosts.filter((p) =>
    p.technologySlugs?.includes(slug)
  );
  const relatedProjects = allProjects.filter((prj) =>
    prj.technologySlugs?.includes(slug)
  );

  return (
    <main className='container mx-auto py-8'>
      <header className='mb-8'>
        <h1 className='text-3xl font-bold'>{tech.name}</h1>
        {tech.logo ? (
          <Image
            src={tech.logo}
            alt={`${tech.name} logo`}
            width={64}
            height={64}
            className='mt-4 h-16 w-16 object-contain'
            priority
          />
        ) : null}
      </header>

      <section className='mb-12'>
        <h2 className='text-2xl font-semibold mb-4'>Related Posts</h2>
        {relatedPosts.length ? (
          <ul className='space-y-3'>
            {relatedPosts.map((p) => (
              <li key={p.slug} className='border-b pb-3'>
                <a
                  href={`/blog/${p.slug}`}
                  className='text-lg font-medium underline'>
                  {p.title}
                </a>
                {p.summary && (
                  <p className='text-sm text-gray-600'>{p.summary}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Related Projects</h2>
        {relatedProjects.length ? (
          <ul className='space-y-3'>
            {relatedProjects.map((prj) => (
              <li key={prj.slug} className='border-b pb-3'>
                <a
                  href={`/projects/${prj.slug}`}
                  className='text-lg font-medium underline'>
                  {prj.name}
                </a>
                <p className='text-sm text-gray-600'>{prj.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No projects yet.</p>
        )}
      </section>
    </main>
  );
}
