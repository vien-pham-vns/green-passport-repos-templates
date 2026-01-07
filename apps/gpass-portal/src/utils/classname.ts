import { Theme } from '@mui/material/styles';

export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const getInputLabelSx = (floatingLabel?: boolean) =>
  floatingLabel
    ? {
        fontSize: '1rem',
        color: (theme: Theme) => `${theme.palette.text.primary} !important`,
      }
    : {
        fontSize: '1rem',
        transform: 'none',
        position: 'static',
        paddingBottom: '2px',
        color: (theme: Theme) => `${theme.palette.text.primary} !important`,
      };
