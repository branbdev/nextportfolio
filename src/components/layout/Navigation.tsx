'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Navigation Component
 *
 * Hidden navigation panel that slides in from the right.
 * Migrated from src/layouts/Nav.tsx with improvements:
 * - Uses Next.js App Router navigation hooks
 * - Better accessibility (ARIA attributes)
 * - Scoped CSS Module styles
 * - Smooth transitions
 */
export function Navigation({ isOpen, onClose }: NavigationProps) {
  const pathname = usePathname();

  // Close nav on route change (but not on initial mount)
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // We only want to run this when pathname changes, not when onClose changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Handle hash link navigation (for homepage sections)
  const handleHashClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string
  ) => {
    e.preventDefault();
    onClose();

    // If we're on the homepage, just scroll to the hash
    if (pathname === '/') {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Otherwise, navigate to homepage with hash
      window.location.href = `/${hash}`;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Navigation Panel */}
      <nav
        className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}
        aria-label='Main navigation'
        aria-hidden={!isOpen}>
        {/* Close Button */}
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label='Close navigation menu'
          type='button'>
          <span className={styles.closeLine} />
          <span className={styles.closeLine} />
        </button>

        {/* Navigation Content */}
        <div className={styles.content}>
          <div className={styles.menu}>
            <h3 className={styles.label}>Menu</h3>
            <ul className={styles.list}>
              <li
                className={styles.item}
                style={{ transitionDelay: isOpen ? '100ms' : '0ms' }}>
                <a
                  href='#home'
                  onClick={(e) => handleHashClick(e, '#home')}
                  className={styles.link}>
                  Home
                </a>
              </li>
              <li
                className={styles.item}
                style={{ transitionDelay: isOpen ? '200ms' : '0ms' }}>
                <a
                  href='#about'
                  onClick={(e) => handleHashClick(e, '#about')}
                  className={styles.link}>
                  About
                </a>
              </li>
              <li
                className={styles.item}
                style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}>
                <a
                  href='#portfolio'
                  onClick={(e) => handleHashClick(e, '#portfolio')}
                  className={styles.link}>
                  Portfolio
                </a>
              </li>
              <li
                className={styles.item}
                style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}>
                <Link href='/blog' className={styles.link} onClick={onClose}>
                  Blog
                </Link>
              </li>
              <li
                className={styles.item}
                style={{ transitionDelay: isOpen ? '500ms' : '0ms' }}>
                <a
                  href='#contact'
                  onClick={(e) => handleHashClick(e, '#contact')}
                  className={styles.link}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Brandon B.
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
