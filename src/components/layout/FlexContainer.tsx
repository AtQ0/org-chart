'use client';

import React from 'react';

type Dir = 'row' | 'col';
type Gap = '0' | '1' | '2' | '3' | '5' | '6' | '8' | '10';
type Pad = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';

type FlexContainerProps = {
  as?: 'div' | 'section';
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;

  /** Base (mobile-first) direction: < 768px */
  directionMobileView?: Dir;
  /** ≥768px */
  directionTabletView?: Dir;
  /** ≥1024px */
  directionLaptopView?: Dir;
  /** ≥1280px */
  directionDesktopView?: Dir;

  gap?: Gap;
  padding?: Pad;

  stretchChildren?: boolean;
};

const dirClass = {
  row: 'flex-row',
  col: 'flex-col',
} as const;

const gapMap: Record<Gap, string> = {
  '0': 'gap-0',
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '5': 'gap-5',
  '6': 'gap-6',
  '8': 'gap-8',
  '10': 'gap-10',
};

const paddingMap: Record<Pad, string> = {
  '0': 'p-0',
  '1': 'p-1',
  '2': 'p-2',
  '3': 'p-3',
  '4': 'p-4',
  '5': 'p-5',
  '6': 'p-6',
  '7': 'p-7',
};

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export default function FlexContainer({
  as = 'div',
  backgroundColor = '',
  children,
  className = '',
  directionMobileView = 'col',
  directionTabletView,
  directionLaptopView,
  directionDesktopView,
  gap = '10',
  padding = '0',
  stretchChildren = false,
}: FlexContainerProps) {
  const Component: any = as;

  // Responsive direction classes as literal strings so Tailwind sees them
  const baseDir = dirClass[directionMobileView];
  const mdDir =
    directionTabletView === 'row'
      ? 'md:flex-row'
      : directionTabletView === 'col'
        ? 'md:flex-col'
        : '';
  const lgDir =
    directionLaptopView === 'row'
      ? 'lg:flex-row'
      : directionLaptopView === 'col'
        ? 'lg:flex-col'
        : '';
  const xlDir =
    directionDesktopView === 'row'
      ? 'xl:flex-row'
      : directionDesktopView === 'col'
        ? 'xl:flex-col'
        : '';

  const gapClass = gapMap[gap];
  const paddingClass = paddingMap[padding];

  return (
    <Component
      className={cx(
        'flex items-stretch',
        baseDir,
        mdDir,
        lgDir,
        xlDir,
        gapClass,
        paddingClass,
        backgroundColor,
        className,
      )}
    >
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          className={cx(stretchChildren ? 'flex-1 h-full' : 'w-full')}
        >
          {child}
        </div>
      ))}
    </Component>
  );
}
