'use client';

import { ReactNode } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

import useSidebarStore from '@/store/use-sidebar-store';

import AppHeader from './app-header';
import AppSidebar from './app-sidebar';

const getAppBarSx = (open: boolean): SxProps<Theme> => ({
  background: (theme) => theme.palette.background.paper,
  color: (theme) => theme.palette.text.primary,
  width: open
    ? `calc(100% - var(--sidebar-width))`
    : `calc(100% - var(--collapsed-sidebar-width))`,
  height: 'var(--header-height)',
  zIndex: 1200,
  boxShadow: 'none',
  left: open ? 'var(--sidebar-width)' : 'var(--collapsed-sidebar-width)',
  transition: (theme) =>
    theme.transitions.create(['width', 'left'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
});

interface AppLayoutClientProps {
  children: ReactNode;
}

export const AppLayoutClient = ({ children }: AppLayoutClientProps) => {
  return <AppLayoutClientInner>{children}</AppLayoutClientInner>;
};

const AppLayoutClientInner = ({ children }: AppLayoutClientProps & {}) => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppSidebar />

      <AppBar elevation={2} sx={getAppBarSx(isOpen)} position='fixed' suppressHydrationWarning>
        <AppHeader open={isOpen} onToggleOpenAction={toggleSidebar} />
      </AppBar>

      <main
        suppressHydrationWarning
        style={{
          minHeight: '100dvh',
          width: isOpen
            ? `calc(100% - var(--sidebar-width))`
            : `calc(100% - var(--collapsed-sidebar-width))`,
          padding: 'calc(var(--header-height) + 16px) 16px 16px 16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </main>
    </Box>
  );
};
