import dayjs, { type Dayjs, isDayjs } from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/th';
import buddhistEra from 'dayjs/plugin/buddhistEra';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import minMax from 'dayjs/plugin/minMax';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

import { Locale } from '@/lib/i18n-config';
import { DateTime } from '@/types/common';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(minMax);
dayjs.extend(isSameOrAfter);
dayjs.extend(buddhistEra);
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

// Set default timezone to Bangkok
dayjs.tz.setDefault('Asia/Bangkok');

dayjs.locale('th');
dayjs.updateLocale('en', {
  weekStart: 1,
  weekdaysMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
});
dayjs.updateLocale('th', {
  relativeTime: {
    future: 'อีก %s',
    past: 'เมื่อ %s ที่แล้ว',
    s: 'ไม่กี่วินาที',
    m: '1 นาที',
    mm: '%d นาที',
    h: '1 ชั่วโมง',
    hh: '%d ชั่วโมง',
    d: '1 วัน',
    dd: '%d วัน',
    M: '1 เดือน',
    MM: '%d เดือน',
    y: '1 ปี',
    yy: '%d ปี',
  },
  weekStart: 1,
  weekdaysMin: ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'],
});

export const GREGORIAN_DATE_FORMAT = 'DD/MM/YYYY';
const GREGORIAN_DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';
const THAI_DATE_FORMAT = 'DD/MM/BBBB';
const THAI_DATE_TIME_FORMAT = 'DD/MM/BBBB HH:mm';

export { dayjs, isDayjs };
export type { Dayjs };

export const initDayjsLocale = (locale: Locale) => {
  if (locale === 'en') {
    dayjs.locale('en');
    return;
  }
  dayjs.locale('th');
};

export const toStartDateTime = (date: Dayjs) => {
  return date.hour(0).minute(0).second(0).millisecond(0);
};

export const toEndDateTime = (date: Dayjs) => {
  return date.hour(23).minute(59).second(59).millisecond(999);
};

export const toDayjs = (date: DateTime) => {
  if (typeof date === 'string' || isDayjs(date)) {
    return dayjs(date);
  }
  return dayjs.unix(date);
};

export const formatGregorianDate = (date: DateTime, format = GREGORIAN_DATE_FORMAT) => {
  return toDayjs(date).format(format);
};

export const formatGregorianDateTime = (
  date: DateTime,
  format = GREGORIAN_DATE_TIME_FORMAT
) => {
  return toDayjs(date).format(format);
};

export const formatThaiDate = (thDate: DateTime, format = THAI_DATE_FORMAT) => {
  return toDayjs(thDate).format(format);
};

export const formatThaiDateTime = (thDate: DateTime, format = THAI_DATE_TIME_FORMAT) => {
  return toDayjs(thDate).format(format);
};
