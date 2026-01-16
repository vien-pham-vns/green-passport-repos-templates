import { Sort } from "@/types/common";
import {
  camelCase as camelCaseString,
  snakeCase as snakeCaseString,
} from "change-case";
import {
  camelCase as camelCaseKeys,
  snakeCase as snakeCaseKeys,
} from "change-case/keys";

const camelToSnake = (str: string = "") => snakeCaseString(str);

const toSnake = (obj: unknown): unknown => {
  if (obj instanceof FormData) {
    return obj;
  }
  return snakeCaseKeys(obj, Infinity);
};

const snakeToCamel = (str: string = "") => camelCaseString(str);

const toCamel = (obj: unknown): unknown => {
  return camelCaseKeys(obj, Infinity);
};

// Keep truely value and value of type boolean, number
const removeEmptyField = <R>(obj: R): R => {
  if (typeof obj !== "object" || obj === null || Array.isArray(obj)) {
    return obj as R;
  }
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const cleanedObject = removeEmptyField(value);
      if (Object.keys(cleanedObject as Record<string, unknown>).length > 0) {
        result[key] = cleanedObject;
      }
    } else if (
      typeof value === "boolean" ||
      typeof value === "number" ||
      value
    ) {
      result[key] = value;
    }
  }

  return result as R;
};

export { toCamel, toSnake, snakeToCamel, camelToSnake, removeEmptyField };

export const transformSort = (sort: Sort) => {
  if (!sort.direction) {
    return undefined;
  }

  return sort.direction === "asc"
    ? camelToSnake(sort.field)
    : `-${camelToSnake(sort.field)}`;
};

export const parseSortString = (sortStr: string | undefined | null): Sort => {
  if (!sortStr) {
    return { field: "", direction: null };
  }

  const direction = sortStr.startsWith("-") ? "desc" : "asc";
  const field = sortStr.replace(/^-/, "");

  return { field, direction };
};
