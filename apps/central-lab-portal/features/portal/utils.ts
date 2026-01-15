import { format, subMonths, startOfDay, endOfDay, getUnixTime } from "date-fns";

import {
  ApplicationSearchParams,
  ApplicationApiRequestParam,
  ApplicationPageProps,
} from "./type";
import { Sort } from "@/types/common";
import {
  validatePage,
  validatePageSize,
  validateStatus,
  validateApiParams,
} from "./validation";

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

  const pageRaw =
    typeof queryParams.page === "string" ? parseInt(queryParams.page, 10) : 1;
  const page = validatePage(pageRaw);

  const sizeRaw =
    typeof queryParams.size === "string" ? parseInt(queryParams.size, 10) : 10;
  const size = validatePageSize(sizeRaw);

  const status =
    typeof queryParams.status === "string"
      ? validateStatus(queryParams.status)
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
): ApplicationApiRequestParam {
  // Build raw API params object
  const rawApiParams: Partial<ApplicationApiRequestParam> = {
    page: params.page ?? 1,
    page_size: params.size ?? 10,
  };

  // Optional: keyword search
  if (params.q) {
    rawApiParams.keyword = params.q;
  }

  // Optional: status filter
  if (params.status) {
    rawApiParams.status = params.status;
  }

  // Optional: date range filters (convert to Unix timestamps)
  if (params.fromDate) {
    const parsedFromDate = getUnixTime(new Date(params.fromDate));
    rawApiParams.from_date = parsedFromDate;
  }

  if (params.toDate) {
    const parsedToDate = getUnixTime(new Date(params.toDate));
    rawApiParams.to_date = parsedToDate;
  }

  // Optional: sorting
  if (params.sort) {
    const { field, direction } = params.sort;

    // Map sort field to API format
    if (field === "createdAt" || field === "created_at") {
      rawApiParams.sort_by = "created_at";
    } else if (field === "status") {
      rawApiParams.sort_by = "status";
    }

    // Map sort direction
    if (direction === "asc" || direction === "desc") {
      rawApiParams.sort_dir = direction;
    }
  }

  // Validate and sanitize all parameters
  return validateApiParams(rawApiParams);
}
