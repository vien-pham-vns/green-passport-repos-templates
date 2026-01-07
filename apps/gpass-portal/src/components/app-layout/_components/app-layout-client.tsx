'use client';

import { ReactNode, useState } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

import useUserStore from '@/store/use-user-store';

import { AppHeader } from './app-header';
import { AppSidebar } from './app-sidebar';

const getAppBarSx = (open: boolean): SxProps<Theme> => ({
  background: '#fff',
  color: '#000',
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
  const user = useUserStore((state) => state.user);
  const userRole = user?.profile?.role;

  return <AppLayoutClientInner>{children}</AppLayoutClientInner>;
};

const AppLayoutClientInner = ({ children }: AppLayoutClientProps & {}) => {
  const stored =
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('sidebarOpen') : null;
  const [open, setOpen] = useState(() => (stored !== null ? stored === 'true' : true));

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <AppSidebar
        open={open}
        onToggleOpenAction={() => {
          sessionStorage.setItem('sidebarOpen', String(!open));
          setOpen((prev) => !prev);
        }}
      />

      <AppBar elevation={2} sx={getAppBarSx(open)} position='fixed'>
        <AppHeader />
      </AppBar>

      <main
        style={{
          minHeight: '100dvh',
          width: open
            ? `calc(100% - var(--sidebar-width))`
            : `calc(100% - var(--collapsed-sidebar-width))`,
          padding: 'calc(var(--header-height) + 16px) 16px 16px 16px',
          backgroundColor: 'var(--neutral-100)',
          position: 'relative',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </Box>
  );
};
