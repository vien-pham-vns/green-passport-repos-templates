import QueryClientProvider from "@/providers/query-client-provider";

import { getDictionaryWithLocale } from "@/lib/get-dictionary";
import { TranslationProvider } from "@/providers/translation-provider";

interface ProviderLayoutProps {
  children: React.ReactNode;
}

export default async function ProviderLayout({
  children,
}: Readonly<ProviderLayoutProps>) {
  const { locale, messages } = await getDictionaryWithLocale();

  return (
    <TranslationProvider locale={locale} messages={messages}>
      <QueryClientProvider>{children}</QueryClientProvider>
    </TranslationProvider>
  );
}
