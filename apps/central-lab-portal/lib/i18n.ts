// i18n configuration and utilities
export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "th";

// Locale configuration
export const localeConfig = {
  en: {
    name: "English",
    flag: "🇬🇧",
  },
  th: {
    name: "ไทย",
    flag: "🇹🇭",
  },
} as const;

// Dictionary type (inferred from the actual dictionary structure)
export type Dictionary = typeof import("@/messages/th.json");

// Get dictionary based on locale
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  try {
    const dictionary = await import(`@/messages/${locale}.json`);
    return dictionary.default;
  } catch {
    // Fallback to default locale if translation file not found
    const fallback = await import(`@/messages/${defaultLocale}.json`);
    return fallback.default;
  }
}

// Check if locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split("/");
  const potentialLocale = segments[1];

  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }

  return defaultLocale;
}

// Type helper to get nested object type by dot notation path
export type GetNestedType<
  T,
  P extends string,
> = P extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? GetNestedType<T[First], Rest>
    : unknown
  : P extends keyof T
    ? T[P]
    : unknown;

// Simple helper to get nested value from dot notation
function getByPath<T, P extends string>(obj: T, path: P): GetNestedType<T, P> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    path
      .split(".")
      // biome-ignore lint/suspicious/noExplicitAny: <no reason>
      .reduce((current: any, key) => current?.[key], obj) as GetNestedType<T, P>
  );
}

// Get scoped translations - simple, flexible, and type-safe
export function scopeT<P extends string>(
  dict: Dictionary,
  scope: P,
): GetNestedType<Dictionary, P> {
  return getByPath(dict, scope);
}
