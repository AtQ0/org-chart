import React from 'react';

type FlexContainerProps = {
  as?: 'div' | 'section';
  backgroundColor?: string;
  children: React.ReactNode;
  className?: string;
  directionMobileView: 'row' | 'col';
  directionTabletView: 'row' | 'col';
  directionLaptopView: 'row' | 'col';
  directionDesktopView: 'row' | 'col';
  gap?: '0' | '1' | '2' | '3' | '5' | '6' | '8' | '10';
  padding?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7';
  stretchChildren?: boolean;
};

function getFlexDirectionClass(prefix: string, direction: 'row' | 'col') {
  if (direction === 'row') return `${prefix}:flex-row`;
  if (direction === 'col') return `${prefix}:flex-col`;
  return '';
}

export default function FlexContainer({
  as = 'div',
  backgroundColor = '',
  children,
  className = '',
  directionMobileView,
  directionTabletView,
  directionLaptopView,
  directionDesktopView,
  gap = '10',
  padding = '0',
  stretchChildren = false,
}: FlexContainerProps) {
  const Component = as;

  const mobileDirection =
    directionMobileView === 'row' ? 'flex-row' : 'flex-col';
  const tabletDirection = getFlexDirectionClass('md', directionTabletView);
  const laptopDirection = getFlexDirectionClass('lg', directionLaptopView);
  const desktopDirection = getFlexDirectionClass('xl', directionDesktopView);
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
