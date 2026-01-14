export type SearchParamsAsString<T> = {
  [K in keyof T]: string;
};

export interface Sort {
  field: string;
  direction: "asc" | "desc" | null;
}
