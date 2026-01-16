"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import useFormatDate from "@/hooks/use-format-date";
import { ApplicationData, ApplicationStatus } from "../type";
import { AppStatusConfig } from "../config";

const DEFAULT_VALUE = "--";

export function useColumns() {
  "use memo";

  const { formatDate } = useFormatDate();
  const router = useRouter();

  const handleViewClick = (application: ApplicationData) => {
    return null;
    // router.push(`/central-lab/${application.id}`);
  };

  const columns = [
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
        const status = row.getValue("status") as ApplicationStatus;
        const config =
          AppStatusConfig[status] ?? AppStatusConfig[ApplicationStatus.WAITING];

        return (
          <Badge variant={config.variant} className="capitalize">
            {config.label}
          </Badge>
        );
      },
      enableSorting: true,
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
      accessorKey: "assignee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assignee" />
      ),
      cell: ({ row }) => <div>{row.getValue("assignee") || DEFAULT_VALUE}</div>,
      enableSorting: false,
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
  ] as ColumnDef<ApplicationData>[];

  return { columns };
}
