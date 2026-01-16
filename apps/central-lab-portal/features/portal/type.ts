import {
  AppImage,
  PaginationData,
  SearchParamsAsString,
  Sort,
} from "@/types/common";
import { User } from "@/types/user";

export enum ApplicationType {
  LAB_TEST = "lab_test",
  REVIEW_DOC = "review_doc",
}

export enum ApplicationStatus {
  WAITING = "waiting",
  PROCESSING = "processing",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  NEW = "new",
}

export interface ApplicationSearchParams {
  q: string;
  fromDate: string;
  toDate: string;
  page: number;
  size: number;
  status: ApplicationStatus;
  sort: Sort;
}

export interface ApplicationData {
  id: string;
  number: string;
  type: ApplicationType;
  status: ApplicationStatus;
  labBranch: string;
  result: string;
  resultFile: AppImage;
  userCreated: User;
  assignee: User;
  createdAt: string;
  paymentId: string;
}

export interface ApplicationTableResponse {
  message: string;
  pagination: PaginationData;
  data: ApplicationData[];
}

/**
 * Maps to backend API query parameters
 */
export interface ApplicationApiRequestParam {
  page: number;
  page_size: number;
  keyword: string;
  status: ApplicationStatus;
  sort_by: Sort["field"];
  sort_dir: Sort["direction"];
  from_date: number;
  to_date: number;
}

export interface ApplicationPageProps extends PageProps<"/central-lab"> {
  searchParams: Promise<Partial<SearchParamsAsString<ApplicationSearchParams>>>;
}
