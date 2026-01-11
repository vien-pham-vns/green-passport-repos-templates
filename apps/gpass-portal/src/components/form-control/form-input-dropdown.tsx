import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';

import { FormInputProps } from './form-input-props';

interface FormInputDropdownProps extends FormInputProps {
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const FormInputDropdown = ({
  name,
  control,
  sx,
  label,
  required,
  options,
  placeholder,
}: FormInputDropdownProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'This field is required' : false,
      }}
      render={(renderProps) => (
        <>
          <InputLabel
            sx={{ fontSize: '14px', fontWeight: 500 }}
            htmlFor={`${name}-input`}
          >
            {label}
            {required && (
              <Box component="span" sx={{ color: 'red', marginLeft: '4px' }}>
                *
              </Box>
            )}
          </InputLabel>
          <FormControl error={!!renderProps.fieldState.error} sx={{ minWidth: 200 }}>
            <Select
              id='select-dropdown-list'
              onChange={renderProps.field.onChange}
              value={renderProps.field.value}
              sx={{
                ...sx,
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '14px',
                  color: 'text.secondary',
                  opacity: 1,
                },
                '& .MuiSelect-select': {
                  ...((!renderProps.field.value || renderProps.field.value === '') &&
                    placeholder && {
                      fontSize: '14px',
                      color: 'text.secondary',
                      opacity: 1,
                    }),
                },
              }}
              displayEmpty
              renderValue={(selected) => {
                if (!selected || selected === '') {
                  return placeholder;
                }
                const option = options.find((opt) => opt.value === selected);
                return option?.label || selected;
              }}
            >
              {placeholder && (
                <MenuItem value='' disabled>
                  {placeholder}
                </MenuItem>
              )}
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {renderProps.fieldState.error && (
              <FormHelperText>{renderProps.fieldState.error.message}</FormHelperText>
            )}
          </FormControl>
        </>
      )}
    />
  );
};
