import { useEffect, useState } from 'react';

type OverlayProps = {
  open: boolean;
  onClick?: () => void;
  className?: string;
  durationClass?: string;
  children?: React.ReactNode;
};

export default function Overlay({
  open,
  onClick,
  className = 'bg-palette-background-transparent',
  durationClass = 'duration-300',
  children,
}: OverlayProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      // mount + start from opacity-0
      setMounted(true);
      // flip to opacity-100 so it animates
      requestAnimationFrame(() => setVisible(true));
    } else {
      // Hide on transition end
      setVisible(false);
    }
  }, [open]);

  const handleTransitionEnd = () => {
    if (!visible) setMounted(false);
  };

  return (
    <div
      onClick={onClick}
      onTransitionEnd={handleTransitionEnd}
      aria-hidden={!visible}
      className={`${mounted ? '' : 'hidden'} fixed inset-0 z-5 ${className}
                  transition-opacity ${durationClass}
                  ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {children}
    </div>
  );
}
