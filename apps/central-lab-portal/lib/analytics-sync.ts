/**
 * Analytics Utilities
 *
 * Provides utilities to identify users and reset analytics in PostHog and Google Analytics.
 * Call these functions after user authentication or logout.
 */
import posthog from "posthog-js";

export interface User {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

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
