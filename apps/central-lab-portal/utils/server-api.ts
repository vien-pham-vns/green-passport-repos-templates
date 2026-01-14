'server only';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { User } from '@/types/user';
import { HEADER_ACCESS_TOKEN } from '@/lib/constants';

import { logHttpRequest } from './logger';
import { toCamel } from './transform';

/**
 * Fetch current user from API
 * Cached with React cache for request deduplication
 */
export const fetchMe = cache(async (): Promise<User | null> => {
  // TODO: Replace with your actual API endpoint
  const url = process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/v1/user/me`
    : 'http://localhost:3000/api/user/me';

  const cookieStore = await cookies();
  const accessToken = cookieStore.get(HEADER_ACCESS_TOKEN)?.value || null;

  if (!accessToken) {
    return null;
  }

  const startTime = Date.now();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await fetch(url, {
      headers,
      next: { revalidate: 60, tags: ['user-me'] },
    });

    const duration = Date.now() - startTime;

    // Log HTTP request
    logHttpRequest('GET', url, response.status, duration, 'FetchMe');

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
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return null;
  }
});

/**
 * Get dummy user for development
 * TODO: Remove this and use fetchMe in production
 */
export const getDummyUser = (): User => {
  return {
    id: 'dummy-user-id',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    name: 'Test User',
    avatar: '',
    role: 'admin',
  };
};
