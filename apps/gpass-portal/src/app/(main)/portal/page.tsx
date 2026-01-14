import { Suspense } from 'react';

// import { PaperLayout } from '@/components/paper-layout';
// import { PortalTableLayout } from '@/features/portal/_components/table-layout';
import { fetchApplicationServer } from '@/features/portal/actions/example-action';
import { ApplicationPageProps } from '@/features/portal/type';
import {
  defaultFromDate,
  defaultToDate,
  parseSearchParams,
} from '@/features/portal/utils';
import { dayjs } from '@/utils/date';
import { transformSort } from '@/utils/transform';

async function ApplicationDataLoader(query: ReturnType<typeof parseSearchParams>) {
  const sortString =
    query.sort.field && query.sort.direction ? transformSort(query.sort) : undefined;

  const responseData = await fetchApplicationServer({
    keyword: query.q || undefined,
    page: query.page,
    size: query.size,
    sort: sortString,
    fromDate: query.fromDate ? dayjs(query.fromDate).startOf('day').unix() : undefined,
    toDate: query.toDate ? dayjs(query.toDate).endOf('day').unix() : undefined,
  });

  return responseData;
}

export default async function ApplicationPage({ searchParams }: ApplicationPageProps) {
  const params = await searchParams;

  /**
   * For page that have init default params
   *
   * Only apply defaults if NO params exist at all (first visit)
   * Otherwise, use exactly what's in the URL
   */
  const isFirstVisit = Object.keys(params).length === 0;
  const finalParams = isFirstVisit
    ? { ...params, fromDate: defaultFromDate, toDate: defaultToDate }
    : params;
  // END

  const query = parseSearchParams(finalParams);
  const applicationData = await ApplicationDataLoader(query);

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        {/* <PortalTableLayout query={query} applicationData={applicationData} /> */}
      </Suspense>
    </div>
  );
}
