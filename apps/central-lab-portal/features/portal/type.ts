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
  q: string;
  fromDate: string;
  toDate: string;
  page: number;
  size: number;
  sort: Sort;
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

export interface ApplicationApiRequestParam {
  keyword: string;
  from_date: number;
  to_date: number;
  page: number;
  size: number;
  sort: string; // -abc (desc), abc (asc)
}

export interface ApplicationPageProps extends PageProps<"/central-lab"> {
  searchParams: Promise<Partial<SearchParamsAsString<ApplicationSearchParams>>>;
}
