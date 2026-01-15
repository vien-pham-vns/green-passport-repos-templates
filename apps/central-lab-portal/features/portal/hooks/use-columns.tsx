"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import useFormatDate from "@/hooks/use-format-date";
import { ApplicationData, ApplicationStatus } from "../type";

const DEFAULT_VALUE = "--";

export function useColumns() {
  const { formatDate } = useFormatDate();
  const router = useRouter();

  const handleViewClick = (application: ApplicationData) => {
    router.push(`/applications/${application.id}`);
  };

  const columns = useMemo<ColumnDef<ApplicationData>[]>(
    () => [
      {
        accessorKey: "number",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Application ID" />
        ),
        cell: ({ row }) => (
          <div className="font-medium text-[#2563EB] cursor-pointer">
            {row.getValue("number")}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => <div>{row.getValue("type") || DEFAULT_VALUE}</div>,
        enableSorting: false,
      },

      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const status = row.getValue("status") as string;

          const statusConfig = {
            [ApplicationStatus.WAITING]: {
              label: "Pending",
              variant: "outline" as const,
            },
            [ApplicationStatus.PROCESSING]: {
              label: "Processing",
              variant: "secondary" as const,
            },
            [ApplicationStatus.COMPLETED]: {
              label: "Completed",
              variant: "default" as const,
            },
            [ApplicationStatus.CANCELLED]: {
              label: "Cancelled",
              variant: "destructive" as const,
            },
          };

          const config =
            statusConfig[status as keyof typeof statusConfig] ||
            statusConfig[ApplicationStatus.WAITING];

          return (
            <Badge variant={config.variant} className="capitalize">
              {config.label}
            </Badge>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "labBranch",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Branch" />
        ),
        cell: ({ row }) => (
          <div>{row.getValue("labBranch") || DEFAULT_VALUE}</div>
        ),
        enableSorting: false,
      },
      {
        accessorKey: "result",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Result" />
        ),
        cell: ({ row }) => <div>{row.getValue("result") || DEFAULT_VALUE}</div>,
        enableSorting: false,
      },
      {
        accessorKey: "userCreated",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created By" />
        ),
        cell: ({ row }) => {
          const user = row.getValue(
            "userCreated",
          ) as ApplicationData["userCreated"];
          return <div>{user?.firstName || DEFAULT_VALUE}</div>;
        },
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created Date" />
        ),
        cell: ({ row }) => {
          const date = row.getValue("createdAt") as string;
          return <div>{formatDate(date)}</div>;
        },
        enableSorting: true,
      },
      {
        id: "actions",
        header: () => <div className="text-center">Actions</div>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleViewClick(row.original)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [formatDate, router, handleViewClick],
  );

  return { columns };
}
