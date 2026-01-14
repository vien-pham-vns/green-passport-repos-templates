"use client";

import { useSearchParams } from "next/navigation";
import { SortingState } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { useNavigation } from "@/hooks/use-navigation";

import { ApplicationItem, ApplicationSearchParams } from "../type";
import { useColumns } from "../hooks/use-columns";
import { useEffect } from "react";
import { queryToUrlString } from "../utils";

interface PortalTableProps {
  data: ApplicationItem[];
  query: Partial<ApplicationSearchParams>;
  total: number;
  page: number;
  pageSize: number;
}

export function PortalTable({
  data,
  total,
  page,
  pageSize,
  query,
}: PortalTableProps) {
  const { columns } = useColumns();
  const searchParams = useSearchParams();
  const { navigate } = useNavigation();

  // Calculate pagination for server-side
  const pageIndex = page - 1; // Convert to 0-based index
  const pageCount = Math.ceil(total / pageSize);

  const handlePaginationChange = (
    newPageIndex: number,
    newPageSize: number,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPageIndex + 1)); // Convert back to 1-based
    params.set("size", String(newPageSize));
    navigate(`?${params.toString()}`, { scroll: false });
  };

  const handleSortingChange = (sorting: SortingState) => {
    const params = new URLSearchParams(searchParams.toString());

    if (sorting.length > 0) {
      const sort = sorting[0];
      params.set("sort", `${sort.id}:${sort.desc ? "desc" : "asc"}`);
    } else {
      params.delete("sort");
    }

    params.set("page", "1"); // Reset to first page on sort
    navigate(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const hasParams = searchParams.toString().length > 0;
    if (!hasParams) {
      navigate(`?${queryToUrlString(query)}`, { scroll: false });
    }
  }, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      serverSide
      pagination={{
        pageIndex,
        pageSize,
        pageCount,
      }}
      onPaginationChange={handlePaginationChange}
      onSortingChange={handleSortingChange}
    />
  );
}
