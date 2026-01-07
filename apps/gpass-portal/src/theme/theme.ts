'use client';
import { Color, createTheme, darken } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CssThemeVariables {
    enabled: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    light: true;
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    brand: Omit<Color, 'A100' | 'A200' | 'A400' | 'A700'>;
    neutral: Omit<Color, 'A100' | 'A200' | 'A400' | 'A700'>;
    customError: {
      50: string;
      500: string;
    };
  }

  interface PaletteOptions {
    brand: Omit<Color, 'A100' | 'A200' | 'A400' | 'A700'>;
    neutral: Omit<Color, 'A100' | 'A200' | 'A400' | 'A700'>;
    customError?: {
      50: string;
      500: string;
    };
  }
}

// Create the theme
const customTheme = createTheme({
  cssVariables: true,
  spacing: 8,
  palette: {
    primary: {
      main: 'hsl(217, 91%, 60%)',
      light: 'hsl(217, 94%, 67%)',
      dark: 'hsl(227, 64%, 54%)',
      contrastText: 'hsl(0, 0%, 100%)',
      50: 'hsl(210, 100%, 97%)',
      100: 'hsl(210, 100%, 93%)',
      200: 'hsl(213, 96%, 89%)',
      300: 'hsl(215, 91%, 83%)',
      400: 'hsl(217, 94%, 67%)',
      500: 'hsl(217, 91%, 60%)',
      600: 'hsl(227, 64%, 54%)',
      700: 'hsl(226, 72%, 47%)',
      800: 'hsl(234, 56%, 43%)',
      900: 'hsl(237, 54%, 36%)',
    },
    secondary: {
      main: 'hsl(338, 100%, 54%)',
      light: 'hsl(338, 100%, 69%)',
      dark: 'hsl(338, 100%, 30%)',
      contrastText: 'hsl(0, 0%, 100%)',
    },
    success: {
      main: 'hsl(144, 49%, 53%)',
      light: 'hsl(144, 76%, 96%)',
      dark: 'hsl(144, 100%, 16%)',
      contrastText: 'hsl(0, 0%, 100%)',
      50: 'hsl(144, 76%, 96%)',
      100: 'hsl(144, 76%, 91%)',
      200: 'hsl(144, 76%, 85%)',
      300: 'hsl(144, 76%, 72%)',
      400: 'hsl(144, 61%, 63%)',
      500: 'hsl(144, 49%, 53%)',
      600: 'hsl(144, 49%, 43%)',
      700: 'hsl(144, 49%, 34%)',
      800: 'hsl(144, 49%, 29%)',
      900: 'hsl(144, 49%, 25%)',
    },
    info: {
      main: 'hsl(213, 91%, 62%)',
      light: 'hsl(213, 100%, 68%)',
      dark: 'hsl(213, 100%, 31%)',
      contrastText: 'hsl(0, 0%, 100%)',
    },
    warning: {
      main: 'hsl(45, 76%, 51%)',
      light: 'hsla(45, 93%, 47%, 0.07)',
      dark: 'hsl(27, 100%, 46%)',
      contrastText: 'hsl(0, 0%, 100%)',
      50: 'hsl(52, 91%, 96%)',
      100: 'hsl(52, 91%, 88%)',
      200: 'hsl(52, 91%, 75%)',
      300: 'hsl(52, 91%, 65%)',
      400: 'hsl(48, 89%, 56%)',
      500: 'hsl(45, 76%, 51%)',
      600: 'hsl(42, 76%, 42%)',
      700: 'hsl(36, 76%, 34%)',
      800: 'hsl(30, 76%, 29%)',
      900: 'hsl(24, 76%, 26%)',
    },
    error: {
      main: 'hsl(0, 72%, 58%)',
      light: 'hsl(6, 72%, 70%)',
      dark: 'hsl(0, 100%, 30%)',
      contrastText: 'hsl(0, 0%, 100%)',
      50: 'hsl(0, 80%, 96%)',
      100: 'hsl(0, 80%, 91%)',
      200: 'hsl(0, 80%, 85%)',
      300: 'hsl(0, 80%, 77%)',
      400: 'hsl(0, 80%, 66%)',
      500: 'hsl(0, 72%, 58%)',
      600: 'hsl(0, 72%, 50%)',
      700: 'hsl(0, 72%, 42%)',
      800: 'hsl(0, 72%, 35%)',
      900: 'hsl(0, 72%, 30%)',
    },
    action: {
      active: 'hsl(220, 10%, 66%)',
      hover: 'hsl(210, 20%, 96%)',
      selected: 'hsl(220, 10%, 46%)',
      disabled: 'hsl(210, 20%, 92%)',
      disabledBackground: 'hsl(210, 20%, 96%)',
    },
    background: {
      default: 'hsl(240, 4.8%, 95.9%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(0, 0%, 13%)',
      secondary: 'hsl(0, 0%, 46%)',
      disabled: 'hsl(0, 0%, 74%)',
    },
    brand: {
      50: 'hsl(210, 100%, 97%)',
      100: 'hsl(210, 100%, 93%)',
      200: 'hsl(213, 96%, 89%)',
      300: 'hsl(215, 91%, 83%)',
      400: 'hsl(217, 94%, 67%)',
      500: 'hsl(217, 91%, 60%)',
      600: 'hsl(227, 64%, 54%)',
      700: 'hsl(226, 72%, 47%)',
      800: 'hsl(234, 56%, 43%)',
      900: 'hsl(237, 54%, 36%)',
    },
    neutral: {
      50: 'hsl(210, 20%, 98%)',
      100: 'hsl(210, 20%, 96%)',
      200: 'hsl(210, 20%, 92%)',
      300: 'hsl(210, 14%, 84%)',
      400: 'hsl(220, 10%, 66%)',
      500: 'hsl(220, 10%, 46%)',
      600: 'hsl(220, 13%, 34%)',
      700: 'hsl(220, 15%, 27%)',
      800: 'hsl(220, 26%, 17%)',
      900: 'hsl(220, 36%, 12%)',
    },
    grey: {
      50: 'hsl(210, 20%, 98%)',
      100: 'hsl(210, 20%, 96%)',
      200: 'hsl(210, 20%, 92%)',
      300: 'hsl(210, 14%, 84%)',
      400: 'hsl(220, 10%, 66%)',
      500: 'hsl(220, 10%, 46%)',
      600: 'hsl(220, 13%, 34%)',
      700: 'hsl(220, 15%, 27%)',
      800: 'hsl(220, 26%, 17%)',
      900: 'hsl(220, 36%, 12%)',
    },
    customError: {
      50: 'var(--custom-error-50)',
      500: 'var(--custom-error-500)',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
        containedPrimary: ({ theme }) => ({
          '&:hover': {
            backgroundColor: darken(theme.palette.primary.main, 0.4),
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.grey[100],
            opacity: 1,
          },
        }),
        outlinedPrimary: ({ theme }) => ({
          backgroundColor: theme.palette.brand[50],
        }),
        sizeSmall: {
          height: '40px',
        },
        sizeMedium: {
          height: '56px',
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: { color: 'red' },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          paddingLeft: 8,
          paddingRight: 8,
          fontWeight: 600,
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          // gap: 1,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.color === 'light' && {
            backgroundColor: theme.palette.grey[300],
          }),
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: `${theme.palette.text.primary} !important`,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: 'white',
          ...(ownerState.size === 'medium' && {
            height: 56,
          }),
        }),
        sizeSmall: {
          height: 40,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: 'white',
          ...(ownerState.size === 'medium' && {
            height: 56,
          }),
        }),
        sizeSmall: {
          height: 40,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          backgroundColor: 'white',
          ...(ownerState.size === 'small' && {
            height: 40,
          }),
        }),
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '1rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& input:-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${theme.palette.brand[50]} inset`,
            WebkitTextFillColor: theme.palette.text.primary,
            caretColor: theme.palette.text.primary,
          },
        }),
      },
    },
  },

  shape: {
    borderRadius: 8,
  },

  typography: {
    fontFamily: 'var(--font-poppins)',
    fontSize: 16,
  },
});

export default customTheme;
