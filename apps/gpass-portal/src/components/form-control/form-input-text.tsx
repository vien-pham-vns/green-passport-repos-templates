import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { FormInputProps } from './form-input-props';

export const FormInputText = ({
  name,
  label,
  placeholder,
  control,
  inputProps,
  onKeyDown,
  sx,
  required = false,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProps) => (
        <>
          <InputLabel
            sx={{ fontSize: '14px', fontWeight: 500 }}
            htmlFor={`${name}-input`}
          >
            {label}
            {required && <span style={{ color: 'red', marginLeft: '1px' }}>*</span>}
          </InputLabel>
          <TextField
            id={`${name}-input`}
            size='small'
            variant='outlined'
            placeholder={placeholder ?? ''}
            fullWidth
            value={renderProps.field.value}
            error={!!renderProps.fieldState.error}
            helperText={renderProps.fieldState.error?.message ?? null}
            onChange={renderProps.field.onChange}
            sx={{
              ...sx,
              '& .MuiInputBase-input::placeholder': {
                fontSize: '14px',
                color: 'text.secondary',
                opacity: 1,
              },
            }}
            slotProps={{
              input: { inputProps },
            }}
            onKeyDown={onKeyDown}
          />
        </>
      )}
    />
  );
};
