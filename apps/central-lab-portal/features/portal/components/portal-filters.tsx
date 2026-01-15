"use client";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigation } from "@/hooks/use-navigation";
import { DataTableFilters } from "@/components/ui/data-table-filters";
import { useDataTableFilters } from "@/components/ui/use-data-table-filters";

export function PortalFilters() {
  const searchParams = useSearchParams();
  const { navigate, refresh } = useNavigation();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get("q") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  // Use the data table filters hook
  const {
    filters,
    actions: { handleFiltersChange, handleClearFilters },
  } = useDataTableFilters();

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue.trim()) {
      params.set("q", searchValue.trim());
    } else {
      params.delete("q");
    }
    params.set("page", "1"); // Reset to first page
    navigate(`?${params.toString()}`, { scroll: false });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.set("page", "1");
    navigate(`?${params.toString()}`, { scroll: false });
  };

  const handleRefresh = () => {
    startTransition(() => {
      refresh();
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by batch lot, farm name, or farmer..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="pl-9 pr-9"
          />
          {searchValue && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearSearch}
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button onClick={handleSearch} variant="default">
          Search
        </Button>
      </div>

      <DataTableFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      <Button
        variant="outline"
        size="icon"
        onClick={handleRefresh}
        disabled={isPending}
      >
        <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
}
