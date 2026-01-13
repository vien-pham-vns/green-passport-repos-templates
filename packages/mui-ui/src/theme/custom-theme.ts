"use client";

import { Color, createTheme, type ThemeOptions } from "@mui/material/styles";
import { typography, spacing, breakpoints } from "./theme-tokens";

declare module "@mui/material/styles" {
  interface Palette {
    brand: Omit<Color, "A100" | "A200" | "A400" | "A700">;
    neutral: Omit<Color, "A100" | "A200" | "A400" | "A700">;
    customError: {
      50: string;
      500: string;
    };
  }

  interface PaletteOptions {
    brand: Omit<Color, "A100" | "A200" | "A400" | "A700">;
    neutral: Omit<Color, "A100" | "A200" | "A400" | "A700">;
    customError?: {
      50: string;
      500: string;
    };
  }
}

/**
 * Creates a customizable MUI theme with Material Design 3 support
 * @param options - Optional theme customization options
 * @returns MUI Theme object with CSS variables and M3 design tokens
 */
export function createCustomAppTheme(options?: ThemeOptions) {
  return createTheme({
    colorSchemes: {
      light: {
        palette: {
          mode: "light",
          primary: {
            main: "hsl(217, 91%, 60%)",
            light: "hsl(217, 94%, 67%)",
            dark: "hsl(227, 64%, 54%)",
            contrastText: "hsl(0, 0%, 100%)",
            50: "hsl(210, 100%, 97%)",
            100: "hsl(210, 100%, 93%)",
            200: "hsl(213, 96%, 89%)",
            300: "hsl(215, 91%, 83%)",
            400: "hsl(217, 94%, 67%)",
            500: "hsl(217, 91%, 60%)",
            600: "hsl(227, 64%, 54%)",
            700: "hsl(226, 72%, 47%)",
            800: "hsl(234, 56%, 43%)",
            900: "hsl(237, 54%, 36%)",
          },
          secondary: {
            main: "hsl(338, 100%, 54%)",
            light: "hsl(338, 100%, 69%)",
            dark: "hsl(338, 100%, 30%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          success: {
            main: "hsl(144, 49%, 53%)",
            light: "hsl(144, 76%, 96%)",
            dark: "hsl(144, 100%, 16%)",
            contrastText: "hsl(0, 0%, 100%)",
            50: "hsl(144, 76%, 96%)",
            100: "hsl(144, 76%, 91%)",
            200: "hsl(144, 76%, 85%)",
            300: "hsl(144, 76%, 72%)",
            400: "hsl(144, 61%, 63%)",
            500: "hsl(144, 49%, 53%)",
            600: "hsl(144, 49%, 43%)",
            700: "hsl(144, 49%, 34%)",
            800: "hsl(144, 49%, 29%)",
            900: "hsl(144, 49%, 25%)",
          },
          info: {
            main: "hsl(213, 91%, 62%)",
            light: "hsl(213, 100%, 68%)",
            dark: "hsl(213, 100%, 31%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          warning: {
            main: "hsl(45, 76%, 51%)",
            light: "hsla(45, 93%, 47%, 0.07)",
            dark: "hsl(27, 100%, 46%)",
            contrastText: "hsl(0, 0%, 100%)",
            50: "hsl(52, 91%, 96%)",
            100: "hsl(52, 91%, 88%)",
            200: "hsl(52, 91%, 75%)",
            300: "hsl(52, 91%, 65%)",
            400: "hsl(48, 89%, 56%)",
            500: "hsl(45, 76%, 51%)",
            600: "hsl(42, 76%, 42%)",
            700: "hsl(36, 76%, 34%)",
            800: "hsl(30, 76%, 29%)",
            900: "hsl(24, 76%, 26%)",
          },
          error: {
            main: "hsl(0, 72%, 58%)",
            light: "hsl(6, 72%, 70%)",
            dark: "hsl(0, 100%, 30%)",
            contrastText: "hsl(0, 0%, 100%)",
            50: "hsl(0, 80%, 96%)",
            100: "hsl(0, 80%, 91%)",
            200: "hsl(0, 80%, 85%)",
            300: "hsl(0, 80%, 77%)",
            400: "hsl(0, 80%, 66%)",
            500: "hsl(0, 72%, 58%)",
            600: "hsl(0, 72%, 50%)",
            700: "hsl(0, 72%, 42%)",
            800: "hsl(0, 72%, 35%)",
            900: "hsl(0, 72%, 30%)",
          },
          action: {
            active: "hsl(220, 10%, 66%)",
            hover: "hsl(210, 20%, 96%)",
            selected: "hsl(220, 10%, 46%)",
            disabled: "hsl(210, 20%, 92%)",
            disabledBackground: "hsl(210, 20%, 96%)",
          },
          background: {
            default: "hsl(240, 4.8%, 95.9%)",
            paper: "hsl(0, 0%, 100%)",
          },
          text: {
            primary: "hsl(0, 0%, 13%)",
            secondary: "hsl(0, 0%, 46%)",
            disabled: "hsl(0, 0%, 74%)",
          },
          brand: {
            50: "hsl(210, 100%, 97%)",
            100: "hsl(210, 100%, 93%)",
            200: "hsl(213, 96%, 89%)",
            300: "hsl(215, 91%, 83%)",
            400: "hsl(217, 94%, 67%)",
            500: "hsl(217, 91%, 60%)",
            600: "hsl(227, 64%, 54%)",
            700: "hsl(226, 72%, 47%)",
            800: "hsl(234, 56%, 43%)",
            900: "hsl(237, 54%, 36%)",
          },
          neutral: {
            50: "hsl(210, 20%, 98%)",
            100: "hsl(210, 20%, 96%)",
            200: "hsl(210, 20%, 92%)",
            300: "hsl(210, 14%, 84%)",
            400: "hsl(220, 10%, 66%)",
            500: "hsl(220, 10%, 46%)",
            600: "hsl(220, 13%, 34%)",
            700: "hsl(220, 15%, 27%)",
            800: "hsl(220, 26%, 17%)",
            900: "hsl(220, 36%, 12%)",
          },
          grey: {
            50: "hsl(210, 20%, 98%)",
            100: "hsl(210, 20%, 96%)",
            200: "hsl(210, 20%, 92%)",
            300: "hsl(210, 14%, 84%)",
            400: "hsl(220, 10%, 66%)",
            500: "hsl(220, 10%, 46%)",
            600: "hsl(220, 13%, 34%)",
            700: "hsl(220, 15%, 27%)",
            800: "hsl(220, 26%, 17%)",
            900: "hsl(220, 36%, 12%)",
          },
          customError: {
            50: "var(--custom-error-50)",
            500: "var(--custom-error-500)",
          },
        },
      },
      dark: {
        palette: {
          mode: "dark",
          primary: {
            main: "hsl(217, 91%, 60%)",
            light: "hsl(217, 94%, 67%)",
            dark: "hsl(227, 64%, 54%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          secondary: {
            main: "hsl(338, 100%, 54%)",
            light: "hsl(338, 100%, 69%)",
            dark: "hsl(338, 100%, 30%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          success: {
            main: "hsl(144, 49%, 53%)",
            light: "hsl(144, 61%, 63%)",
            dark: "hsl(144, 100%, 16%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          info: {
            main: "hsl(213, 91%, 62%)",
            light: "hsl(213, 100%, 68%)",
            dark: "hsl(213, 100%, 31%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          warning: {
            main: "hsl(45, 76%, 51%)",
            light: "hsl(48, 89%, 56%)",
            dark: "hsl(27, 100%, 46%)",
            contrastText: "hsl(0, 0%, 0%)",
          },
          error: {
            main: "hsl(0, 72%, 58%)",
            light: "hsl(6, 72%, 70%)",
            dark: "hsl(0, 100%, 30%)",
            contrastText: "hsl(0, 0%, 100%)",
          },
          action: {
            active: "hsl(220, 10%, 66%)",
            hover: "hsla(220, 10%, 66%, 0.08)",
            selected: "hsla(220, 10%, 66%, 0.16)",
            disabled: "hsl(220, 10%, 46%)",
            disabledBackground: "hsla(220, 10%, 66%, 0.12)",
          },
          background: {
            default: "hsl(220, 26%, 14%)",
            paper: "hsl(220, 26%, 18%)",
          },
          text: {
            primary: "hsl(0, 0%, 95%)",
            secondary: "hsl(0, 0%, 70%)",
            disabled: "hsl(0, 0%, 50%)",
          },
          brand: {
            50: "hsl(210, 100%, 97%)",
            100: "hsl(210, 100%, 93%)",
            200: "hsl(213, 96%, 89%)",
            300: "hsl(215, 91%, 83%)",
            400: "hsl(217, 94%, 67%)",
            500: "hsl(217, 91%, 60%)",
            600: "hsl(227, 64%, 54%)",
            700: "hsl(226, 72%, 47%)",
            800: "hsl(234, 56%, 43%)",
            900: "hsl(237, 54%, 36%)",
          },
          neutral: {
            50: "hsl(220, 36%, 12%)",
            100: "hsl(220, 26%, 17%)",
            200: "hsl(220, 15%, 27%)",
            300: "hsl(220, 13%, 34%)",
            400: "hsl(220, 10%, 46%)",
            500: "hsl(220, 10%, 66%)",
            600: "hsl(210, 14%, 84%)",
            700: "hsl(210, 20%, 92%)",
            800: "hsl(210, 20%, 96%)",
            900: "hsl(210, 20%, 98%)",
          },
          grey: {
            50: "hsl(220, 36%, 12%)",
            100: "hsl(220, 26%, 17%)",
            200: "hsl(220, 15%, 27%)",
            300: "hsl(220, 13%, 34%)",
            400: "hsl(220, 10%, 46%)",
            500: "hsl(220, 10%, 66%)",
            600: "hsl(210, 14%, 84%)",
            700: "hsl(210, 20%, 92%)",
            800: "hsl(210, 20%, 96%)",
            900: "hsl(210, 20%, 98%)",
          },
          customError: {
            50: "var(--custom-error-50)",
            500: "var(--custom-error-500)",
          },
        },
      },
    },
    cssVariables: {
      cssVarPrefix: "mui",
      colorSchemeSelector: "class",
    },
    typography: {
      ...typography,
      ...options?.typography,
      fontSize: 16,
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
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 20, // M3 full rounded for buttons
            paddingLeft: 24,
            paddingRight: 24,
          },
          sizeLarge: {
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: "0.9375rem",
          },
          sizeMedium: {
            paddingTop: 8,
            paddingBottom: 8,
          },
          sizeSmall: {
            paddingTop: 6,
            paddingBottom: 6,
            fontSize: "0.8125rem",
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
          variant: "outlined",
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
          variant: "outlined",
          size: "small",
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 12, // M3 medium
          },
          input: {
            "&.MuiInputBase-inputSizeSmall": {
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
          sizeSmall: {
            height: "auto",
            minHeight: 42,
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            "&.MuiInputBase-sizeSmall": {
              height: "auto",
              minHeight: 42,
            },
          },
          input: {
            "&.MuiInputBase-inputSizeSmall": {
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
        },
      },
      MuiSelect: {
        defaultProps: {
          variant: "outlined",
          size: "small",
        },
        styleOverrides: {
          select: {
            "&.MuiInputBase-inputSizeSmall": {
              paddingTop: 10,
              paddingBottom: 10,
            },
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root.MuiInputBase-sizeSmall": {
              height: "auto",
              minHeight: 42,
              paddingTop: 2,
              paddingBottom: 2,
            },
          },
          input: {
            "&.MuiInputBase-inputSizeSmall": {
              paddingTop: 8,
              paddingBottom: 8,
            },
          },
          inputRoot: {
            '&[class*="MuiOutlinedInput-root"]': {
              padding: "2px 8px",
            },
          },
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
          "@layer mui, app": {
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
 * Custom theme instance with CSS variables enabled
 */
export const customTheme = createCustomAppTheme();
