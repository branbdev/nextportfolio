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
// Swiper core styles (scoped globally by Swiper)
import 'swiper/css';
import 'swiper/css/navigation';

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
import { Autoplay, Navigation, A11y, Keyboard } from 'swiper/modules';

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
  const [lastActiveElement, setLastActiveElement] =
    useState<HTMLElement | null>(null);

  const handleOpenModal = (project: EnrichedProject) => {
    // Remember the element that had focus so we can restore it on close
    if (typeof document !== 'undefined') {
      setLastActiveElement(document.activeElement as HTMLElement | null);
    }
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    // Restore focus on the previously focused element after modal unmounts
    setTimeout(() => {
      lastActiveElement?.focus?.();
    }, 0);
  };

  // Dummy placeholder projects for carousel minimum requirement
  const dummyProjects: EnrichedProject[] = [
    {
      slug: 'placeholder-innovation',
      name: 'Innovation Showcase',
      description: 'Future projects coming soon - stay tuned for cutting-edge developments',
      content: '',
      image: '/img/portfolio/placeholder1.webp',
      technologies: [],
    },
    {
      slug: 'placeholder-excellence',
      name: 'Excellence in Development',
      description: 'More incredible work on the horizon - the journey continues',
      content: '',
      image: '/img/portfolio/placeholder2.webp',
      technologies: [],
    },
  ];

  // Ensure minimum 3 items for carousel animation
  const displayProjects = projects.length >= 3 
    ? projects 
    : [...projects, ...dummyProjects].slice(0, Math.max(3, projects.length));

  // Swiper configuration with loop enabled only when sufficient items
  const swiperConfig = {
    modules: [Autoplay, Navigation, A11y, Keyboard],
    slidesPerView: 1,
    spaceBetween: 30,
    loop: displayProjects.length >= 3,
    autoplay: displayProjects.length >= 3 ? {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    } : false,
    navigation: true,
    a11y: {
      enabled: true,
    },
    keyboard: {
      enabled: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: Math.min(2, displayProjects.length),
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: Math.min(2, displayProjects.length),
        spaceBetween: 40,
      },
      1280: {
        slidesPerView: Math.min(3, displayProjects.length),
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
            {displayProjects.map((project, index) => (
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
                        }}>
                        No preview available
                      </div>
                    )}
                    {/* Floating tech chips overlay (top-left) */}
                    {project.technologies?.length ? (
                      <div className={styles.imageTechOverlay}>
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech.slug}
                            className={styles.imageTechChip}>
                            {getTechIcon(tech.slug, 12)}
                            <span className={styles.imageTechLabel}>
                              {tech.name}
                            </span>
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className={styles.imageTechMore}>
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    ) : null}
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
