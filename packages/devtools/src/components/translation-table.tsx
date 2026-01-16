"use client";

import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WarningIcon from "@mui/icons-material/Warning";
import type { FlatTranslationEntry } from "../types";

interface TranslationTableProps {
  entries: FlatTranslationEntry[];
  languages: string[];
  onUpdateTranslation: (key: string, language: string, value: string) => void;
  showOnlyMissing?: boolean;
}

export default function TranslationTable({
  entries,
  languages,
  onUpdateTranslation,
  showOnlyMissing = false,
}: TranslationTableProps) {
  const [editingCell, setEditingCell] = useState<{
    key: string;
    language: string;
  } | null>(null);

  const filteredEntries = showOnlyMissing
    ? entries.filter((entry) => languages.some((lang) => !entry.values[lang]))
    : entries;

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
  };

  const handleEdit = (key: string, language: string, value: string) => {
    onUpdateTranslation(key, language, value);
    setEditingCell(null);
  };

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        maxHeight: 600,
        borderRadius: 2,
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                minWidth: 250,
                fontWeight: 600,
                bgcolor: "background.paper",
                py: 2,
              }}
            >
              Translation Key
            </TableCell>
            {languages.map((lang) => (
              <TableCell
                key={lang}
                sx={{
                  minWidth: 300,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  bgcolor: "background.paper",
                  py: 2,
                }}
              >
                {lang}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEntries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={languages.length + 1} align="center">
                <Box sx={{ py: 4 }}>No translations found</Box>
              </TableCell>
            </TableRow>
          ) : (
            filteredEntries.map((entry) => (
              <TableRow
                key={entry.key}
                hover
                sx={{ "&:last-child td": { borderBottom: 0 } }}
              >
                <TableCell sx={{ py: 1.5 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Tooltip title="Copy key">
                      <IconButton
                        size="small"
                        onClick={() => handleCopyKey(entry.key)}
                        sx={{ p: 0.5 }}
                      >
                        <ContentCopyIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Typography
                      variant="body2"
                      component="code"
                      sx={{
                        fontFamily: "monospace",
                        fontSize: "0.813rem",
                        color: "text.secondary",
                      }}
                    >
                      {entry.key}
                    </Typography>
                  </Box>
                </TableCell>
                {languages.map((lang) => {
                  const value = entry.values[lang];
                  const isMissing = !value;
                  const isEditing =
                    editingCell?.key === entry.key &&
                    editingCell?.language === lang;

                  return (
                    <TableCell key={lang} sx={{ py: 1.5 }}>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          multiline
                          autoFocus
                          defaultValue={value || ""}
                          onBlur={(e) =>
                            handleEdit(entry.key, lang, e.target.value)
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleEdit(
                                entry.key,
                                lang,
                                (e.target as HTMLInputElement).value,
                              );
                            }
                          }}
                          size="small"
                        />
                      ) : (
                        <Box
                          onClick={() =>
                            setEditingCell({ key: entry.key, language: lang })
                          }
                          sx={{
                            cursor: "pointer",
                            p: 1,
                            borderRadius: 1,
                            minHeight: 36,
                            display: "flex",
                            alignItems: "center",
                            "&:hover": {
                              bgcolor: "action.hover",
                            },
                          }}
                        >
                          {isMissing ? (
                            <Chip
                              icon={<WarningIcon />}
                              label="Missing"
                              size="small"
                              color="warning"
                              variant="outlined"
                            />
                          ) : (
                            <Typography variant="body2">{value}</Typography>
                          )}
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
