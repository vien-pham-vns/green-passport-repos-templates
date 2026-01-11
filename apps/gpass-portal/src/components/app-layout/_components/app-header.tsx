import { Suspense } from 'react';

import ModeSwitch from '@dt/mui-ui/components/mode-switch';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarRightCollapse,
} from '@tabler/icons-react';

import { AppBreadcrumb } from './app-breadcrumb';
import AppSelectLanguage from './app-language';
import { AppSidebarProps } from './sidebar/type';

export default function AppHeader({ open, onToggleOpenAction }: AppSidebarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 'var(--header-height)',
        px: 1,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
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
        <IconButton onClick={onToggleOpenAction}>
          {open ? <IconLayoutSidebarLeftCollapse /> : <IconLayoutSidebarRightCollapse />}
        </IconButton>
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
        <ModeSwitch />
      </Box>
    </Box>
  );
}
