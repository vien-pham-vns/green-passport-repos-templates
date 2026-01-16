"use server";

import { cacheLife, revalidateTag } from "next/cache";

import { fetchApi, getCookieContext } from "@/utils/fetch-api";
import { ApplicationData } from "../portal/type";
import { apiCentralLab } from "@/utils/api";

/**
 * Get single application details by ID
 */
export async function getApplicationById(id: string) {
  return getApplicationDetailByIdCached(id);
}

async function getApplicationDetailByIdCached(id: string) {
  "use cache";
  cacheLife("seconds");

  const url = apiCentralLab(`/applications/${id}`, "v1");
  const response = await fetchApi<{ message: string; data: ApplicationData }>(
    url,
    {
      method: "GET",
      cacheTags: [`application-detail-${id}`],
      logLabel: "ApplicationDetail",
      accessToken: "abcxyz",
    },
  );

  if (!response) {
    throw new Error("Failed to fetch application details");
  }

  return response.data;
}

export const revalidateApplicationDetailById = async (id: string) => {
  "use server";
  revalidateTag(`application-detail-${id}`, { expire: 0 });
};
