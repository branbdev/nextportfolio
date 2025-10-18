'use client';

import React, { ReactNode, useEffect, useState, useCallback } from 'react';
import { dataImage, customCursor, aTagClick, sticky } from '@/utilits';
import { MagicCursor } from './MagicCursor';
import { Footer } from './Footer';
import { Navigation } from './Navigation';
import { MenuTrigger } from './MenuTrigger';
import { PanelContent } from './PanelContent';
import styles from './AppShell.module.css';

interface AppShellProps {
  children: ReactNode;
}

/**
 * AppShell Component
 *
 * Replaces the old src/layouts/Layout.tsx from the Pages Router.
 * This is the main structural wrapper for the entire application.
 *
 * Architecture:
 * - Left side: Main content area (children) + footer
 * - Right side: Panel with animated title and menu trigger
 * - Hidden navigation: Slides in from right when menu is opened
 * - Magic cursor: Custom cursor that follows mouse
 *
 * Performance Notes:
 * - This is a client component because it uses browser APIs (window, scroll events)
 * - Effects are cleaned up properly to prevent memory leaks
 * - Cursor and navigation are isolated to prevent re-renders
 */
export function AppShell({ children }: AppShellProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Initialize utility functions for images, cursor, links, and sticky header
    dataImage();
    customCursor();
    aTagClick();

    // Add scroll listener for sticky functionality
    const handleScroll = () => sticky();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Use useCallback to memoize these functions and prevent infinite loops
  // in child components that use them as dependencies in useEffect
  const toggleMenu = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return (
    <div className={`${styles.wrapper} ${isNavOpen ? styles.navOpened : ''}`}>
      <div className={styles.content}>
        {/* Main Left Part - Content Area */}
        <div className={styles.left}>
          <div className={styles.page}>{children}</div>
          <Footer />
        </div>

        {/* Main Right Part - Panel & Menu Trigger */}
        <div className={styles.right}>
          <MenuTrigger onToggle={toggleMenu} isOpen={isNavOpen} />
          <PanelContent />
        </div>
      </div>

      {/* Hidden Navigation - Slides in from right */}
      <Navigation isOpen={isNavOpen} onClose={closeMenu} />

      {/* Magic Cursor - Custom cursor effect */}
      <MagicCursor />
    </div>
  );
}
