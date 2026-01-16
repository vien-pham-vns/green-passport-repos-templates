import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/server-i18n";
import { LocaleProvider } from "./locale-context";

export default async function LocaleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dictPromise = getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictPromise={dictPromise}>
      {children}
    </LocaleProvider>
  );
}
