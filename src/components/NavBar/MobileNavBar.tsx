import { Gauge, List, UserCircle } from '@phosphor-icons/react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileNavbar() {
  return (
    <nav className="relative bg-palette-transparent-oceanblue flex justify-between items-center p-4 px-5 lg:px-10">
      {/* Left side group */}
      <div className="bg-pink-300 flex items-center gap-5 md:gap-2">
        <button className="bg-amber-500 cursor-pointer">
          <List className="w-7 h-7" />
        </button>

        {/* Show text label on md and up */}
        <span className="text-white bg-amber-300 font-medium text-lg hidden md:inline">
          MENU
        </span>

        {/* Logo only visible on small screens */}
        <Link aria-label="Home" className="block md:hidden" href="/">
          <Image
            alt="My image"
            className="object-cover bg-amber-300"
            height={100}
            src="/images/main-logo-cropped.png"
            width={100}
          />
        </Link>
      </div>

      {/* Logo in center on md and up */}
      <Link
        aria-label="Home"
        className="hidden md:block md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        href="/"
      >
        <Image
          alt="My image"
          className="object-cover bg-amber-300"
          height={120}
          src="/images/main-logo-cropped.png"
          width={120}
        />
      </Link>

      {/* Right side group */}
      <div className="bg-amber-700 flex gap-8 justify-between">
        <button className="bg-amber-500 cursor-pointer">
          <Gauge className="w-7 h-7" />
        </button>
        <button className="bg-amber-500 cursor-pointer">
          <UserCircle className="w-7 h-7" />
        </button>
      </div>
    </nav>
  );
}
