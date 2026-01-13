/**
 * Feature types
 */
import { SearchParamsAsString, Sort } from '@/types/common';

export interface ApplicationSearchParams {
  q: string;
  fromDate: string;
  toDate: string;
  page: number;
  size: number;
  sort: Sort;
}

export interface ApplicationPageProps extends PageProps<'/portal'> {
  searchParams: Promise<Partial<SearchParamsAsString<ApplicationSearchParams>>>;
}

export interface Application {
  total: number;
  items: ApplicationItem[];
}

export interface ApplicationItem {
  id: string;
  batchLot: string;
  dateCreated: number;
  totalWeight: number;
  eventId: string;
  farmName: string;
  farmAddress: string;
  province: string;
  gapNumber: string;
  gapExpired: boolean;
  gapIssueTitle: {
    en: string;
    th: string;
  };
}

export interface ApplicationApiRequestParam {
  keyword: string;
  page: number;
  size: number;
  fromDate: number; // unix
  toDate: number; // unix
  sort: string; // -abc (desc), abc (asc)
}

export interface ApplicationTableResponse {
  data: {
    data: ApplicationItem[];
    total: number;
    page: number;
    size: number;
  };
}
