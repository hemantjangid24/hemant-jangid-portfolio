import { useState, useEffect } from 'react';
export function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false
  );
  useEffect(() => {
    const fn = () => setM(window.innerWidth <= breakpoint);
    window.addEventListener('resize', fn, { passive: true });
    return () => window.removeEventListener('resize', fn);
  }, [breakpoint]);
  return m;
}
