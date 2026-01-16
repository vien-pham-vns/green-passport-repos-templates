/**
 * Design tokens for the MUI theme using HSL color format
 * Following Tailwind CSS approach for better CSS variable integration
 */

/**
 * HSL color values (without hsl() wrapper for CSS variable compatibility)
 * Format: "hue saturation% lightness%"
 */
export const hslColors = {
  primary: {
    DEFAULT: "207 90% 54%", // Blue - matches #1976d2
    light: "207 90% 65%", // Lighter blue - matches #42a5f5
    dark: "207 90% 40%", // Darker blue - matches #1565c0
  },
  secondary: {
    DEFAULT: "340 82% 52%", // Pink/Red - matches #dc004e
    light: "340 82% 62%", // Lighter pink - matches #e33371
    dark: "340 82% 38%", // Darker pink - matches #9a0036
  },
  error: {
    DEFAULT: "0 65% 51%", // Red - matches #d32f2f
    light: "0 65% 61%", // Lighter red - matches #ef5350
    dark: "0 65% 38%", // Darker red - matches #c62828
  },
  warning: {
    DEFAULT: "27 96% 61%", // Orange - matches #ff9800
    light: "36 100% 50%", // Lighter orange
    dark: "27 100% 45%", // Darker orange - matches #e65100
  },
  info: {
    DEFAULT: "199 98% 48%", // Cyan - matches #03a9f4
    light: "199 98% 55%", // Lighter cyan
    dark: "199 100% 30%", // Darker cyan - matches #01579b
  },
  success: {
    DEFAULT: "122 39% 49%", // Green - matches #4caf50
    light: "122 39% 55%", // Lighter green
    dark: "122 39% 35%", // Darker green - matches #1b5e20
  },
};

/**
 * Color palette for MUI theme
 * With CSS variables enabled, these become:
 * - var(--mui-palette-primary-main)
 * - var(--mui-palette-primary-light)
 * - var(--mui-palette-primary-dark)
 */
export const colors = {
  primary: {
    main: `hsl(${hslColors.primary.DEFAULT})`,
    light: `hsl(${hslColors.primary.light})`,
    dark: `hsl(${hslColors.primary.dark})`,
    contrastText: "#ffffff",
  },
  secondary: {
    main: `hsl(${hslColors.secondary.DEFAULT})`,
    light: `hsl(${hslColors.secondary.light})`,
    dark: `hsl(${hslColors.secondary.dark})`,
    contrastText: "#ffffff",
  },
  error: {
    main: `hsl(${hslColors.error.DEFAULT})`,
    light: `hsl(${hslColors.error.light})`,
    dark: `hsl(${hslColors.error.dark})`,
  },
  warning: {
    main: `hsl(${hslColors.warning.DEFAULT})`,
    light: `hsl(${hslColors.warning.light})`,
    dark: `hsl(${hslColors.warning.dark})`,
  },
  info: {
    main: `hsl(${hslColors.info.DEFAULT})`,
    light: `hsl(${hslColors.info.light})`,
    dark: `hsl(${hslColors.info.dark})`,
  },
  success: {
    main: `hsl(${hslColors.success.DEFAULT})`,
    light: `hsl(${hslColors.success.light})`,
    dark: `hsl(${hslColors.success.dark})`,
  },
};

/**
 * Material Design 3 Type Scale
 * Following official M3 typography guidelines
 * https://m3.material.io/styles/typography/type-scale-tokens
 *
 * M3 Typography Scale (15 variants):
 * - Display: Large (57px), Medium (45px), Small (36px)
 * - Headline: Large (32px), Medium (28px), Small (24px)
 * - Title: Large (22px), Medium (16px), Small (14px)
 * - Body: Large (16px), Medium (14px), Small (12px)
 * - Label: Large (14px), Medium (12px), Small (11px)
 */
