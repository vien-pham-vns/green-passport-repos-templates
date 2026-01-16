"use server";

import { cacheLife, revalidateTag } from "next/cache";

import { fetchApi, getCookieContext } from "@/utils/fetch-api";
import { type QueryParamsFilter } from "@/utils/fetch-api-helpers";
import {
  ApplicationApiRequestParam,
  ApplicationTableResponse,
} from "../portal/type";
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
    accessToken: "abcxyz",
  });

  if (!response) {
    throw new Error("Failed to fetch Application list");
  }

  return response;
}

export const revalidateApplicationList = async () => {
  "use server";
  revalidateTag("application-list", { expire: 10 });
};
