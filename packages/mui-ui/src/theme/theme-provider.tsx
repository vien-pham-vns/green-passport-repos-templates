import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeRegistryClient } from "./theme-registry-client";

export interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Theme provider wrapper with CssBaseline and CSS variables support
 * Works with React Server Components (RSC)
 *
 * Features:
 * - CSS variables enabled for dynamic theming
 * - CSS layers (@layer mui, app) for better specificity control
 * - InitColorSchemeScript for SSR color scheme hydration
 * - AppRouterCacheProvider for Next.js App Router compatibility
 * - RSC compatible - theme is instantiated inside client component
 * - Extended palette with brand, neutral, and custom colors
 * - HSL color format for easy manipulation
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <ThemeRegistryClient>{children}</ThemeRegistryClient>
    </>
  );
}
