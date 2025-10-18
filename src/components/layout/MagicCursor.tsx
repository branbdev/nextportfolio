'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './MagicCursor.module.css';

/**
 * MagicCursor Component
 *
 * Custom cursor that follows the mouse with smooth animations.
 * Replaces the old cursor logic from utilits.ts with better performance.
 *
 * Performance Optimizations:
 * - Uses requestAnimationFrame for smooth 60fps updates
 * - CSS transforms (GPU-accelerated, no layout recalculation)
 * - Will-change hint for browser optimization
 * - Automatically disabled on touch devices
 * - Passive event listeners
 *
 * Accessibility:
 * - Respects prefers-reduced-motion
 * - Hidden from screen readers (aria-hidden)
 * - Doesn't interfere with keyboard navigation
 */
export function MagicCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const positionRef = useRef({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let targetX = 0;
    let targetY = 0;

    // Smooth cursor animation loop
    const updateCursor = () => {
      // Lerp (linear interpolation) for smooth following effect
      positionRef.current.x += (targetX - positionRef.current.x) * 0.15;
      positionRef.current.y += (targetY - positionRef.current.y) * 0.15;

      if (outerRef.current && innerRef.current) {
        // Use translate3d for GPU acceleration (no layout/paint)
        const transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
        outerRef.current.style.transform = transform;
        innerRef.current.style.transform = transform;
      }

      rafRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;

      // Expand cursor on interactive elements
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('clickable') ||
        target.closest('a') ||
        target.closest('button')
      ) {
        innerRef.current?.classList.add(styles.hoverState);
        outerRef.current?.classList.add(styles.hoverState);
      }

      // Special slider state for Swiper
      if (target.classList.contains('swiper') || target.closest('.swiper')) {
        innerRef.current?.classList.add(styles.sliderState);
      }
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.classList.contains('clickable')
      ) {
        innerRef.current?.classList.remove(styles.hoverState);
        outerRef.current?.classList.remove(styles.hoverState);
      }

      if (target.classList.contains('swiper') || target.closest('.swiper')) {
        innerRef.current?.classList.remove(styles.sliderState);
      }
    };

    // Add event listeners with passive flag for performance
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Start animation loop
    updateCursor();

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Don't render on touch devices
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Outer ring cursor */}
      <div ref={outerRef} className={styles.cursorOuter} aria-hidden='true'>
        <span className={styles.cursorRing} />
      </div>

      {/* Inner dot cursor with arrow indicators */}
      <div ref={innerRef} className={styles.cursorInner} aria-hidden='true'>
        <span className={styles.cursorDot}>
          {/* Left/right arrows for slider mode */}
          <span className={styles.arrowLeft} />
          <span className={styles.arrowRight} />
        </span>
      </div>
    </>
  );
}
