# Material Design 3 Integration

This document explains how Material Design 3 (M3) is integrated into the `@dt/mui-ui` theme system.

## Overview

The `@dt/mui-ui` package implements Material Design 3 principles using MUI v7 with CSS variables. All design tokens follow M3 specifications for typography, shape, color, and elevation.

## Design Tokens

### Typography Scale

Material Design 3 uses a simplified type scale with 5 categories, each with 3 sizes (Large, Medium, Small), creating 15 total typography tokens.

Following the [M3 Type Scale](https://m3.material.io/styles/typography/type-scale-tokens):

| MUI Variant | M3 Role        | Font Size | Weight | Line Height | Letter Spacing | Usage                     |
| ----------- | -------------- | --------- | ------ | ----------- | -------------- | ------------------------- |
| `h1`        | Display Large  | 57px      | 400    | 64px        | -0.25px        | Hero sections, marketing  |
| `h2`        | Display Medium | 45px      | 400    | 52px        | 0px            | Large headlines           |
| `h3`        | Display Small  | 36px      | 400    | 44px        | 0px            | Section headers           |
| `h4`        | Headline Medium| 28px      | 400    | 36px        | 0px            | Card titles, page headers |
| `h5`        | Headline Small | 24px      | 400    | 32px        | 0px            | Subsection headers        |
| `h6`        | Title Large    | 22px      | 400    | 28px        | 0px            | Prominent titles          |
| `subtitle1` | Title Medium   | 16px      | 500    | 24px        | 0.15px         | Medium emphasis titles    |
| `subtitle2` | Title Small    | 14px      | 500    | 20px        | 0.1px          | Section labels            |
| `body1`     | Body Large     | 16px      | 400    | 24px        | 0.5px          | Primary content           |
| `body2`     | Body Medium    | 14px      | 400    | 20px        | 0.25px         | Secondary content         |
| `button`    | Label Large    | 14px      | 500    | 20px        | 0.1px          | Button text               |
| `caption`   | Body Small     | 12px      | 400    | 16px        | 0.4px          | Captions, helper text     |
| `overline`  | Label Small    | 11px      | 500    | 16px        | 0.5px          | Overlines, labels         |

**Note:** All typography values are based on official [Material Design 3 specifications](https://m3.material.io/styles/typography/type-scale-tokens) with exact line heights and letter spacing matching the M3 type scale.

### Shape Scale

Material Design 3 defines 7 shape tokens for consistent corner roundedness across components.

Following the [M3 Shape Scale](https://m3.material.io/styles/shape/shape-scale-tokens):

| Token         | Value   | Usage                                                                         |
| ------------- | ------- | ----------------------------------------------------------------------------- |
| `none`        | 0px     | Square corners - dividers, switches                                           |
| `extraSmall`  | 4px     | Very subtle rounding - chips, badges                                          |
| `small`       | 8px     | Subtle rounding - small buttons, cards                                        |
| `medium`      | 12px    | Standard rounding - cards, dialogs, text fields (default)                     |
| `large`       | 16px    | Increased rounding - large cards, navigation drawers                          |
| `extraLarge`  | 28px    | High rounding - large dialogs, bottom sheets (28px for web, 24px for Android) |
| `full`        | 9999px  | Fully rounded - pills, FABs, toggle buttons                                   |

```typescript
import { shapeTokens } from "@dt/mui-ui";

shapeTokens.none;       // 0px   - Square corners
shapeTokens.extraSmall; // 4px   - Chips, badges
shapeTokens.small;      // 8px   - Small cards, buttons
shapeTokens.medium;     // 12px  - Cards, dialogs, text fields (default)
shapeTokens.large;      // 16px  - Large cards, sheets
shapeTokens.extraLarge; // 28px  - Large dialogs, bottom sheets
shapeTokens.full;       // 9999px - Pills, FABs, fully rounded
```

### Component Shape Mappings

| Component  | Border Radius | M3 Token          |
| ---------- | ------------- | ----------------- |
| Button     | 20px          | Full (pill shape) |
| IconButton | 12px          | Medium            |
| Card       | 12px          | Medium            |
| Paper      | 12px          | Medium            |
| Chip       | 8px           | Small             |
| TextField  | 12px          | Medium            |
| Dialog     | 28px          | Extra Large       |

### Elevation Levels

Following M3's subtle elevation system:

```typescript
import { elevationTokens } from "@dt/mui-ui/theme";

elevationTokens.level0; // No shadow
elevationTokens.level1; // Subtle elevation
elevationTokens.level2; // Standard elevation
elevationTokens.level3; // Raised elevation
elevationTokens.level4; // High elevation
elevationTokens.level5; // Highest elevation
```

**Note:** M3 prefers outlined variants over elevated surfaces. Most components default to `elevation={0}` with `variant="outlined"`.

### Color System

Colors use HSL format for better CSS variable manipulation:

```typescript
import { hslColors, colors } from "@dt/mui-ui/theme";

// Raw HSL values (for CSS variables)
hslColors.primary.DEFAULT; // "207 90% 54%"

// Formatted colors (for theme)
colors.primary.main; // "hsl(207 90% 54%)"
```

Available color roles:

- `primary` - Main brand color
- `secondary` - Accent color
- `error` - Error states
- `warning` - Warning states
- `info` - Informational states
- `success` - Success states

### Spacing

8dp grid system (MUI default):

```typescript
import { spacing } from "@dt/mui-ui/theme";

spacing; // 8 (base unit in pixels)
```

## Component Defaults

All components are pre-configured with M3 patterns:

### Buttons

```tsx
import Button from '@dt/mui-ui/components/button';

// Default: disableElevation, pill shape (borderRadius: 20px)
<Button variant="contained">Filled</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
```

**M3 Pattern:** Buttons use full rounding (pill shape) and no elevation.

### Cards

```tsx
import Card from "@mui/material/Card";

// Default: elevation={0}, variant="outlined", borderRadius: 12px
<Card>
  <CardContent>Content</CardContent>
</Card>;
```

**M3 Pattern:** Cards use outlined variant instead of elevation.

### Text Fields

```tsx
import TextField from "@dt/mui-ui/components/text-field";

// Default: variant="outlined", size="small", borderRadius: 12px
<TextField label="Label" />;
```

### Chips

```tsx
import Chip from "@mui/material/Chip";

// Default: borderRadius: 8px, fontWeight: 500
<Chip label="Tag" />;
```

## Usage Examples

### Basic Theme Usage

```tsx
import ThemeProvider from "@dt/mui-ui/theme";

export default function App({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

### Using Design Tokens

```tsx
import { shapeTokens, elevationTokens } from "@dt/mui-ui/theme";
import Box from "@mui/material/Box";

function CustomCard() {
  return (
    <Box
      sx={{
        borderRadius: `${shapeTokens.medium}px`,
        boxShadow: elevationTokens.level2,
        p: 3,
      }}
    >
      Custom card with M3 tokens
    </Box>
  );
}
```

### Custom Theme Extension

```tsx
import { createAppTheme } from "@dt/mui-ui/theme";

const customTheme = createAppTheme({
  palette: {
    primary: {
      main: "#6750A4", // Custom primary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Additional customizations
        },
      },
    },
  },
});
```

### Accessing CSS Variables

All theme values are available as CSS variables:

```css
.custom-element {
  color: var(--mui-palette-primary-main);
  border-radius: var(--mui-shape-borderRadius);
  padding: calc(var(--mui-spacing) * 2); /* 16px */
}
```

## Migration Guide

### From Previous Theme

If migrating from the previous theme setup:

1. **Typography weights changed:**
   - Headings now use `fontWeight: 400` (M3 standard)
   - Add explicit `fontWeight: 500` or `600` where needed

2. **Shape tokens updated:**
   - Default `borderRadius` is now `12px` (was `4px`)
   - Buttons use `20px` (pill shape)
   - Use `shapeTokens` for custom components

3. **Elevation vs Outlined:**
   - Cards default to `variant="outlined"` instead of elevated
   - Use explicit `elevation` prop if needed

4. **Button changes:**
   - All buttons have `disableElevation` by default
   - Pill-shaped by default (borderRadius: 20px)

### Component Updates

```diff
// Cards
- <Card elevation={1}>
+ <Card variant="outlined">

// Buttons (no changes needed, automatically M3)
  <Button variant="contained">Click me</Button>

// Typography (adjust weights if needed)
- <Typography variant="h4" fontWeight="bold">
+ <Typography variant="h4" fontWeight={500}>
```

## Best Practices

### 1. Use Outlined Variants

M3 prefers outlined surfaces over elevated ones:

```tsx
// ✅ Preferred
<Card variant="outlined">Content</Card>

// ❌ Avoid
<Card elevation={3}>Content</Card>
```

### 2. Leverage Typography Scale

Use the appropriate variant for each use case:

```tsx
// ✅ Page title
<Typography variant="h4">Page Title</Typography>

// ✅ Section header
<Typography variant="subtitle2">Section</Typography>

// ✅ Body text
<Typography variant="body2">Description text</Typography>
```

### 3. Consistent Shape Tokens

Use design tokens for consistency:

```tsx
import { shapeTokens } from "@dt/mui-ui/theme";

<Box sx={{ borderRadius: `${shapeTokens.medium}px` }}>Consistent with theme</Box>;
```

### 4. Minimal Elevation

Use elevation sparingly:

```tsx
// ✅ Level 1 for subtle lift
<Paper elevation={1}>Subtle elevation</Paper>

// ❌ Avoid high elevation
<Paper elevation={8}>Too much elevation</Paper>
```

## Resources

- [Material Design 3 Guidelines](https://m3.material.io/)
- [M3 Typography](https://m3.material.io/styles/typography/overview)
- [M3 Shape](https://m3.material.io/styles/shape/overview)
- [M3 Color](https://m3.material.io/styles/color/overview)
- [M3 Elevation](https://m3.material.io/styles/elevation/overview)
- [MUI v7 Documentation](https://mui.com/material-ui/)

### Github M3 web

- [Material-Web Docs](https://github.com/material-components/material-web/tree/main/docs)

## Support

For questions or issues related to the M3 theme integration, please refer to the main repository documentation or create an issue.
