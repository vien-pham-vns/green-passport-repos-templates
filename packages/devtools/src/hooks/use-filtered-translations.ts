"use client";
"use memo"; // React Compiler opt-in

import { useMemo } from "react";
import type { FlatTranslationEntry } from "../types";
import {
  searchTranslations,
  findMissingTranslations,
} from "../utils/file-parser";
import { getLanguageStatistics } from "../utils/diff-checker";

interface UseFilteredTranslationsParams {
  entries: FlatTranslationEntry[];
  languages: string[];
  searchQuery: string;
  showOnlyMissing: boolean;
  selectedFeature: string;
}

export function useFilteredTranslations({
  entries,
  languages,
  searchQuery,
  showOnlyMissing,
  selectedFeature,
}: UseFilteredTranslationsParams) {
  // Get available features (top-level keys)
  const availableFeatures = useMemo(() => {
    const features = new Set<string>();
    for (const entry of entries) {
      const topLevel = entry.path[0];
      if (topLevel) {
        features.add(topLevel);
      }
    }
    return Array.from(features).sort();
  }, [entries]);

  // Filtered entries based on search, feature, and missing filter
  const filteredEntries = useMemo(() => {
    let result = entries;

    // Apply feature filter
    if (selectedFeature !== "all") {
      result = result.filter((entry) => entry.path[0] === selectedFeature);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchTranslations(result, searchQuery);
    }

    // Apply missing filter
    if (showOnlyMissing) {
      result = findMissingTranslations(result, languages);
    }

    return result;
  }, [entries, selectedFeature, searchQuery, showOnlyMissing, languages]);

  // Language statistics
  const languageStats = useMemo(() => {
    return getLanguageStatistics(entries, languages);
  }, [entries, languages]);

  return {
    availableFeatures,
    filteredEntries,
    languageStats,
  };
}