export const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  // Display styles - Large, expressive headlines
  h1: {
    // Display Large: 57px / 64px line-height
    fontSize: "3.5625rem", // 57px
    fontWeight: 400,
    lineHeight: 1.123, // 64px / 57px = 1.123
    letterSpacing: "-0.25px",
  },
  h2: {
    // Display Medium: 45px / 52px line-height
    fontSize: "2.8125rem", // 45px
    fontWeight: 400,
    lineHeight: 1.156, // 52px / 45px = 1.156
    letterSpacing: "0px",
  },
  h3: {
    // Display Small: 36px / 44px line-height
    fontSize: "2.25rem", // 36px
    fontWeight: 400,
    lineHeight: 1.222, // 44px / 36px = 1.222
    letterSpacing: "0px",
  },
  h4: {
    // Headline Medium: 28px / 36px line-height
    fontSize: "1.75rem", // 28px
    fontWeight: 400,
    lineHeight: 1.286, // 36px / 28px = 1.286
    letterSpacing: "0px",
  },
  h5: {
    // Headline Small: 24px / 32px line-height
    fontSize: "1.5rem", // 24px
    fontWeight: 400,
    lineHeight: 1.333, // 32px / 24px = 1.333
    letterSpacing: "0px",
  },
  h6: {
    // Title Large: 22px / 28px line-height
    fontSize: "1.375rem", // 22px
    fontWeight: 400,
    lineHeight: 1.273, // 28px / 22px = 1.273
    letterSpacing: "0px",
  },
  subtitle1: {
    // Title Medium: 16px / 24px line-height
    fontSize: "1rem", // 16px
    fontWeight: 500,
    lineHeight: 1.5, // 24px / 16px = 1.5
    letterSpacing: "0.15px",
  },
  subtitle2: {
    // Title Small: 14px / 20px line-height
    fontSize: "0.875rem", // 14px
    fontWeight: 500,
    lineHeight: 1.429, // 20px / 14px = 1.429
    letterSpacing: "0.1px",
  },
  body1: {
    // Body Large: 16px / 24px line-height
    fontSize: "1rem", // 16px
    fontWeight: 400,
    lineHeight: 1.5, // 24px / 16px = 1.5
    letterSpacing: "0.5px",
  },
  body2: {
    // Body Medium: 14px / 20px line-height
    fontSize: "0.875rem", // 14px
    fontWeight: 400,
    lineHeight: 1.429, // 20px / 14px = 1.429
    letterSpacing: "0.25px",
  },
  button: {
    // Label Large: 14px / 20px line-height
    fontSize: "0.875rem", // 14px
    fontWeight: 500,
    lineHeight: 1.429, // 20px / 14px = 1.429
    letterSpacing: "0.1px",
    textTransform: "none" as const,
  },
  caption: {
    // Body Small: 12px / 16px line-height
    fontSize: "0.75rem", // 12px
    fontWeight: 400,
    lineHeight: 1.333, // 16px / 12px = 1.333
    letterSpacing: "0.4px",
  },
  overline: {
    // Label Small: 11px / 16px line-height
    fontSize: "0.6875rem", // 11px
    fontWeight: 500,
    lineHeight: 1.455, // 16px / 11px = 1.455
    letterSpacing: "0.5px",
    textTransform: "uppercase" as const,
  },
};

export const spacing = 8; // Base spacing unit in pixels (M3 standard: 8dp grid)

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

/**
 * Material Design 3 Shape Scale
 * https://m3.material.io/styles/shape/shape-scale-tokens
 *
 * M3 defines 7 shape tokens for consistent corner roundedness:
 * - none (0px): Square corners - dividers, switches
 * - extra-small (4px): Very subtle rounding - chips, small elements
 * - small (8px): Subtle rounding - small buttons, cards
 * - medium (12px): Standard rounding - cards, dialogs, text fields (default)
 * - large (16px): Increased rounding - large cards, navigation drawers
 * - extra-large (28px web/24px Android): High rounding - sheets, dialogs
 * - full (pill/9999px): Fully rounded - pills, FABs, toggle buttons
 *
 * Web implementation uses 28px for extra-large vs 24px on Android
 */
export const shapeTokens = {
  none: 0, // Square corners
  extraSmall: 4, // Chips, badges
  small: 8, // Small buttons, small cards
  medium: 12, // Cards, dialogs, text fields (default)
  large: 16, // Large cards, sheets
  extraLarge: 28, // Large dialogs, bottom sheets (28px for web)
  full: 9999, // Pills, FABs, fully rounded buttons
};

/**
 * Material Design 3 Elevation Levels
 * M3 uses more subtle elevations than MD2
 */
export const elevationTokens = {
  level0: "none",
  level1:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
  level2:
    "0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)",
  level3:
    "0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
  level4:
    "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
  level5:
    "0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)",
};

/**
 * Legacy shadow utilities (kept for compatibility)
 * Prefer using elevationTokens for M3 designs
 */
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
};
