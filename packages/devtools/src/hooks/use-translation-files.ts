"use client";

import { useState, useCallback } from "react";
import type { TranslationFile, FlatTranslationEntry } from "../types";
import {
  parseTranslationFile,
  mergeTranslationFiles,
  setNestedValue,
} from "../utils/file-parser";
import { loadTranslationFilesFromInput } from "../utils/file-writer";

export interface UseTranslationFilesReturn {
  files: TranslationFile[];
  entries: FlatTranslationEntry[];
  languages: string[];
  loading: boolean;
  error: string | null;
  loadFiles: (fileList: FileList) => Promise<void>;
  updateTranslation: (key: string, language: string, value: string) => void;
  addLanguage: (language: string) => void;
  removeLanguage: (language: string) => void;
  reset: () => void;
}

/**
 * Hook for managing translation files
 */
export function useTranslationFiles(): UseTranslationFilesReturn {
  const [files, setFiles] = useState<TranslationFile[]>([]);
  const [entries, setEntries] = useState<FlatTranslationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const languages = files.map((f) => f.language);

  const loadFiles = useCallback(async (fileList: FileList) => {
    setLoading(true);
    setError(null);

    try {
      const fileContents = await loadTranslationFilesFromInput(fileList);
      const parsedFiles: TranslationFile[] = [];

      for (const { filename, content } of fileContents) {
        // Extract language from filename (e.g., "en.json" -> "en")
        const language = filename.replace(".json", "");
        const file = parseTranslationFile(content, language, filename);
        parsedFiles.push(file);
      }

      setFiles(parsedFiles);
      const merged = mergeTranslationFiles(parsedFiles);
      setEntries(merged);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load files");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTranslation = useCallback(
    (key: string, language: string, value: string) => {
      setFiles((prevFiles) => {
        const updatedFiles = prevFiles.map((file) => {
          if (file.language === language) {
            return {
              ...file,
              data: setNestedValue(file.data, key, value),
              lastModified: new Date(),
            };
          }
          return file;
        });

        // Update entries
        const merged = mergeTranslationFiles(updatedFiles);
        setEntries(merged);

        return updatedFiles;
      });
    },
    [],
  );

  const addLanguage = useCallback((language: string) => {
    setFiles((prevFiles) => {
      if (prevFiles.some((f) => f.language === language)) {
        return prevFiles;
      }

      const newFile: TranslationFile = {
        language,
        filename: `${language}.json`,
        data: {},
        lastModified: new Date(),
      };

      const updatedFiles = [...prevFiles, newFile];
      const merged = mergeTranslationFiles(updatedFiles);
      setEntries(merged);

      return updatedFiles;
    });
  }, []);

  const removeLanguage = useCallback((language: string) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((f) => f.language !== language);
      const merged = mergeTranslationFiles(updatedFiles);
      setEntries(merged);
      return updatedFiles;
    });
  }, []);

  const reset = useCallback(() => {
    setFiles([]);
    setEntries([]);
    setError(null);
  }, []);

  return {
    files,
    entries,
    languages,
    loading,
    error,
    loadFiles,
    updateTranslation,
    addLanguage,
    removeLanguage,
    reset,
  };
}
