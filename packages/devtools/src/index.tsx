// Component exports
export { default as TranslationEditor } from "./components/translation-editor-simple";
export { default as FileUploader } from "./components/file-uploader";
export { default as TranslationTable } from "./components/translation-table";
export { default as LanguageStats } from "./components/language-stats";
export { default as TranslationToolbar } from "./components/translation-toolbar-simple";
export { default as M3ThemeDemo } from "./components/m3-theme-demo";
export { default as GovernmentThemeDemo } from "./components/government-theme-demo";
export { default as TranslationEditorWithLoader } from "./components/translation-editor-with-loader";

// Hook exports
export { useTranslationFiles } from "./hooks/use-translation-files";
export { useTranslationSync } from "./hooks/use-translation-sync";
export { useTranslationFilters } from "./hooks/use-url-search-params";
export { useFilteredTranslations } from "./hooks/use-filtered-translations";
export type { UseTranslationFilesReturn } from "./hooks/use-translation-files";
export type { UseTranslationSyncReturn } from "./hooks/use-translation-sync";

// Type exports
export type {
  TranslationValue,
  TranslationObject,
  FlatTranslationEntry,
  TranslationFile,
  TranslationProject,
  TranslationDiff,
  TranslationFilter,
  ExportOptions,
} from "./types";

// Utility exports
export {
  flattenTranslations,
  unflattenTranslations,
  getNestedValue,
  setNestedValue,
  parseTranslationFile,
  mergeTranslationFiles,
  findMissingTranslations,
  searchTranslations,
} from "./utils/file-parser";

export {
  stringifyTranslations,
  downloadFile,
  downloadTranslationFile,
  downloadAllTranslations,
  copyToClipboard,
  readFileAsText,
  loadTranslationFilesFromInput,
} from "./utils/file-writer";

export {
  generateTranslationDiff,
  calculateCompletionPercentage,
  getLanguageStatistics,
} from "./utils/diff-checker";

export { loadEnv } from "./utils/variables-env";
