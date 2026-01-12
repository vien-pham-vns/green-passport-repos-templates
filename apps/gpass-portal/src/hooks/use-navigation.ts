import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

/**
 * Custom hook for handling navigation with loading state
 * Simplifies navigation patterns across the app
 */
export function useNavigation() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const navigate = (
    url: Route | string,
    options?: { scroll?: boolean },
    isPush?: true
  ) => {
    if (!isPush) {
      return startTransition(() => {
        router.replace(url as Route, options);
      });
    }

    return startTransition(() => {
      router.push(url as Route, options);
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
