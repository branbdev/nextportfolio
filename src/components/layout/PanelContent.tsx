'use client';

import React from 'react';
import PanelContentOld from '@/components/PanelContent';

/**
 * PanelContent Wrapper
 *
 * Temporary wrapper to use the existing PanelContent component.
 * This component contains the animated title and headshot on the right panel.
 *
 * TODO: Refactor PanelContent into a proper CSS Module component
 */
export function PanelContent() {
  return <PanelContentOld />;
}
