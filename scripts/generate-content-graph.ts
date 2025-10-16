#!/usr/bin/env node

/**
 * Build-time GraphQL Data Generator
 *
 * This script runs during `npm run build` to generate a static JSON file
 * containing all content entities and their relationships.
 *
 * Benefits:
 * - GraphQL-style querying at build time
 * - Zero runtime overhead (pure JSON)
 * - Type-safe with TypeScript
 * - Perfect for static sites
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import {
  loadAllProjects,
  loadAllTechnologies,
  loadAllPosts,
} from '../src/lib/contentLoader';
import { enrichProjectsWithTechnologies } from '../src/lib/taxonomies';

interface ContentGraph {
  projects: any[];
  technologies: any[];
  posts: any[];
  relationships: {
    projectsByTechnology: Record<string, string[]>;
    technologiesByProject: Record<string, string[]>;
    postsByTechnology: Record<string, string[]>;
  };
  metadata: {
    generatedAt: string;
    totalProjects: number;
    totalTechnologies: number;
    totalPosts: number;
  };
}

async function generateContentGraph(): Promise<ContentGraph> {
  console.log('🚀 Starting GraphQL-style content graph generation...');

  // Load all content
  const projects = loadAllProjects();
  const technologies = loadAllTechnologies();
  const posts = loadAllPosts();

  console.log(`✅ Loaded ${projects.length} projects`);
  console.log(`✅ Loaded ${technologies.length} technologies`);
  console.log(`✅ Loaded ${posts.length} posts`);

  // Enrich projects with technology data
  const enrichedProjects = enrichProjectsWithTechnologies(
    projects,
    technologies
  );

  // Build relationship maps
  const projectsByTechnology: Record<string, string[]> = {};
  const technologiesByProject: Record<string, string[]> = {};
  const postsByTechnology: Record<string, string[]> = {};

  // Map projects to technologies
  enrichedProjects.forEach((project) => {
    technologiesByProject[project.slug] = project.technologies.map(
      (t) => t.slug
    );

    project.technologies.forEach((tech) => {
      if (!projectsByTechnology[tech.slug]) {
        projectsByTechnology[tech.slug] = [];
      }
      projectsByTechnology[tech.slug].push(project.slug);
    });
  });

  // Map posts to technologies
  posts.forEach((post) => {
    post.technologySlugs.forEach((techSlug) => {
      if (!postsByTechnology[techSlug]) {
        postsByTechnology[techSlug] = [];
      }
      postsByTechnology[techSlug].push(post.slug);
    });
  });

  console.log('📊 Built relationship maps');

  return {
    projects: enrichedProjects.map((p) => ({
      slug: p.slug,
      name: p.name,
      description: p.description,
      repositoryUrl: p.repositoryUrl,
      liveUrl: p.liveUrl,
      image: p.image,
      technologies: p.technologies.map((t) => ({
        slug: t.slug,
        name: t.name,
        logo: t.logo,
      })),
    })),
    technologies: technologies.map((t) => ({
      slug: t.slug,
      name: t.name,
      logo: t.logo,
    })),
    posts: posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      publishedAt: p.publishedAt,
      summary: p.summary,
      technologySlugs: p.technologySlugs,
    })),
    relationships: {
      projectsByTechnology,
      technologiesByProject,
      postsByTechnology,
    },
    metadata: {
      generatedAt: new Date().toISOString(),
      totalProjects: projects.length,
      totalTechnologies: technologies.length,
      totalPosts: posts.length,
    },
  };
}

async function main() {
  try {
    const graph = await generateContentGraph();

    const outputPath = join(process.cwd(), 'public', 'content-graph.json');
    writeFileSync(outputPath, JSON.stringify(graph, null, 2));

    console.log(`✨ Content graph generated successfully!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(
      `📦 File size: ${(
        Buffer.byteLength(JSON.stringify(graph)) / 1024
      ).toFixed(2)} KB`
    );

    // Print some stats
    console.log('\n📈 Graph Statistics:');
    console.log(`   Projects: ${graph.metadata.totalProjects}`);
    console.log(`   Technologies: ${graph.metadata.totalTechnologies}`);
    console.log(`   Posts: ${graph.metadata.totalPosts}`);
    console.log(
      `   Total Relationships: ${
        Object.values(graph.relationships.projectsByTechnology).flat().length
      }`
    );
  } catch (error) {
    console.error('❌ Error generating content graph:', error);
    process.exit(1);
  }
}

main();
