"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import useFormatDate from "@/hooks/use-format-date";

import { ApplicationItem } from "../type";

export function useColumns() {
  const { formatDate } = useFormatDate();
  const router = useRouter();

  const columns = useMemo<ColumnDef<ApplicationItem>[]>(
    () => [
      {
        accessorKey: "batchlot",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Batch Lot ID" />
        ),
        cell: ({ row }) => (
          <div className="font-medium">{row.getValue("batchlot")}</div>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "farmName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Farm Name" />
        ),
        cell: ({ row }) => <div>{row.getValue("farmName")}</div>,
        enableSorting: true,
      },
      {
        accessorKey: "farmerName",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Farmer Name" />
        ),
        cell: ({ row }) => <div>{row.getValue("farmerName")}</div>,
        enableSorting: true,
      },
      {
        accessorKey: "totalWeight",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Weight (kg)" />
        ),
        cell: ({ row }) => {
          const weight = row.getValue("totalWeight") as number;
          return (
            <div className="text-right font-mono">
              {weight.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </div>
          );
        },
        enableSorting: true,
      },
      {
        accessorKey: "province",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Province" />
        ),
        cell: ({ row }) => <div>{row.getValue("province")}</div>,
        enableSorting: true,
      },
      {
        accessorKey: "dateCreated",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Harvest Date" />
        ),
        cell: ({ row }) => {
          const date = row.getValue("dateCreated") as string;
          return <div className="text-center">{formatDate(date)}</div>;
        },
        enableSorting: true,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          const statusConfig = {
            pending: { label: "Pending", variant: "outline" as const },
            approved: { label: "Approved", variant: "default" as const },
            rejected: { label: "Rejected", variant: "destructive" as const },
            processing: { label: "Processing", variant: "secondary" as const },
          };

          const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig.pending;

          return (
            <Badge variant={config.variant} className="capitalize">
              {config.label}
            </Badge>
          );
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button variant="ghost" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [formatDate, router],
  );

  return { columns };
}
