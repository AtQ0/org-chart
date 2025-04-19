'use client';

// Add this line at the top
import { usePathname } from 'next/navigation';
import ClientSessionProvider from '../components/providers/ClientSessionProvider';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Pathname check to conditionally render header
  const pathname = usePathname();
  const showHeader = pathname !== '/';
  const showFooter = pathname !== '/';

  return (
    <html lang="en">
      <head></head>
      <body>
        <ClientSessionProvider>
          {showHeader && (
            <header>
              <nav>
                <p>yeaah nav</p>
              </nav>
            </header>
          )}
          <main>{children}</main>
          {showFooter && <footer>{/* Add footer content here */}</footer>}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
