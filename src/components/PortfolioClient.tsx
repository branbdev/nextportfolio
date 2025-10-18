'use client';

/**
 * =============================================================================
 * PORTFOLIO CAROUSEL - CLIENT COMPONENT
 * =============================================================================
 * Performance Optimizations:
 * 1. Lazy-loads Swiper with next/dynamic and ssr: false
 * 2. Uses CSS containment (contain: layout style) to prevent layout thrashing
 * 3. Implements next/image for optimized image loading with priority hints
 * 4. Modular CSS for scoped styles and reduced bundle size
 *
 * This component addresses the main-thread blocking issue identified in Lighthouse.
 */

import React, { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { EnrichedProject } from '../lib/taxonomies';
import { getTechIcon } from './Icons';
import PortfolioModalbox from './PortfolioModalbox';
import styles from '@/styles/components/Portfolio.module.css';

// Lazy-load Swiper components with SSR disabled for better performance
// This prevents Swiper from blocking the main thread during initial page load
const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
  ssr: false,
  loading: () => (
    <div className={styles.carouselWrapper}>Loading portfolio...</div>
  ),
});

const SwiperSlide = dynamic(
  () => import('swiper/react').then((mod) => mod.SwiperSlide),
  {
    ssr: false,
  }
);

// Import Swiper modules
import { Autoplay, Navigation } from 'swiper/modules';

interface PortfolioClientProps {
  projects: EnrichedProject[];
}

/**
 * Loading skeleton for portfolio cards while Swiper loads
 */
const PortfolioSkeleton = () => (
  <div className={styles.carouselWrapper}>
    <div className={styles.portfolioCard} style={{ opacity: 0.5 }}>
      <div
        className={styles.imageHolder}
        style={{ background: 'var(--color-background-secondary)' }}
      />
      <div className={styles.titleHolder}>
        <div
          style={{
            height: '20px',
            background: 'var(--color-border)',
            borderRadius: '4px',
            marginBottom: '8px',
          }}
        />
        <div
          style={{
            height: '28px',
            background: 'var(--color-border)',
            borderRadius: '4px',
          }}
        />
      </div>
    </div>
  </div>
);

/**
 * Main Portfolio Carousel Component
 */
const PortfolioClient: React.FC<PortfolioClientProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] =
    useState<EnrichedProject | null>(null);

  const handleOpenModal = (project: EnrichedProject) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  // Swiper configuration
  const swiperConfig = {
    modules: [Autoplay, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    navigation: true,
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  };

  return (
    <>
      {/* 
        Carousel Wrapper with CSS Containment 
        contain: layout style; prevents layout recalculations from propagating
        This is MORE EFFECTIVE than contain: content for carousel animations
      */}
      <div className={styles.carouselWrapper}>
        <Suspense fallback={<PortfolioSkeleton />}>
          <Swiper {...swiperConfig} className={styles.carouselContainer}>
            {projects.map((project, index) => (
              <SwiperSlide key={project.slug}>
                <article
                  className={styles.portfolioCard}
                  onClick={() => handleOpenModal(project)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleOpenModal(project);
                    }
                  }}
                  role='button'
                  tabIndex={0}
                  aria-label={`View ${project.name} project details`}>
                  {/* 
                    Image Container with next/image optimization 
                    - priority={index < 2}: First 2 images load immediately (above fold)
                    - sizes: Responsive sizing for proper image selection
                    - fill + object-fit: Prevents layout shift
                  */}
                  <div className={styles.imageHolder}>
                    {project.image && 
                     project.image !== '#' && 
                     project.image.startsWith('/') ? (
                      <Image
                        src={project.image}
                        alt={`${project.name} project screenshot`}
                        fill
                        sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                        style={{ objectFit: 'cover' }}
                        priority={index < 2} // Prioritize first 2 images
                        quality={85}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: 'var(--color-background-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-text-tertiary)',
                          fontSize: '14px',
                        }}
                      >
                        No preview available
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className={styles.titleHolder}>
                    {/* Technology Tags */}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className={styles.techTags}>
                          {project.technologies
                            .slice(0, 2)
                            .map((tech, techIndex) => (
                              <span
                                key={tech.slug}
                                className={styles.techTag}
                                aria-label={`Technology: ${tech.name}`}>
                                {getTechIcon(tech.slug, 14)}
                                <span>{tech.name}</span>
                                {techIndex === 0 &&
                                  project.technologies.length > 1 &&
                                  ' • '}
                              </span>
                            ))}
                        </div>
                      )}

                    {/* Project Title */}
                    <h3>{project.name}</h3>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </Suspense>
      </div>

      {/* Modal for project details */}
      {selectedProject && (
        <PortfolioModalbox value={selectedProject} close={handleCloseModal} />
      )}
    </>
  );
};

export default PortfolioClient;
