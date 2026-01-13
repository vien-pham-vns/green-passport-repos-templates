import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

/**
 * Custom hook for handling navigation with loading state
 * Simplifies navigation patterns across the app
 */
export function useNavigation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (
    url: Route | string,
    options?: { scroll?: boolean },
    isPush?: true
  ) => {
    // If URL starts with '?', preserve the current pathname
    // If URL is just '?', use pathname without query params
    let finalUrl = url;
    if (url.startsWith('?')) {
      finalUrl = url === '?' ? pathname : `${pathname}${url}`;
    }

    if (!isPush) {
      return startTransition(() => {
        router.replace(finalUrl as Route, options);
      });
    }

    return startTransition(() => {
      router.push(finalUrl as Route, options);
    });
  };

  const refresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const back = () => {
    startTransition(() => {
      router.back();
    });
  };

  return {
    isPending,
    back,
    navigate,
    refresh,
    startTransition,
  };
}
