"use server";

import { cacheLife, revalidateTag } from "next/cache";

import { getCookieContext, type CookieContext } from "@/utils/fetch-api";

import { PORTAL_CACHE_TAG } from "./config";
import {
  ApplicationSearchParams,
  ApplicationTableResponse,
  ApplicationItem,
} from "./type";
import { getDefaultFromDate, getDefaultToDate, toApiParams } from "./utils";

/**
 * Get portal applications list with server-side caching
 * Public function that handles cookie context
 */
export async function getPortalApplications(
  params?: Partial<ApplicationSearchParams>,
) {
  // const ctx = await getCookieContext();
  return getPortalApplicationsCached(params);
}

/**
 * Cached function with "use cache" directive
 * IMPORTANT: Must be a separate function from the public export
 */
async function getPortalApplicationsCached(
  // ctx: CookieContext,
  params?: Partial<ApplicationSearchParams>,
) {
  "use cache";
  cacheLife("minutes");

  // Merge with defaults
  const queryParams: Partial<ApplicationSearchParams> = {
    fromDate: params?.fromDate || getDefaultFromDate(),
    toDate: params?.toDate || getDefaultToDate(),
    page: params?.page || 1,
    size: params?.size || 20,
    q: params?.q,
    sort: params?.sort,
  };

  // For demo purposes, generate mock data
  // TODO: Replace with actual API call using fetchApi utility
  const mockData = generateMockData(queryParams);

  return mockData;
}

/**
 * Generate mock data for demonstration
 * TODO: Remove this when connecting to real API
 */
function generateMockData(
  params: Partial<ApplicationSearchParams>,
): ApplicationTableResponse {
  const page = params.page || 1;
  const size = params.size || 20;
  const total = 150; // Mock total count

  const items: ApplicationItem[] = [];
  const startIndex = (page - 1) * size;

  for (let i = 0; i < size && startIndex + i < total; i++) {
    const index = startIndex + i + 1;
    items.push({
      id: `APP-${String(index).padStart(5, "0")}`,
      batchlot: `BL-2024-${String(index).padStart(4, "0")}`,
      dateCreated: new Date(2024, 0, (index % 30) + 1).toISOString(),
      totalWeight: Math.floor(Math.random() * 1000) + 100,
      farmName: `Sample Farm ${index}`,
      farmerId: `F-${String(index).padStart(4, "0")}`,
      farmerName: `Farmer ${index}`,
      province: ["Bangkok", "Chiang Mai", "Phuket", "Khon Kaen"][index % 4],
      district: `District ${(index % 10) + 1}`,
      subDistrict: `Sub-District ${(index % 5) + 1}`,
      status: ["pending", "approved", "rejected", "processing"][index % 4],
    });
  }

  // Apply search filter if provided
  let filteredItems = items;
  if (params.q) {
    const searchTerm = params.q.toLowerCase();
    filteredItems = items.filter(
      (item) =>
        item.batchlot.toLowerCase().includes(searchTerm) ||
        item.farmName.toLowerCase().includes(searchTerm) ||
        item.farmerName.toLowerCase().includes(searchTerm),
    );
  }

  // Apply sorting if provided
  if (params.sort) {
    filteredItems.sort((a, b) => {
      const field = params.sort!.field as keyof ApplicationItem;
      const direction = params.sort!.direction === "asc" ? 1 : -1;

      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return aValue.localeCompare(bValue) * direction;
      }
      if (typeof aValue === "number" && typeof bValue === "number") {
        return (aValue - bValue) * direction;
      }
      return 0;
    });
  }

  return {
    success: true,
    data: {
      data: filteredItems,
      total: params.q ? filteredItems.length : total,
      page,
      size,
    },
  };
}

/**
 * Revalidate portal applications cache
 * Call this after mutations to refresh the cached data
 */
export async function revalidatePortalApplications() {
  "use server";
  revalidateTag(PORTAL_CACHE_TAG, {
    expire: 10,
  });
}
