// import { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// import ClearIcon from '@mui/icons-material/Clear';
// import EventIcon from '@mui/icons-material/Event';
// import Popover, { PopoverProps } from '@mui/material/Popover';
// import { TextFieldProps } from '@mui/material/TextField';
// import { Input, InputAdornment } from 'components/form';
// import { omit } from 'lodash-es';
// import Calendar, { CalendarProps } from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import { Dayjs, dayjs, formatThaiDate } from 'utils/date';

// import { useTranslationsContext } from '@/providers/translation-provider/client';

// import './styles.css';

// const DefaultPlaceHolder = 'DD/MM/YYYY - DD/MM/YYYY';

// type RangeDate = [Date | null, Date | null];

// type RangeDayjs = [Dayjs, Dayjs];
// type Value = RangeDayjs | null;

// type Props = Omit<TextFieldProps, 'value' | 'onChange' | 'defaultValue'> & {
//   value?: Value;
//   defaultValue?: Value;
//   onChange?: (value: Value) => void;
//   allowRangeDays?: number | null;
//   allowClear?: boolean;
//   format?: (value: Value) => string;
//   placeHolder?: string;
//   popoverProps?: Omit<PopoverProps, 'open'>;
//   disableFuture?: boolean;
//   locale?: string;
//   floatingLabel?: boolean;
// };

// const checkValidValue = (value: Value) => {
//   if (!value) {
//     return true;
//   }

//   const [startDate, endDate] = value;
//   if (endDate.isSameOrAfter(startDate, 'day')) {
//     return true;
//   }
//   return false;
// };

// const transformValue = (value: Value) => {
//   if (!value) {
//     return null;
//   }

//   const [startDate, endDate] = value;
//   return [startDate.toDate(), endDate.toDate()] as RangeDate;
// };

// // Custom weekday formatter to match MUI style
// // const formatShortWeekday = (locale: string | undefined, date: Date) => {
// //   const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
// //   return weekdays[date.getDay()];
// // };

// const RawDateRangePicker = ({
//   value: valueProp,
//   onChange,
//   defaultValue,
//   slotProps,
//   placeHolder = DefaultPlaceHolder,
//   allowRangeDays = null,
//   allowClear = true,
//   popoverProps,
//   disableFuture = true,
//   locale,
//   format,
//   ...props
// }: Props) => {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState<Value>(valueProp || defaultValue || null);
//   const [calendarValue, setCalendarValue] = useState<RangeDate | null>(
//     transformValue(valueProp || defaultValue || null)
//   );
//   const [firstDate, setFirstDate] = useState<Dayjs | null>(null);
//   const { ref: calendarRef, node: calendarNode } = useMeasureNode();

//   const handleClear = (event: MouseEvent) => {
//     event.stopPropagation();
//     setCalendarValue(null);
//     setValue(null);
//     setFirstDate(null);
//     onChange?.(null);
//   };

//   const handleChange = useCallback(
//     (paramValue: Parameters<NonNullable<CalendarProps['onChange']>>[0]) => {
//       const curValue = paramValue as RangeDate;

//       if (!curValue) {
//         setCalendarValue(null);
//         setValue(null);
//         onChange?.(null);
//         return;
//       }

//       const [startDate, endDate] = curValue;
//       if (!startDate || !endDate) {
//         setFirstDate(dayjs(startDate || endDate));
//         setCalendarValue(curValue);
//         return;
//       }

//       setFirstDate(null);
//       setCalendarValue(curValue);

//       const formatted = [dayjs(startDate), dayjs(endDate)] as RangeDayjs;
//       setValue(formatted);
//       onChange?.(formatted);
//       setOpen(false);
//     },
//     [onChange]
//   );

//   const minDate = useMemo(() => {
//     if (allowRangeDays === null) {
//       return undefined;
//     }
//     if (!firstDate) {
//       return undefined;
//     }

//     return firstDate.subtract(allowRangeDays, 'day').toDate();
//   }, [allowRangeDays, firstDate]);

//   const maxDate = useMemo(() => {
//     if (allowRangeDays === null || !firstDate) {
//       return disableFuture ? dayjs().toDate() : undefined;
//     }

