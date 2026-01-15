/**
 * Validation utilities for application API parameters
 * Ensures type safety and data integrity for API requests
 */

import {
  ApplicationApiRequestParam,
  ApplicationStatus,
  ALLOWED_PAGE_SIZES,
  ALLOWED_SORT_FIELDS,
  ALLOWED_SORT_DIRECTIONS,
  PageSize,
  SortField,
  SortDirection,
} from "./type";

/**
 * Validate page number
 * Ensures page is at least 1
 */
export function validatePage(page: number): number {
  const validPage = Math.max(1, Math.floor(page));
  return isNaN(validPage) ? 1 : validPage;
}

/**
 * Validate page size
 * Ensures page size is one of the allowed values
 */
export function validatePageSize(size: number): PageSize {
  if (ALLOWED_PAGE_SIZES.includes(size as PageSize)) {
    return size as PageSize;
  }
  return 20; // Default page size
}

/**
 * Validate application status
 * Ensures status is a valid ApplicationStatus enum value
 */
export function validateStatus(
  status: string | undefined,
): ApplicationStatus | undefined {
  if (!status) return undefined;

  const validStatuses = Object.values(ApplicationStatus);
  if (validStatuses.includes(status as ApplicationStatus)) {
    return status as ApplicationStatus;
  }
  return undefined;
}

/**
 * Validate sort field
 * Ensures sort field is one of the allowed values
 */
export function validateSortField(
  field: string | undefined,
): SortField | undefined {
  if (!field) return undefined;

  if (ALLOWED_SORT_FIELDS.includes(field as SortField)) {
    return field as SortField;
  }
  return undefined;
}

/**
 * Validate sort direction
 * Ensures sort direction is either 'asc' or 'desc'
 */
export function validateSortDirection(
  direction: string | undefined,
): SortDirection | undefined {
  if (!direction) return undefined;

  if (ALLOWED_SORT_DIRECTIONS.includes(direction as SortDirection)) {
    return direction as SortDirection;
  }
  return undefined;
}

/**
 * Validate and sanitize complete API request parameters
 * Returns a fully validated ApplicationApiRequestParam object
 */
export function validateApiParams(
  params: Partial<ApplicationApiRequestParam>,
): ApplicationApiRequestParam {
  const validatedParams: ApplicationApiRequestParam = {
    page: validatePage(params.page ?? 1),
    page_size: validatePageSize(params.page_size ?? 20),
  };

  // Optional parameters
  if (params.keyword && params.keyword.trim()) {
    validatedParams.keyword = params.keyword.trim();
  }

  const validStatus = validateStatus(params.status);
  if (validStatus) {
    validatedParams.status = validStatus;
  }

  const validSortBy = validateSortField(params.sort_by);
  if (validSortBy) {
    validatedParams.sort_by = validSortBy;
  }

  const validSortDir = validateSortDirection(params.sort_dir);
  if (validSortDir) {
    validatedParams.sort_dir = validSortDir;
  }

  if (params.from_date && !isNaN(params.from_date)) {
    validatedParams.from_date = params.from_date;
  }

  if (params.to_date && !isNaN(params.to_date)) {
    validatedParams.to_date = params.to_date;
  }

  return validatedParams;
}

/**
 * Check if two API param objects are equal
 * Useful for detecting parameter changes
 */
export function areParamsEqual(
  params1: ApplicationApiRequestParam,
  params2: ApplicationApiRequestParam,
): boolean {
  return (
    params1.page === params2.page &&
    params1.page_size === params2.page_size &&
    params1.keyword === params2.keyword &&
    params1.status === params2.status &&
    params1.sort_by === params2.sort_by &&
    params1.sort_dir === params2.sort_dir &&
    params1.from_date === params2.from_date &&
    params1.to_date === params2.to_date
  );
}

