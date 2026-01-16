import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  getDefaultFromDate,
  getDefaultToDate,
  parseSearchParams,
  toApiParams,
} from "@/features/portal/utils";
import { PortalTable } from "@/features/portal/components/portal-table";
import { PortalFilters } from "@/features/portal/components/portal-filters";
import { getCurrentUser } from "@/app/actions/auth";
import { getApplicationPortal } from "@/features/actions/application";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function ApplicationDataLoader(
  query: ReturnType<typeof parseSearchParams>,
) {
  const apiParams = toApiParams(query);

  const responseData = await getApplicationPortal(apiParams);
  return responseData;
}

export default async function CentralLabPage({ searchParams }: PageProps) {
  // Check authentication before fetching any data
  await getCurrentUser();

  const params = await searchParams;

  /**
   * For page that have init default params
   *
   * Only apply defaults if NO params exist at all (first visit)
   * Otherwise, use exactly what's in the URL
   */
  const isFirstVisit = Object.keys(params).length === 0;
  const finalParams = isFirstVisit
    ? { ...params, fromDate: getDefaultFromDate(), toDate: getDefaultToDate() }
    : params;
  // END

  const query = parseSearchParams(finalParams); // params

  // Fetch data from server action
  const applicationData = await ApplicationDataLoader(query);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">
          Applications Dashboard
        </h1>
        <p className="text-base text-muted-foreground">
          Manage and track laboratory applications
        </p>
      </div>

      <Card>
        <CardContent className="space-y-4">
          <PortalFilters />

          <Suspense fallback={<TableSkeleton />}>
            <PortalTable
              data={applicationData.data}
              query={query}
              total={applicationData.pagination.total}
              page={applicationData.pagination.page}
              pageSize={applicationData.pagination.pageSize}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}
