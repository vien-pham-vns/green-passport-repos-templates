'use server';

import { cookies } from 'next/headers';

import {
  HEADER_ACCESS_TOKEN,
  PROFILE_ID_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from '@/constant/common';

/**
 * Get authentication token from cookie
 * For server-side use
 */
export const getAuthToken = async function () {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE_NAME)?.value || null;
};

/**
 * Get header authorization from cookie
 * For fetch server API
 */
export const getHeaderAccessToken = async function () {
  const cookieStore = await cookies();
  return cookieStore.get(HEADER_ACCESS_TOKEN)?.value || null;
};

/**
 * Clear authentication cookies
 * For server-side use
 */
export async function clearAuthCookies() {
  const cookieStore = await cookies();

  const cookiesToClear = [TOKEN_COOKIE_NAME, PROFILE_ID_COOKIE_NAME, HEADER_ACCESS_TOKEN];

  cookiesToClear.forEach((cookieName) => {
    if (cookieStore.has(cookieName)) {
      cookieStore.delete(cookieName);
    }
  });
}
