'use client';

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { defaultTheme } from "./create-theme";

export interface ThemeRegistryClientProps {
  children: React.ReactNode;
}

/**
 * Client-side theme registry component
 * This must be a client component because MuiThemeProvider uses React Context
 */
export function ThemeRegistryClient({ children }: ThemeRegistryClientProps) {
  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={defaultTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
