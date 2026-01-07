"use client";

import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';

export type ButtonProps = MuiButtonProps;

/**
 * Button component - lightweight wrapper around MUI Button
 *
 * @example
 * <Button variant="contained" color="primary" onClick={handleClick}>
 *   Click Me
 * </Button>
 */
export default function Button(props: ButtonProps) {
  return <MuiButton {...props} />;
}
