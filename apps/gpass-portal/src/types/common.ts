import { FEATURE_FLAGS } from 'constant/feature-flags';
import { Dayjs } from 'utils/date';

export type ValueOf<T> = T[keyof T];

export type PaginationRequest = {
  limit?: number;
  offset?: number;
};

export type PaginationResponse = {
  pagination: {
    total: number;
  };
};

export type MuiColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'info'
  | 'warning';

export type MultiLanguage = {
  th: string;
  en: string;
};

export type DateTime = string | number | Dayjs;

export type Sort = {
  field: string;
  direction: 'desc' | 'asc' | null | undefined;
};

export type FeatureFlags = Record<(typeof FEATURE_FLAGS)[number], boolean | null>;

export interface TableParams {
  page?: number;
  size?: number;
  keyword?: string;
  fromDate?: number;
  toDate?: number;
  sort?: string;
}
