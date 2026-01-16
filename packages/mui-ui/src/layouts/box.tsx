"use client";

import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";

export type BoxProps = MuiBoxProps;

/**
 * Box component - wrapper around MUI Box (most flexible layout primitive)
 *
 * @example
 * <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Box>
 */
export default function Box(props: BoxProps) {
  return <MuiBox {...props} />;
}
