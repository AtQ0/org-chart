type FlexProps = {
  children: React.ReactNode;
  className?: string;
  directionMobileView: 'row' | 'col';
  directionDesktopView: 'row' | 'col';
  gap?: '0' | '1' | '2' | '3' | '5' | '6' | '8' | '10';
  align?: string;
  justify?: string;
  wrap?: string;
  as?: 'div' | 'section';
  bg?: string; // <-- background utility
};

export default function Flex({
  children,
  className = '',
  directionMobileView,
  directionDesktopView,
  gap,
  align,
  justify,
  wrap,
  as = 'div',
  bg = '', // default to no background if none provided
}: FlexProps) {
  const Component = as;
  const gapClass = gap ? `gap-${gap}` : '';
  const baseDirectionClass =
    directionMobileView === 'row' ? 'flex-row' : 'flex-col';
  const desktopDirectionClass =
    directionDesktopView === 'row' ? 'md:flex-row' : 'md:flex-col';

  return (
    <Component
      className={`flex ${baseDirectionClass} ${desktopDirectionClass} ${gapClass} ${align ?? ''} ${justify ?? ''} ${wrap ?? ''} ${bg} ${className} w-full`}
    >
      {children}
    </Component>
  );
}
