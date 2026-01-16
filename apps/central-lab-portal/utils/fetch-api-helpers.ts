"server only";

import { toSnake } from "./transform";

export type QueryParamsFilter = Record<string, unknown>;

export const toCurl = (input: RequestInfo, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input.url;
  const method = init?.method || "GET";
  const headerItems = new Headers(
    init?.headers || (input instanceof Request ? input.headers : {}),
  );
  const body = init?.body;

  const curl = [`curl -X ${method}`];

  headerItems.forEach((value, key) => {
    curl.push(`-H "${key}: ${value}"`);
  });

  if (body && typeof body === "string") {
    curl.push(`--data '${body}'`);
  }

  curl.push(`"${url}"`);

  return {
    curl,
    curlString: curl.join(" "),
  };
};

export const buildRequestParams = (
  params: QueryParamsFilter,
): QueryParamsFilter => {
  const searchParams = new URLSearchParams();
  const snakeCaseParams = toSnake(params) as QueryParamsFilter;

  if (snakeCaseParams) {
    Object.entries(snakeCaseParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(key, String(v)));
      } else if (value !== undefined && value !== null) {
        searchParams.set(key, String(value));
      }
    });
  }

  return snakeCaseParams;
};
