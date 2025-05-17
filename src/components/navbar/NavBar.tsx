'use client';

import {
  Gauge,
  List,
  MagnifyingGlass,
  SignOut,
  TreeStructure,
  UserCircle,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBreakpoints } from '@/hooks/useBreakpoint';
import { BREAKPOINTS } from '@/utils/breakpoints';
import Searchbar from '../searchbar/Searchbar';

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const onDashboard = pathname === '/dashboard';
  const [showFloating, setShowFloating] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);

  const userRole = session?.user?.role;
  const userId = session?.user?.id;

  const { isBelowBreakpoint: isMobile } = useBreakpoints(BREAKPOINTS.mobile);

  const roots = useRef<Set<HTMLElement>>(new Set());
  const addRoot = (el: HTMLElement | null): void => {
    if (el) roots.current.add(el);
  };

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (toggleBtnRef.current) roots.current.add(toggleBtnRef.current);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)'); // xl breakpoint (1280px)
    const handler = (e: MediaQueryListEvent) =>
      e.matches && setShowFloating(false);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const t = e.target as Node;
      const inside = [...roots.current].some(root => root.contains(t));
      if (!inside) {
        setSearchValue('');
        setShowFloating(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleFloating = () => {
    setSearchValue('');
    setShowFloating(prev => !prev);
  };

  const handleSignOut = async () => {
    if (isNavigating) return; // Prevent signing out while navigating

    setIsNavigating(true); // Indicate that navigation is in progress
    await signOut({ redirect: false }); // Sign out the user, but don't redirect automatically
    router.push('/'); // Redirect manually to the home page or any other page you want after sign-out
  };

  const handleNavigate = (path: string) => {
    if (isNavigating || pathname === path) return;
    setIsNavigating(true);
    router.push(path);
  };

  return (
    <div className="relative">
      <nav
        aria-label="Main navigation"
        className="relative flex h-[70px] items-center justify-between bg-palette-transparent-oceanblue p-4 px-5 lg:px-10"
      >
        {/* Left side */}
        <section
          aria-label="Main menu"
          className="flex items-center gap-5 md:gap-2 md:cursor-pointer"
        >
          <button
            className="bg-amber-500"
            onClick={() => handleNavigate('/menu')}
          >
            <List className="h-7 w-7 cursor-pointer" />
          </button>

          <span className="hidden md:inline text-lg font-medium">MENU</span>

          <Link aria-label="Home" className="block md:hidden" href="/">
            <Image
              priority
              alt="Logotype"
              className="object-contain"
              height={43}
              src="/images/logotypes/main-logo.png"
              width={140}
            />
          </Link>
        </section>

        {/* Center logo on md+ */}
        <Link
          aria-label="Home"
          className="hidden md:block md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
          href="/"
        >
          <Image
            priority
            alt="Logotype"
            className="object-contain"
            height={46}
            src="/images/logotypes/main-logo.png"
            width={150}
          />
        </Link>

        {/* Right side */}
        <section aria-label="User actions" className="flex gap-6 items-center">
          {/* Replacement searchbar: hidden under xl, visible at xl+ */}
          <div className="hidden w-[260px] xl:inline" ref={addRoot}>
            <Searchbar value={searchValue} onChange={setSearchValue} />
          </div>

          {/* Toggle button visible only under xl */}
          <button
            className="xl:hidden"
            ref={toggleBtnRef}
            onClick={toggleFloating}
          >
            <MagnifyingGlass className="h-7 w-7 cursor-pointer" />
          </button>

          {userRole === 'admin' ? (
            <div className="flex gap-6 items-center">
              <button
                aria-label="Admin dashboard"
                className="bg-green-600 h-fit p-0.5 cursor-pointer"
                disabled={isNavigating}
                onClick={() =>
                  handleNavigate(onDashboard ? '/org-chart' : '/dashboard')
                }
              >
                {onDashboard ? (
                  <TreeStructure className="h-7 w-7" />
                ) : (
                  <Gauge className="h-7 w-7" />
                )}
              </button>

              <button
                aria-label="Profile"
                className="bg-blue-500 p-0.5 cursor-pointer"
                disabled={isNavigating}
                onClick={() => handleNavigate(`/profile`)}
              >
                <UserCircle className="h-7 w-7" />
              </button>

              <button
                aria-label="Sign out"
                className="bg-yellow-300"
                disabled={isNavigating}
                onClick={handleSignOut}
              >
                <SignOut className="h-7 w-7 cursor-pointer" />
              </button>
            </div>
          ) : (
            <div className="flex gap-6 items-center">
              <button
                aria-label="User profile"
                className="bg-yellow-300"
                disabled={isNavigating}
                onClick={() => handleNavigate(`/user/${userId}`)}
              >
                <UserCircle className="h-7 w-7" />
              </button>

              <button
                aria-label="Sign out"
                className="bg-yellow-300"
                disabled={isNavigating}
                onClick={handleSignOut}
              >
                <SignOut className="h-7 w-7 cursor-pointer" />
              </button>
            </div>
          )}
        </section>
      </nav>

      {/* floating bar visible only under xl */}
      {showFloating && (
        <div className="absolute left-0 right-5 top-16 flex justify-end xl:hidden">
          <div
            className="relative w-[260px] rounded-md bg-white shadow-md p-2"
            ref={addRoot}
          >
            <span
              className={`absolute -top-2 ${
                userRole === 'admin' ? 'left-31.5' : 'left-33.5'
              } w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-white`}
            />
            <Searchbar value={searchValue} onChange={setSearchValue} />
          </div>
        </div>
      )}
    </div>
  );
}
