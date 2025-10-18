'use client';

import React, { ReactNode } from 'react';

/**
 * AppProviders
 *
 * Client-side providers wrapper for the App Router.
 * This replaces the old ContextProvider from the Pages Router.
 *
 * In the App Router, providers must be in a separate 'use client' component
 * to allow the root layout to remain a Server Component.
 */

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <>
      {/* Future providers can be added here:
          - Theme Provider (for dark/light mode)
          - Apollo Provider (if still needed for GraphQL)
          - Any other client-side context
      */}
      {children}
    </>
  );
}
