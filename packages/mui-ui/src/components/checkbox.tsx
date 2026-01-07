"use client";

import MuiCheckbox, { type CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export type CheckboxProps = MuiCheckboxProps & {
  label?: string;
};

/**
 * Checkbox component - wrapper around MUI Checkbox with optional label
 *
 * @example
 * // With label
 * <Checkbox label="Accept terms and conditions" checked={checked} onChange={handleChange} />
 *
 * @example
 * // Without label
 * <Checkbox checked={checked} onChange={handleChange} />
 */
export default function Checkbox({ label, ...props }: CheckboxProps) {
  if (label) {
    return <FormControlLabel control={<MuiCheckbox {...props} />} label={label} />;
  }
  return <MuiCheckbox {...props} />;
}
