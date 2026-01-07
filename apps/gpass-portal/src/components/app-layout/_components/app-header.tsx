import { Suspense } from 'react';

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { AppBreadcrumb } from './app-breadcrumb';
import AppSelectLanguage from './app-language';

export const AppHeader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)',
        px: 2,
        borderBottom: '1px solid var(--neutral-200)',
        backgroundColor: '#fff',
      }}
    >
      {/* Breadcrumb Navigation */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <AppBreadcrumb />
      </Box>

      {/* Right Side Actions */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        <Suspense fallback={<Skeleton variant='rounded' width={120} height={40} />}>
          <AppSelectLanguage />
        </Suspense>
      </Box>
    </Box>
  );
};
