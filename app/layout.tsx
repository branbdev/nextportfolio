import type { ReactNode } from 'react';
import { Source_Sans_3, Arvo } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import './globals.css';

// Providers & Layout Components
import { AppProviders } from './providers';
import { AppShell } from '@/components/layout/AppShell';
import { Accessibility } from '@/components/layout/Accessibility';

// Font Configuration - Performant, self-hosted via next/font
// Primary sans: Source Sans (modern successor to Source Sans Pro)
const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // minimal weights for performance
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-sans',
});

// Slab-serif for headings and menu bars: Arvo
const arvo = Arvo({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-slab',
});

// Metadata for SEO
export const metadata = {
  metadataBase: new URL('https://brandonbowen.net'),
  title: {
    default: 'Brandon Bowen - Full-Stack Software Engineer | .NET & React',
    template: '%s | Brandon Bowen',
  },
  description:
    'Portfolio for Brandon Bowen, a Full-Stack software engineer based in Corona, CA, specializing in building scalable enterprise applications with .NET, React, and Python. Available for contract, freelance projects and full-time opportunities.',
  keywords: [
    'Brandon Bowen',
    'Full-Stack Developer',
    'Software Engineer',
    '.NET',
    'React',
    'Next.js',
    'Python',
    'TypeScript',
    'Corona CA',
  ],
  authors: [{ name: 'Brandon Bowen' }],
  creator: 'Brandon Bowen',
  publisher: 'Brandon Bowen',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/svg/favicon.svg',
  },
  verification: {
    google: 'C4CjLzj7j9qMsKKZ4E0W4AxpsHWED17IYeQ8hgelrN0',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://brandonbowen.net',
    title: 'Brandon Bowen - Full-Stack Software Engineer',
    description:
      'Full-Stack software engineer specializing in .NET, React, and Python',
    siteName: 'Brandon Bowen Portfolio',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang='en'
      className={`${sourceSans.variable} ${arvo.variable}`}
      suppressHydrationWarning>
      <head>
        {/* Fonts are self-hosted via next/font; no external preconnect needed */}
        <link rel='dns-prefetch' href='https://www.googletagmanager.com' />
      </head>
      <body className={sourceSans.className} suppressHydrationWarning>
        {/* Google Analytics - afterInteractive for better performance */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/* Google reCAPTCHA - lazy load when needed */}
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            strategy='lazyOnload'
          />
        )}

        {/* App Providers wrap all client-side context */}
        <AppProviders>
          <Accessibility />
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
