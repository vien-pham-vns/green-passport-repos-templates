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
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2FmNzM5LTlhODUtNDViOS04Y2JiLWYzMWQ5MjA3NzQ1OSIsInJvbGUiOiI3NDUwMTkyYy0wODliLTQzOTMtYWY3Ny1iNmNkMzEzOThjZTIiLCJhcHBfYWNjZXNzIjpmYWxzZSwiYWRtaW5fYWNjZXNzIjpmYWxzZSwiaWF0IjoxNzY4MzczOTI2LCJleHAiOjE3ODM5MjU5MjYsImlzcyI6ImRpcmVjdHVzIiwidXNlcl9saW5lX2lkIjpudWxsLCJzdWIiOiIvZmUvZGFzaGJvYXJkIiwicHJvZmlsZV9pZCI6IjRmMmUzNDE5LTYzZGItNDI3Ny1iMzFiLTU5MGQ3MWMxMjQ0MyIsImp0aSI6IjMxNTk0YWQ3LTRiZDMtNGEzMy05YzU4LTA2ZTY4YzViYjk2ZiJ9.63tcunScyfgkaId9OoTprSg98tk3zX5sOfo-e4od3D4",
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
