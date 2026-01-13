import { Sort } from '@/types/common';
import { dayjs } from '@/utils/date';

import { ApplicationPageProps, ApplicationSearchParams } from './type';

export function parseSearchParams(
  queryParams: Awaited<ApplicationPageProps['searchParams']>
) {
  const sortString = queryParams.sort || '';
  const [field, direction] = sortString.split(':');
  const sort: Sort = {
    field: field || '',
    direction: direction === 'asc' ? 'asc' : 'desc',
  };

  return {
    q: queryParams.q || '',
    fromDate: queryParams.fromDate,
    toDate: queryParams.toDate,
    page: Number(queryParams.page) || 1,
    size: Number(queryParams.size) || 20,
    sort,
  };
}

/**
 * Convert query object to URLSearchParams string
 * Handles nested sort objects by flattening them to "field:direction" format
 */
export const queryToUrlString = (query: Partial<ApplicationSearchParams>): string => {
  const params = new URLSearchParams();

  // Add query parameters only if they have values
  if (query.q) params.set('q', query.q);
  if (query.page) params.set('page', query.page.toString());
  if (query.size) params.set('size', query.size.toString());
  if (query.fromDate) params.set('fromDate', query.fromDate);
  if (query.toDate) params.set('toDate', query.toDate);

  // Handle sort object { field: string, direction: string }
  if (query.sort?.field && query.sort?.direction) {
    params.set('sort', `${query.sort.field}:${query.sort.direction}`);
  }

  return params.toString();
};

export const getDefaultFromDate = () =>
  dayjs().tz('Asia/Bangkok').subtract(30, 'day').format('YYYY-MM-DD');
export const getDefaultToDate = () => dayjs().tz('Asia/Bangkok').format('YYYY-MM-DD');

// For backward compatibility - these will be computed on each import
export const defaultFromDate = getDefaultFromDate();
export const defaultToDate = getDefaultToDate();
