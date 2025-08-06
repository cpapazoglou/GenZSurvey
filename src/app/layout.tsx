import React from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gen Z Survey - Understanding the Digital Generation',
  description: 'Exploring the thoughts, behaviors, and perspectives of Generation Z through comprehensive research and insights.',
  icons: {
    icon: 'data:,', // Empty favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
