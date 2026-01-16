"use client";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export type SelectProps = MuiSelectProps & {
  label?: string;
};

/**
 * Select component - wrapper around MUI Select with FormControl integration
 *
 * @example
 * <Select label="Category" value={value} onChange={handleChange}>
 *   <MenuItem value="option1">Option 1</MenuItem>
 *   <MenuItem value="option2">Option 2</MenuItem>
 * </Select>
 */
export default function Select({ label, ...props }: SelectProps) {
  const labelId = label ? `${props.id || "select"}-label` : undefined;

  return (
    <FormControl size={props.size || "small"} fullWidth={props.fullWidth}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect labelId={labelId} label={label} {...props} />
    </FormControl>
  );
}

// Re-export MenuItem for convenience
export { MenuItem };
