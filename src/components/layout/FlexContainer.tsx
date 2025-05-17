import React from 'react';

type FlexContainerProps = {
  as?: 'div' | 'section';
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
  directionMobileView?: 'row' | 'col'; // < 768px
  directionTabletView?: 'row' | 'col'; // >768px
  directionLaptopView?: 'row' | 'col'; // >1024px
  directionDesktopView?: 'row' | 'col'; // >1280px
  gap?: '0' | '1' | '2' | '3' | '5' | '6' | '8' | '10';
  padding?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
  stretchChildren?: boolean;
};

function getFlexDirectionClass(prefix: string, direction: 'row' | 'col') {
  return `${prefix}:flex-${direction}`;
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
  const Component = as;

  const mobileDirection = `flex-${directionMobileView}`;
  const tabletDirection = directionTabletView
    ? getFlexDirectionClass('md', directionTabletView)
    : '';
  const laptopDirection = directionLaptopView
    ? getFlexDirectionClass('lg', directionLaptopView)
    : '';
  const desktopDirection = directionDesktopView
    ? getFlexDirectionClass('xl', directionDesktopView)
    : '';

  const gapClass = `gap-${gap}`;
  const paddingClass = `p-${padding}`;

  return (
    <Component
      className={`flex items-stretch ${mobileDirection} ${tabletDirection} ${laptopDirection} ${desktopDirection} ${gapClass} ${backgroundColor} ${paddingClass} ${className}`}
    >
      {React.Children.map(children, (child, i) => (
        <div
          key={i}
          className={`w-full ${stretchChildren ? 'h-full flex-1' : ''}`}
        >
          {child}
        </div>
      ))}
    </Component>
  );
}
