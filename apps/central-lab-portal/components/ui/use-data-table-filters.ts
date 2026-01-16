"use client";

import { useSearchParams } from "next/navigation";
import { format, parse, subMonths, startOfDay, endOfDay } from "date-fns";

import { useNavigation } from "@/hooks/use-navigation";
import { ApplicationType, ApplicationStatus } from "@/features/portal/type";
import { DataTableFilterValues } from "./data-table-filters";

/**
 * Get default from date (1 month ago)
 */
function getDefaultFromDate(): Date {
  return startOfDay(subMonths(new Date(), 1));
}

/**
 * Get default to date (today)
 */
function getDefaultToDate(): Date {
  return endOfDay(new Date());
}

/**
 * Parse date string to Date object
 */
function parseDate(dateString: string | null): Date | undefined {
  if (!dateString) return undefined;
  try {
    return parse(dateString, "yyyy-MM-dd", new Date());
  } catch {
    return undefined;
  }
}

/**
 * Format Date object to string
 */
function formatDate(date: Date | undefined): string | null {
  if (!date) return null;
  return format(date, "yyyy-MM-dd");
}

export function useDataTableFilters() {
  const searchParams = useSearchParams();
  const { navigate } = useNavigation();

  // Parse filters from URL - support multiple values for types and statuses
  const applicationTypesParam = searchParams.get("applicationTypes");
  const applicationStatusesParam = searchParams.get("applicationStatuses");
  const labBranch = searchParams.get("labBranch");
  const fromDateParam = searchParams.get("fromDate");
  const toDateParam = searchParams.get("toDate");

  // Parse comma-separated values into arrays
  const applicationTypes = applicationTypesParam
    ? (applicationTypesParam.split(",") as ApplicationType[])
    : undefined;

  const applicationStatuses = applicationStatusesParam
    ? (applicationStatusesParam.split(",") as ApplicationStatus[])
    : undefined;

  // Check if this is the first load (no filter params in URL)
  const isFirstLoad =
    !fromDateParam &&
    !toDateParam &&
    !applicationTypesParam &&
    !applicationStatusesParam &&
    !labBranch;

  // Parse dates or use defaults on first load
  const fromDate = fromDateParam
    ? parseDate(fromDateParam)
    : isFirstLoad
      ? getDefaultFromDate()
      : undefined;

  const toDate = toDateParam
    ? parseDate(toDateParam)
    : isFirstLoad
      ? getDefaultToDate()
      : undefined;

  const filters: DataTableFilterValues = {
    applicationTypes,
    applicationStatuses,
    labBranch: labBranch || undefined,
    fromDate,
    toDate,
  };

  const updateSearchParams = (
    updates: Record<string, string | null | undefined>,
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    navigate(`?${params.toString()}`, { scroll: false });
  };

  const handleFiltersChange = (updatedFilters: DataTableFilterValues) => {
    const updates: Record<string, string | null | undefined> = {
      page: "1", // Reset to first page on filter change
    };

    // Application Types - convert array to comma-separated string
    if (updatedFilters.applicationTypes !== undefined) {
      updates.applicationTypes =
        updatedFilters.applicationTypes &&
        updatedFilters.applicationTypes.length > 0
          ? updatedFilters.applicationTypes.join(",")
          : null;
    }

    // Application Statuses - convert array to comma-separated string
    if (updatedFilters.applicationStatuses !== undefined) {
      updates.applicationStatuses =
        updatedFilters.applicationStatuses &&
        updatedFilters.applicationStatuses.length > 0
          ? updatedFilters.applicationStatuses.join(",")
          : null;
    }

    // Lab Branch
    if (updatedFilters.labBranch !== undefined) {
      updates.labBranch = updatedFilters.labBranch || null;
    }

    // From Date
    updates.fromDate = formatDate(updatedFilters.fromDate);

    // To Date
    updates.toDate = formatDate(updatedFilters.toDate);

    updateSearchParams(updates);
  };

  const handleClearFilters = () => {
    const clearedFilters: DataTableFilterValues = {
      applicationTypes: undefined,
      applicationStatuses: undefined,
      labBranch: undefined,
      fromDate: undefined,
      toDate: undefined,
    };
    handleFiltersChange(clearedFilters);
  };

  // Check if any filters are active
  const hasActiveFilters = Boolean(
    (filters.applicationTypes && filters.applicationTypes.length > 0) ||
    (filters.applicationStatuses && filters.applicationStatuses.length > 0) ||
    filters.labBranch ||
    filters.fromDate ||
    filters.toDate,
  );

  // Count active filters
  let activeFilterCount = 0;
  if (filters.applicationTypes && filters.applicationTypes.length > 0)
    activeFilterCount++;
  if (filters.applicationStatuses && filters.applicationStatuses.length > 0)
    activeFilterCount++;
  if (filters.labBranch) activeFilterCount++;
  if (filters.fromDate || filters.toDate) activeFilterCount++;

  return {
    filters,
    hasActiveFilters,
    activeFilterCount,
    isFirstLoad,
    actions: {
      handleFiltersChange,
      handleClearFilters,
    },
  };
}
