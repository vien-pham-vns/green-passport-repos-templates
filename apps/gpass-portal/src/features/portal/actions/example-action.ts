'use server';

import { cacheLife, revalidateTag } from 'next/cache';

import { apiCore } from '@/services/common';
import { fetchApi, getCookieContext } from '@/utils/fetch-api';
import { type QueryParamsFilter } from '@/utils/fetch-api-helpers';

import { ApplicationApiRequestParam, ApplicationTableResponse } from '../type';

export async function fetchApplicationServer(
  reqParams?: Partial<ApplicationApiRequestParam>
) {
  // const ctx = await getCookieContext();
  return getApplicationListCached(reqParams);
}

async function getApplicationListCached(
  // ctx: CookieContext,
  params?: Partial<ApplicationApiRequestParam>
) {
  'use cache';
  cacheLife('minutes');

  const url = apiCore('/doa/harvest/dashboard', 'v1');
  const response = await fetchApi<ApplicationTableResponse>(url, {
    // ...ctx,
    method: 'GET',
    params: params as unknown as QueryParamsFilter,
    cacheTags: ['application-list'],
    logLabel: 'ApplicationList',
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2FmNzM5LTlhODUtNDViOS04Y2JiLWYzMWQ5MjA3NzQ1OSIsInJvbGUiOiI3NDUwMTkyYy0wODliLTQzOTMtYWY3Ny1iNmNkMzEzOThjZTIiLCJhcHBfYWNjZXNzIjpmYWxzZSwiYWRtaW5fYWNjZXNzIjpmYWxzZSwiaWF0IjoxNzY3NzgyNTU0LCJleHAiOjE3ODMzMzQ1NTQsImlzcyI6ImRpcmVjdHVzIiwidXNlcl9saW5lX2lkIjpudWxsLCJzdWIiOiIvZmUvZGFzaGJvYXJkIiwicHJvZmlsZV9pZCI6IjRmMmUzNDE5LTYzZGItNDI3Ny1iMzFiLTU5MGQ3MWMxMjQ0MyIsImp0aSI6ImExMjBiMDVlLWFlYWQtNDQxZC1iNjI1LTMyZjE3ZjZkNzZhOSJ9.JSdHSoGMZY5wm58_YACcc2opC3MFRcX7e3Kbg7lnBq4',
  });

  if (!response) {
    throw new Error('Failed to fetch harvest record list');
  }

  return response;
}

export const revalidateApplicationList = async () => {
  'use server';
  revalidateTag('application-list', { expire: 10 });
};
