"use client";
"use memo"; // React Compiler opt-in

import { useState } from "react";
import type { TranslationFile } from "../types";
import {
  downloadTranslationFile,
  downloadAllTranslations,
  stringifyTranslations,
  copyToClipboard,
} from "../utils/file-writer";

export interface UseTranslationSyncReturn {
  syncing: boolean;
  syncError: string | null;
  downloadFile: (file: TranslationFile) => void;
  downloadAll: (files: TranslationFile[]) => void;
  copyFileContent: (file: TranslationFile) => Promise<void>;
  exportAsJson: (file: TranslationFile) => string;
}

/**
 * Hook for syncing and exporting translation files
 */
export function useTranslationSync(): UseTranslationSyncReturn {
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const downloadFile = (file: TranslationFile) => {
    try {
      setSyncing(true);
      setSyncError(null);
      downloadTranslationFile(file);
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setSyncing(false);
    }
  };

  const downloadAll = (files: TranslationFile[]) => {
    try {
      setSyncing(true);
      setSyncError(null);
      downloadAllTranslations(files);
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : "Download failed");
    } finally {
      setSyncing(false);
    }
  };

  const copyFileContent = async (file: TranslationFile) => {
    try {
      setSyncing(true);
      setSyncError(null);
      const content = stringifyTranslations(file.data);
      await copyToClipboard(content);
    } catch (err) {
      setSyncError(err instanceof Error ? err.message : "Copy failed");
    } finally {
      setSyncing(false);
    }
  };

  const exportAsJson = (file: TranslationFile): string => {
    return stringifyTranslations(file.data);
  };

  return {
    syncing,
    syncError,
    downloadFile,
    downloadAll,
    copyFileContent,
    exportAsJson,
  };
}
