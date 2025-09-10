'use client';

import {
  Gauge,
  List,
  MagnifyingGlass,
  SignOut,
  TreeStructure,
  UserCircle,
  X,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useBreakpoints } from '@/hooks/useBreakpoint';
import { BREAKPOINTS } from '@/utils/breakpoints';
import Overlay from '../overlay/Overlay';
import Searchbar from '../searchbar/Searchbar';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const onDashboard = pathname === '/dashboard';

  const [showFloating, setShowFloating] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const userRole = session?.user?.role;
  const userId = session?.user?.id;

  const { isBelowBreakpoint: isMobile } = useBreakpoints(BREAKPOINTS.mobile);

  // click-outside roots for the floating search
  const roots = useRef<Set<HTMLElement>>(new Set());
  const addRoot = (el: HTMLElement | null): void => {
    if (el) roots.current.add(el);
  };

  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (toggleBtnRef.current)
      roots.current.add(toggleBtnRef.current as HTMLElement);
  }, []);

  // close floating search when reaching xl and up
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1280px)'); // xl breakpoint
    const handler = (e: MediaQueryListEvent) =>
      e.matches && setShowFloating(false);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // click outside handler for floating search
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

  // lock body scroll while menu is open
  useEffect(() => {
    if (isInView) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [isInView]);

  // close menu on Escape
  useEffect(() => {
    if (!isInView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsInView(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isInView]);

  const toggleFloating = () => {
    setSearchValue('');
    setShowFloating(prev => !prev);
  };

  const handleSignOut = async () => {
    if (isNavigating) return;
    setIsNavigating(true);
    await signOut({ redirect: false });
    router.push('/');
  };

  const handleNavigate = (path: string) => {
    if (isNavigating || pathname === path) return;
    setIsNavigating(true);
    router.push(path);
  };

  const handleMenue = () => setIsInView(v => !v);

  return (
    <div>
      {/* Fade-in/out overlay only after fade-out completes */}
      <Overlay open={isInView} onClick={() => setIsInView(false)} />

      {/* Sliding drawer */}
      <section
        className={`bg-palette-oceanblue absolute flex flex-col z-10 h-full w-80 transform transition-transform duration-300 ease-in-out ${
          isInView ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-hidden={!isInView}
      >
        <div className="bg-palette-transparent-oceanblue flex justify-end h-[70px] p-1">
          <button
            aria-label="Exit menu"
            className="p-2"
            disabled={isNavigating}
            onClick={handleMenue}
          >
            <X size={32} className="h-7 w-7 cursor-pointer" />
          </button>
        </div>
        <div className="bg-palette-transparent-oceanblue flex-1 flex justify-center p-3 pt-12 pb-32">
          <ul className="bg-palette-transparent-oceanblue w-full text-2xl flex flex-col gap-4 p-2">
            <li>
              {' '}
              <Link href={'/profile'}>MY PROFILE</Link>{' '}
            </li>
            <li>
              <Link href={'/dashboard'}>ADMIN DASHBOARD</Link>
            </li>
            <li>
              <Link href={'/org-chart'}>ORGANIZATION CHART</Link>
            </li>
            <li>SETTINGS</li>
            <li>
              <button className="cursor-pointer" onClick={handleSignOut}>
                EXIT
              </button>
            </li>
          </ul>
        </div>
      </section>

      {/* Top nav */}
      <nav
        aria-label="Main navigation"
        className="relative flex h-[70px] items-center justify-between bg-palette-transparent-oceanblue p-4 px-5 lg:px-10"
      >
        {/* Left side */}
        <section
          aria-label="Main menu"
          className="flex items-center gap-5 md:gap-0"
        >
          <button onClick={handleMenue}>
            <List className="h-7 w-7 cursor-pointer" />
          </button>

          <span
            className="hidden md:inline pl-0.5 text-lg font-medium cursor-pointer leading-none"
            onClick={handleMenue}
          >
            MENU
          </span>

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
                className="h-fit p-0.5 cursor-pointer"
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
                className="p-0.5 cursor-pointer"
                disabled={isNavigating}
                onClick={() => handleNavigate(`/profile`)}
              >
                <UserCircle className="h-7 w-7" />
              </button>

              <button
                aria-label="Sign out"
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
                disabled={isNavigating}
                onClick={() => handleNavigate(`/user/${userId}`)}
              >
                <UserCircle className="h-7 w-7" />
              </button>

              <button
                aria-label="Sign out"
                disabled={isNavigating}
                onClick={handleSignOut}
              >
                <SignOut className="h-7 w-7 cursor-pointer" />
              </button>
            </div>
          )}
        </section>
      </nav>

      {/* Floating search visible only under xl */}
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
