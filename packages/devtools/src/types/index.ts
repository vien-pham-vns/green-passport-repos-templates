/**
 * Translation data structure
 */
export type TranslationValue = string | TranslationObject;

export interface TranslationObject {
  [key: string]: TranslationValue;
}

/**
 * Flattened translation entry for table view
 */
export interface FlatTranslationEntry {
  key: string; // Dot-notation key (e.g., "auth.login.title")
  path: string[]; // Array path (e.g., ["auth", "login", "title"])
  values: Record<string, string>; // Language code -> translation
}

/**
 * Translation file metadata
 */
export interface TranslationFile {
  language: string;
  filename: string;
  data: TranslationObject;
  lastModified?: Date;
}

/**
 * Translation project containing multiple language files
 */
export interface TranslationProject {
  name: string;
  languages: string[];
  files: TranslationFile[];
}

/**
 * Diff entry showing changes between languages
 */
export interface TranslationDiff {
  key: string;
  type: "added" | "removed" | "modified" | "missing";
  languages: string[];
  values: Record<string, string | undefined>;
}

/**
 * Filter options for translation view
 */
export interface TranslationFilter {
  searchQuery?: string;
  showOnlyMissing?: boolean;
  languages?: string[];
}

/**
 * Export options
 */
export interface ExportOptions {
  languages: string[];
  format: "json" | "zip";
  filename?: string;
}
