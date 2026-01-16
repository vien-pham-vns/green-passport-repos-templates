export type AcceptFileTypes = "application/pdf" | "image/png" | "image/jpeg";

export type SearchParamsAsString<T> = {
  [K in keyof T]: string;
};

export interface Sort {
  field: string;
  direction: "asc" | "desc" | null;
}

export interface AppImage {
  id: string;
  filenameDisk: string;
  filenameDownload: string;
  filesize?: number;
  type?: AcceptFileTypes;
}

export interface PaginationData {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
