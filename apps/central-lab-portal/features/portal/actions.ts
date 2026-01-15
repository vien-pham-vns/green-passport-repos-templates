"use server";

import { cacheLife, revalidateTag } from "next/cache";

import { fetchApi, getCookieContext } from "@/utils/fetch-api";
import { type QueryParamsFilter } from "@/utils/fetch-api-helpers";
import {
  ApplicationApiRequestParam,
  ApplicationTableResponse,
  ApplicationData,
} from "./type";
import { apiCentralLab } from "@/utils/api";

/**
 * Get application list with server-side caching
 * Public function that calls the cached implementation
 */
export async function getApplicationPortal(
  reqParams: ApplicationApiRequestParam,
) {
  // const ctx = await getCookieContext();
  return getApplicationListCached(reqParams);
}

/**
 * Cached function for fetching application list
 * Uses Next.js "use cache" directive for server-side caching
 */
async function getApplicationListCached(
  // ctx: CookieContext,
  params: ApplicationApiRequestParam,
) {
  "use cache";
  cacheLife("seconds");

  const url = apiCentralLab("/applications", "v1");

  // Build query parameters for API request
  const queryParams: QueryParamsFilter = {
    page: params.page,
    page_size: params.page_size,
  };

  // Add optional parameters if present
  if (params.keyword) queryParams.keyword = params.keyword;
  if (params.status) queryParams.status = params.status;
  if (params.sort_by) queryParams.sort_by = params.sort_by;
  if (params.sort_dir) queryParams.sort_dir = params.sort_dir;
  if (params.from_date) queryParams.from_date = params.from_date;
  if (params.to_date) queryParams.to_date = params.to_date;

  const response = await fetchApi<ApplicationTableResponse>(url, {
    // ...ctx,
    method: "GET",
    params: queryParams,
    cacheTags: ["application-list"],
    logLabel: "ApplicationList",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2FmNzM5LTlhODUtNDViOS04Y2JiLWYzMWQ5MjA3NzQ1OSIsInJvbGUiOiI3NDUwMTkyYy0wODliLTQzOTMtYWY3Ny1iNmNkMzEzOThjZTIiLCJhcHBfYWNjZXNzIjpmYWxzZSwiYWRtaW5fYWNjZXNzIjpmYWxzZSwiaWF0IjoxNzY4MzczOTI2LCJleHAiOjE3ODM5MjU5MjYsImlzcyI6ImRpcmVjdHVzIiwidXNlcl9saW5lX2lkIjpudWxsLCJzdWIiOiIvZmUvZGFzaGJvYXJkIiwicHJvZmlsZV9pZCI6IjRmMmUzNDE5LTYzZGItNDI3Ny1iMzFiLTU5MGQ3MWMxMjQ0MyIsImp0aSI6IjMxNTk0YWQ3LTRiZDMtNGEzMy05YzU4LTA2ZTY4YzViYjk2ZiJ9.63tcunScyfgkaId9OoTprSg98tk3zX5sOfo-e4od3D4",
  });

  if (!response) {
    throw new Error("Failed to fetch application list");
  }

  return response;
}

export const revalidateApplicationList = async () => {
  "use server";
  revalidateTag("application-list", { expire: 10 });
};

/**
 * Get single application details by ID
 */
export async function getApplicationById(id: string) {
  return getApplicationByIdCached(id);
}

async function getApplicationByIdCached(id: string) {
  "use cache";
  cacheLife("seconds");

  const url = apiCentralLab(`/applications/${id}`, "v1");
  const response = await fetchApi<{ message: string; data: ApplicationData }>(
    url,
    {
      method: "GET",
      cacheTags: [`application-${id}`],
      logLabel: "ApplicationDetail",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2FmNzM5LTlhODUtNDViOS04Y2JiLWYzMWQ5MjA3NzQ1OSIsInJvbGUiOiI3NDUwMTkyYy0wODliLTQzOTMtYWY3Ny1iNmNkMzEzOThjZTIiLCJhcHBfYWNjZXNzIjpmYWxzZSwiYWRtaW5fYWNjZXNzIjpmYWxzZSwiaWF0IjoxNzY4MzczOTI2LCJleHAiOjE3ODM5MjU5MjYsImlzcyI6ImRpcmVjdHVzIiwidXNlcl9saW5lX2lkIjpudWxsLCJzdWIiOiIvZmUvZGFzaGJvYXJkIiwicHJvZmlsZV9pZCI6IjRmMmUzNDE5LTYzZGItNDI3Ny1iMzFiLTU5MGQ3MWMxMjQ0MyIsImp0aSI6IjMxNTk0YWQ3LTRiZDMtNGEzMy05YzU4LTA2ZTY4YzViYjk2ZiJ9.63tcunScyfgkaId9OoTprSg98tk3zX5sOfo-e4od3D4",
    },
  );

  if (!response) {
    throw new Error("Failed to fetch application details");
  }

  return response.data;
}

export const revalidateApplicationDetail = async (id: string) => {
  "use server";
  revalidateTag(`application-${id}`, { expire: 0 });
};
