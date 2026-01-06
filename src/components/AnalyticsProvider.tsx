'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on route change
    const pageName = pathname === '/' ? 'Home' : pathname.split('/').filter(Boolean).join(' / ');

    analytics.trackPageView(pageName, {
      search_params: Object.fromEntries(searchParams?.entries() || []),
    });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
