'use server';

import { cookies } from 'next/headers';

import { AppConfig } from 'app-config';
import { NEXT_LOCALE } from 'constant/common';
import { logHttpRequest } from 'utils/logger';
import { toCamel, toSnake } from 'utils/transform';

import { getHeaderAccessToken } from '@/lib/auth';

import { type QueryParamsFilter, buildRequestParams } from './fetch-api-helpers';

/**
 * Extended RequestInit with Next.js specific options
 */
interface NextRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

/**
 * Fetch API configuration options
 */
export interface FetchApiOptions extends Omit<NextRequestInit, 'body'> {
  /** Query parameters to append to URL */
  params?: QueryParamsFilter;
  /** Request body (will be automatically converted to snake_case) */
  body?: unknown;
  /** Cache tags for Next.js cache invalidation */
  cacheTags?: string[];
  /** Whether to transform response to camelCase (default: true) */
  transformResponse?: boolean;
  /** Whether to transform request body to snake_case (default: true) */
  transformRequest?: boolean;
  /** Custom access token (optional, will use cookie if not provided) */
  accessToken?: string;
  /** Custom locale (optional, will use cookie if not provided) */
  locale?: string;
  /** Whether to include credentials (default: true) */
  includeCredentials?: boolean;
  /** Whether to log HTTP requests (default: true) */
  logRequest?: boolean;
  /** Label for logging purposes */
  logLabel?: string;
}

/**
 * Cookie context containing auth and locale information
 * Use this when you need to pass cookies data into cached functions
 */
export interface CookieContext {
  accessToken: string;
  locale: string;
}

/**
 * Get cookie context (accessToken and locale) for use in cached functions
 * Call this OUTSIDE of 'use cache' functions, then pass the result in
 *
 * @example
 * export async function getData(params) {
 *   const ctx = await getCookieContext();
 *   return getDataCached(ctx, params);
 * }
 *
 * async function getDataCached(ctx: CookieContext, params) {
 *   'use cache';
 *   return fetchApi(url, { ...ctx, params, cacheTags: ['data'] });
 * }
 */
export async function getCookieContext(): Promise<CookieContext> {
  const accessToken = await getHeaderAccessToken();
  const cookieStore = await cookies();
  const locale = cookieStore.get(NEXT_LOCALE)?.value || 'en';

  if (!accessToken) {
    throw new Error('Failed to get accessToken');
  }

  return { accessToken, locale };
}

/**
 * Core fetch API function
 *
 * Simple usage:
 *
 * @example
 * // For cached requests - use the 2-function pattern
 * export async function getData(params) {
 *   const ctx = await getCookieContext();
 *   return getDataCached(ctx, params);
 * }
 *
 * async function getDataCached(ctx: CookieContext, params) {
 *   'use cache';
 *   return fetchApi(url, { ...ctx, params, cacheTags: ['data'] });
 * }
 *
 * // For mutations (no cache) - call directly
 * export async function createData(data) {
 *   const ctx = await getCookieContext();
 *   return fetchApi(url, { ...ctx, method: 'POST', body: data });
 * }
 */
export async function fetchApi<T>(
  path: string,
  options: FetchApiOptions = {}
): Promise<T> {
  const {
    params,
    body,
    cacheTags = [],
    transformResponse = true,
    transformRequest = true,
    accessToken,
    locale = 'en',
    includeCredentials = true,
    logRequest = true,
    logLabel,
    headers: customHeaders,
    ...fetchOptions
  } = options;

  if (!accessToken) {
    throw new Error(
      'accessToken is required. Use getCookieContext() to get it, then pass it in options.'
    );
  }

  // Build URL with query parameters
  let url = path;
  if (params) {
    const requestParams = buildRequestParams(params);
    const queryString = new URLSearchParams(
      requestParams as Record<string, string>
    ).toString();
    url = queryString ? `${path}?${queryString}` : path;
  }

  // Prepare headers
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    'X-app-language': locale,
    'X-source-channel': AppConfig.BASE_PATH,
    ...customHeaders,
  };

  // Prepare request options
  const requestOptions: NextRequestInit = {
    ...fetchOptions,
    headers,
    credentials: includeCredentials ? 'include' : fetchOptions.credentials,
  };

  // Add cache tags if provided
  if (cacheTags.length > 0) {
    requestOptions.next = {
      ...requestOptions.next,
      tags: cacheTags,
    };
  }

  // Transform and add body if present
  if (body) {
    requestOptions.body = JSON.stringify(transformRequest ? toSnake(body) : body);
  }

  // Log request start time
  const startTime = Date.now();

  try {
    const response = await fetch(url, requestOptions);
    const duration = Date.now() - startTime;

    // Log HTTP request
    if (logRequest) {
      logHttpRequest(
        requestOptions.method || 'GET',
        url,
        response.status,
        duration,
        logLabel || 'fetchApi'
      );
    }

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText} - ${url}`);
    }

    // Parse response
    const result = await response.json();

    // Transform response to camelCase if enabled
    if (transformResponse) {
      return toCamel(result) as T;
    }

    return result as T;
  } catch (error) {
    // Log error
    if (logRequest) {
      const duration = Date.now() - startTime;
      logHttpRequest(
        requestOptions.method || 'GET',
        url,
        500,
        duration,
        logLabel || 'fetchApi'
      );
    }
    throw error;
  }
}

/**
 * GET request convenience method
 */
export async function get<T>(
  path: string,
  options?: Omit<FetchApiOptions, 'method'>
): Promise<T> {
  return fetchApi<T>(path, { ...options, method: 'GET' });
}

/**
 * POST request convenience method
 */
export async function post<T>(
  path: string,
  body?: unknown,
  options?: Omit<FetchApiOptions, 'method' | 'body'>
): Promise<T> {
  return fetchApi<T>(path, { ...options, method: 'POST', body });
}

/**
 * PUT request convenience method
 */
export async function put<T>(
  path: string,
  body?: unknown,
  options?: Omit<FetchApiOptions, 'method' | 'body'>
): Promise<T> {
  return fetchApi<T>(path, { ...options, method: 'PUT', body });
}

/**
 * PATCH request convenience method
 */
export async function patch<T>(
  path: string,
  body?: unknown,
  options?: Omit<FetchApiOptions, 'method' | 'body'>
): Promise<T> {
  return fetchApi<T>(path, { ...options, method: 'PATCH', body });
}

/**
 * DELETE request convenience method
 */
export async function del<T>(
  path: string,
  options?: Omit<FetchApiOptions, 'method'>
): Promise<T> {
  return fetchApi<T>(path, { ...options, method: 'DELETE' });
}
