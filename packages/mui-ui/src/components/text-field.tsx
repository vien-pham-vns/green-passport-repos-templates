"use client";

import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';

export type TextFieldProps = MuiTextFieldProps;

/**
 * TextField component - lightweight wrapper around MUI TextField
 *
 * @example
 * <TextField
 *   label="Email"
 *   placeholder="Enter your email"
 *   variant="outlined"
 *   size="small"
 * />
 */
export default function TextField(props: TextFieldProps) {
  return <MuiTextField {...props} />;
}
