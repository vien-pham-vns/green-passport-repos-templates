import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import ThemeProviderCore from "./theme-provider-core";
import { defaultTheme } from "./create-theme";

/**
 * Default Theme Registry (Server Component)
 *
 * This is a basic theme registry using the defaultTheme.
 * Apps should create their own theme registry with custom themes.
 *
 * @example
 * ```tsx
 * // Prefer creating app-specific theme registry:
 * // apps/my-app/src/theme/theme-registry.tsx
 * import { ThemeProviderCore } from "@dt/mui-ui/theme";
 * import { myCustomTheme } from "./my-theme";
 *
 * export default function ThemeRegistry({ children }) {
 *   return (
 *     <>
 *       <InitColorSchemeScript attribute="class" />
 *       <ThemeProviderCore theme={myCustomTheme}>{children}</ThemeProviderCore>
 *     </>
 *   );
 * }
 * ```
 */
export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <ThemeProviderCore theme={defaultTheme}>{children}</ThemeProviderCore>
    </>
  );
}
