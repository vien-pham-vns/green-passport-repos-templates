import { SearchParamsAsString, Sort } from "@/types/common";

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
  q?: string; // keyword search
  fromDate?: string;
  toDate?: string;
  page: number;
  size: number;
  status?: ApplicationStatus; // Filter by single status
  sort?: Sort;
}

export type AcceptFileTypes = "application/pdf" | "image/png" | "image/jpeg";

export interface Image {
  id: string;
  filenameDisk: string;
  filenameDownload: string;
  filesize?: number;
  type?: AcceptFileTypes;
}

export interface ApplicationData {
  id: string;
  number: string;
  type?: ApplicationType;
  status: ApplicationStatus;
  labBranch?: string;
  result?: string;
  resultFile?: Image;
  userCreated?: {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    roleLabel?: {
      en: string;
      th: string;
    };
    profile: {
      nickname?: string;
    };
  };
  createdAt: string;
  paymentId?: string;
}

export interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApplicationTableResponse {
  message: string;
  pagination: PaginationData;
  data: ApplicationData[];
}

/**
 * Allowed page sizes for pagination
 */
export const ALLOWED_PAGE_SIZES = [10, 20, 30, 50, 100] as const;
export type PageSize = (typeof ALLOWED_PAGE_SIZES)[number];

/**
 * Allowed sort fields
 */
export const ALLOWED_SORT_FIELDS = ["created_at", "status"] as const;
export type SortField = (typeof ALLOWED_SORT_FIELDS)[number];

/**
 * Allowed sort directions
 */
export const ALLOWED_SORT_DIRECTIONS = ["asc", "desc"] as const;
export type SortDirection = (typeof ALLOWED_SORT_DIRECTIONS)[number];

/**
 * API request parameters for application list endpoint
 * Maps to backend API query parameters
 */
export interface ApplicationApiRequestParam {
  // Required parameters
  page: number; // 1-based indexing, minimum: 1
  page_size: PageSize; // Allowed values: 10, 20, 30, 50, 100

  // Optional parameters
  keyword?: string; // Search term for filtering
  status?: ApplicationStatus; // Filter by status: waiting, processing, completed, cancelled
  sort_by?: SortField; // Field to sort by: created_at, status
  sort_dir?: SortDirection; // Sort direction: asc, desc
  from_date?: number; // Unix timestamp
  to_date?: number; // Unix timestamp
}

export interface ApplicationPageProps extends PageProps<"/applications"> {
  searchParams: Promise<Partial<SearchParamsAsString<ApplicationSearchParams>>>;
}
