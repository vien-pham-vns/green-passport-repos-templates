"use client";

import { useState, useMemo, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslationFiles } from "../hooks/use-translation-files";
import { useTranslationSync } from "../hooks/use-translation-sync";
import {
  searchTranslations,
  findMissingTranslations,
} from "../utils/file-parser";
import { getLanguageStatistics } from "../utils/diff-checker";
import FileUploader from "./file-uploader";
import TranslationTable from "./translation-table";
import LanguageStats from "./language-stats";
import TranslationToolbar from "./translation-toolbar-simple";
import TranslationToolbarSimple from "./translation-toolbar-simple";

interface TranslationEditorWithLoaderProps {
  /**
   * Server action to load translation files
   */
  loadFilesAction?: () => Promise<
    Array<{ language: string; filename: string; content: string }>
  >;
  /**
   * Whether to auto-load files on mount
   */
  autoLoad?: boolean;
}

export default function TranslationEditorWithLoader({
  loadFilesAction,
  autoLoad = true,
}: TranslationEditorWithLoaderProps) {
  const {
    files,
    entries,
    languages,
    loading: filesLoading,
    error,
    loadFiles,
    updateTranslation,
    reset,
  } = useTranslationFiles();

  const { downloadAll, syncError } = useTranslationSync();

  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyMissing, setShowOnlyMissing] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("all");
  const [initialLoading, setInitialLoading] = useState(autoLoad);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Auto-load files on mount if loadFilesAction is provided
  useEffect(() => {
    if (!autoLoad || !loadFilesAction) return;

    const loadInitialFiles = async () => {
      try {
        setInitialLoading(true);
        setLoadError(null);

        const filesData = await loadFilesAction();

        if (filesData.length > 0) {
          // Create a FileList-like object from the server data
          const dataTransfer = new DataTransfer();

          for (const { filename, content } of filesData) {
            const blob = new Blob([content], { type: "application/json" });
            const file = new File([blob], filename, {
              type: "application/json",
            });
            dataTransfer.items.add(file);
          }

          await loadFiles(dataTransfer.files);
        } else {
          setLoadError("No translation files found in public/translations");
        }
      } catch (err) {
        setLoadError(
          err instanceof Error
            ? err.message
            : "Failed to load translation files",
        );
      } finally {
        setInitialLoading(false);
      }
    };

    loadInitialFiles();
  }, [loadFilesAction, autoLoad, loadFiles]);

  // Get available features (top-level keys)
  const availableFeatures = useMemo(() => {
    const features = new Set<string>();
    for (const entry of entries) {
      const topLevel = entry.path[0];
      if (topLevel) {
        features.add(topLevel);
      }
    }
    return Array.from(features).sort();
  }, [entries]);

  // Filtered entries based on search, feature, and missing filter
  const filteredEntries = useMemo(() => {
    let result = entries;

    // Apply feature filter
    if (selectedFeature !== "all") {
      result = result.filter((entry) => entry.path[0] === selectedFeature);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      result = searchTranslations(result, searchQuery);
    }

    // Apply missing filter
    if (showOnlyMissing) {
      result = findMissingTranslations(result, languages);
    }

    return result;
  }, [entries, selectedFeature, searchQuery, showOnlyMissing, languages]);

  // Language statistics
  const languageStats = useMemo(() => {
    return getLanguageStatistics(entries, languages);
  }, [entries, languages]);

  const handleDownloadAll = () => {
    downloadAll(files);
  };

  const handleReset = () => {
    reset();
    setSearchQuery("");
    setShowOnlyMissing(false);
    setSelectedFeature("all");
  };

  const handleManualUpload = async (fileList: FileList) => {
    await loadFiles(fileList);
  };

  // Show loading spinner during initial load
  if (initialLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            py: 12,
          }}
        >
          <CircularProgress size={48} />
          <Typography variant="body1" color="text.secondary">
            Loading translation files...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={500}>
          Translation DevTools
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and edit translation files for your applications
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loadError && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {loadError}
        </Alert>
      )}

      {syncError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {syncError}
        </Alert>
      )}

      {files.length === 0 ? (
        <FileUploader
          onFilesSelected={handleManualUpload}
          loading={filesLoading}
        />
      ) : (
        <>
          {/* Language Statistics */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
              Language Overview
            </Typography>
            <Grid container spacing={2}>
              {languages.map((lang) => {
                const stats = languageStats[lang];
                if (!stats) return null;
                return (
                  <Grid key={lang} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <LanguageStats language={lang} stats={stats} />
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          {/* Toolbar */}
          <TranslationToolbarSimple
            availableFeatures={availableFeatures}
            onDownloadAll={handleDownloadAll}
            onReset={handleReset}
            // onUpload={handleUploadClick}
            totalEntries={entries.length}
            filteredEntries={filteredEntries.length}
            languages={languages}
          />

          {/* Translation Table */}
          <TranslationTable
            entries={filteredEntries}
            languages={languages}
            onUpdateTranslation={updateTranslation}
            showOnlyMissing={showOnlyMissing}
          />
        </>
      )}
    </Container>
  );
}
