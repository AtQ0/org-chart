'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Footer from '../footer/Footer';
import MobileNavbar from '../navbar/MobileNavBar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isHome = pathname === '/';
  const isAuthenticated = !!session;

  const showHeader = !isHome && isAuthenticated;
  const showFooter = !isHome && isAuthenticated;

  return (
    <>
      {showHeader && (
        <header className="w-full">
          <MobileNavbar />
        </header>
      )}

      <main className="flex-1 w-full">{children}</main>

      {showFooter && (
        <footer className="w-full">
          <Footer />
        </footer>
      )}
    </>
  );
}
