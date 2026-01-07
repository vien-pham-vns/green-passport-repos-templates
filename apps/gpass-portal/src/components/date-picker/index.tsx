import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps as MuiDatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DATE_FORMAT } from 'constant/format';
import { i18n } from 'lib/i18n-config';
import { Dayjs } from 'utils/date';

import { useTranslationsContext } from '@/providers/translation-provider/client';
import { getInputLabelSx } from '@/utils/classname';
import { ThaiDateAdapter } from '@/utils/thai-date-adapter';

type DatePickerExtendedProps = {
  required?: boolean;
  floatingLabel?: boolean;
};

export type DatePickerProps = MuiDatePickerProps & DatePickerExtendedProps;

const THAI_DATE_FORMAT = 'DD/MM/YYYY';

const DatePicker = ({
  value,
  onChange,
  label,
  floatingLabel = false,
  required,
  ...props
}: DatePickerProps) => {
  const { locale } = useTranslationsContext();

  const dayOfWeekFormatter = (date: Dayjs) => {
    return date.format('dd'); // Uses dayjs locale weekdaysMin
  };

  // Handle Buddhist Era input conversion for Thai locale
  const handleInputChange = (newValue: Dayjs | null, context: any) => {
    if (locale === i18n.defaultLocale && newValue) {
      const year = newValue.year();
      if (ThaiDateAdapter.isBuddhistYear(year)) {
        const gregorianYear = ThaiDateAdapter.toGregorian(year);
        const correctedDate = newValue.year(gregorianYear);
        onChange?.(correctedDate, context);
        return;
      }
    }
    onChange?.(newValue, context);
  };

  return (
    <LocalizationProvider
      dateAdapter={locale === 'th' ? ThaiDateAdapter : AdapterDayjs}
      adapterLocale={locale}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {!floatingLabel && (
          <InputLabel
            required={required}
            sx={(getInputLabelSx(floatingLabel), { mb: 1 })}
          >
            {label}
          </InputLabel>
        )}

        <MuiDatePicker
          {...props}
          {...(floatingLabel && { label })}
          slotProps={{
            ...props.slotProps,
            textField: {
              ...(typeof props.slotProps?.textField === 'object'
                ? props.slotProps.textField
                : {}),
              required: required,
              sx: {
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '0.875rem !important',
                  color: 'text.secondary',
                  opacity: 1,
                },
                '& .MuiInputLabel-root': {
                  fontSize: '1rem !important',
                },
                '& .MuiPickersInputBase-root': {
                  height: '40px !important',
                },
                ...(typeof props.slotProps?.textField === 'object' &&
                  props.slotProps.textField.sx),
              },
            },
          }}
          value={value}
          onChange={handleInputChange}
          format={props?.format ?? (locale === 'th' ? THAI_DATE_FORMAT : DATE_FORMAT)}
          dayOfWeekFormatter={dayOfWeekFormatter}
        />
      </Box>
    </LocalizationProvider>
  );
};

export { DatePicker };
