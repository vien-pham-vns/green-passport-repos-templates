import { format, parse, startOfDay, endOfDay, fromUnixTime } from "date-fns";
import { th, enUS } from "date-fns/locale";

import { type Locale } from "@/lib/i18n-config";

export type DateTime = string | number | Date;

// Default date formats
export const GREGORIAN_DATE_FORMAT = "dd/MM/yyyy";
const GREGORIAN_DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm";

// Locale mapping
const localeMap = {
  th: th,
  en: enUS,
};

let currentLocale: Locale = "th";

/**
 * Initialize locale for date formatting
 */
export const initDateLocale = (locale: Locale) => {
  currentLocale = locale;
};

/**
 * Convert various date formats to Date object
 */
export const toDate = (date: DateTime): Date => {
  if (date instanceof Date) {
    return date;
  }
  if (typeof date === "number") {
    // Unix timestamp (seconds)
    return fromUnixTime(date);
  }
  // String date
  return new Date(date);
};

/**
 * Set time to start of day (00:00:00.000)
 */
export const toStartDateTime = (date: Date | DateTime): Date => {
  return startOfDay(toDate(date));
};

/**
 * Set time to end of day (23:59:59.999)
 */
export const toEndDateTime = (date: Date | DateTime): Date => {
  return endOfDay(toDate(date));
};

/**
 * Format date in Gregorian calendar
 */
export const formatGregorianDate = (
  date: DateTime,
  formatStr: string = GREGORIAN_DATE_FORMAT,
): string => {
  const dateObj = toDate(date);
  return format(dateObj, formatStr, { locale: localeMap[currentLocale] });
};

/**
 * Format date and time in Gregorian calendar
 */
export const formatGregorianDateTime = (
  date: DateTime,
  formatStr: string = GREGORIAN_DATE_TIME_FORMAT,
): string => {
  const dateObj = toDate(date);
  return format(dateObj, formatStr, { locale: localeMap[currentLocale] });
};

/**
 * Convert Gregorian year to Buddhist Era year
 */
const toBuddhistYear = (date: Date): number => {
  return date.getFullYear() + 543;
};

/**
 * Format date in Thai Buddhist calendar (B.E.)
 * Format: dd/MM/yyyy+543
 */
export const formatThaiDate = (
  thDate: DateTime,
  formatStr: string = GREGORIAN_DATE_FORMAT,
): string => {
  const dateObj = toDate(thDate);
  const formattedDate = format(dateObj, formatStr, { locale: th });

  // Replace year with Buddhist Era year
  const buddhistYear = toBuddhistYear(dateObj);
  const gregorianYear = dateObj.getFullYear();

  return formattedDate.replace(
    gregorianYear.toString(),
    buddhistYear.toString(),
  );
};

/**
 * Format date and time in Thai Buddhist calendar (B.E.)
 */
export const formatThaiDateTime = (
  thDate: DateTime,
  formatStr: string = GREGORIAN_DATE_TIME_FORMAT,
): string => {
  const dateObj = toDate(thDate);
  const formattedDateTime = format(dateObj, formatStr, { locale: th });

  // Replace year with Buddhist Era year
  const buddhistYear = toBuddhistYear(dateObj);
  const gregorianYear = dateObj.getFullYear();

  return formattedDateTime.replace(
    gregorianYear.toString(),
    buddhistYear.toString(),
  );
};

/**
 * Parse date string to Date object
 */
export const parseDate = (
  dateString: string,
  formatStr: string = GREGORIAN_DATE_FORMAT,
  locale?: Locale,
): Date => {
  return parse(dateString, formatStr, new Date(), {
    locale: localeMap[locale || currentLocale],
  });
};

// Re-export date-fns functions for convenience
export { format, parse, startOfDay, endOfDay, fromUnixTime };
export type { Locale as DateFnsLocale } from "date-fns";
