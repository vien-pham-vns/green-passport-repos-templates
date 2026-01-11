// Export base building blocks for apps to create their own registries
export { default as ThemeProviderCore } from "./theme-provider-core";

// Export theme factories
export { createAppTheme, defaultTheme } from "./create-theme";
export {
  createGovernmentTheme,
  defaultGovernmentTheme,
  highContrastGovernmentTheme,
} from "./government-theme";
export * from "./theme-tokens";

// Export default registry (optional - apps can create their own)
export { default } from "./theme-registry";
export { default as ThemeRegistry } from "./theme-registry";
