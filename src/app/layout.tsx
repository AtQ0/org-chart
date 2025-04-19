'use client';

import { usePathname } from 'next/navigation';
import ClientSessionProvider from '../components/providers/ClientSessionProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current path to conditionally render layout elements
  const pathname = usePathname();

  // Do not render header and footer on the homepage
  const showHeader = pathname !== '/';
  const showFooter = pathname !== '/';

  return (
    <html lang="en">
      <head></head>
      <body>
        {/* Wraps the entire app in NextAuth session context */}
        <ClientSessionProvider>
          {/* Conditionally render header based on path */}
          {showHeader && (
            <header>
              <nav>
                <p>yeaah nav</p>
              </nav>
            </header>
          )}

          {/* Main content area */}
          <main>{children}</main>

          {/* Conditionally render footer based on path */}
          {showFooter && <footer>{/* Add footer content here */}</footer>}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
