'use client';

import React from 'react';
import styles from './MenuTrigger.module.css';

interface MenuTriggerProps {
  onToggle: () => void;
  isOpen?: boolean;
}

/**
 * MenuTrigger Component
 *
 * Hamburger menu button that toggles the navigation panel.
 * Migrated from src/layouts/Trigger.tsx
 */
export function MenuTrigger({ onToggle, isOpen = false }: MenuTriggerProps) {
  return (
    <div className={styles.trigger}>
      <span className={styles.text}>Menu</span>
      <button
        type='button'
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={onToggle}
        aria-label='Toggle navigation menu'
        aria-expanded={isOpen}>
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>
    </div>
  );
}
