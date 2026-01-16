"use server";

import { cookies } from "next/headers";
import {
	type Dictionary,
	defaultLocale,
	getDictionary,
	type Locale,
	scopeT,
} from "./i18n";

/**
 * Get current locale from cookies
 * Use this in Server Components and Server Actions
 */
export async function getLocale(): Promise<Locale> {
	const cookieStore = await cookies();
	const locale = cookieStore.get("FORM_LAB_LOCALE")?.value as Locale;
	return locale || defaultLocale;
}

/**
 * Get dictionary for current locale
 * Use this in Server Components
 */
export async function getDict(): Promise<Dictionary> {
	const locale = await getLocale();
	return getDictionary(locale);
}

/**
 * Get scoped translations for current locale
 * Use this in Server Components when you need specific scope
 *
 * @example
 * ```tsx
 * const hero = await getScopedDict('homePage.hero');
 * return <h1>{hero.title}</h1>
 * ```
 */
export async function getScopedDict<P extends string>(
	scope: P,
): Promise<ReturnType<typeof scopeT<P>>> {
	const dict = await getDict();
	return scopeT(dict, scope);
}

/**
 * Server-side translation helper
 * Combines locale detection and dictionary loading
 *
 * @example
 * ```tsx
 * export default async function Page() {
 *   const { locale, dict, t } = await serverTranslation();
 *   const hero = t('homePage.hero');
 *
 *   return <h1>{hero.title}</h1>
 * }
 * ```
 */
export async function serverTranslation() {
	const locale = await getLocale();
	const dict = await getDictionary(locale);

	return {
		locale,
		dict,
		t: <P extends string>(scope: P) => scopeT(dict, scope),
	};
}

export async function setLocale(newLocale: Locale) {
	const cookieStore = await cookies();
	cookieStore.set({
		name: "FORM_LAB_LOCALE",
		value: newLocale,
	});
}
