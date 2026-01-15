"use client";

import * as React from "react";
import { Filter, Check } from "lucide-react";
import { startOfDay, endOfDay, isBefore } from "date-fns";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { ApplicationType, ApplicationStatus } from "@/features/portal/type";
import { cn } from "@/lib/utils";

export interface DataTableFilterValues {
  applicationTypes?: ApplicationType[];
  applicationStatuses?: ApplicationStatus[];
  labBranch?: string;
  fromDate?: Date;
  toDate?: Date;
}

interface DataTableFiltersProps {
  filters: DataTableFilterValues;
  onFiltersChange: (filters: DataTableFilterValues) => void;
  onClearFilters: () => void;
}

// Dummy lab branches data
const LAB_BRANCHES = [
  { value: "bangkok", label: "Bangkok Lab" },
  { value: "chiangmai", label: "Chiang Mai Lab" },
  { value: "phuket", label: "Phuket Lab" },
];

// Application type labels
const APPLICATION_TYPE_LABELS: Record<ApplicationType, string> = {
  [ApplicationType.LAB_TEST]: "Lab Test",
  [ApplicationType.REVIEW_DOC]: "Review Document",
};

// Application status labels
const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.NEW]: "New",
  [ApplicationStatus.WAITING]: "Waiting",
  [ApplicationStatus.PROCESSING]: "Processing",
  [ApplicationStatus.COMPLETED]: "Completed",
  [ApplicationStatus.CANCELLED]: "Cancelled",
};

export function DataTableFilters({
  filters,
  onFiltersChange,
  onClearFilters,
}: DataTableFiltersProps) {
  const [open, setOpen] = React.useState(false);
  const [localFilters, setLocalFilters] =
    React.useState<DataTableFilterValues>(filters);

  // Sync local filters with prop filters when they change
  React.useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApply = () => {
    onFiltersChange(localFilters);
    setOpen(false);
  };

  const handleClear = () => {
    const clearedFilters: DataTableFilterValues = {
      applicationTypes: undefined,
      applicationStatuses: undefined,
      labBranch: undefined,
      fromDate: undefined,
      toDate: undefined,
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
    setOpen(false);
  };

  const updateFilter = <K extends keyof DataTableFilterValues>(
    key: K,
    value: DataTableFilterValues[K],
  ) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Toggle checkbox selection for multi-select filters
  const toggleArrayFilter = <T,>(
    key: "applicationTypes" | "applicationStatuses",
    value: T,
  ) => {
    setLocalFilters((prev) => {
      const currentArray = (prev[key] as T[] | undefined) || [];
      const isSelected = currentArray.includes(value);

      const newArray = isSelected
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];

      return {
        ...prev,
        [key]: newArray.length > 0 ? newArray : undefined,
      };
    });
  };

  // Calculate max date for "From Date" (today or To Date if selected)
  const maxFromDate = localFilters.toDate
    ? endOfDay(localFilters.toDate)
    : endOfDay(new Date());

  // Calculate min date for "To Date" (From Date or undefined)
  const minToDate = localFilters.fromDate
    ? startOfDay(localFilters.fromDate)
    : undefined;

  // Date validation error
  const [dateError, setDateError] = React.useState<string | null>(null);

  // Validate dates whenever they change
  React.useEffect(() => {
    if (localFilters.fromDate && localFilters.toDate) {
      if (isBefore(localFilters.toDate, localFilters.fromDate)) {
        setDateError("To Date must be after From Date");
      } else {
        setDateError(null);
      }
    } else {
      setDateError(null);
    }
  }, [localFilters.fromDate, localFilters.toDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        }
      />
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Set filters for the table data
            </p>
          </div>

          <div className="space-y-4">
            {/* Application Type - Checkbox Group */}
            <div className="space-y-2">
              <Label>Application Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(ApplicationType).map((type) => {
                  const isSelected =
                    localFilters.applicationTypes?.includes(type) ?? false;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        toggleArrayFilter("applicationTypes", type)
                      }
                      className={cn(
                        "relative flex items-center justify-between rounded-md border p-3 text-left transition-colors hover:bg-accent",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-input bg-background",
                      )}
                    >
                      <span className="text-sm font-medium">
                        {APPLICATION_TYPE_LABELS[type]}
                      </span>
                      {isSelected && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Application Status - Checkbox Group */}
            <div className="space-y-2">
              <Label>Application Status</Label>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(ApplicationStatus).map((status) => {
                  const isSelected =
                    localFilters.applicationStatuses?.includes(status) ?? false;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        toggleArrayFilter("applicationStatuses", status)
                      }
                      className={cn(
                        "relative flex items-center justify-between rounded-md border p-3 text-left transition-colors hover:bg-accent",
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-input bg-background",
                      )}
                    >
                      <span className="text-sm font-medium">
                        {APPLICATION_STATUS_LABELS[status]}
                      </span>
                      {isSelected && (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-5 w-5" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lab Branch - Dropdown */}
            <div className="space-y-2">
              <Label htmlFor="labBranch">Lab Branch</Label>
              <Select
                value={localFilters.labBranch ?? null}
                onValueChange={(value) =>
                  updateFilter("labBranch", value ?? undefined)
                }
                items={[
                  { value: null, label: "Choose Branch" },
                  ...LAB_BRANCHES,
                ]}
              >
                <SelectTrigger id="labBranch" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={null}>Choose Branch</SelectItem>
                    {LAB_BRANCHES.map((branch) => (
                      <SelectItem key={branch.value} value={branch.value}>
                        {branch.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* From Date */}
            <div className="space-y-2">
              <Label htmlFor="fromDate">From Date</Label>
              <DatePicker
                date={localFilters.fromDate}
                onDateChange={(date) => updateFilter("fromDate", date)}
                placeholder="Select from date"
                maxDate={maxFromDate}
                className="w-full"
              />
            </div>

            {/* To Date */}
            <div className="space-y-2">
              <Label htmlFor="toDate">To Date</Label>
              <DatePicker
                date={localFilters.toDate}
                onDateChange={(date) => updateFilter("toDate", date)}
                placeholder="Select to date"
                minDate={minToDate}
                className="w-full"
              />
            </div>

            {/* Date Error Message */}
            {dateError && (
              <div className="rounded-md bg-destructive/10 p-2 text-sm text-destructive">
                {dateError}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button onClick={handleClear} variant="outline" className="flex-1">
              Clear
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1"
              disabled={!!dateError}
            >
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
