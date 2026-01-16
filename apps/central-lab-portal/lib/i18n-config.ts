export const i18n = {
  defaultLocale: "th",
  locales: ["en", "th"] as const satisfies string[],
};

export type Locale = (typeof i18n)["locales"][number];