//     if (!disableFuture) {
//       return firstDate.add(allowRangeDays, 'day').toDate();
//     }

//     return dayjs.min(firstDate.add(allowRangeDays, 'day'), dayjs()).toDate();
//   }, [allowRangeDays, disableFuture, firstDate]);

//   const displayValue = useMemo(() => {
//     if (format) {
//       return format(value);
//     }

//     return value ? value.map((item) => item.format('DD/MM/YYYY')).join(' - ') : '';
//   }, [format, value]);

//   useEffect(() => {
//     if (!checkValidValue) {
//       throw new Error('Start date must be before or same end date');
//     }
//     setCalendarValue(transformValue(valueProp || null));
//     setValue(valueProp || null);
//   }, [valueProp]);

//   // Adhoc logic
//   useEffect(() => {
//     if (!calendarNode) {
//       return;
//     }

//     const adjustButtons = () => {
//       const buttons = calendarNode.querySelectorAll('button');

//       buttons.forEach((button) => {
//         button.tabIndex = -1;
//       });

//       // buttons.forEach((button) => {
//       //   if (button.disabled) {
//       //     button.removeAttribute('disabled');
//       //     button.setAttribute('aria-disabled', 'true');
//       //     button.style.pointerEvents = 'none';
//       //     button.style.opacity = '0.4';
//       //     button.style.cursor = 'not-allowed';
//       //   }
//       // });
//     };
//     adjustButtons();
//     const observer = new MutationObserver(() => {
//       adjustButtons();
//     });
//     observer.observe(calendarNode, {
//       attributes: true,
//       attributeFilter: ['disabled'],
//       childList: true,
//       subtree: true,
//     });

//     return () => observer.disconnect();
//   }, [calendarNode]);

//   // Manual, because of disableAutoFocus
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       window.addEventListener('keydown', handleKeyDown);
//     } else {
//       window.removeEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [open]);

//   return (
//     <>
//       <Input
//         value={displayValue}
//         placeholder={placeHolder}
//         onMouseDown={(event) => {
//           event.preventDefault();
//           inputRef.current?.focus();
//           setOpen(true);
//         }}
//         inputRef={inputRef}
//         slotProps={{
//           ...slotProps,
//           input: {
//             ...slotProps?.input,
//             endAdornment: (
//               <InputAdornment position='end'>
//                 {allowClear && (
//                   <ClearIcon onMouseDown={handleClear} sx={{ cursor: 'pointer' }} />
//                 )}
//                 <EventIcon sx={{ cursor: 'pointer' }} />
//               </InputAdornment>
//             ),
//             readOnly: true,
//           },
//         }}
//         {...props}
//       />
//       <Popover
//         {...omit(popoverProps, ['open'])}
//         disableAutoFocus
//         open={open}
//         anchorEl={inputRef?.current}
//         onClose={() => {
//           setOpen(false);
//         }}
//         anchorOrigin={{
//           vertical: 'bottom',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//       >
//         <div
//           ref={calendarRef}
//           onMouseDown={(e) => {
//             e.preventDefault();
//           }}
//         >
//           <Calendar
//             locale={locale}
//             allowPartialRange
//             onChange={handleChange}
//             selectRange={true}
//             value={calendarValue}
//             goToRangeStartOnSelect={false}
//             defaultActiveStartDate={calendarValue?.[0] ?? undefined}
//             minDate={minDate}
//             maxDate={maxDate}
//             // formatShortWeekday={formatShortWeekday}
//           />
//         </div>
//       </Popover>
//     </>
//   );
// };

// const RangePicker = (props: Props) => {
//   const { locale } = useTranslationsContext();

//   if (locale === 'th') {
//     return (
//       <RawDateRangePicker
//         format={(value) => {
//           if (!value) {
//             return '';
//           }
//           const [startDate, endDate] = value;
//           return [formatThaiDate(startDate), formatThaiDate(endDate)].join(' - ');
//         }}
//         locale='th-TH'
//         {...props}
//       />
//     );
//   }

//   return <RawDateRangePicker {...props} />;
// };

// export default RangePicker;
