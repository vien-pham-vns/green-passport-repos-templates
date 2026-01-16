"use client";

import MuiGrid from "@mui/material/Grid";
import type { GridProps as MuiGridProps } from "@mui/material/Grid";

export type GridProps = MuiGridProps;

/**
 * Grid component - wrapper around MUI Grid2 (v7)
 *
 * @example
 * <Grid container spacing={2}>
 *   <Grid size={{ xs: 12, md: 6 }}>
 *     <div>Column 1</div>
 *   </Grid>
 *   <Grid size={{ xs: 12, md: 6 }}>
 *     <div>Column 2</div>
 *   </Grid>
 * </Grid>
 */
export default function Grid(props: GridProps) {
  return <MuiGrid {...props} />;
}
