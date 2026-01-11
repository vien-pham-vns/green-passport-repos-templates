import { ThemeProviderCore } from '@dt/mui-ui/theme';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import { portalTheme } from './portal-theme';

/**
 * Green Passport Portal Theme Registry
 *
 * Server Component that provides the compliant theme
 * to the entire Green Passport Portal application.
 *
 * Features:
 * - Server-side theme injection via InitColorSchemeScript
 * - Government theme with WCAG 2.2 AA+ compliance
 * - Poppins font integration via CSS variable
 * - Dark/Light mode support with class-based color scheme
 *
 * @example
 * ```tsx
 * // In app/layout.tsx
 * import ThemeRegistry from '@/theme/theme-registry';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <ThemeRegistry>{children}</ThemeRegistry>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Server-side color scheme script - prevents flash on load */}
      <InitColorSchemeScript attribute='class' />

      {/* Client-side theme provider with government theme */}
      <ThemeProviderCore theme={portalTheme}>{children}</ThemeProviderCore>
    </>
  );
}
