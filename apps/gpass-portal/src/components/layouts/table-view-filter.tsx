'use client';

import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext } from 'react';

import Box from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { IconClearAll, IconLoader, IconSearch } from '@tabler/icons-react';
import { useFormStatus } from 'react-dom';
import { useDebouncedCallback } from 'use-debounce';

import { useNavigation } from '@/hooks/use-navigation';

/**
 * TableViewFilter
 */

interface TableViewFilterContextValue {
  container?: Element | null;
}

const TableViewFilterContext = createContext<TableViewFilterContextValue>({});

/** --------------------------------
 *  Layout: TableViewFilterRoot
 *  --------------------------------
 */
interface TableViewFilterRootProps {
  children: React.ReactNode;
  container?: Element | null;
}

function TableViewFilterRoot({ children, container }: TableViewFilterRootProps) {
  return (
    <TableViewFilterContext.Provider value={{ container }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        {children}
      </Box>
    </TableViewFilterContext.Provider>
  );
}

/** --------------------------------
 *  Layout: TableViewFilterLeft
 *  --------------------------------
 */
interface TableViewFilterLeftProps {
  children: React.ReactNode;
}

function TableViewFilterLeft({ children }: TableViewFilterLeftProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      alignItems='center'
      sx={{ flex: { xs: 'none', md: '1' } }}
    >
      {children}
    </Stack>
  );
}

/** --------------------------------
 *  Layout: TableViewFilterRight
 *  --------------------------------
 */
interface TableViewFilterRightProps {
  children: React.ReactNode;
}

function TableViewFilterRight({ children }: TableViewFilterRightProps) {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={2}
      alignItems='center'
      sx={{ position: 'relative' }}
    >
      {children}
    </Stack>
  );
}

interface TableViewFilterSearchProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  isParentPending?: boolean;
  customWidth?: number;
  featureName?: string;
}

function TableViewFilterSearch({
  customWidth = 300,
  placeholder = 'Search...',
  featureName,
}: TableViewFilterSearchProps) {
  const searchParams = useSearchParams();
  const { navigate, isPending } = useNavigation();

  const handleSearch = useDebouncedCallback((value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newSearchParams.set('q', value);
    } else {
      newSearchParams.delete('q');
    }

    navigate(`?${newSearchParams.toString()}`, { scroll: false });
  }, 300);

  return (
    <form>
      <TextField
        defaultValue={searchParams.get('q')?.toString()}
        placeholder={placeholder}
        type='search'
        size='small'
        name='q'
        sx={{
          '& .MuiInputBase-input::placeholder': {
            fontSize: '0.83rem',
            opacity: 0.7,
          },
          '& .MuiInputBase-input': {
            fontSize: '0.975rem',
          },
          width: { xs: '100%', md: customWidth },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position='start'>
                <SearchStatus searching={isPending} />
              </InputAdornment>
            ),
          },
        }}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
    </form>
  );
}

function SearchStatus({ searching }: { searching?: boolean }) {
  const { pending } = useFormStatus();
  const isSearching = searching || pending;

  return (
    <>
      {isSearching ? (
        <IconLoader aria-hidden='true' size={16} />
      ) : (
        <IconSearch aria-hidden='true' size={16} />
      )}
    </>
  );
}

interface SelectOption {
  label: string;
  value: string;
}

interface TableViewFilterMultiSelectProps {
  label: string;
  options: SelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  allLabel?: string;
  maxVisible?: number;
  renderChip?: (value: string, option: SelectOption) => React.ReactNode;
  minWidth?: number;
}

