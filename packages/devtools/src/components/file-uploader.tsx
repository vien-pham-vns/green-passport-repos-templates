"use client";

import { useRef } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import UploadFileIcon from "@mui/icons-material/UploadFile";

interface FileUploaderProps {
  onFilesSelected: (files: FileList) => void;
  loading?: boolean;
}

export default function FileUploader({
  onFilesSelected,
  loading = false,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        border: "2px dashed",
        borderColor: "divider",
        borderRadius: 3,
        p: 6,
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        "&:hover": {
          borderColor: "primary.main",
          bgcolor: "action.hover",
        },
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        multiple
        style={{ display: "none" }}
        onChange={handleChange}
      />

      <UploadFileIcon
        sx={{ fontSize: 56, color: "primary.main", mb: 2, opacity: 0.6 }}
      />

      <Typography variant="h6" gutterBottom fontWeight={500}>
        {loading ? "Loading files..." : "Upload Translation Files"}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 400, mx: "auto" }}
      >
        Drag and drop your translation JSON files here, or click to browse
      </Typography>

      <Button
        variant="contained"
        disabled={loading}
        sx={{ textTransform: "none" }}
      >
        Select Files
      </Button>

      <Typography
        variant="caption"
        display="block"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        Supports: en.json, th.json, etc.
      </Typography>
    </Paper>
  );
}
