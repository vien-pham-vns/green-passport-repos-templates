'server only';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { FEATURE_FLAGS } from 'constant/feature-flags';
import { api } from 'services/common';
import { FeatureFlags } from 'types/common';

import { User } from '@/types/user';

import { logHttpRequest } from './logger';
import { toCamel } from './transform';

export const fetchMe = cache(async (): Promise<User | null> => {
  const url = api('user/me', 'v1');
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;
  const startTime = Date.now();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(url, {
    headers,
    next: { revalidate: 60, tags: ['user-me'] },
  });

  const duration = Date.now() - startTime;

  // Log HTTP request
  logHttpRequest('GET', url, response.status, duration, 'Me');

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      return null;
    }

    throw new Error(
      `Failed to fetch user data: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const user = toCamel(data?.data) as User;

  if (!user) {
    throw new Error('User data not found in response');
  }

  return user;
});

export const fetchFeatureFlags = cache(async () => {
  const url = api('feature-flags/get-by-batch', 'v1');
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value || null;
  const startTime = Date.now();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  const requestBody = { keys: FEATURE_FLAGS };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      credentials: 'include',
      body: JSON.stringify(requestBody),
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(1000),
    });

    const duration = Date.now() - startTime;

    // Log HTTP request
    logHttpRequest('POST', url, response.status, duration, 'FeatureFlag');

    if (!response.ok) {
      throw new Error(
        `Failed to fetch feature flags: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();

    return toCamel(result.data) as FeatureFlags;
  } catch {
    // Return default flags with all features disabled on error
    return toCamel(
      FEATURE_FLAGS.reduce(
        (prev, current) => ({
          ...prev,
          [current]: false,
        }),
        {}
      )
    ) as FeatureFlags;
  }
});
