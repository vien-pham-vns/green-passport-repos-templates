"use client";

import MuiPaper, { type PaperProps as MuiPaperProps } from '@mui/material/Paper';

export type PaperProps = MuiPaperProps;

/**
 * Paper component - wrapper around MUI Paper
 *
 * @example
 * <Paper elevation={2} sx={{ p: 3 }}>
 *   <h2>Card Title</h2>
 *   <p>Card content</p>
 * </Paper>
 */
export default function Paper(props: PaperProps) {
  return <MuiPaper {...props} />;
}
