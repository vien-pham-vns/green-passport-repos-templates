// import RawAutocomplete, {
//   AutocompleteProps,
//   AutocompleteRenderInputParams,
//   AutocompleteValue,
// } from '@mui/material/Autocomplete';
// import { InputProps } from '@mui/material/Input';

// type Props<
//   TOption extends { value: string | number; label: string } = {
//     value: string | number;
//     label: string;
//   },
//   Multiple extends boolean = boolean,
//   DisableClearable extends boolean = boolean,
//   FreeSolo extends boolean = boolean,
// > = Omit<
//   AutocompleteProps<TOption, Multiple, DisableClearable, FreeSolo>,
//   'renderInput' | 'value'
// > & {
//   textFieldProps?: InputProps;
//   renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
//   value?:
//     | AutocompleteValue<TOption, Multiple, DisableClearable, FreeSolo>
//     | (Multiple extends true ? string[] : string);
// };

// const Autocomplete = <
//   TOption extends { value: string | number; label: string } = {
//     value: string | number;
//     label: string;
//   },
//   Multiple extends boolean = boolean,
//   DisableClearable extends boolean = boolean,
//   FreeSolo extends boolean = boolean,
// >({
//   renderInput,
//   options,
//   textFieldProps,
//   value: valueProp,
//   ...props
// }: Props<TOption, Multiple, DisableClearable, FreeSolo>) => {
//   return (
//     <RawAutocomplete
//       size='small'
//       options={options}
//       value={valueProp as any}
//       renderInput={
//         renderInput ??
//         ((params) => (
//           <Input
//             {...omit(params, 'InputProps')}
//             {...omit(textFieldProps, 'InputProps')}
//             {...params}
//             slotProps={{
//               input: {
//                 ...params.InputProps,
//                 ...(textFieldProps?.slotProps?.input ?? {}),
//               },
//             }}
//           />
//         ))
//       }
//       getOptionLabel={(optionOrValue) => {
//         if (typeof optionOrValue === 'string' || typeof optionOrValue === 'number') {
//           // optionOrValue is the selected value (ID), find its label
//           const matched = options.find((opt) => opt.value === optionOrValue);
//           return matched ? matched.label : optionOrValue;
//         }
//         // optionOrValue is an option object from dropdown
//         return optionOrValue.label;
//       }}
//       isOptionEqualToValue={(option: TOption, value: string | TOption) => {
//         if (typeof value === 'string' || typeof value === 'number') {
//           return option.value === value;
//         }
//         return option.value === value.value;
//       }}
//       {...props}
//     />
//   );
// };

// export default Autocomplete;
