/**
 * Analytics Utilities
 *
 * Provides utilities to identify users and reset analytics in PostHog and Google Analytics.
 * Call these functions after user authentication or logout.
 */
import posthog from 'posthog-js';
import type { User } from 'types/user';

export function identifyUser(user: User) {
  identifyInPostHog(user);
}

export function resetAnalytics() {
  if (posthog.__loaded) {
    posthog.reset();
  }
}

function identifyInPostHog(user: User) {
  if (!posthog.__loaded) return;

  posthog.identify(user.id, {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phoneNumber,
  });
}
