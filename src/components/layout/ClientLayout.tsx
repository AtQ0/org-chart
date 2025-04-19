'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

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
        <header>
          <nav>
            <p>yeaah nav</p>
          </nav>
        </header>
      )}

      <main>{children}</main>

      {showFooter && (
        <footer>
          <p>Yeah Footer</p>
        </footer>
      )}
    </>
  );
}
