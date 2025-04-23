'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Footer from '../footer/Footer';
import Navbar from '../navbar/NavBar';
import Searchbar from '../searchbar/Searchbar';

interface ClientLayoutProps {
  children: React.ReactNode;
  userRole: string;
}

export default function ClientLayout({
  children,
  userRole,
}: ClientLayoutProps) {
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
          <Navbar userRole={userRole} />
        </header>
      )}

      <main className="flex-1 w-full bg-green-500 p-5 flex flex-col gap-5 lg:px-10">
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
