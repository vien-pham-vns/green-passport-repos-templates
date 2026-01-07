'use server';

import { redirect } from 'next/navigation';

import { fetchMe } from 'utils/server-api';

import { clearAuthCookies, getAuthToken } from '@/lib/auth';

export const redirectToLogin = async function () {
  await clearAuthCookies();
  redirect('/login');
};

export async function getCurrentUser() {
  const token = await getAuthToken();

  if (!token) {
    console.debug('No auth token, redirecting to login');
    redirect('/login');
  }

  const user = await fetchMe();
  if (!user) {
    console.debug('Invalid auth token, redirecting to login');
    redirect('/login');
  }

  return user;
}
