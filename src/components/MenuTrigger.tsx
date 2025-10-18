'use client';

/**
 * @file MenuTrigger Component - Hamburger Menu Button
 *
 * Features:
 * - Touch-friendly 44px minimum size
 * - Keyboard accessible
 * - ARIA label for screen readers
 * - Hover animations
 * - Focus indicators
 *
 * This replaces the legacy Trigger component
 */

import React from 'react';
import styles from '@/styles/components/Navigation.module.css';

interface MenuTriggerProps {
  onClick: () => void;
  isOpen: boolean;
}

const MenuTrigger: React.FC<MenuTriggerProps> = ({ onClick, isOpen }) => {
  return (
    <button
      className={styles.menuTrigger}
      onClick={onClick}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls='main-navigation'
      type='button'>
      <span className={styles.triggerText}>Menu</span>
      <div className={styles.hamburger} aria-hidden='true'>
        <span />
        <span />
        <span />
      </div>
    </button>
  );
};

export default MenuTrigger;
