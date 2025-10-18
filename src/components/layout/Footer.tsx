'use client';

import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer Component
 *
 * Simple footer with scroll-to-top functionality.
 * Migrated from src/layouts/Footer.tsx
 */
export function Footer() {
  const scrollTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer} id='footer'>
      <div className={styles.topButton}>
        <button
          onClick={scrollTop}
          className={styles.scrollToTop}
          aria-label='Scroll to top'
          type='button'>
          <span className={styles.arrow} />
        </button>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Brandon Bowen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
