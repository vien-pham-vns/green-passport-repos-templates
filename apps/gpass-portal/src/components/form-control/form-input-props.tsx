import { SxProps, Theme } from '@mui/material/styles';

export interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  inputProps?: any; // slot props
  control: any; // form control
  sx?: SxProps<Theme>; // styles
}
