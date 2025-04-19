// In your RootLayout.tsx (Server Component)
import type { Metadata } from 'next';
import ClientSessionProvider from '../components/providers/ClientSessionProvider';
import './globals.css';

// Import ClientSessionProvider

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <ClientSessionProvider>
          {' '}
          {/* Wrap the session provider in a client-side component */}
          <header>{/* Add your navigation, logo, etc. here */}</header>
          <main>{children}</main>
          <footer>{/* Add footer content here */}</footer>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
