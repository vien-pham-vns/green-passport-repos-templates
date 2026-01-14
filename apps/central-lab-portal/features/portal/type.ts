import { SearchParamsAsString, Sort } from "@/types/common";

export interface ApplicationSearchParams {
  q: string;
  fromDate: string;
  toDate: string;
  page: number;
  size: number;
  sort: Sort;
}

export interface ApplicationItem {
  id: string;
  batchlot: string;
  dateCreated: string;
  totalWeight: number;
  farmName: string;
  farmerId: string;
  farmerName: string;
  province: string;
  district: string;
  subDistrict: string;
  status: string;
}

export interface ApplicationData {
  data: ApplicationItem[];
  total: number;
  page: number;
  size: number;
}

export interface ApplicationTableResponse {
  success: boolean;
  data: ApplicationData;
}

export interface ApplicationApiRequestParam {
  keyword: string;
  from_date: number;
  to_date: number;
  page: number;
  size: number;
  sort: string; // -abc (desc), abc (asc)
}

export interface ApplicationPageProps extends PageProps<"/portal"> {
  searchParams: Promise<Partial<SearchParamsAsString<ApplicationSearchParams>>>;
}
