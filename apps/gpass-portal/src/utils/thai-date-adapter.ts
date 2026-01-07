import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

export class ThaiDateAdapter extends AdapterDayjs {
  // Static utility methods for Buddhist Era conversion
  static isBuddhistYear = (year: number): boolean => {
    return year > 2400; // Buddhist Era years are > 2400
  };

  static toGregorian = (buddhistYear: number): number => {
    return buddhistYear - 543;
  };

  static toBuddhist = (gregorianYear: number): number => {
    return gregorianYear + 543;
  };

  formatByString = (value: Dayjs, formatString: string): string => {
    if (formatString.includes('BBBB')) {
      const buddhistYear = ThaiDateAdapter.toBuddhist(value.year());
      return value.format(formatString.replace(/BBBB/g, buddhistYear.toString()));
    }

    if (formatString.includes('YYYY')) {
      const buddhistYear = ThaiDateAdapter.toBuddhist(value.year());
      return value.format(formatString.replace(/YYYY/g, buddhistYear.toString()));
    }

    // Use dayjs format directly for other cases
    return value.format(formatString);
  };

  getYear = (value: Dayjs): number => {
    // Return Buddhist Era year for calendar navigation
    return ThaiDateAdapter.toBuddhist(value.year());
  };

  setYear = (value: Dayjs, year: number): Dayjs => {
    if (ThaiDateAdapter.isBuddhistYear(year)) {
      const gregorianYear = ThaiDateAdapter.toGregorian(year);
      return value.year(gregorianYear);
    } else {
      return value.year(year);
    }
  };
}
