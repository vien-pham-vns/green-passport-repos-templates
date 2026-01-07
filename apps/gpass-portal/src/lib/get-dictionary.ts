import { cache } from 'react';

import 'server-only';

import { getLocale } from './cookies';
import type { Locale } from './i18n-config';

const dictionaries = {
  en: () => import('../../messages/en.json').then((module) => module.default),
  th: () => import('../../messages/th.json').then((module) => module.default),
};

export const getDictionary = cache(async (locale: Locale) => {
  try {
    return await dictionaries[locale]();
  } catch (error) {
    console.error(`Failed to load dictionary for locale: ${locale}`, error);

    // Fallback to default locale
    return await dictionaries.th();
  }
});

export const getDictionaryWithLocale = cache(async () => {
  const locale = await getLocale();
  return {
    locale,
    messages: await getDictionary(locale),
  };
});
