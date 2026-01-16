import React from "react";

import { Locale } from "@/lib/i18n-config";

import { TranslateMessages, TranslationContext } from "./client";

interface TranslationProviderProps {
  locale: Locale;
  messages: TranslateMessages;
  children: React.ReactNode;
}

export function TranslationProvider({
  locale,
  messages,
  children,
}: TranslationProviderProps) {
  return (
    <TranslationContext value={{ locale, messages }}>
      {children}
    </TranslationContext>
  );
}
