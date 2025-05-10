type FlexProps = {
  children: React.ReactNode;
  className?: string;
  direction: 'row' | 'col';
  gap?: string;
  align?: string;
  justify?: string;
  wrap?: string;
};

export default function Flex({
  children,
  className = '',
  direction,
  gap,
  align,
  justify,
  wrap,
}: FlexProps) {
  const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

  return (
    <div
      className={`flex ${directionClass} ${gap ?? ''} ${align ?? ''} ${justify ?? ''} ${wrap ?? ''} ${className}`}
    >
      {children}
    </div>
  );
}
