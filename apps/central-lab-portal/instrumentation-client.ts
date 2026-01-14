/**
 * This file runs automatically when the client-side JavaScript loads in the browser.
 * It's the modern Next.js 15.3+ pattern for initializing client-side tools.
 *
 * Reference: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client
 */
import posthog from "posthog-js";

const POSTHOG_KEY = process.env.POSTHOG_KEY;
const POSTHOG_HOST = process.env.POSTHOG_HOST;

if (POSTHOG_KEY && POSTHOG_HOST) {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    defaults: "2025-05-24", // Automatic pageview and pageleave tracking
    person_profiles: "identified_only",
    secure_cookie: true,
    persistence: "localStorage+cookie",
    capture_dead_clicks: true,
    capture_heatmaps: true,
    autocapture: true,
    capture_exceptions: true,
    capture_performance: true,
  });
}
