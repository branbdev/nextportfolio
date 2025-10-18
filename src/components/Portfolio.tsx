import React, { Fragment } from 'react';
import { loadAllProjects, loadAllTechnologies } from '../lib/contentLoader';
import { enrichProjectsWithTechnologies } from '../lib/taxonomies';
import PortfolioClient from './PortfolioClient';
import styles from '@/styles/components/Portfolio.module.css';

/**
 * Portfolio Section - Server Component
 *
 * Loads project and technology data server-side for optimal performance.
 * Passes enriched data to the client component for interactive carousel.
 *
 * @returns {Promise<JSX.Element>} The Portfolio section with project carousel
 */
const Portfolio = async () => {
  // Server-side data loading - happens at build time for static pages
  const projects = loadAllProjects();
  const technologies = loadAllTechnologies();
  const enrichedProjects = enrichProjectsWithTechnologies(
    projects,
    technologies
  );

  return (
    <Fragment>
      <section
        className={styles.portfolioSection}
        id='portfolio'
        aria-labelledby='portfolio-title'>
        <div className={styles.container}>
          <div className={styles.mainTitle}>
            {/* Section label */}
            <p className={styles.subtitle} aria-label='Section label'>
              Portfolio
            </p>

            {/* Main heading */}
            <h2 id='portfolio-title' className={styles.title}>
              Featured Projects
            </h2>

            {/* Description */}
            <p className={styles.description}>
              A collection of my favorite projects that I've worked on.
            </p>
          </div>
        </div>

        {/* Client-side carousel component with lazy-loaded Swiper */}
        <PortfolioClient projects={enrichedProjects} />
      </section>
    </Fragment>
  );
};

export default Portfolio;
