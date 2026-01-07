'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

/**
 * PostHog Provider for Next.js 15
 *
 * Simplified provider wrapper for PostHog React context.
 *
 * Note:
 * - PostHog initialization moved to instrumentation-client.ts (Next.js 15.3+ pattern)
 * - User identification moved to lib/analytics-sync.ts (outside React tree)
 * - Pageview tracking is automatic with 'defaults: 2025-05-24' config
 *
 * 
 * Why PostHogProvider Was Not Needed
 * PostHogProvider is ONLY needed if you use:
  - usePostHog() hook
  - useFeatureFlagEnabled() hook
  - useActiveFeatureFlags() hook
  - Any PostHog React hooks/components
 */

export function PostHogProvider({ children }: { readonly children: React.ReactNode }) {
  return <PHProvider client={posthog}>{children}</PHProvider>;
}
