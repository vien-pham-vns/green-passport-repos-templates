'use client';

import { DateTime } from 'types/common';
import {
  formatGregorianDate,
  formatGregorianDateTime,
  formatThaiDate,
  formatThaiDateTime,
} from 'utils/date';

import { useTranslationsContext } from '@/providers/translation-provider/client';

const useFormatDate = () => {
  const { locale } = useTranslationsContext();

  const formatDate = (date: DateTime, format?: string) => {
    if (+date < 0) {
      return '--';
    }
    if (locale === 'th') {
      return formatThaiDate(date, format);
    }
    return formatGregorianDate(date, format);
  };

  const formatDateTime = (date: DateTime, format?: string) => {
    if (+date < 0) {
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
