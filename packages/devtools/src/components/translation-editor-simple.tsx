"use client";
"use memo"; // React Compiler opt-in

import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { useTranslationFiles } from "../hooks/use-translation-files";
import { useTranslationSync } from "../hooks/use-translation-sync";
import { useFilteredTranslations } from "../hooks/use-filtered-translations";
import { useTranslationFilters } from "../hooks/use-url-search-params";
import FileUploader from "./file-uploader";
import TranslationToolbarSimple from "./translation-toolbar-simple";
import TranslationTable from "./translation-table";
import LanguageStats from "./language-stats";

interface TranslationEditorProps {
  /**
   * Pre-loaded translation files from server (Server Component)
   */
  initialFiles?: Array<{ language: string; filename: string; content: string }>;
}

export default function TranslationEditor({
  initialFiles,
}: TranslationEditorProps) {
  const {
    files,
    entries,
    languages,
    loading,
    error,
    loadFiles,
    updateTranslation,
    reset,
  } = useTranslationFiles();
  const { downloadAll, syncError } = useTranslationSync();
  const filters = useTranslationFilters();

  const [initialLoading, setInitialLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showUploader, setShowUploader] = useState(false);

  // Use filtered translations hook
  const { availableFeatures, filteredEntries, languageStats } =
    useFilteredTranslations({
      entries,
      languages,
      searchQuery: filters.search,
      showOnlyMissing: filters.showMissing,
      selectedFeature: filters.feature,
    });

  // Load initial files from server once
  if (
    initialFiles &&
    initialFiles.length > 0 &&
    files.length === 0 &&
    !initialLoading &&
    !loadError
  ) {
    (async () => {
      setInitialLoading(true);
      try {
        const dataTransfer = new DataTransfer();
        for (const { filename, content } of initialFiles) {
          const blob = new Blob([content], { type: "application/json" });
          const file = new File([blob], filename, { type: "application/json" });
          dataTransfer.items.add(file);
        }
        await loadFiles(dataTransfer.files);
      } catch (err) {
        setLoadError(
          err instanceof Error
            ? err.message
            : "Failed to load translation files",
        );
      } finally {
        setInitialLoading(false);
      }
    })();
  }

  const handleDownloadAll = () => {
    console.log(
      "Downloading files:",
      files.map((f) => f.filename),
    );
    downloadAll(files);
  };
  const handleReset = () => {
    reset();
  };

  const handleUploadClick = () => {
    setShowUploader(true);
  };

  const handleCloseUploader = () => {
    setShowUploader(false);
  };

  const handleFilesSelected = (selectedFiles: FileList) => {
    loadFiles(selectedFiles);
    setShowUploader(false);
  };

  // Loading state
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
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={500}>
          Translation DevTools
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and edit translation files for your applications
        </Typography>
      </Box>

      {/* Error Messages */}
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

      {/* File Uploader or Editor */}
      {files.length === 0 ? (
        <FileUploader onFilesSelected={loadFiles} loading={loading} />
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

          {/* Toolbar with Filters */}
          <TranslationToolbarSimple
            availableFeatures={availableFeatures}
            onDownloadAll={handleDownloadAll}
            onReset={handleReset}
            onUpload={handleUploadClick}
            totalEntries={entries.length}
            filteredEntries={filteredEntries.length}
            languages={languages}
          />

          {/* Upload Dialog */}
          <Dialog
            open={showUploader}
            onClose={handleCloseUploader}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Upload Translation Files</DialogTitle>
            <DialogContent>
              <FileUploader
                onFilesSelected={handleFilesSelected}
                loading={loading}
              />
            </DialogContent>
          </Dialog>

          {/* Translation Table */}
          <TranslationTable
            entries={filteredEntries}
            languages={languages}
            onUpdateTranslation={updateTranslation}
            showOnlyMissing={filters.showMissing}
          />
        </>
      )}
    </Container>
  );
}