function TableViewFilterMultiSelect({
  label,
  options,
  value,
  onChange,
  allLabel = 'All',
  maxVisible = 2,
  renderChip,
  minWidth = 300,
}: TableViewFilterMultiSelectProps) {
  const { container } = useContext(TableViewFilterContext);

  const handleChange = (event: any) => {
    const rawValue = event.target.value;

    if (rawValue === '' || !Array.isArray(rawValue)) {
      if (value.length > 0 && !value.includes('all')) {
        onChange(['all']);
      }
      return;
    }

    const selectedValues = Array.isArray(rawValue) ? rawValue : [rawValue];
    const selectingAll = selectedValues.includes('all');
    const specificValues = selectedValues.filter((v) => v !== 'all');

    const newValue =
      selectingAll && specificValues.length === 0 ? ['all'] : specificValues;

    if (JSON.stringify(value) !== JSON.stringify(newValue)) {
      onChange(newValue);
    } else {
      onChange(['all']);
    }
  };

  const defaultRenderChip = (chipValue: string, option: SelectOption) => (
    <Chip
      key={chipValue}
      label={option?.label || chipValue}
      size='small'
      sx={{
        color: 'text.primary',
        backgroundColor: 'grey.100',
      }}
    />
  );

  return (
    <Box sx={{ minWidth: { md: minWidth }, width: { xs: '100%', md: 'auto' } }}>
      <Select
        label={label}
        MenuProps={{
          container,
        }}
        size='small'
        multiple
        onChange={handleChange}
        value={value}
        renderValue={(selected) => {
          const selectedArray = Array.isArray(selected) ? selected : [selected || 'all'];
          if (selectedArray.includes('all')) {
            return allLabel;
          }
          const visibleItems = selectedArray.slice(0, maxVisible);
          const remainingCount = selectedArray.length - maxVisible;

          return (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {visibleItems.map((itemValue: string) => {
                const option = options.find((opt) => opt.value === itemValue);
                return renderChip
                  ? renderChip(itemValue, option!)
                  : defaultRenderChip(itemValue, option!);
              })}
              {remainingCount > 0 && (
                <Chip
                  label={`+${remainingCount}`}
                  size='small'
                  sx={{
                    color: 'text.secondary',
                    backgroundColor: 'grey.200',
                    fontWeight: 500,
                  }}
                />
              )}
            </Box>
          );
        }}
      >
        {options?.map(({ value: optionValue, label: optionLabel }) => (
          <MenuItem key={optionValue} value={optionValue}>
            <Checkbox checked={value.includes(optionValue)} size='small' />
            <ListItemText primary={optionLabel} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

interface TableViewFilterSelectProps {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  showClearButton?: boolean;
  minWidth?: number;
  clearValue?: string;
}

function TableViewFilterSelect({
  label,
  options,
  value,
  onChange,
  showClearButton = true,
  minWidth = 200,
  clearValue = 'all',
}: TableViewFilterSelectProps) {
  const { container } = useContext(TableViewFilterContext);

  return (
    <Box sx={{ minWidth: { md: minWidth }, width: { xs: '100%', md: 'auto' } }}>
      <Select
        label={label}
        MenuProps={{
          container,
        }}
        size='small'
        onChange={(event) => {
          const newValue = event.target.value as string;
          const normalizedValue = newValue === '' ? clearValue : newValue;
          if (value !== normalizedValue) {
            onChange(normalizedValue);
          }
        }}
        value={value}
        inputProps={{
          endadornment:
            showClearButton && value !== clearValue ? (
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange(clearValue);
                  }}
                >
                  <IconClearAll />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      >
        {options?.map(({ value: optionValue, label: optionLabel }) => (
          <MenuItem key={optionValue} value={optionValue}>
            {optionLabel}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}

interface TableViewFilterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'outlined' | 'contained' | 'text' | 'icon';
  size?: 'small' | 'medium' | 'large';
  icon?: React.ReactNode;
  color?: ButtonProps['color'];
}

function TableViewFilterButton({
  onClick,
  children,
  variant = 'outlined',
  icon,
  ...props
}: TableViewFilterButtonProps) {
  if (variant === 'icon') {
    return (
      <Button variant='outlined' onClick={onClick} endIcon={icon} {...props}>
        {children}
      </Button>
    );
  }

  // Default to outlined variant
  return (
    <Button variant='outlined' onClick={onClick} {...props}>
      {children}
    </Button>
  );
}

export const TableViewFilter = {
  Root: TableViewFilterRoot,
  Left: TableViewFilterLeft,
  Right: TableViewFilterRight,
  Search: TableViewFilterSearch,
  MultiSelect: TableViewFilterMultiSelect,
  Select: TableViewFilterSelect,
  Button: TableViewFilterButton,
};
