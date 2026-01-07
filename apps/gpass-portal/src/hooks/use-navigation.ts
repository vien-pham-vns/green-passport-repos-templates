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

  const navigate = (url: Route | string, options?: { scroll?: boolean }) => {
    startTransition(() => {
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
