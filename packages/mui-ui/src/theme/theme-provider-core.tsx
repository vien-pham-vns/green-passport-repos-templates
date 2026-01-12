import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { defaultTheme } from "./create-theme";

/**
 * ThemeProviderCore - Client Component Wrapper for MUI Providers
 *
 * This component wraps MUI's client-side providers:
 * - AppRouterCacheProvider (Emotion cache for Next.js App Router)
 * - ThemeProvider (MUI theme context)
 * - CssBaseline (Global baseline styles)
 *
 * IMPORTANT: This component does NOT create themes.
 * All themes must be created at module level in separate theme files.
 *
 * @param theme - Pre-created MUI theme object (defaults to defaultTheme if not provided)
 * @param children - React children to render within the theme context
 */
export default function ThemeProviderCore({
  children,
  theme = defaultTheme,
}: {
  theme?: Theme;
  children: React.ReactNode;
}) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
