import { graphqlRequest } from '../../../src/lib/graphql/localServer';
import {
  GET_ALL_TECHNOLOGIES,
  GET_TECHNOLOGY_BY_SLUG,
} from '../../../src/lib/graphql/operations';
import { print } from 'graphql';
import Image from 'next/image';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const { data } = await graphqlRequest<{ technologies: { slug: string }[] }>(
    print(GET_ALL_TECHNOLOGIES)
  );
  return data.technologies.map((t) => ({ slug: t.slug }));
}

export default async function TechnologyPage(props: {
  params: Promise<Params>;
}) {
  const { slug } = await props.params;
  const { data } = await graphqlRequest<{ technology: any }>(
    print(GET_TECHNOLOGY_BY_SLUG),
    { slug }
  );

  const tech = data.technology;
  if (!tech) {
    // In SSG, this typically won't render; but as a safeguard:
    return <div>Technology not found.</div>;
  }

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
        {tech.relatedPosts?.length ? (
          <ul className='space-y-3'>
            {tech.relatedPosts.map((p: any) => (
              <li key={p.slug} className='border-b pb-3'>
                <a
                  href={`/blog/${p.slug}`}
                  className='text-lg font-medium underline'>
                  {p.title}
                </a>
                <p className='text-sm text-gray-600'>{p.summary}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts yet.</p>
        )}
      </section>

      <section>
        <h2 className='text-2xl font-semibold mb-4'>Related Projects</h2>
        {tech.relatedProjects?.length ? (
          <ul className='space-y-3'>
            {tech.relatedProjects.map((prj: any) => (
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

export const dynamic = 'error'; // ensure SSG only
