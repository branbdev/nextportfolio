This project uses a file-based content system for static GraphQL.

Folders:

- posts/\*.mdx
- projects/\*.mdx
- technologies/\*.mdx

Each MDX file includes YAML frontmatter matching the types in `src/types/content.ts`.

## Authoring Guide

### Frontmatter Fields

- Common fields (Posts):

  - `title` (string)
  - `publishedAt` or `date` (ISO date string)
  - `summary` or `excerpt` (short description)
  - `technologies` or `tags` (array of slugs)
  - `coverImage` (string path) and `coverImageAlt` (string)
  - `featured` (boolean)
  - `readingTime` (e.g., `"8 min"`)
  - `difficulty` (e.g., `"Beginner" | "Intermediate" | "Advanced"`)
  - `canonicalUrl` (string URL)

- Common fields (Projects):
  - `name` (string)
  - `description` (string)
  - `technologies` (array of slugs)
  - `image` (string path)
  - `repositoryUrl` (string URL)
  - `liveUrl` (string URL)
  - `blogPostSlug` (string, optional) — slug of a related blog post to surface a button on the project page

### Image Optimization (Projects & Posts)

- Place images in `public/img/...` and reference them via absolute paths (e.g., `/img/portfolio/devcon.jpg`).
- Prefer reasonably sized source images (e.g., ~1600px wide max). Next/Image will downscale responsively.
- Provide meaningful `coverImageAlt` text for accessibility.
- Use JPEG/WEBP for photos and SVG for logos/illustrations.

### Publishing Tips

- Avoid ESM `export` blocks inside MDX; put metadata in frontmatter.
- Use `remark-gfm` features sparingly (tables, task lists) and fence code blocks with language hints for best highlighting.
- Keep `technologies` slugs lowercase and consistent with `content/technologies` filenames.
- Use `featured: true` to surface posts on the blog index Featured section.

### Blog Index UX

- The blog index supports sorting by date (Newest → Oldest, Oldest → Newest) and filtering by Technology from a dropdown. Filtering matches against the `technologies` slugs on each post.

### Related Content

- Related posts/projects are derived from shared `technologies` slugs using a prebuilt `public/content-graph.json` at build time.
- To improve related accuracy, ensure your post’s `technologies` list includes the most important tags.
