import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { colors, typography, spacing, breakpoints } from './theme-tokens';

/**
 * Creates a customizable MUI theme with Material Design 3 support
 * @param options - Optional theme customization options
 * @returns MUI Theme object with CSS variables and M3 design tokens
 */
export function createAppTheme(options?: ThemeOptions) {
  return createTheme({
    cssVariables: {
      cssVarPrefix: 'mui',
      colorSchemeSelector: 'class',
    },
    palette: {
      mode: 'light',
      primary: colors.primary,
      secondary: colors.secondary,
      error: colors.error,
      warning: colors.warning,
      info: colors.info,
      success: colors.success,
      ...options?.palette,
    },
    typography: {
      ...typography,
      ...options?.typography,
    },
    spacing,
    breakpoints: {
      values: breakpoints,
    },
    // Material Design 3 Shape System
    shape: {
      borderRadius: 12, // M3 default: medium (12dp)
    },
    // Material Design 3 Component Defaults
    components: {
      // Buttons - M3 patterns
      MuiButton: {
        defaultProps: {
          disableElevation: true, // M3 uses outlined/filled, not elevation
        },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: 20, // M3 full rounded for buttons
            paddingLeft: 24,
            paddingRight: 24,
          },
          sizeLarge: {
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: '0.9375rem',
          },
          sizeMedium: {
            paddingTop: 8,
            paddingBottom: 8,
          },
          sizeSmall: {
            paddingTop: 6,
            paddingBottom: 6,
            fontSize: '0.8125rem',
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12, // M3 medium shape
          },
        },
      },
      // Cards - M3 elevation and shape
      MuiCard: {
        defaultProps: {
          elevation: 0,
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            borderRadius: 12, // M3 medium
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          rounded: {
            borderRadius: 12, // M3 medium
          },
        },
      },
      // Chips - M3 shape
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 8, // M3 small
            fontWeight: 500,
          },
        },
      },
      // Text Fields - M3 patterns
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size: 'small',
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12, // M3 medium
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: 'outlined',
          size: 'small',
        },
      },
      // Dialogs - M3 shape
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: 28, // M3 extra large
          },
        },
      },
      // CSS Baseline with layers
      MuiCssBaseline: {
        styleOverrides: {
          '@layer mui, app': {
            // CSS layers for better specificity control
            // MUI components use 'mui' layer
            // App-specific styles can use 'app' layer
          },
        },
      },
      ...options?.components,
    },
    ...options,
  });
}

/**
 * Default theme instance with CSS variables enabled
 */
export const defaultTheme = createAppTheme();
