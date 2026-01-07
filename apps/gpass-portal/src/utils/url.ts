import { removeEmptyField } from 'utils/transform';

import { ARRAY_SEPARATOR } from '@/constant/common';

import { sanitizeString } from './string';

export const stringToArray = (string: string) =>
  string.split(ARRAY_SEPARATOR).filter((v) => !!v.trim());

export const arrayToString = (array: unknown[]): string =>
  array.filter((v) => (typeof v === 'string' ? !!v.trim() : v)).join(ARRAY_SEPARATOR);

export const objectToSearchParams = <T extends Record<string, unknown>>(
  obj: T
): URLSearchParams => {
  const params = new URLSearchParams();

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value = arrayToString(value);
    }
    params.append(key, sanitizeString(String(value)));
  });

  return params;
};

// only allow string or number value
export type BaseSearchParamsObject = Record<
  string,
  string | number | string[] | number[]
>;

const getURLSearchParams = (
  params: Partial<BaseSearchParamsObject>,
  shouldRemoveEmpty?: boolean
) => {
  const searchParams = objectToSearchParams(
    shouldRemoveEmpty
      ? (removeEmptyField(params) as Partial<BaseSearchParamsObject>)
      : params
  );
  return searchParams;
};

export const pushState = (
  params: Partial<BaseSearchParamsObject>,
  shouldRemoveEmpty?: boolean
) => {
  const searchParams = getURLSearchParams(params, shouldRemoveEmpty);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.pushState(null, '', newUrl);
};

export const replaceState = (
  params: Partial<BaseSearchParamsObject>,
  shouldRemoveEmpty?: boolean
) => {
  const searchParams = getURLSearchParams(params, shouldRemoveEmpty);
  const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState(null, '', newUrl);
};

export const checkValidURL = (url: string) => {
  try {
    return new URL(url);
  } catch {
    return false;
  }
};
