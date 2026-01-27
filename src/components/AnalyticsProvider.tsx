'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track PageView to Facebook Pixel on route change
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const pageName = pathname === '/' ? 'Home' : pathname.split('/').filter(Boolean).join(' / ');

      (window as any).fbq('track', 'PageView', {
        page_name: pageName,
        page_path: pathname,
        search_params: Object.fromEntries(searchParams?.entries() || []),
      });

      console.log('Facebook Pixel: PageView tracked', { pageName, pathname });
    }

    // Track to Mixpanel
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      const pageName = pathname === '/' ? 'Home' : pathname.split('/').filter(Boolean).join(' / ');

      (window as any).mixpanel.track('Page View', {
        page_name: pageName,
        page_path: pathname,
      });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
