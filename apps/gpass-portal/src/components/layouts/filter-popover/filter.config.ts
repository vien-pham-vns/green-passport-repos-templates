export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField<T = Record<string, unknown>> {
  key: keyof T;
  label: string;
  type?: 'date' | 'radio' | 'autocomplete' | 'checkbox';
  options?: FilterOption[];
}

/**
 * Helper type to create a filter configuration object with named keys
 */
export type FilterConfig<T> = {
  [K in keyof T]: FilterField<T>;
};
