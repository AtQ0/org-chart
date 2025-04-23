import { useEffect, useState } from 'react';
import { BREAKPOINTS } from '../utils/breakpoints';

export const useBreakpoints = (breakpoint = BREAKPOINTS.mobile) => {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpoint);
    };

    checkWidth();

    window.addEventListener('resize', checkWidth);

    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, [breakpoint]);

  return { isBelowBreakpoint };
};
