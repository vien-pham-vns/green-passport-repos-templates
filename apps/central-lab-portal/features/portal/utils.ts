import { format, subMonths, startOfDay, endOfDay, getUnixTime } from "date-fns";

import {
  ApplicationSearchParams,
  ApplicationApiRequestParam,
  ApplicationPageProps,
  ApplicationStatus,
} from "./type";
import { Sort } from "@/types/common";

/**
 * Parse URL search params to typed ApplicationSearchParams
 */
export function parseSearchParams(
  queryParams: Awaited<ApplicationPageProps["searchParams"]>,
): Partial<ApplicationSearchParams> {
  const q = typeof queryParams.q === "string" ? queryParams.q : undefined;
  const fromDate =
    typeof queryParams.fromDate === "string" ? queryParams.fromDate : undefined;
  const toDate =
    typeof queryParams.toDate === "string" ? queryParams.toDate : undefined;

  const page =
    typeof queryParams.page === "string" ? parseInt(queryParams.page, 10) : 1;
  const size =
    typeof queryParams.size === "string" ? parseInt(queryParams.size, 10) : 20;

  const status =
    typeof queryParams.status === "string" &&
    Object.values(ApplicationStatus).includes(
      queryParams.status as ApplicationStatus,
    )
      ? (queryParams.status as ApplicationStatus)
      : undefined;

  // Parse sort
  let sort: Sort | undefined = undefined;
  if (typeof queryParams.sort === "string") {
    const [field, direction] = queryParams.sort.split(":");
    if (field && (direction === "asc" || direction === "desc")) {
      sort = { field, direction };
    }
  }

  return {
    q,
    fromDate,
    toDate,
    page,
    size,
    status,
    sort,
  };
}

/**
 * Convert query object to URL search params string
 */
export function queryToUrlString(
  query: Partial<ApplicationSearchParams>,
): string {
  const params = new URLSearchParams();

  if (query.q) params.set("q", query.q);
  if (query.fromDate) params.set("fromDate", query.fromDate);
  if (query.toDate) params.set("toDate", query.toDate);
  if (query.page) params.set("page", String(query.page));
  if (query.size) params.set("size", String(query.size));
  if (query.status) params.set("status", query.status);
  if (query.sort) {
    params.set("sort", `${query.sort.field}:${query.sort.direction}`);
  }

  return params.toString();
}

/**
 * Get default from date (1 months ago)
 */
export function getDefaultFromDate(): string {
  const date = subMonths(new Date(), 1);
  return format(startOfDay(date), "yyyy-MM-dd");
}

/**
 * Get default to date (today)
 */
export function getDefaultToDate(): string {
  return format(endOfDay(new Date()), "yyyy-MM-dd");
}

/**
 * Transform ApplicationSearchParams to API request params
 * Maps frontend query params to backend API format with validation
 */
export function toApiParams(
  params: Partial<ApplicationSearchParams>,
): Partial<ApplicationApiRequestParam> {
  let apiParams: Partial<ApplicationApiRequestParam> = {
    page: 1,
    page_size: 20,
  };

  if (params.q) apiParams.keyword = params.q;

  if (params.fromDate) {
    const parsedFromDate = getUnixTime(new Date(params.fromDate));
    apiParams.from_date = parsedFromDate;
  }

  if (params.toDate) {
    const parsedToDate = getUnixTime(new Date(params.toDate));
    apiParams.to_date = parsedToDate;
  }

  if (params.page) apiParams.page = params.page;

  if (params.size) apiParams.page_size = params.size;

  if (
    params.sort?.field !== undefined &&
    params.sort?.direction !== undefined
  ) {
    apiParams = {
      ...apiParams,
      sort_by: params.sort.field,
      sort_dir: params.sort.direction,
    };
  }

  return params;
}
