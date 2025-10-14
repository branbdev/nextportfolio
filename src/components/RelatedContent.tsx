import { graphqlRequest } from '../lib/graphql/localServer';
import { GET_RELATED_BY_TECHNOLOGIES } from '../lib/graphql/operations';
import { print } from 'graphql';

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
  const technologySlugs = (item.technologies?.map((t) => t.slug) ?? item.technologySlugs ?? []) as string[];
  const typeHint = 'title' in item ? 'post' : 'project';

  const { data } = await graphqlRequest<{
    relatedByTechnologies: { posts: any[]; projects: any[] };
  }>(print(GET_RELATED_BY_TECHNOLOGIES), {
    technologySlugs,
    excludeSlug: item.slug,
    type: undefined, // fetch both and filter in render by type if desired
  });

  const posts = data.relatedByTechnologies.posts.filter((p) => p.slug !== item.slug);
  const projects = data.relatedByTechnologies.projects.filter((p) => p.slug !== item.slug);

  if (!posts.length && !projects.length) return null;

  return (
    <aside className="mt-12 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Related content</h3>
      {!!posts.length && (
        <div className="mb-6">
          <h4 className="font-medium mb-2">Posts</h4>
          <ul className="list-disc pl-5 space-y-1">
            {posts.map((p) => (
              <li key={p.slug}>
                <a href={`/blog/${p.slug}`} className="underline">
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!projects.length && (
        <div>
          <h4 className="font-medium mb-2">Projects</h4>
          <ul className="list-disc pl-5 space-y-1">
            {projects.map((prj) => (
              <li key={prj.slug}>
                <a href={`/projects/${prj.slug}`} className="underline">
                  {prj.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
