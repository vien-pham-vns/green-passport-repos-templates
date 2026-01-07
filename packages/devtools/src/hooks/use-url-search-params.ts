"use client";
"use memo"; // React Compiler opt-in

import { startTransition } from "react";
import type { Route } from "next";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export function useTranslationFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const showMissing = searchParams.get("missing") === "1";
  const feature = searchParams.get("feature") ?? "all";

  const updateFilter = (key: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams);

    const stringValue =
      typeof value === "boolean" ? (value ? "1" : "0") : value;

    // Remove default values to keep URL clean
    if (!stringValue || stringValue === "0" || stringValue === "all") {
      params.delete(key);
    } else {
      params.set(key, stringValue);
    }

    // Shallow navigation - no server round trip
    startTransition(() => {
      router.replace(`${pathname}?${params}` as Route, { scroll: false });
    });
  };

  // Reset all filters
  const reset = () => {
    startTransition(() => {
      router.replace(pathname as Route, { scroll: false });
    });
  };

  return {
    // Current values
    search,
    showMissing,
    feature,
    // Setters
    setSearch: (value: string) => updateFilter("q", value),
    setShowMissing: (value: boolean) => updateFilter("missing", value),
    setFeature: (value: string) => updateFilter("feature", value),
    reset,
  };
}
