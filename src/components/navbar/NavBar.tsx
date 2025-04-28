import {
  Gauge,
  List,
  MagnifyingGlass,
  SignOut,
  TreeStructure,
  UserCircle,
} from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useBreakpoints } from '@/hooks/useBreakpoint';
import { BREAKPOINTS } from '@/utils/breakpoints';
import Searchbar from '../searchbar/Searchbar';

interface NavbarProps {
  userRole: string;
}

export default function Navbar({ userRole }: NavbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const onDashboard = pathname === '/dashboard';
  const [showFloating, setShowFloating] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  /* breakpoint hook */
  const { isBelowBreakpoint: isMobile } = useBreakpoints(BREAKPOINTS.mobile);

  /*  nodes that shouldn’t trigger outside‑click close  */
  const roots = useRef<Set<HTMLElement>>(new Set());
  const addRoot = (el: HTMLElement | null): void => {
    if (el) roots.current.add(el);
  };

  /* register the magnifier button as an “inside” node */
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (toggleBtnRef.current) roots.current.add(toggleBtnRef.current);
  }, []);

  /* hide floating bar automatically at ≥ lg (1024 px) */
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) =>
      e.matches && setShowFloating(false);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* clear search when clicking outside */
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

  /* menu click handler */
  function handleMenuClick() {
    prompt('yeah');
  }

  /* handlers conditioned on viewport */
  const desktopMenuClick = !isMobile ? handleMenuClick : undefined;
  const mobileHamburgerClick = isMobile ? handleMenuClick : undefined;

  /* toggle button: close → clear text */
  const toggleFloating = () => {
    setSearchValue(''); // reset input every click
    setShowFloating(prev => !prev);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
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
          className="bg-pink-300 flex items-center gap-5 md:gap-2 md:cursor-pointer"
          onClick={desktopMenuClick}
        >
          <button className="bg-amber-500" onClick={mobileHamburgerClick}>
            <List className="h-7 w-7 cursor-pointer" />
          </button>

          <span className="hidden md:inline text-lg font-medium text-white bg-amber-300">
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
          {/* desktop search bar */}
          <div className="hidden w-[260px] lg:inline" ref={addRoot}>
            <Searchbar value={searchValue} onChange={setSearchValue} />
          </div>

          {/* mobile toggle */}
          <button
            className="lg:hidden"
            ref={toggleBtnRef}
            onClick={toggleFloating}
          >
            <MagnifyingGlass className="h-7 w-7 cursor-pointer bg-yellow-300" />
          </button>

          {userRole === 'admin' ? (
            <div className="flex gap-6 items-center">
              {onDashboard ? (
                <button
                  aria-label="Admin dashboard"
                  className="bg-green-600 h-fit p-0.5 cursor-pointer"
                  onClick={() => router.push('/org-chart')}
                >
                  <TreeStructure className="h-7 w-7" />
                </button>
              ) : (
                <button
                  aria-label="Admin dashboard"
                  className="bg-green-600 h-fit p-0.5 cursor-pointer"
                  onClick={() => router.push('/dashboard')}
                >
                  <Gauge className="h-7 w-7" />
                </button>
              )}

              <button aria-label="User profile" className="bg-blue-500 p-0.5">
                <UserCircle className="h-7 w-7" />
              </button>
              <button aria-label="Sign out" className="bg-yellow-300">
                <SignOut
                  className="h-7 w-7 cursor-pointer"
                  onClick={handleSignOut}
                />
              </button>
            </div>
          ) : (
            <div className="flex gap-6 items-center">
              <button aria-label="User profile" className="bg-yellow-300">
                <UserCircle className="h-7 w-7" />
              </button>
              <button aria-label="Sign out" className="bg-yellow-300">
                <SignOut
                  className="h-7 w-7 cursor-pointer"
                  onClick={handleSignOut}
                />
              </button>
            </div>
          )}
        </section>
      </nav>

      {/* floating bar visible only under lg */}
      {showFloating && (
        <div className="absolute left-0 right-5 top-16 flex justify-end lg:hidden">
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
