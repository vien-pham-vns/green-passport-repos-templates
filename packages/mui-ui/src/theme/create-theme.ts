"use client";

import { createTheme, ThemeOptions } from "@mui/material/styles";

export function createAppTheme(options?: ThemeOptions) {
  return createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
      colorSchemeSelector: "class",
    },
    spacing: 8,
    components: {
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

export const defaultTheme = createAppTheme();
