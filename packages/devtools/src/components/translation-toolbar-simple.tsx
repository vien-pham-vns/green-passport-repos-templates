"use client";
"use memo"; // React Compiler opt-in

import { useTransition } from "react";
import { useDebouncedCallback } from "use-debounce";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import FilterListIcon from "@mui/icons-material/FilterList";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslationFilters } from "../hooks/use-url-search-params";

interface TranslationToolbarProps {
  availableFeatures: string[];
  onDownloadAll: () => void;
  onReset: () => void;
  onUpload?: () => void;
  totalEntries: number;
  filteredEntries: number;
  languages: string[];
}

/**
 * Simplified toolbar using native URLSearchParams
 * React 19 useTransition for non-blocking updates
 */
export default function TranslationToolbar({
  availableFeatures,
  onDownloadAll,
  onReset,
  onUpload,
  totalEntries,
  filteredEntries,
  languages,
}: TranslationToolbarProps) {
  const filters = useTranslationFilters();
  const [isPending, startTransition] = useTransition();

  // Debounced search updates (300ms delay)
  const handleSearchChange = useDebouncedCallback((value: string) => {
    startTransition(() => {
      filters.setSearch(value);
    });
  }, 300);

  const handleRefresh = () => {
    filters.reset();
    onReset();
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Search and Filter Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search translations..."
          defaultValue={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, opacity: isPending ? 0.5 : 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <FilterListIcon sx={{ mr: 1, color: "text.secondary" }} />
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 180 } }}>
          <InputLabel>Feature</InputLabel>
          <Select
            value={filters.feature}
            label="Feature"
            onChange={(e) => filters.setFeature(e.target.value)}
          >
            <MenuItem value="all">All Features</MenuItem>
            {availableFeatures.map((feature) => (
              <MenuItem key={feature} value={feature}>
                {feature}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Actions Row */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={filters.showMissing}
                onChange={(e) => filters.setShowMissing(e.target.checked)}
                size="small"
              />
            }
            label={<Typography variant="body2">Show only missing</Typography>}
          />

          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip
              label={`${filteredEntries} / ${totalEntries}`}
              size="small"
              variant="outlined"
            />
            <Chip
              label={`${languages.length} lang`}
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          {onUpload && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<UploadFileIcon />}
              onClick={onUpload}
            >
              Upload
            </Button>
          )}
          <Button
            variant="outlined"
            size="small"
            startIcon={<DownloadIcon />}
            onClick={onDownloadAll}
          >
            Download
          </Button>
          <Button
            variant="text"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
