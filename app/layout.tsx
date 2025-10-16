import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Brandon Bowen - Full-Stack Software Engineer | .NET & React',
  description:
    'Full-stack software engineer specializing in .NET, React, and modern web development',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {children}
      </body>
    </html>
  );
}
