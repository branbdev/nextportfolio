// filepath: scripts/generate-sitemap.mjs
import fs from 'fs';
import path from 'path';

async function generateSitemap() {
  const pages = [
    '', // for the homepage
    '/#about',
    '/#portfolio',
    '/#contact',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          return `
            <url>
              <loc>${`https://www.brandonbowen.net${page}`}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <priority>${page === '' ? '1.0' : '0.8'}</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  const publicPath = path.join(process.cwd(), 'public');
  fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemap);
}

generateSitemap();