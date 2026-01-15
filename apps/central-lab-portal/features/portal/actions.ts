"use server";

import { cacheLife, revalidateTag } from "next/cache";

import { fetchApi, getCookieContext } from "@/utils/fetch-api";
import { type QueryParamsFilter } from "@/utils/fetch-api-helpers";
import { ApplicationApiRequestParam, ApplicationTableResponse } from "./type";
import { apiCentralLab } from "@/utils/api";

export async function getApplicationPortal(
  reqParams?: Partial<ApplicationApiRequestParam>,
) {
  // const ctx = await getCookieContext();
  return getApplicationListCached(reqParams);
}

async function getApplicationListCached(
  // ctx: CookieContext,
  params?: Partial<ApplicationApiRequestParam>,
) {
  "use cache";
  cacheLife("seconds");

  const url = apiCentralLab("/applications", "v1");
  const response = await fetchApi<ApplicationTableResponse>(url, {
    // ...ctx,
    method: "GET",
    params: params as unknown as QueryParamsFilter,
    cacheTags: ["application-list"],
    logLabel: "ApplicationList",
    accessToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgzM2FmNzM5LTlhODUtNDViOS04Y2JiLWYzMWQ5MjA3NzQ1OSIsInJvbGUiOiI3NDUwMTkyYy0wODliLTQzOTMtYWY3Ny1iNmNkMzEzOThjZTIiLCJhcHBfYWNjZXNzIjpmYWxzZSwiYWRtaW5fYWNjZXNzIjpmYWxzZSwiaWF0IjoxNzY4MzczOTI2LCJleHAiOjE3ODM5MjU5MjYsImlzcyI6ImRpcmVjdHVzIiwidXNlcl9saW5lX2lkIjpudWxsLCJzdWIiOiIvZmUvZGFzaGJvYXJkIiwicHJvZmlsZV9pZCI6IjRmMmUzNDE5LTYzZGItNDI3Ny1iMzFiLTU5MGQ3MWMxMjQ0MyIsImp0aSI6IjMxNTk0YWQ3LTRiZDMtNGEzMy05YzU4LTA2ZTY4YzViYjk2ZiJ9.63tcunScyfgkaId9OoTprSg98tk3zX5sOfo-e4od3D4",
  });

  if (!response) {
    throw new Error("Failed to fetch harvest record list");
  }

  return response;
}

export const revalidateApplicationList = async () => {
  "use server";
  revalidateTag("application-list", { expire: 10 });
};
