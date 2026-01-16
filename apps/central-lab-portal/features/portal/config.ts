import { ApplicationStatus } from "./type";

export const PORTAL_CACHE_TAG = "portal-applications";

export const AppStatusConfig: Record<
  ApplicationStatus,
  {
    label: string;
    variant: "outline" | "secondary" | "default" | "destructive";
  }
> = {
  [ApplicationStatus.NEW]: {
    label: "New",
    variant: "outline",
  },
  [ApplicationStatus.WAITING]: {
    label: "Pending",
    variant: "outline",
  },
  [ApplicationStatus.PROCESSING]: {
    label: "Processing",
    variant: "secondary",
  },
  [ApplicationStatus.COMPLETED]: {
    label: "Completed",
    variant: "default",
  },
  [ApplicationStatus.CANCELLED]: {
    label: "Cancelled",
    variant: "destructive",
  },
};
