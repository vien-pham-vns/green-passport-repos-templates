import type { TranslationDiff, FlatTranslationEntry } from '../types';

/**
 * Compare translations and generate diff
 */
export function generateTranslationDiff(
  entries: FlatTranslationEntry[],
  languages: string[],
): TranslationDiff[] {
  const diffs: TranslationDiff[] = [];

  for (const entry of entries) {
    const availableLanguages = Object.keys(entry.values);
    const missingLanguages = languages.filter(
      (lang) => !availableLanguages.includes(lang),
    );

    if (missingLanguages.length > 0) {
      diffs.push({
        key: entry.key,
        type: 'missing',
        languages: missingLanguages,
        values: entry.values,
      });
    }
  }

  return diffs;
}

/**
 * Calculate completion percentage for a language
 */
export function calculateCompletionPercentage(
  entries: FlatTranslationEntry[],
  language: string,
): number {
  if (entries.length === 0) return 0;

  const translatedCount = entries.filter(
    (entry) => entry.values[language] !== undefined,
  ).length;

  return Math.round((translatedCount / entries.length) * 100);
}

/**
 * Get statistics for all languages
 */
export function getLanguageStatistics(
  entries: FlatTranslationEntry[],
  languages: string[],
): Record<
  string,
  { total: number; translated: number; missing: number; percentage: number }
> {
  const stats: Record<
    string,
    { total: number; translated: number; missing: number; percentage: number }
  > = {};

  for (const language of languages) {
    const total = entries.length;
    const translated = entries.filter(
      (entry) => entry.values[language] !== undefined,
    ).length;
    const missing = total - translated;
    const percentage = calculateCompletionPercentage(entries, language);

    stats[language] = {
      total,
      translated,
      missing,
      percentage,
    };
  }

  return stats;
}
