import { flatten, unflatten } from "flat";
import type {
  TranslationObject,
  FlatTranslationEntry,
  TranslationFile,
} from "../types";

/**
 * Flatten nested translation object into dot-notation entries
 * Uses the 'flat' npm package for robust flattening
 */
export function flattenTranslations(
  obj: TranslationObject,
): FlatTranslationEntry[] {
  const entries: FlatTranslationEntry[] = [];

  // Use flat package for nested flattening
  const flattened = flatten(obj, { delimiter: "." }) as Record<string, string>;

  for (const [key, value] of Object.entries(flattened)) {
    if (typeof value === "string") {
      const parts = key.split(".");
      entries.push({
        key,
        path: parts,
        values: {},
      });
    }
  }

  return entries;
}

/**
 * Unflatten dot-notation entries back to nested object
 * Uses the 'flat' npm package for robust unflattening
 */
export function unflattenTranslations(
  entries: Array<{ key: string; value: string }>,
): TranslationObject {
  const flatObj: Record<string, string> = {};

  for (const { key, value } of entries) {
    flatObj[key] = value;
  }

  return unflatten(flatObj, { delimiter: "." }) as TranslationObject;
}

/**
 * Get value from nested object using dot-notation key
 */
export function getNestedValue(
  obj: TranslationObject,
  key: string,
): string | undefined {
  const flattened = flatten(obj, { delimiter: "." }) as Record<string, unknown>;
  const value = flattened[key];
  return typeof value === "string" ? value : undefined;
}

/**
 * Set value in nested object using dot-notation key
 * Uses structuredClone for proper deep cloning
 */
export function setNestedValue(
  obj: TranslationObject,
  key: string,
  value: string,
): TranslationObject {
  // Use native structuredClone for deep cloning (better than JSON.parse/stringify)
  const result = structuredClone(obj);

  // Flatten, set value, then unflatten
  const flattened = flatten(result, { delimiter: "." }) as Record<
    string,
    string
  >;
  flattened[key] = value;

  return unflatten(flattened, { delimiter: "." }) as TranslationObject;
}

/**
 * Parse JSON file content
 */
export function parseTranslationFile(
  content: string,
  language: string,
  filename: string,
): TranslationFile {
  try {
    const data = JSON.parse(content) as TranslationObject;
    return {
      language,
      filename,
      data,
      lastModified: new Date(),
    };
  } catch (error) {
    throw new Error(
      `Failed to parse ${filename}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Merge multiple translation files into flat entries with all language values
 */
export function mergeTranslationFiles(
  files: TranslationFile[],
): FlatTranslationEntry[] {
  if (files.length === 0) return [];

  // Get all unique keys from all files
  const allKeys = new Set<string>();
  const keysByLanguage = new Map<string, Set<string>>();

  for (const file of files) {
    const flatEntries = flattenTranslations(file.data);
    const keys = new Set(flatEntries.map((e) => e.key));
    keysByLanguage.set(file.language, keys);

    for (const key of keys) {
      allKeys.add(key);
    }
  }

  // Create merged entries
  const mergedEntries: FlatTranslationEntry[] = [];

  for (const key of Array.from(allKeys).sort()) {
    const parts = key.split(".");
    const values: Record<string, string> = {};

    for (const file of files) {
      const value = getNestedValue(file.data, key);
      if (value !== undefined) {
        values[file.language] = value;
      }
    }

    mergedEntries.push({
      key,
      path: parts,
      values,
    });
  }

  return mergedEntries;
}

/**
 * Find missing translations across languages
 */
export function findMissingTranslations(
  entries: FlatTranslationEntry[],
  languages: string[],
): FlatTranslationEntry[] {
  return entries.filter((entry) => {
    return languages.some((lang) => !(lang in entry.values));
  });
}

/**
 * Search translations by key or value
 */
export function searchTranslations(
  entries: FlatTranslationEntry[],
  query: string,
): FlatTranslationEntry[] {
  if (!query.trim()) return entries;

  const lowerQuery = query.toLowerCase();

  return entries.filter((entry) => {
    // Search in key
    if (entry.key.toLowerCase().includes(lowerQuery)) {
      return true;
    }

    // Search in values
    return Object.values(entry.values).some((value) =>
      value.toLowerCase().includes(lowerQuery),
    );
  });
}
