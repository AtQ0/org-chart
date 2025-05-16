'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Footer from '../footer/Footer';
import Navbar from '../navbar/NavBar';
import Searchbar from '../searchbar/Searchbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const isHome = pathname === '/';
  const isAuthenticated = !!session;

  const showHeader = !isHome && isAuthenticated;
  const showFooter = !isHome && isAuthenticated;

  // Check if session is not null before accessing session.user
  const userRole = session?.user?.role; // Avoiding session! to handle null safely

  return (
    <>
      {showHeader && (
        <header className="w-full">
          <Navbar />
        </header>
      )}

      <main className="flex-1 w-full p-5 flex flex-col gap-5 lg:px-10 overflow-auto max-h-screen">
        {children}
      </main>

      {showFooter && (
        <footer className="w-full">
          <Footer />
        </footer>
      )}
    </>
  );
}
