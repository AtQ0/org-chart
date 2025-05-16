import React from 'react';

type FlexProps = {
  as?: 'div' | 'section';
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
  directionMobileView: 'row' | 'col';
  directionTabletView: 'row' | 'col'; // md: ≥768px
  directionLaptopView: 'row' | 'col'; // lg: ≥1024px (renamed from desktop)
  directionDesktopView: 'row' | 'col'; // xl: ≥1280px (new)
  gap?: '0' | '1' | '2' | '3' | '5' | '6' | '8' | '10';
  padding?: '1' | '2' | '3' | '4' | '5' | '6' | '7';
  stretchChildren?: boolean;
};

export default function Flex({
  as = 'div',
  backgroundColor = '',
  children,
  className = '',
  directionMobileView,
  directionTabletView,
  directionLaptopView,
  directionDesktopView,
  gap = '2',
  padding = '3',
  stretchChildren = false,
}: FlexProps) {
  const Component = as;

  const mobileDirection =
    directionMobileView === 'row' ? 'flex-row' : 'flex-col';
  const tabletDirection = directionTabletView
    ? `md:flex-${directionTabletView}`
    : '';
  const laptopDirection = directionLaptopView
    ? `lg:flex-${directionLaptopView}`
    : '';
  const desktopDirection = directionDesktopView
    ? `xl:flex-${directionDesktopView}`
    : '';
  const gapClass = gap ? `gap-${gap}` : '';
  const paddingClass = padding ? `p-${padding}` : '';

  return (
    <Component
      className={`flex ${mobileDirection} ${tabletDirection} ${laptopDirection} ${desktopDirection} ${gapClass} ${backgroundColor} ${paddingClass} ${className}`}
    >
      {React.Children.map(children, (child, i) => (
        <div key={i} className={`w-full ${stretchChildren ? 'h-full' : ''}`}>
          {child}
        </div>
      ))}
    </Component>
  );
}
