'use client';

import { CSSProperties } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import { GB, TH } from 'country-flag-icons/react/3x2';
import { Locale } from 'lib/i18n-config';

import { setLocale } from '@/lib/cookies';
import { useTranslationsContext } from '@/providers/translation-provider/client';

const flagStyle: CSSProperties = { width: '24px', height: '24px' };

const MAP_LOCALES = [
  { value: 'th', label: 'ภาษาไทย', icon: <TH style={flagStyle} /> },
  { value: 'en', label: 'English', icon: <GB style={flagStyle} /> },
];

export default function AppSelectLanguage() {
  const { locale } = useTranslationsContext();

  const handleChangeLocale = async (value: string) => {
    await setLocale(value as Locale);
    window.location.reload();
  };

  return (
    <Select
      sx={{ fontSize: '1rem', height: '36px !important' }}
      value={locale}
      onChange={(e) => handleChangeLocale(e.target.value)}
      renderValue={(selected) => {
        const selectedLocale = MAP_LOCALES.find((item) => item.value === selected);
        return (
          <Stack direction='row' alignItems='center' gap={1}>
            {selectedLocale?.icon}
            {selectedLocale?.label}
          </Stack>
        );
      }}
      size='small'
    >
      {MAP_LOCALES.map((item) => (
        <MenuItem key={item.value} value={item.value} sx={{ fontSize: '1rem', gap: 1 }}>
          {item.icon}
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
}
