'use client';

import React, { createContext } from 'react';

import { get } from 'es-toolkit/compat';
import Mustache from 'mustache';

import { Locale } from '@/lib/i18n-config';
import { initDateLocale } from '@/utils/date';

export type TranslateMessages = Record<string, unknown>;

interface TranslationContextValue {
  locale: Locale;
  messages: TranslateMessages;
}

interface TranslationContextProps {
  value: TranslationContextValue;
  children: React.ReactNode;
}

const Context = createContext<TranslationContextValue | null>(null);

export function TranslationContext({ value, children }: TranslationContextProps) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useTranslationsContext(): {
  locale: Locale;
  messages: TranslateMessages;
} {
  const context = React.useContext(Context);

  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }

  // Initialize date locale based on translation locale
  initDateLocale(context.locale);

  return { locale: context.locale, messages: context.messages };
}

export const interpolate = (
  text: string,
  values: Record<string, unknown> = {}
): string => {
  try {
    return Mustache.render(text, values);
  } catch (error) {
    console.error('Translation interpolation error:', error);
    return text;
  }
};

/**
 * Get translation object for direct access (recommended)
 *
 * ```tsx
 * const t = useTranslation('login');
 * t['app-name'] // Direct access
 * interpolate(t['welcome'], { userName: 'John' }) // With variables
 * ```
 */
export function useTranslation(key: string): Record<string, string> {
  const { messages } = useTranslationsContext();
  return get(messages, key, {}) as Record<string, string>;
}

/**
 * Get translation function (backward compatibility)
 *
 * @deprecated Use `useTranslation` for direct access instead
 *
 * ```tsx
 * const t = useTranslations('login');
 * t('app-name') // Function call
 * t('welcome', { userName: 'John' }) // With interpolation
 * ```
 */
export function useTranslations(key: string) {
  const { messages } = useTranslationsContext();
  const res = get(messages, key, key);

  return (curKey: string, values?: Record<string, unknown>): string => {
    const text = get(res, curKey, curKey);
    return typeof text === 'string' ? interpolate(text, values) : String(text);
  };
}
