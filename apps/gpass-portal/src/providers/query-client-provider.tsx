'use client';

import { ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        // Don't retry on authentication errors (401/403)
        const axiosError = error as { response?: { status?: number } };
        if (
          axiosError?.response?.status === 401 ||
          axiosError?.response?.status === 403
        ) {
          return false;
        }
        // Don't retry on service unavailable (503) - let user retry manually
        if (axiosError?.response?.status === 503) {
          return false;
        }
        // Retry other errors up to 2 times
        return failureCount < 2;
      },
    },
  },
});

const Provider = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default Provider;
