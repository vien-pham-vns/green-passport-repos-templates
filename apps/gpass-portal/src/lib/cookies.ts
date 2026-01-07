'use server';

import { cookies } from 'next/headers';
import { cache } from 'react';

import { AppConfig } from 'app-config';
import { Locale } from 'lib/i18n-config';

import {
  HEADER_ACCESS_TOKEN,
  NEXT_LOCALE,
  PROFILE_ID_COOKIE_NAME,
  TOKEN_COOKIE_NAME,
} from '@/constant/common';

/**
 * Locale
 */
export const getLocale = cache(async function (): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = (cookieStore.get(NEXT_LOCALE)?.value || 'th') as Locale;
  return locale;
});

export async function setLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(NEXT_LOCALE, locale, {
    httpOnly: true,
    secure: AppConfig.DEPLOYMENT_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
}

/**
 * Profile ID
 * @returns
 */
export async function getProfileId(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(PROFILE_ID_COOKIE_NAME)?.value || null;
}

export async function setProfileId(profileId: string) {
  const cookieStore = await cookies();
  cookieStore.set(PROFILE_ID_COOKIE_NAME, profileId, {
    httpOnly: true,
    secure: AppConfig.DEPLOYMENT_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}

/**
 * For LOCAL_DEV only: Set authentication token in cookie to pass check in server-side
 * @param token bearer token
 */
export async function setCredential(token: string) {
  const cookieStore = await cookies();
  if (AppConfig.LOCAL_DEV) {
    cookieStore.set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: AppConfig.DEPLOYMENT_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
  }

  // This is force server api using header authorization in server to server.
  cookieStore.set(HEADER_ACCESS_TOKEN, token, {
    httpOnly: true,
    secure: AppConfig.DEPLOYMENT_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });
}
