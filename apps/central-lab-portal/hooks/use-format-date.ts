'use client';

import { DateTime } from '@/utils/date';
import {
  formatGregorianDate,
  formatGregorianDateTime,
  formatThaiDate,
  formatThaiDateTime,
} from '@/utils/date';

// You can create a context provider for locale if needed
// For now, we'll use a simple hook that accepts locale

interface UseFormatDateOptions {
  locale?: 'en' | 'th';
}

const useFormatDate = (options?: UseFormatDateOptions) => {
  const locale = options?.locale || 'th';

  const formatDate = (date: DateTime, format?: string) => {
    if (typeof date === 'number' && date < 0) {
      return '--';
    }
    if (locale === 'th') {
      return formatThaiDate(date, format);
    }
    return formatGregorianDate(date, format);
  };

  const formatDateTime = (date: DateTime, format?: string) => {
    if (typeof date === 'number' && date < 0) {
      return '--';
    }
    if (locale === 'th') {
      return formatThaiDateTime(date, format);
    }
    return formatGregorianDateTime(date, format);
  };

  return {
    formatDate,
    formatDateTime,
  };
};

export default useFormatDate;
