/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';

type Breakpoint =
  | 'smallMobile'   // 0–375
  | 'largeMobile'   // 376–480
  | 'tablet'        // 481–768
  | 'smallLaptop'   // 769–1024
  | 'laptop'        // 1025–1440
  | 'xl'            // ≥1441
  | 'unknown';      // before mount (SSR)

const useBreakpoint: any = () => {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // set once on mount and on resize
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const breakpoint: Breakpoint = useMemo(() => {
    if (width == null) return 'unknown';
    if (width <= 375) return 'smallMobile';
    if (width <= 480) return 'largeMobile';
    if (width <= 768) return 'tablet';
    if (width <= 1024) return 'smallLaptop';
    if (width <= 1440) return 'laptop';
    return 'xl';
  }, [width]);

  const mounted = width !== null;
  const isMobile = breakpoint === 'smallMobile' || breakpoint === 'largeMobile';
  const isDesktop =
    breakpoint === 'smallLaptop' || breakpoint === 'laptop' || breakpoint === 'xl';

  return {
    breakpoint,
    width,         // handy if you need it
    mounted,       // use to avoid first-paint flicker if necessary
    isMobile,
    isTablet: breakpoint === 'tablet',
    isSmallLaptop: breakpoint === 'smallLaptop',
    isLaptop: breakpoint === 'laptop',
    isXl: breakpoint === 'xl',
    isDesktop,
  };
}

export default useBreakpoint