'use client';

import React from 'react';
import AccessibilityOld from '@/components/Accessibility';
import styles from './Accessibility.module.css';

/**
 * Accessibility Component Wrapper
 *
 * Temporary wrapper for the existing Accessibility component.
 * This component provides theme switching and accessibility controls.
 *
 * TODO: Refactor into a proper CSS Module component with improved styling
 */
export function Accessibility() {
  return (
    <div className={styles.container} aria-label="Accessibility controls">
      <AccessibilityOld />
    </div>
  );
}
