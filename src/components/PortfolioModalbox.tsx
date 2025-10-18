import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { EnrichedProject } from '../lib/taxonomies';
import { IconGithub, IconExternal, getTechIcon } from './Icons';
import styles from '@/styles/components/Portfolio.module.css';

interface PortfolioModalboxProps {
  close: () => void;
  value: EnrichedProject | null;
}

const PortfolioModalbox: React.FC<PortfolioModalboxProps> = ({
  close,
  value,
}) => {
  const [project, setProject] = useState<EnrichedProject | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) {
      setProject(value);
    }
  }, [value]);

  // A11y: close on Escape and trap initial focus to the close button
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      }
      if (e.key === 'Tab') {
        // Basic focus trap within the dialog
        const container = dialogRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;
        const isShift = e.shiftKey;
        if (!isShift && active === last) {
          e.preventDefault();
          first.focus();
        } else if (isShift && active === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    // prevent background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', onKeyDown);
    // focus the close button
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, close]);

  if (!project) return null;

  return (
    <div className={styles.modalOverlay} onClick={close}>
      <div
        className={styles.modalContent}
        role='dialog'
        aria-modal='true'
        aria-labelledby='project-modal-title'
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 id='project-modal-title'>{project.name}</h2>
          <button
            ref={closeBtnRef}
            className={styles.closeButton}
            onClick={close}
            aria-label='Close project details dialog'>
            ×
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalImage}>
            {project.image &&
            project.image !== '#' &&
            project.image.startsWith('/') ? (
              <Image
                src={project.image}
                alt={`${project.name} project screenshot`}
                width={800}
                height={500}
                style={{ width: '100%', height: 'auto' }}
                quality={90}
                priority // Modal images should load quickly
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '300px',
                  background: 'var(--color-background-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-secondary)',
                }}>
                No image available
              </div>
            )}
          </div>
          <div className={styles.modalInfo}>
            <div className={styles.techStack}>
              {project.technologies.map((tech, index) => (
                <span key={index} className={styles.techStackTag}>
                  {getTechIcon(tech.slug, 16)}
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
            <p className={styles.projectDescription}>{project.description}</p>
            <div className={styles.projectLinks}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.demoLink}>
                  <IconExternal size={18} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.codeLink}>
                  <IconGithub size={18} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModalbox;
