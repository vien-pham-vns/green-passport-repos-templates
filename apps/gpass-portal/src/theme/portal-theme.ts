'use client';

import { createCustomAppTheme } from '@dt/mui-ui/theme';

/**
 * Green Passport Portal Theme
 *
 * Government-compliant theme customized for the Green Passport Portal
 * - Uses WCAG 2.2 AA+ compliant colors
 * - Integrates with Poppins font family from Next.js font optimization
 * - Material Design 3 specifications
 * - Enhanced accessibility features
 */
export const portalTheme = createCustomAppTheme({
  typography: {
    fontFamily:
      'var(--font-poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: 16,
    // Poppins weight mapping
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});
